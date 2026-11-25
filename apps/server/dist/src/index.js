import fs from "node:fs/promises";
import path from "node:path";
import { OpenAPIHandler } from "@orpc/openapi/node";
import { OpenAPIReferencePlugin } from "@orpc/openapi/plugins";
import { onError } from "@orpc/server";
import { RPCHandler } from "@orpc/server/node";
import { ZodToJsonSchemaConverter } from "@orpc/zod/zod4";
import { createContext } from "@selimsolutions/api/context";
import { appRouter } from "@selimsolutions/api/routers/index";
import { auth } from "@selimsolutions/auth";
import prisma from "@selimsolutions/db";
import { env } from "@selimsolutions/env/server";
import { fromNodeHeaders, toNodeHandler } from "better-auth/node";
import cors from "cors";
import express from "express";
const app = express();
app.set("trust proxy", 1);
const allowedOrigins = env.CORS_ORIGIN.split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
app.use(cors({
    origin: allowedOrigins.length === 1 ? allowedOrigins[0] : allowedOrigins,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));
app.all("/api/auth{/*path}", toNodeHandler(auth));
const rpcHandler = new RPCHandler(appRouter, {
    interceptors: [
        onError((error) => {
            console.error(error);
        }),
    ],
});
const apiHandler = new OpenAPIHandler(appRouter, {
    plugins: [
        new OpenAPIReferencePlugin({
            schemaConverters: [new ZodToJsonSchemaConverter()],
        }),
    ],
    interceptors: [
        onError((error) => {
            console.error(error);
        }),
    ],
});
app.use(async (req, res, next) => {
    const rpcResult = await rpcHandler.handle(req, res, {
        prefix: "/rpc",
        context: await createContext({ req }),
    });
    if (rpcResult.matched)
        return;
    const apiResult = await apiHandler.handle(req, res, {
        prefix: "/api-reference",
        context: await createContext({ req }),
    });
    if (apiResult.matched)
        return;
    next();
});
app.use(express.json({ limit: "15mb" }));
const uploadsDir = path.resolve(process.cwd(), "uploads");
app.use("/uploads", express.static(uploadsDir));
app.post("/api/cms/upload", async (req, res) => {
    try {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers),
        });
        if (!session?.user) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }
        const admin = await prisma.admin.findUnique({
            where: { userId: session.user.id },
        });
        if (!admin) {
            res.status(403).json({ error: "Forbidden" });
            return;
        }
        const { filename, mimeType, dataBase64, altText } = req.body;
        if (!filename || !dataBase64) {
            res.status(400).json({ error: "Missing filename or file data" });
            return;
        }
        const safeBase = path.basename(filename).replace(/[^a-zA-Z0-9._-]/g, "_");
        const storedName = `${Date.now()}-${safeBase}`;
        const buffer = Buffer.from(dataBase64, "base64");
        await fs.mkdir(uploadsDir, { recursive: true });
        await fs.writeFile(path.join(uploadsDir, storedName), buffer);
        const resolvedMime = mimeType || "application/octet-stream";
        const mediaType = resolvedMime.startsWith("video/")
            ? "VIDEO"
            : resolvedMime.startsWith("image/")
                ? "IMAGE"
                : "DOCUMENT";
        const kb = buffer.byteLength / 1024;
        const sizeLabel = kb >= 1024
            ? `${(kb / 1024).toFixed(1)} MB`
            : `${Math.max(1, Math.round(kb))} KB`;
        const baseUrl = env.BETTER_AUTH_URL.replace(/\/$/, "");
        const created = await prisma.cmsMedia.create({
            data: {
                name: safeBase,
                url: `${baseUrl}/uploads/${storedName}`,
                type: mediaType,
                mimeType: resolvedMime,
                sizeLabel,
                altText: altText?.trim() || null,
            },
        });
        res.status(201).json(created);
    }
    catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ error: "Failed to upload file" });
    }
});
app.get("/", (_req, res) => {
    res.status(200).send("OK");
});
app.get("/robots.txt", async (_req, res) => {
    const config = await prisma.cmsSiteConfig.findUnique({ where: { id: 1 } });
    const base = (config?.canonicalBase || "https://selim.solutions").replace(/\/$/, "");
    const lines = [
        "User-agent: *",
        config?.robotsIndex === false ? "Disallow: /" : "Allow: /",
        "Disallow: /dashboard",
        ...(config?.sitemapEnabled !== false
            ? [`Sitemap: ${base}/sitemap.xml`]
            : []),
    ];
    res.type("text/plain").send(lines.join("\n"));
});
app.get("/sitemap.xml", async (_req, res) => {
    const config = await prisma.cmsSiteConfig.findUnique({ where: { id: 1 } });
    if (config?.sitemapEnabled === false) {
        res.status(404).send("Sitemap disabled");
        return;
    }
    const base = (config?.canonicalBase || "https://selim.solutions").replace(/\/$/, "");
    const [pages, posts] = await Promise.all([
        prisma.cmsPage.findMany({
            where: { status: "PUBLISHED", noIndex: false },
            select: { slug: true, updatedAt: true },
        }),
        prisma.cmsPost.findMany({
            where: { status: "PUBLISHED", noIndex: false },
            select: { slug: true, updatedAt: true },
        }),
    ]);
    const urls = [
        ...pages.map((p) => ({
            loc: `${base}${p.slug === "/" ? "" : p.slug}`,
            lastmod: p.updatedAt.toISOString(),
        })),
        ...posts.map((p) => ({
            loc: `${base}/blog/${p.slug}`,
            lastmod: p.updatedAt.toISOString(),
        })),
    ];
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
        .map((u) => `  <url><loc>${u.loc}</loc><lastmod>${u.lastmod}</lastmod></url>`)
        .join("\n")}
</urlset>`;
    res.type("application/xml").send(xml);
});
app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`);
});

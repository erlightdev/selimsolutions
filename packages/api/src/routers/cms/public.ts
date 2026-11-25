import prisma from "@selimsolutions/db";
import { z } from "zod";

import { publicProcedure } from "../../index";

export const cmsPublicRouter = {
	getSiteBundle: publicProcedure.handler(async () => {
		const [config, navItems] = await Promise.all([
			prisma.cmsSiteConfig.findUnique({ where: { id: 1 } }),
			prisma.cmsNavItem.findMany({
				where: { isVisible: true },
				orderBy: { sortOrder: "asc" },
			}),
		]);

		return { config, navItems };
	}),

	getPageBySlug: publicProcedure
		.input(z.object({ slug: z.string().min(1) }))
		.handler(async ({ input }) => {
			return prisma.cmsPage.findFirst({
				where: { slug: input.slug, status: "PUBLISHED" },
				include: {
					sections: {
						where: { isVisible: true },
						orderBy: { sortOrder: "asc" },
					},
				},
			});
		}),

	listPosts: publicProcedure
		.input(
			z
				.object({
					categorySlug: z.string().optional(),
					limit: z.number().int().min(1).max(100).optional(),
				})
				.optional(),
		)
		.handler(async ({ input }) => {
			return prisma.cmsPost.findMany({
				where: {
					status: "PUBLISHED",
					...(input?.categorySlug
						? { category: { slug: input.categorySlug } }
						: {}),
				},
				include: {
					category: true,
					author: { select: { name: true, image: true } },
				},
				orderBy: [{ featured: "desc" }, { publishedAt: "desc" }],
				take: input?.limit ?? 50,
			});
		}),

	getPostBySlug: publicProcedure
		.input(z.object({ slug: z.string().min(1) }))
		.handler(async ({ input }) => {
			return prisma.cmsPost.findFirst({
				where: { slug: input.slug, status: "PUBLISHED" },
				include: {
					category: true,
					author: { select: { name: true, image: true } },
				},
			});
		}),
};

import path from "node:path";

import dotenv from "dotenv";
import { defineConfig } from "prisma/config";

// Load the env file matching NODE_ENV (e.g. `.env.production`), falling back to
// the default `.env`. Run prod commands with NODE_ENV=production set.
const envFile =
	process.env.NODE_ENV === "production" ? ".env.production" : ".env";

dotenv.config({
	path: path.join("..", "..", "apps", "server", envFile),
});

// `prisma generate` doesn't connect to the DB, but config load still resolves
// the datasource url. On CI/Vercel install there's no .env, so fall back to a
// dummy url to keep generate working; real db commands read the loaded env.
const databaseUrl =
	process.env.DATABASE_URL ??
	"mysql://user:password@localhost:3306/placeholder";

export default defineConfig({
	schema: path.join("prisma", "schema"),
	migrations: {
		path: path.join("prisma", "migrations"),
	},
	datasource: {
		url: databaseUrl,
	},
});

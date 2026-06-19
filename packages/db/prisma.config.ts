import path from "node:path";

import dotenv from "dotenv";
import { defineConfig, env } from "prisma/config";

// Load the env file matching NODE_ENV (e.g. `.env.production`), falling back to
// the default `.env`. Run prod commands with NODE_ENV=production set.
const envFile =
	process.env.NODE_ENV === "production" ? ".env.production" : ".env";

dotenv.config({
	path: path.join("..", "..", "apps", "server", envFile),
});

export default defineConfig({
	schema: path.join("prisma", "schema"),
	migrations: {
		path: path.join("prisma", "migrations"),
	},
	datasource: {
		url: env("DATABASE_URL"),
	},
});

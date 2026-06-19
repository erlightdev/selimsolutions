import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { env } from "@selimsolutions/env/server";

import { PrismaClient } from "../prisma/generated/client";

export function createPrismaClient() {
	const databaseUrl: string = env.DATABASE_URL;
	const url: URL = new URL(databaseUrl);
	const connectionConfig = {
		host: url.hostname,
		port: Number.parseInt(url.port || "3306"),
		// Username/password may contain URL-encoded special chars (e.g. @ # in a
		// password). new URL() keeps them percent-encoded, so decode before passing
		// the raw credentials to the driver.
		user: decodeURIComponent(url.username),
		password: decodeURIComponent(url.password),
		database: url.pathname.slice(1),
	};

	const adapter = new PrismaMariaDb(connectionConfig);
	return new PrismaClient({ adapter });
}

const prisma = createPrismaClient();
export default prisma;

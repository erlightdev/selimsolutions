import { createPrismaClient } from "@selimsolutions/db";
import { env } from "@selimsolutions/env/server";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

export function createAuth() {
	const prisma = createPrismaClient();

	return betterAuth({
		database: prismaAdapter(prisma, {
			provider: "mysql",
		}),

		trustedOrigins: env.CORS_ORIGIN.split(",")
			.map((origin) => origin.trim())
			.filter(Boolean),
		emailAndPassword: {
			enabled: true,
			disableSignUp: true,
		},
		secret: env.BETTER_AUTH_SECRET,
		baseURL: env.BETTER_AUTH_URL,
		plugins: [],
	});
}

export const auth = createAuth();

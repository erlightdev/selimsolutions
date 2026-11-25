import { randomUUID } from "node:crypto";
import prisma from "@selimsolutions/db";
import { hashPassword } from "better-auth/crypto";
import { z } from "zod";

const input = z
	.object({
		ADMIN_NAME: z.string().trim().min(2),
		ADMIN_EMAIL: z.email().transform((email) => email.toLowerCase()),
		ADMIN_PASSWORD: z.string().min(12),
	})
	.parse(process.env);

try {
	const password = await hashPassword(input.ADMIN_PASSWORD);
	await prisma.$transaction(async (tx) => {
		if (await tx.admin.findUnique({ where: { id: 1 } })) {
			throw new Error("An administrator has already been created.");
		}
		const userId = randomUUID();
		await tx.user.create({
			data: {
				id: userId,
				name: input.ADMIN_NAME,
				email: input.ADMIN_EMAIL,
				emailVerified: false,
				accounts: {
					create: {
						id: randomUUID(),
						accountId: userId,
						providerId: "credential",
						password,
					},
				},
				admin: { create: { id: 1 } },
			},
		});
	});
	console.log("Administrator created.");
} finally {
	await prisma.$disconnect();
}

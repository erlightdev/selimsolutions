import { ORPCError, os } from "@orpc/server";
import prisma from "@selimsolutions/db";

import type { Context } from "./context";

export const o = os.$context<Context>();

export const publicProcedure = o;

const requireAuth = o.middleware(async ({ context, next }) => {
	if (!context.session?.user) {
		throw new ORPCError("UNAUTHORIZED");
	}
	const admin = await prisma.admin.findUnique({
		where: { userId: context.session.user.id },
	});
	if (!admin) throw new ORPCError("FORBIDDEN");
	return next({
		context: {
			session: context.session,
		},
	});
});

export const protectedProcedure = publicProcedure.use(requireAuth);

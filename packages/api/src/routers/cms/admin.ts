import { ORPCError } from "@orpc/server";
import prisma from "@selimsolutions/db";
import { z } from "zod";

import { protectedProcedure } from "../../index";
import { assertValidPageSlug, sanitizeTipTapHtml } from "./sanitize";

const NAV_LOCATIONS = [
	"HEADER_PRIMARY",
	"MEGA_SERVICES",
	"MEGA_SOLUTIONS",
	"MEGA_RESOURCES",
	"MEGA_COMPLIANCE",
	"FOOTER_SERVICES",
	"FOOTER_SOLUTIONS",
	"FOOTER_COMPANY",
	"FOOTER_LEGAL",
	"FOOTER_SOCIALS",
] as const;

export const cmsAdminRouter = {
	// ── Pages & Sections ──────────────────────────────────────────────
	pagesList: protectedProcedure.handler(async () => {
		return prisma.cmsPage.findMany({
			include: {
				sections: { orderBy: { sortOrder: "asc" } },
			},
			orderBy: [{ isSystem: "desc" }, { updatedAt: "desc" }],
		});
	}),

	pagesCreate: protectedProcedure
		.input(
			z.object({
				title: z.string().min(1).max(191),
				slug: z.string().min(1).max(191),
				template: z
					.enum(["LANDING", "STANDARD", "SERVICE", "SOLUTION", "LEGAL"])
					.default("STANDARD"),
				status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
				contentHtml: z.string().default(""),
				seoTitle: z.string().max(191).default(""),
				seoDesc: z.string().default(""),
				canonicalUrl: z.string().max(255).nullable().optional(),
				ogImageUrl: z.string().max(255).nullable().optional(),
				noIndex: z.boolean().default(false),
			}),
		)
		.handler(async ({ input }) => {
			const slug = assertValidPageSlug(input.slug);
			const existing = await prisma.cmsPage.findUnique({ where: { slug } });
			if (existing) {
				throw new ORPCError("CONFLICT", {
					message: `A page with slug "${slug}" already exists.`,
				});
			}
			return prisma.cmsPage.create({
				data: {
					title: input.title.trim(),
					slug,
					template: input.template,
					status: input.status,
					contentHtml: sanitizeTipTapHtml(input.contentHtml),
					seoTitle: input.seoTitle.trim(),
					seoDesc: input.seoDesc.trim(),
					canonicalUrl: input.canonicalUrl?.trim() || null,
					ogImageUrl: input.ogImageUrl?.trim() || null,
					noIndex: input.noIndex,
					publishedAt: input.status === "PUBLISHED" ? new Date() : null,
				},
				include: { sections: { orderBy: { sortOrder: "asc" } } },
			});
		}),

	pagesUpdate: protectedProcedure
		.input(
			z.object({
				id: z.string().min(1),
				title: z.string().min(1).max(191),
				slug: z.string().min(1).max(191),
				template: z.enum([
					"LANDING",
					"STANDARD",
					"SERVICE",
					"SOLUTION",
					"LEGAL",
				]),
				status: z.enum(["DRAFT", "PUBLISHED"]),
				contentHtml: z.string(),
				seoTitle: z.string().max(191).default(""),
				seoDesc: z.string().default(""),
				canonicalUrl: z.string().max(255).nullable().optional(),
				ogImageUrl: z.string().max(255).nullable().optional(),
				noIndex: z.boolean().default(false),
			}),
		)
		.handler(async ({ input }) => {
			const slug = assertValidPageSlug(input.slug);
			const conflict = await prisma.cmsPage.findFirst({
				where: { slug, id: { not: input.id } },
			});
			if (conflict) {
				throw new ORPCError("CONFLICT", {
					message: `Slug "${slug}" is already used by another page.`,
				});
			}
			return prisma.cmsPage.update({
				where: { id: input.id },
				data: {
					title: input.title.trim(),
					slug,
					template: input.template,
					status: input.status,
					contentHtml: sanitizeTipTapHtml(input.contentHtml),
					seoTitle: input.seoTitle.trim(),
					seoDesc: input.seoDesc.trim(),
					canonicalUrl: input.canonicalUrl?.trim() || null,
					ogImageUrl: input.ogImageUrl?.trim() || null,
					noIndex: input.noIndex,
					publishedAt: input.status === "PUBLISHED" ? new Date() : null,
				},
				include: { sections: { orderBy: { sortOrder: "asc" } } },
			});
		}),

	pagesDuplicate: protectedProcedure
		.input(z.object({ id: z.string().min(1) }))
		.handler(async ({ input }) => {
			const source = await prisma.cmsPage.findUnique({
				where: { id: input.id },
				include: { sections: { orderBy: { sortOrder: "asc" } } },
			});
			if (!source) {
				throw new ORPCError("NOT_FOUND");
			}
			const copySlug = `${source.slug === "/" ? "/home" : source.slug}-copy-${Date.now().toString().slice(-4)}`;
			return prisma.cmsPage.create({
				data: {
					title: `${source.title} (Copy)`,
					slug: copySlug,
					template: source.template,
					status: "DRAFT",
					isSystem: false,
					contentHtml: source.contentHtml,
					seoTitle: source.seoTitle,
					seoDesc: source.seoDesc,
					noIndex: source.noIndex,
					sections: {
						create: source.sections.map((s) => ({
							type: s.type,
							title: s.title,
							subtitle: s.subtitle,
							contentHtml: s.contentHtml,
							sortOrder: s.sortOrder,
							isVisible: s.isVisible,
						})),
					},
				},
				include: { sections: { orderBy: { sortOrder: "asc" } } },
			});
		}),

	pagesDelete: protectedProcedure
		.input(z.object({ id: z.string().min(1) }))
		.handler(async ({ input }) => {
			const page = await prisma.cmsPage.findUnique({ where: { id: input.id } });
			if (!page) throw new ORPCError("NOT_FOUND");
			if (page.isSystem) {
				throw new ORPCError("BAD_REQUEST", {
					message: "System pages (like Home) cannot be deleted.",
				});
			}
			await prisma.cmsPage.delete({ where: { id: input.id } });
			return { ok: true };
		}),

	sectionsUpsert: protectedProcedure
		.input(
			z.object({
				id: z.string().optional(),
				pageId: z.string().min(1),
				type: z.string().min(1).max(64),
				title: z.string().min(1).max(191),
				subtitle: z.string().nullable().optional(),
				contentHtml: z.string().nullable().optional(),
				sortOrder: z.number().int().default(0),
				isVisible: z.boolean().default(true),
			}),
		)
		.handler(async ({ input }) => {
			const cleanHtml = input.contentHtml
				? sanitizeTipTapHtml(input.contentHtml)
				: null;
			if (input.id) {
				return prisma.cmsPageSection.update({
					where: { id: input.id },
					data: {
						type: input.type,
						title: input.title.trim(),
						subtitle: input.subtitle ?? null,
						contentHtml: cleanHtml,
						sortOrder: input.sortOrder,
						isVisible: input.isVisible,
					},
				});
			}
			return prisma.cmsPageSection.create({
				data: {
					pageId: input.pageId,
					type: input.type,
					title: input.title.trim(),
					subtitle: input.subtitle ?? null,
					contentHtml: cleanHtml,
					sortOrder: input.sortOrder,
					isVisible: input.isVisible,
				},
			});
		}),

	sectionsDelete: protectedProcedure
		.input(z.object({ id: z.string().min(1) }))
		.handler(async ({ input }) => {
			await prisma.cmsPageSection.delete({ where: { id: input.id } });
			return { ok: true };
		}),

	// ── Posts & Categories ────────────────────────────────────────────
	categoriesList: protectedProcedure.handler(async () => {
		return prisma.cmsCategory.findMany({ orderBy: { name: "asc" } });
	}),

	postsList: protectedProcedure.handler(async () => {
		return prisma.cmsPost.findMany({
			include: { category: true, author: { select: { name: true } } },
			orderBy: { updatedAt: "desc" },
		});
	}),

	postsCreate: protectedProcedure
		.input(
			z.object({
				title: z.string().min(1).max(255),
				slug: z.string().min(1).max(191),
				excerpt: z.string().default(""),
				contentHtml: z.string().default(""),
				coverImage: z.string().nullable().optional(),
				readTime: z.string().max(64).default("5 min read"),
				featured: z.boolean().default(false),
				status: z.enum(["DRAFT", "PUBLISHED"]).default("DRAFT"),
				categoryId: z.string().nullable().optional(),
				seoTitle: z.string().max(191).default(""),
				seoDesc: z.string().default(""),
				noIndex: z.boolean().default(false),
			}),
		)
		.handler(async ({ input, context }) => {
			const slug = input.slug.trim().replace(/^\/+/, "");
			const existing = await prisma.cmsPost.findUnique({ where: { slug } });
			if (existing) {
				throw new ORPCError("CONFLICT", {
					message: `A post with slug "${slug}" already exists.`,
				});
			}
			return prisma.cmsPost.create({
				data: {
					title: input.title.trim(),
					slug,
					excerpt: input.excerpt.trim(),
					contentHtml: sanitizeTipTapHtml(input.contentHtml),
					coverImage: input.coverImage ?? null,
					readTime: input.readTime,
					featured: input.featured,
					status: input.status,
					categoryId: input.categoryId ?? null,
					authorId: context.session.user.id,
					seoTitle: input.seoTitle.trim(),
					seoDesc: input.seoDesc.trim(),
					noIndex: input.noIndex,
					publishedAt: input.status === "PUBLISHED" ? new Date() : null,
				},
				include: { category: true, author: { select: { name: true } } },
			});
		}),

	postsUpdate: protectedProcedure
		.input(
			z.object({
				id: z.string().min(1),
				title: z.string().min(1).max(255),
				slug: z.string().min(1).max(191),
				excerpt: z.string().default(""),
				contentHtml: z.string().default(""),
				coverImage: z.string().nullable().optional(),
				readTime: z.string().max(64).default("5 min read"),
				featured: z.boolean().default(false),
				status: z.enum(["DRAFT", "PUBLISHED"]),
				categoryId: z.string().nullable().optional(),
				seoTitle: z.string().max(191).default(""),
				seoDesc: z.string().default(""),
				noIndex: z.boolean().default(false),
			}),
		)
		.handler(async ({ input }) => {
			const slug = input.slug.trim().replace(/^\/+/, "");
			const conflict = await prisma.cmsPost.findFirst({
				where: { slug, id: { not: input.id } },
			});
			if (conflict) {
				throw new ORPCError("CONFLICT", {
					message: `Slug "${slug}" is already used by another post.`,
				});
			}
			return prisma.cmsPost.update({
				where: { id: input.id },
				data: {
					title: input.title.trim(),
					slug,
					excerpt: input.excerpt.trim(),
					contentHtml: sanitizeTipTapHtml(input.contentHtml),
					coverImage: input.coverImage ?? null,
					readTime: input.readTime,
					featured: input.featured,
					status: input.status,
					categoryId: input.categoryId ?? null,
					seoTitle: input.seoTitle.trim(),
					seoDesc: input.seoDesc.trim(),
					noIndex: input.noIndex,
					publishedAt: input.status === "PUBLISHED" ? new Date() : null,
				},
				include: { category: true, author: { select: { name: true } } },
			});
		}),

	postsDuplicate: protectedProcedure
		.input(z.object({ id: z.string().min(1) }))
		.handler(async ({ input }) => {
			const source = await prisma.cmsPost.findUnique({
				where: { id: input.id },
			});
			if (!source) throw new ORPCError("NOT_FOUND");
			return prisma.cmsPost.create({
				data: {
					title: `${source.title} (Copy)`,
					slug: `${source.slug}-copy-${Date.now().toString().slice(-4)}`,
					excerpt: source.excerpt,
					contentHtml: source.contentHtml,
					coverImage: source.coverImage,
					readTime: source.readTime,
					featured: false,
					status: "DRAFT",
					categoryId: source.categoryId,
					authorId: source.authorId,
					seoTitle: source.seoTitle,
					seoDesc: source.seoDesc,
					noIndex: source.noIndex,
				},
				include: { category: true, author: { select: { name: true } } },
			});
		}),

	postsDelete: protectedProcedure
		.input(z.object({ id: z.string().min(1) }))
		.handler(async ({ input }) => {
			await prisma.cmsPost.delete({ where: { id: input.id } });
			return { ok: true };
		}),

	// ── Menus ─────────────────────────────────────────────────────────
	menusList: protectedProcedure.handler(async () => {
		return prisma.cmsNavItem.findMany({
			orderBy: [{ location: "asc" }, { sortOrder: "asc" }],
		});
	}),

	menusUpsert: protectedProcedure
		.input(
			z.object({
				id: z.string().optional(),
				location: z.enum(NAV_LOCATIONS),
				label: z.string().min(1).max(191),
				href: z.string().min(1).max(255),
				description: z.string().nullable().optional(),
				iconName: z.string().max(64).nullable().optional(),
				target: z.enum(["_self", "_blank"]).default("_self"),
				sortOrder: z.number().int().default(0),
				isVisible: z.boolean().default(true),
			}),
		)
		.handler(async ({ input }) => {
			if (input.id) {
				return prisma.cmsNavItem.update({
					where: { id: input.id },
					data: {
						location: input.location,
						label: input.label.trim(),
						href: input.href.trim(),
						description: input.description ?? null,
						iconName: input.iconName ?? null,
						target: input.target,
						sortOrder: input.sortOrder,
						isVisible: input.isVisible,
					},
				});
			}
			return prisma.cmsNavItem.create({
				data: {
					location: input.location,
					label: input.label.trim(),
					href: input.href.trim(),
					description: input.description ?? null,
					iconName: input.iconName ?? null,
					target: input.target,
					sortOrder: input.sortOrder,
					isVisible: input.isVisible,
				},
			});
		}),

	menusReorder: protectedProcedure
		.input(
			z.object({
				items: z.array(
					z.object({ id: z.string(), sortOrder: z.number().int() }),
				),
			}),
		)
		.handler(async ({ input }) => {
			await prisma.$transaction(
				input.items.map((item) =>
					prisma.cmsNavItem.update({
						where: { id: item.id },
						data: { sortOrder: item.sortOrder },
					}),
				),
			);
			return { ok: true };
		}),

	menusDelete: protectedProcedure
		.input(z.object({ id: z.string().min(1) }))
		.handler(async ({ input }) => {
			await prisma.cmsNavItem.delete({ where: { id: input.id } });
			return { ok: true };
		}),

	// ── Media ─────────────────────────────────────────────────────────
	mediaList: protectedProcedure.handler(async () => {
		return prisma.cmsMedia.findMany({ orderBy: { createdAt: "desc" } });
	}),

	mediaCreate: protectedProcedure
		.input(
			z.object({
				name: z.string().min(1).max(191),
				url: z.string().min(1).max(512),
				type: z.enum(["IMAGE", "VIDEO", "DOCUMENT"]).default("IMAGE"),
				mimeType: z.string().max(120).default("image/svg+xml"),
				sizeLabel: z.string().max(64).default("—"),
				altText: z.string().max(255).nullable().optional(),
			}),
		)
		.handler(async ({ input }) => {
			return prisma.cmsMedia.create({
				data: {
					name: input.name.trim(),
					url: input.url.trim(),
					type: input.type,
					mimeType: input.mimeType,
					sizeLabel: input.sizeLabel,
					altText: input.altText ?? null,
				},
			});
		}),

	mediaDelete: protectedProcedure
		.input(z.object({ id: z.string().min(1) }))
		.handler(async ({ input }) => {
			await prisma.cmsMedia.delete({ where: { id: input.id } });
			return { ok: true };
		}),

	mediaUpdate: protectedProcedure
		.input(
			z.object({
				id: z.string().min(1),
				name: z.string().min(1).max(191),
				altText: z.string().max(255).nullable().optional(),
			}),
		)
		.handler(async ({ input }) => {
			return prisma.cmsMedia.update({
				where: { id: input.id },
				data: {
					name: input.name.trim(),
					altText: input.altText?.trim() || null,
				},
			});
		}),

	// ── Site Config (General, Appearance, Header/Footer, SEO) ─────────
	configGet: protectedProcedure.handler(async () => {
		return prisma.cmsSiteConfig.findUnique({ where: { id: 1 } });
	}),

	configUpdateAppearance: protectedProcedure
		.input(
			z.object({
				accentColor: z.string().min(1).max(32),
				defaultTheme: z.enum(["dark", "light", "system"]),
				containerWidth: z.enum(["standard", "wide"]),
				showAnnouncementBar: z.boolean(),
				stickyHeader: z.boolean(),
				announcementText: z.string().default(""),
				announcementHref: z.string().default("/free-assessment"),
				footerCtaTitle: z.string().default(""),
				footerCtaSubtitle: z.string().default(""),
				footerCtaLabel: z.string().default("Get Free Assessment"),
				footerCtaHref: z.string().default("/free-assessment"),
			}),
		)
		.handler(async ({ input }) => {
			return prisma.cmsSiteConfig.update({
				where: { id: 1 },
				data: input,
			});
		}),

	configUpdateGeneral: protectedProcedure
		.input(
			z.object({
				siteName: z.string().min(1).max(191),
				tagline: z.string().default(""),
				siteUrl: z.string().min(1).max(255),
				adminEmail: z.string().email().max(191),
				permalinkStyle: z.string().max(64),
				contactEmail: z.string().max(191).optional(),
				contactPhone: z.string().max(64).optional(),
				contactAddress: z.string().max(255).optional(),
				isoBadgeText: z.string().max(191).optional(),
				copyrightText: z.string().max(255).optional(),
			}),
		)
		.handler(async ({ input }) => {
			return prisma.cmsSiteConfig.update({
				where: { id: 1 },
				data: input,
			});
		}),

	configUpdateSeo: protectedProcedure
		.input(
			z.object({
				titleSeparator: z.string().max(16),
				siteTitle: z.string().min(1).max(191),
				defaultDescription: z.string().default(""),
				canonicalBase: z.string().min(1).max(255),
				robotsIndex: z.boolean(),
				sitemapEnabled: z.boolean(),
				structuredData: z.boolean(),
				ogTitle: z.string().max(191),
				ogDescription: z.string().default(""),
			}),
		)
		.handler(async ({ input }) => {
			return prisma.cmsSiteConfig.update({
				where: { id: 1 },
				data: input,
			});
		}),
};

import { Input } from "@selimsolutions/ui/components/input";
import { Separator } from "@selimsolutions/ui/components/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@selimsolutions/ui/components/sidebar";
import { Skeleton } from "@selimsolutions/ui/components/skeleton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";

import { AppSidebar } from "@/components/dashboard/app-sidebar";
import {
	type AppearancePayload,
	CmsAppearanceView,
	CmsMenusView,
} from "@/components/dashboard/cms-appearance-menus";
import {
	CmsPagesManager,
	CmsPostsManager,
} from "@/components/dashboard/cms-content-manager";
import type { CmsView } from "@/components/dashboard/cms-data";
import { CmsMedia } from "@/components/dashboard/cms-media";
import { CmsOverview } from "@/components/dashboard/cms-overview";
import {
	CmsSettingsAndSeoView,
	type GeneralSettingsPayload,
	type SeoSettingsPayload,
} from "@/components/dashboard/cms-seo-settings";
import {
	ConfirmDeleteDialog,
	type DeleteTarget,
} from "@/components/dashboard/confirm-delete-dialog";
import { ConfirmLeaveDialog } from "@/components/dashboard/confirm-leave-dialog";
import { ModeToggle } from "@/components/mode-toggle";
import { authClient } from "@/lib/auth-client";
import { orpc } from "@/utils/orpc";

const VALID_VIEWS = new Set<CmsView>([
	"overview",
	"pages",
	"services",
	"solutions",
	"legal",
	"posts",
	"media",
	"appearance",
	"menus",
	"settings",
]);

type StatusFilter = "all" | "PUBLISHED" | "DRAFT";

export type DashboardSearch = {
	tab?: CmsView;
	edit?: string;
	status?: StatusFilter;
	q?: string;
};

export const Route = createFileRoute("/_auth/dashboard")({
	validateSearch: (search: Record<string, unknown>): DashboardSearch => {
		const tab =
			typeof search.tab === "string" && VALID_VIEWS.has(search.tab as CmsView)
				? (search.tab as CmsView)
				: undefined;
		const edit =
			typeof search.edit === "string" && search.edit.trim()
				? search.edit.trim()
				: undefined;
		const status =
			search.status === "PUBLISHED" ||
			search.status === "DRAFT" ||
			search.status === "all"
				? search.status
				: undefined;
		const q =
			typeof search.q === "string" && search.q.length > 0
				? search.q
				: undefined;
		return {
			...(tab ? { tab } : {}),
			...(edit ? { edit } : {}),
			...(status && status !== "all" ? { status } : {}),
			...(q ? { q } : {}),
		};
	},
	component: RouteComponent,
});

const VIEW_META: Record<CmsView, { title: string; subtitle: string }> = {
	overview: {
		title: "Dashboard",
		subtitle: "Site overview, quick drafts, and recent updates.",
	},
	pages: {
		title: "Pages",
		subtitle: "Manage core site pages and sections.",
	},
	services: {
		title: "Services",
		subtitle: "Manage service overview and individual service pages.",
	},
	solutions: {
		title: "Solutions",
		subtitle: "Manage industry solutions and sector pages.",
	},
	legal: {
		title: "Legal Pages",
		subtitle: "Manage privacy policy, terms of service, and legal docs.",
	},
	posts: {
		title: "Posts",
		subtitle: "Manage blog articles, categories, and drafts.",
	},
	media: {
		title: "Media",
		subtitle: "Manage images, SVGs, and video assets.",
	},
	appearance: {
		title: "Appearance",
		subtitle: "Customize brand accent, theme, announcement bar, and CTA.",
	},
	menus: {
		title: "Menus",
		subtitle: "Configure header, megamenu, and footer navigation links.",
	},
	settings: {
		title: "Settings & SEO",
		subtitle: "Site configuration, search metadata, and SEO audit.",
	},
};

function RouteComponent() {
	const { session } = Route.useRouteContext();
	const search = Route.useSearch();
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const searchRef = useRef<HTMLInputElement>(null);

	const activeView: CmsView = search.tab ?? "overview";
	const editId = search.edit;
	const statusFilter: StatusFilter = search.status ?? "all";
	const searchQuery = search.q ?? "";
	const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);
	const [isEditorDirty, setIsEditorDirty] = useState(false);
	const [pendingLeaveAction, setPendingLeaveAction] = useState<
		(() => void) | null
	>(null);

	useEffect(() => {
		if (!isEditorDirty) return;
		const handleBeforeUnload = (e: BeforeUnloadEvent) => {
			e.preventDefault();
			e.returnValue = "";
		};
		window.addEventListener("beforeunload", handleBeforeUnload);
		return () => window.removeEventListener("beforeunload", handleBeforeUnload);
	}, [isEditorDirty]);

	const requestLeave = (action: () => void) => {
		if (isEditorDirty) {
			setPendingLeaveAction(() => action);
			return;
		}
		action();
	};

	const selectView = (view: CmsView) => {
		requestLeave(() => {
			setIsEditorDirty(false);
			navigate({
				to: "/dashboard",
				search: view === "overview" ? {} : { tab: view },
			});
		});
	};

	const setEditId = (nextEdit?: string) => {
		navigate({
			to: "/dashboard",
			search: (prev) => ({
				...(prev.tab ? { tab: prev.tab } : {}),
				...(prev.status ? { status: prev.status } : {}),
				...(prev.q ? { q: prev.q } : {}),
				...(nextEdit ? { edit: nextEdit } : {}),
			}),
		});
	};

	const setStatusFilter = (nextStatus: StatusFilter) => {
		navigate({
			to: "/dashboard",
			replace: true,
			search: (prev) => ({
				...(prev.tab ? { tab: prev.tab } : {}),
				...(prev.edit ? { edit: prev.edit } : {}),
				...(prev.q ? { q: prev.q } : {}),
				...(nextStatus !== "all" ? { status: nextStatus } : {}),
			}),
		});
	};

	const setSearchQuery = (nextQ: string) => {
		navigate({
			to: "/dashboard",
			replace: true,
			search: (prev) => ({
				...(prev.tab ? { tab: prev.tab } : {}),
				...(prev.edit ? { edit: prev.edit } : {}),
				...(prev.status ? { status: prev.status } : {}),
				...(nextQ ? { q: nextQ } : {}),
			}),
		});
	};

	const privateData = useQuery(orpc.privateData.queryOptions());
	const pagesQuery = useQuery(orpc.cms.pagesList.queryOptions());
	const postsQuery = useQuery(orpc.cms.postsList.queryOptions());
	const categoriesQuery = useQuery(orpc.cms.categoriesList.queryOptions());
	const menusQuery = useQuery(orpc.cms.menusList.queryOptions());
	const mediaQuery = useQuery(orpc.cms.mediaList.queryOptions());
	const configQuery = useQuery(orpc.cms.configGet.queryOptions());

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
				event.preventDefault();
				searchRef.current?.focus();
			}
		};
		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, []);

	const invalidateCms = () => {
		queryClient.invalidateQueries();
	};

	const onError = (err: Error) => {
		toast.error(err.message || "Operation failed.");
	};

	// Page mutations
	const createPage = useMutation({
		...orpc.cms.pagesCreate.mutationOptions(),
		onSuccess: () => {
			invalidateCms();
			toast.success("Page created.");
		},
		onError,
	});
	const updatePage = useMutation({
		...orpc.cms.pagesUpdate.mutationOptions(),
		onSuccess: () => {
			invalidateCms();
			toast.success("Page saved.");
		},
		onError,
	});
	const duplicatePage = useMutation({
		...orpc.cms.pagesDuplicate.mutationOptions(),
		onSuccess: () => {
			invalidateCms();
			toast.success("Page duplicated.");
		},
		onError,
	});
	const deletePage = useMutation({
		...orpc.cms.pagesDelete.mutationOptions(),
		onSuccess: () => {
			invalidateCms();
			toast.success("Page deleted.");
		},
		onError,
	});
	const upsertSection = useMutation({
		...orpc.cms.sectionsUpsert.mutationOptions(),
		onSuccess: () => {
			invalidateCms();
			toast.success("Section saved.");
		},
		onError,
	});
	const deleteSection = useMutation({
		...orpc.cms.sectionsDelete.mutationOptions(),
		onSuccess: () => {
			invalidateCms();
			toast.success("Section removed.");
		},
		onError,
	});

	// Post mutations
	const createPost = useMutation({
		...orpc.cms.postsCreate.mutationOptions(),
		onSuccess: () => {
			invalidateCms();
			toast.success("Post created.");
		},
		onError,
	});
	const updatePost = useMutation({
		...orpc.cms.postsUpdate.mutationOptions(),
		onSuccess: () => {
			invalidateCms();
			toast.success("Post saved.");
		},
		onError,
	});
	const duplicatePost = useMutation({
		...orpc.cms.postsDuplicate.mutationOptions(),
		onSuccess: () => {
			invalidateCms();
			toast.success("Post duplicated.");
		},
		onError,
	});
	const deletePost = useMutation({
		...orpc.cms.postsDelete.mutationOptions(),
		onSuccess: () => {
			invalidateCms();
			toast.success("Post deleted.");
		},
		onError,
	});

	// Menu & Media & Config mutations
	const upsertMenu = useMutation({
		...orpc.cms.menusUpsert.mutationOptions(),
		onSuccess: () => {
			invalidateCms();
			toast.success("Menu updated.");
		},
		onError,
	});
	const reorderMenus = useMutation({
		...orpc.cms.menusReorder.mutationOptions(),
		onSuccess: () => {
			invalidateCms();
		},
		onError,
	});
	const deleteMenu = useMutation({
		...orpc.cms.menusDelete.mutationOptions(),
		onSuccess: () => {
			invalidateCms();
			toast.success("Menu link removed.");
		},
		onError,
	});
	const createMedia = useMutation({
		...orpc.cms.mediaCreate.mutationOptions(),
		onSuccess: () => {
			invalidateCms();
			toast.success("Media asset added.");
		},
		onError,
	});
	const updateMedia = useMutation({
		...orpc.cms.mediaUpdate.mutationOptions(),
		onSuccess: () => {
			invalidateCms();
			toast.success("Media asset updated.");
		},
		onError,
	});
	const deleteMedia = useMutation({
		...orpc.cms.mediaDelete.mutationOptions(),
		onSuccess: () => {
			invalidateCms();
			toast.success("Media asset deleted.");
		},
		onError,
	});
	const updateAppearance = useMutation({
		...orpc.cms.configUpdateAppearance.mutationOptions(),
		onSuccess: () => {
			invalidateCms();
			toast.success("Appearance saved.");
		},
		onError,
	});
	const updateGeneral = useMutation({
		...orpc.cms.configUpdateGeneral.mutationOptions(),
		onSuccess: () => {
			invalidateCms();
			toast.success("Settings saved.");
		},
		onError,
	});
	const updateSeo = useMutation({
		...orpc.cms.configUpdateSeo.mutationOptions(),
		onSuccess: () => {
			invalidateCms();
			toast.success("SEO settings saved.");
		},
		onError,
	});

	const pages = pagesQuery.data ?? [];
	const corePages = pages.filter(
		(p) => p.template === "LANDING" || p.template === "STANDARD",
	);
	const servicePages = pages.filter((p) => p.template === "SERVICE");
	const solutionPages = pages.filter((p) => p.template === "SOLUTION");
	const legalPages = pages.filter((p) => p.template === "LEGAL");
	const posts = postsQuery.data ?? [];
	const categories = categoriesQuery.data ?? [];
	const menuItems = menusQuery.data ?? [];
	const media = mediaQuery.data ?? [];
	const cfg = configQuery.data;

	const allEntries = [...pages, ...posts];
	const seoIssues = allEntries.filter(
		(e) => !e.seoTitle.trim() || e.seoDesc.trim().length < 30,
	).length;
	const seoScore = Math.max(
		0,
		Math.round(
			((allEntries.length - seoIssues) / Math.max(allEntries.length, 1)) * 100,
		),
	);

	const appearancePayload: AppearancePayload = useMemo(
		() => ({
			accentColor: cfg?.accentColor ?? "#0069eb",
			defaultTheme:
				(cfg?.defaultTheme as AppearancePayload["defaultTheme"]) ?? "dark",
			containerWidth:
				(cfg?.containerWidth as AppearancePayload["containerWidth"]) ??
				"standard",
			showAnnouncementBar: cfg?.showAnnouncementBar ?? true,
			stickyHeader: cfg?.stickyHeader ?? true,
			announcementText: cfg?.announcementText ?? "",
			announcementHref: cfg?.announcementHref ?? "/free-assessment",
			footerCtaTitle: cfg?.footerCtaTitle ?? "",
			footerCtaSubtitle: cfg?.footerCtaSubtitle ?? "",
			footerCtaLabel: cfg?.footerCtaLabel ?? "Get Free Assessment",
			footerCtaHref: cfg?.footerCtaHref ?? "/free-assessment",
		}),
		[cfg],
	);

	const generalPayload: GeneralSettingsPayload = useMemo(
		() => ({
			siteName: cfg?.siteName ?? "Selim Solutions",
			tagline: cfg?.tagline ?? "",
			siteUrl: cfg?.siteUrl ?? "https://selim.solutions",
			adminEmail: cfg?.adminEmail ?? "admin@selim.solutions",
			permalinkStyle: cfg?.permalinkStyle ?? "/blog/:slug",
			contactEmail: cfg?.contactEmail ?? "contact@selim.solutions",
			contactPhone: cfg?.contactPhone ?? "+977-1-4000000",
			contactAddress: cfg?.contactAddress ?? "Kathmandu, Nepal",
			isoBadgeText: cfg?.isoBadgeText ?? "ISO/IEC 27001:2022 Certified",
			copyrightText:
				cfg?.copyrightText ?? "Selim Solutions. All rights reserved.",
		}),
		[cfg],
	);

	const seoPayload: SeoSettingsPayload = useMemo(
		() => ({
			titleSeparator: cfg?.titleSeparator ?? "—",
			siteTitle: cfg?.siteTitle ?? "Selim Solutions",
			defaultDescription: cfg?.defaultDescription ?? "",
			canonicalBase: cfg?.canonicalBase ?? "https://selim.solutions",
			robotsIndex: cfg?.robotsIndex ?? true,
			sitemapEnabled: cfg?.sitemapEnabled ?? true,
			structuredData: cfg?.structuredData ?? true,
			ogTitle: cfg?.ogTitle ?? "Selim Solutions",
			ogDescription: cfg?.ogDescription ?? "",
		}),
		[cfg],
	);

	const handleSignOut = () => {
		authClient.signOut({
			fetchOptions: {
				onSuccess: () => navigate({ to: "/login" }),
				onError: () => {
					toast.error("Could not sign out. Please try again.");
				},
			},
		});
	};

	const meta = VIEW_META[activeView];
	const isInitialLoading =
		pagesQuery.isPending || postsQuery.isPending || configQuery.isPending;

	return (
		<SidebarProvider defaultOpen>
			<AppSidebar
				activeView={activeView}
				onSelectView={selectView}
				counts={{
					pages: corePages.length,
					services: servicePages.length,
					solutions: solutionPages.length,
					legal: legalPages.length,
					posts: posts.length,
					media: media.length,
					seoIssues,
				}}
				user={{
					name: session.data?.user.name,
					email: session.data?.user.email,
				}}
				onSignOut={handleSignOut}
			/>

			<SidebarInset className="overflow-hidden">
				<header className="sticky top-0 z-10 flex h-14 shrink-0 items-center justify-between gap-3 border-border/70 border-b bg-background/85 px-4 backdrop-blur-md">
					<div className="flex min-w-0 items-center gap-2.5">
						<SidebarTrigger />
						<Separator orientation="vertical" className="h-4" />
						<span className="truncate font-medium text-foreground text-xs">
							{generalPayload.siteName}
						</span>
					</div>

					<div className="flex items-center gap-2">
						<div className="relative hidden w-56 sm:block">
							<Search className="pointer-events-none absolute top-1/2 left-2.5 size-3.5 -translate-y-1/2 text-muted-foreground" />
							<Input
								ref={searchRef}
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								placeholder="Search..."
								className="h-8 rounded-lg pr-11 pl-8 text-xs"
							/>
							<kbd className="pointer-events-none absolute top-1/2 right-2 -translate-y-1/2 rounded border border-border bg-muted px-1 font-medium text-[10px] text-muted-foreground">
								⌘K
							</kbd>
						</div>

						<ModeToggle />
					</div>
				</header>

				<div className="flex-1 overflow-y-auto p-4 md:p-6">
					<div className="mx-auto flex w-full max-w-6xl flex-col gap-5">
						<div className="flex flex-wrap items-end justify-between gap-2">
							<div>
								<h1 className="text-balance font-semibold text-foreground text-xl tracking-tight">
									{meta.title}
								</h1>
								<p className="mt-0.5 text-pretty text-muted-foreground text-xs">
									{meta.subtitle}
								</p>
							</div>
							<span className="hidden text-[11px] text-muted-foreground sm:inline">
								<kbd className="rounded border border-border bg-muted px-1 py-0.5 font-mono text-[10px]">
									⌘B
								</kbd>{" "}
								Sidebar
							</span>
						</div>

						{isInitialLoading ? (
							<div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
								<Skeleton className="h-24 rounded-xl" />
								<Skeleton className="h-24 rounded-xl" />
								<Skeleton className="h-24 rounded-xl" />
								<Skeleton className="h-24 rounded-xl" />
							</div>
						) : (
							<>
								{activeView === "overview" && (
									<CmsOverview
										pages={pages}
										posts={posts}
										media={media}
										seoScore={seoScore}
										onNavigate={selectView}
									/>
								)}

								{(activeView === "pages" ||
									activeView === "services" ||
									activeView === "solutions" ||
									activeView === "legal") && (
									<CmsPagesManager
										key={activeView}
										pages={
											activeView === "services"
												? servicePages
												: activeView === "solutions"
													? solutionPages
													: activeView === "legal"
														? legalPages
														: corePages
										}
										defaultTemplate={
											activeView === "services"
												? "SERVICE"
												: activeView === "solutions"
													? "SOLUTION"
													: activeView === "legal"
														? "LEGAL"
														: "STANDARD"
										}
										entityLabel={
											activeView === "services"
												? "Service"
												: activeView === "solutions"
													? "Solution"
													: activeView === "legal"
														? "Legal Page"
														: "Page"
										}
										searchQuery={searchQuery}
										editId={editId}
										onEditChange={setEditId}
										onDirtyChange={setIsEditorDirty}
										onRequestLeave={requestLeave}
										statusFilter={statusFilter}
										onStatusFilterChange={setStatusFilter}
										siteBaseUrl={generalPayload.siteUrl}
										isSaving={createPage.isPending || updatePage.isPending}
										onCreate={async (payload) => {
											await createPage.mutateAsync(payload);
										}}
										onUpdate={async (payload) => {
											await updatePage.mutateAsync(payload);
										}}
										onDuplicate={(id) => duplicatePage.mutate({ id })}
										onDelete={(id) => {
											const target = pages.find((p) => p.id === id);
											setDeleteTarget({
												kind:
													activeView === "services"
														? "Service"
														: activeView === "solutions"
															? "Solution"
															: activeView === "legal"
																? "Legal Page"
																: "Page",
												label: target?.title || "this page",
												onConfirm: async () => {
													await deletePage.mutateAsync({ id });
												},
											});
										}}
										onUpsertSection={async (payload) => {
											await upsertSection.mutateAsync(payload);
										}}
										onDeleteSection={(id) => {
											const sec = pages
												.flatMap((p) => p.sections)
												.find((s) => s.id === id);
											setDeleteTarget({
												kind: "Section",
												label: sec?.title || "this section",
												onConfirm: async () => {
													await deleteSection.mutateAsync({ id });
												},
											});
										}}
									/>
								)}

								{activeView === "posts" && (
									<CmsPostsManager
										posts={posts}
										categories={categories}
										searchQuery={searchQuery}
										editId={editId}
										onEditChange={setEditId}
										onDirtyChange={setIsEditorDirty}
										onRequestLeave={requestLeave}
										statusFilter={statusFilter}
										onStatusFilterChange={setStatusFilter}
										siteBaseUrl={generalPayload.siteUrl}
										isSaving={createPost.isPending || updatePost.isPending}
										onCreate={async (payload) => {
											await createPost.mutateAsync(payload);
										}}
										onUpdate={async (payload) => {
											await updatePost.mutateAsync(payload);
										}}
										onDuplicate={(id) => duplicatePost.mutate({ id })}
										onDelete={(id) => {
											const target = posts.find((p) => p.id === id);
											setDeleteTarget({
												kind: "Post",
												label: target?.title || "this post",
												onConfirm: async () => {
													await deletePost.mutateAsync({ id });
												},
											});
										}}
									/>
								)}

								{activeView === "media" && (
									<CmsMedia
										media={media}
										searchQuery={searchQuery}
										onUploadComplete={invalidateCms}
										onAddMedia={async (payload) => {
											await createMedia.mutateAsync(payload);
										}}
										onUpdateMedia={async (payload) => {
											await updateMedia.mutateAsync(payload);
										}}
										onDeleteMedia={(id) => {
											const target = media.find((m) => m.id === id);
											setDeleteTarget({
												kind: "Media Asset",
												label: target?.name || "this asset",
												onConfirm: async () => {
													await deleteMedia.mutateAsync({ id });
												},
											});
										}}
									/>
								)}

								{activeView === "appearance" && (
									<CmsAppearanceView
										appearance={appearancePayload}
										general={generalPayload}
										isSaving={
											updateAppearance.isPending || updateGeneral.isPending
										}
										onSave={async (nextAppearance, nextGeneral) => {
											await Promise.all([
												updateAppearance.mutateAsync(nextAppearance),
												updateGeneral.mutateAsync(nextGeneral),
											]);
										}}
									/>
								)}

								{activeView === "menus" && (
									<CmsMenusView
										items={menuItems}
										onUpsert={async (payload) => {
											await upsertMenu.mutateAsync(payload);
										}}
										onReorder={async (items) => {
											await reorderMenus.mutateAsync({ items });
										}}
										onDelete={(id) => {
											const target = menuItems.find((m) => m.id === id);
											setDeleteTarget({
												kind: "Menu Link",
												label: target?.label || "this link",
												onConfirm: async () => {
													await deleteMenu.mutateAsync({ id });
												},
											});
										}}
									/>
								)}

								{activeView === "settings" && (
									<CmsSettingsAndSeoView
										settings={generalPayload}
										onSaveSettings={async (next) => {
											await updateGeneral.mutateAsync(next);
										}}
										seo={seoPayload}
										pages={pages}
										posts={posts}
										onSaveSeo={async (next) => {
											await updateSeo.mutateAsync(next);
										}}
										isSaving={updateGeneral.isPending || updateSeo.isPending}
										user={{
											name: session.data?.user.name,
											email: session.data?.user.email,
										}}
										apiStatus={
											privateData.data?.message ??
											(privateData.isPending ? "Connecting..." : "Connected")
										}
									/>
								)}
							</>
						)}
					</div>
				</div>
			</SidebarInset>

			<ConfirmDeleteDialog
				target={deleteTarget}
				onClose={() => setDeleteTarget(null)}
				isDeleting={
					deletePage.isPending ||
					deleteSection.isPending ||
					deletePost.isPending ||
					deleteMedia.isPending ||
					deleteMenu.isPending
				}
			/>

			<ConfirmLeaveDialog
				open={!!pendingLeaveAction}
				onStay={() => setPendingLeaveAction(null)}
				onLeave={() => {
					const action = pendingLeaveAction;
					setPendingLeaveAction(null);
					setIsEditorDirty(false);
					action?.();
				}}
			/>
		</SidebarProvider>
	);
}

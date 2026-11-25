import { Input } from "@selimsolutions/ui/components/input";
import { Separator } from "@selimsolutions/ui/components/separator";
import {
	SidebarInset,
	SidebarProvider,
	SidebarTrigger,
} from "@selimsolutions/ui/components/sidebar";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { AppSidebar } from "@/components/dashboard/app-sidebar";
import {
	CmsAppearanceView,
	CmsMenusView,
} from "@/components/dashboard/cms-appearance-menus";
import { CmsContentManager } from "@/components/dashboard/cms-content-manager";
import {
	type CmsAppearance,
	type CmsGeneralSettings,
	type CmsMediaItem,
	type CmsMenuItem,
	type CmsPage,
	type CmsPost,
	type CmsSeoConfig,
	type CmsView,
	INITIAL_APPEARANCE,
	INITIAL_MEDIA,
	INITIAL_MENUS,
	INITIAL_PAGES,
	INITIAL_POSTS,
	INITIAL_SEO,
	INITIAL_SETTINGS,
	type MenuLocation,
} from "@/components/dashboard/cms-data";
import { CmsMedia } from "@/components/dashboard/cms-media";
import { CmsOverview } from "@/components/dashboard/cms-overview";
import { CmsSettingsAndSeoView } from "@/components/dashboard/cms-seo-settings";
import { ModeToggle } from "@/components/mode-toggle";
import { authClient } from "@/lib/auth-client";
import { orpc } from "@/utils/orpc";

export const Route = createFileRoute("/_auth/dashboard")({
	component: RouteComponent,
});

const VIEW_META: Record<CmsView, { title: string; subtitle: string }> = {
	overview: {
		title: "Dashboard",
		subtitle: "Site overview, quick drafts, and recent updates.",
	},
	pages: {
		title: "Pages",
		subtitle: "Create, edit, and organize static site pages.",
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
		subtitle: "Customize brand accent, theme, and layout.",
	},
	menus: {
		title: "Menus",
		subtitle: "Configure header and footer navigation links.",
	},
	settings: {
		title: "Settings & SEO",
		subtitle: "Site configuration, search metadata, and SEO audit.",
	},
};

function RouteComponent() {
	const { session } = Route.useRouteContext();
	const navigate = useNavigate();
	const searchRef = useRef<HTMLInputElement>(null);

	const [activeView, setActiveView] = useState<CmsView>("overview");
	const [searchQuery, setSearchQuery] = useState("");

	const [pages, setPages] = useState<CmsPage[]>(INITIAL_PAGES);
	const [posts, setPosts] = useState<CmsPost[]>(INITIAL_POSTS);
	const [media, setMedia] = useState<CmsMediaItem[]>(INITIAL_MEDIA);
	const [menus, setMenus] =
		useState<Record<MenuLocation, CmsMenuItem[]>>(INITIAL_MENUS);
	const [appearance, setAppearance] =
		useState<CmsAppearance>(INITIAL_APPEARANCE);
	const [seo, setSeo] = useState<CmsSeoConfig>(INITIAL_SEO);
	const [settings, setSettings] =
		useState<CmsGeneralSettings>(INITIAL_SETTINGS);

	const privateData = useQuery(orpc.privateData.queryOptions());

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

	const allEntries = [...pages, ...posts];
	const seoIssues = allEntries.filter(
		(e) => !e.seo.metaTitle.trim() || e.seo.metaDescription.trim().length < 30,
	).length;
	const seoScore = Math.max(
		0,
		Math.round(
			((allEntries.length - seoIssues) / Math.max(allEntries.length, 1)) * 100,
		),
	);

	const handleQuickDraft = (title: string, excerpt: string) => {
		const slug = title
			.toLowerCase()
			.trim()
			.replace(/[^a-z0-9\s-]/g, "")
			.replace(/\s+/g, "-");
		setPosts((prev) => [
			{
				id: `pst-${Date.now()}`,
				title,
				slug,
				category: "Security",
				excerpt,
				content: excerpt,
				status: "draft",
				author: session.data?.user.name || "CMS Editor",
				updatedAt: "Just now",
				seo: { metaTitle: title, metaDescription: excerpt },
			},
			...prev,
		]);
	};

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

	return (
		<SidebarProvider defaultOpen>
			<AppSidebar
				activeView={activeView}
				onSelectView={(view) => {
					setActiveView(view);
					setSearchQuery("");
				}}
				counts={{
					pages: pages.length,
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
							{settings.siteName}
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

						{activeView === "overview" && (
							<CmsOverview
								pages={pages}
								posts={posts}
								media={media}
								seoScore={seoScore}
								onNavigate={setActiveView}
								onCreateQuickDraft={handleQuickDraft}
							/>
						)}

						{activeView === "pages" && (
							<CmsContentManager
								mode="page"
								items={pages}
								searchQuery={searchQuery}
								siteBaseUrl={settings.siteUrl}
								onCreate={(item) => {
									setPages((prev) => [item as CmsPage, ...prev]);
									toast.success("Page created.");
								}}
								onUpdate={(item) => {
									setPages((prev) =>
										prev.map((p) => (p.id === item.id ? (item as CmsPage) : p)),
									);
									toast.success("Page updated.");
								}}
								onDuplicate={(id) => {
									const target = pages.find((p) => p.id === id);
									if (!target) return;
									setPages((prev) => [
										{
											...target,
											id: `pg-${Date.now()}`,
											title: `${target.title} (Copy)`,
											slug: `${target.slug}-copy`,
											status: "draft",
											updatedAt: "Just now",
										},
										...prev,
									]);
									toast.success("Page duplicated.");
								}}
								onDelete={(id) => {
									setPages((prev) => prev.filter((p) => p.id !== id));
									toast.success("Page deleted.");
								}}
							/>
						)}

						{activeView === "posts" && (
							<CmsContentManager
								mode="post"
								items={posts}
								searchQuery={searchQuery}
								siteBaseUrl={settings.siteUrl}
								onCreate={(item) => {
									setPosts((prev) => [item as CmsPost, ...prev]);
									toast.success("Post created.");
								}}
								onUpdate={(item) => {
									setPosts((prev) =>
										prev.map((p) => (p.id === item.id ? (item as CmsPost) : p)),
									);
									toast.success("Post updated.");
								}}
								onDuplicate={(id) => {
									const target = posts.find((p) => p.id === id);
									if (!target) return;
									setPosts((prev) => [
										{
											...target,
											id: `pst-${Date.now()}`,
											title: `${target.title} (Copy)`,
											slug: `${target.slug}-copy`,
											status: "draft",
											updatedAt: "Just now",
										},
										...prev,
									]);
									toast.success("Post duplicated.");
								}}
								onDelete={(id) => {
									setPosts((prev) => prev.filter((p) => p.id !== id));
									toast.success("Post deleted.");
								}}
							/>
						)}

						{activeView === "media" && (
							<CmsMedia
								media={media}
								searchQuery={searchQuery}
								onAddMedia={(item) => setMedia((prev) => [item, ...prev])}
								onDeleteMedia={(id) => {
									setMedia((prev) => prev.filter((m) => m.id !== id));
									toast.success("Media asset deleted.");
								}}
							/>
						)}

						{activeView === "appearance" && (
							<CmsAppearanceView
								appearance={appearance}
								onSave={setAppearance}
							/>
						)}

						{activeView === "menus" && (
							<CmsMenusView menus={menus} onUpdateMenus={setMenus} />
						)}

						{activeView === "settings" && (
							<CmsSettingsAndSeoView
								settings={settings}
								onSaveSettings={setSettings}
								seo={seo}
								pages={pages}
								posts={posts}
								onSaveSeo={setSeo}
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
					</div>
				</div>
			</SidebarInset>
		</SidebarProvider>
	);
}

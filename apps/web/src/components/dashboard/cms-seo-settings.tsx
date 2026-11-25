import { Badge } from "@selimsolutions/ui/components/badge";
import { Button } from "@selimsolutions/ui/components/button";
import { Checkbox } from "@selimsolutions/ui/components/checkbox";
import { Input } from "@selimsolutions/ui/components/input";
import { Label } from "@selimsolutions/ui/components/label";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@selimsolutions/ui/components/tabs";
import { AlertTriangle, CheckCircle2, Save } from "lucide-react";
import { useEffect, useState } from "react";

import type { ApiPage, ApiPost } from "./cms-content-manager";

export type SeoSettingsPayload = {
	titleSeparator: string;
	siteTitle: string;
	defaultDescription: string;
	canonicalBase: string;
	robotsIndex: boolean;
	sitemapEnabled: boolean;
	structuredData: boolean;
	ogTitle: string;
	ogDescription: string;
};

export type GeneralSettingsPayload = {
	siteName: string;
	tagline: string;
	siteUrl: string;
	adminEmail: string;
	permalinkStyle: string;
	contactEmail: string;
	contactPhone: string;
	contactAddress: string;
	isoBadgeText: string;
	copyrightText: string;
};

interface CmsSettingsAndSeoViewProps {
	settings: GeneralSettingsPayload;
	onSaveSettings: (next: GeneralSettingsPayload) => Promise<void>;
	seo: SeoSettingsPayload;
	pages: ApiPage[];
	posts: ApiPost[];
	onSaveSeo: (next: SeoSettingsPayload) => Promise<void>;
	isSaving: boolean;
	user: { name?: string | null; email?: string | null };
	apiStatus: string;
}

export function CmsSettingsAndSeoView({
	settings,
	onSaveSettings,
	seo,
	pages,
	posts,
	onSaveSeo,
	isSaving,
	user,
	apiStatus,
}: CmsSettingsAndSeoViewProps) {
	const seoIssues = [...pages, ...posts].filter(
		(e) => !e.seoTitle.trim() || e.seoDesc.trim().length < 30,
	).length;

	return (
		<Tabs defaultValue="seo" className="gap-4">
			<TabsList className="rounded-lg">
				<TabsTrigger value="seo" className="rounded-md px-3 text-xs">
					<span>SEO &amp; Audit</span>
					{seoIssues > 0 && (
						<Badge
							variant="outline"
							className="ml-1 rounded border-amber-500/30 bg-amber-500/10 px-1 py-0 text-[10px] text-amber-500 tabular-nums"
						>
							{seoIssues}
						</Badge>
					)}
				</TabsTrigger>
				<TabsTrigger value="general" className="rounded-md px-3 text-xs">
					General &amp; Contact
				</TabsTrigger>
			</TabsList>

			<TabsContent value="seo">
				<CmsSeoView
					seo={seo}
					pages={pages}
					posts={posts}
					isSaving={isSaving}
					onSaveSeo={onSaveSeo}
				/>
			</TabsContent>

			<TabsContent value="general">
				<CmsSettingsView
					settings={settings}
					isSaving={isSaving}
					onSaveSettings={onSaveSettings}
					user={user}
					apiStatus={apiStatus}
				/>
			</TabsContent>
		</Tabs>
	);
}

function CmsSeoView({
	seo,
	pages,
	posts,
	isSaving,
	onSaveSeo,
}: {
	seo: SeoSettingsPayload;
	pages: ApiPage[];
	posts: ApiPost[];
	isSaving: boolean;
	onSaveSeo: (next: SeoSettingsPayload) => Promise<void>;
}) {
	const [draft, setDraft] = useState<SeoSettingsPayload>(seo);

	useEffect(() => {
		setDraft(seo);
	}, [seo]);

	const allEntries = [
		...pages.map((p) => ({ kind: "Page", ...p })),
		...posts.map((p) => ({ kind: "Post", ...p })),
	];

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await onSaveSeo(draft);
	};

	return (
		<div className="flex flex-col gap-5">
			<form onSubmit={handleSubmit} className="grid gap-4 lg:grid-cols-12">
				<div className="space-y-4 rounded-xl border border-border/80 bg-card p-4 lg:col-span-7">
					<div className="grid gap-3 sm:grid-cols-3">
						<div className="space-y-1.5 sm:col-span-2">
							<Label htmlFor="seo-site-title" className="text-xs">
								Site Title
							</Label>
							<Input
								id="seo-site-title"
								value={draft.siteTitle}
								onChange={(e) =>
									setDraft({ ...draft, siteTitle: e.target.value })
								}
								className="h-9 rounded-lg text-xs"
							/>
						</div>
						<div className="space-y-1.5">
							<Label htmlFor="seo-sep" className="text-xs">
								Separator
							</Label>
							<Input
								id="seo-sep"
								value={draft.titleSeparator}
								onChange={(e) =>
									setDraft({ ...draft, titleSeparator: e.target.value })
								}
								className="h-9 rounded-lg text-center text-xs"
							/>
						</div>
					</div>

					<div className="space-y-1.5">
						<div className="flex items-center justify-between">
							<Label htmlFor="seo-default-desc" className="text-xs">
								Default Meta Description
							</Label>
							<span className="text-[11px] text-muted-foreground tabular-nums">
								{draft.defaultDescription.length}/160
							</span>
						</div>
						<textarea
							id="seo-default-desc"
							rows={3}
							value={draft.defaultDescription}
							onChange={(e) =>
								setDraft({ ...draft, defaultDescription: e.target.value })
							}
							className="w-full resize-none rounded-lg border border-input bg-transparent px-3 py-2 text-foreground text-xs focus-visible:border-ring focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring/50"
						/>
					</div>

					<div className="space-y-1.5">
						<Label htmlFor="seo-canonical" className="text-xs">
							Canonical Base URL
						</Label>
						<Input
							id="seo-canonical"
							value={draft.canonicalBase}
							onChange={(e) =>
								setDraft({ ...draft, canonicalBase: e.target.value })
							}
							className="h-9 rounded-lg font-mono text-xs"
						/>
					</div>

					<div className="flex flex-wrap gap-4 border-border/60 border-t pt-3">
						<div className="flex items-center gap-2">
							<Checkbox
								id="seo-robots-index"
								checked={draft.robotsIndex}
								onCheckedChange={(c) =>
									setDraft({ ...draft, robotsIndex: !!c })
								}
							/>
							<Label
								htmlFor="seo-robots-index"
								className="cursor-pointer font-normal text-xs"
							>
								Allow search indexing
							</Label>
						</div>
						<div className="flex items-center gap-2">
							<Checkbox
								id="seo-sitemap-enabled"
								checked={draft.sitemapEnabled}
								onCheckedChange={(c) =>
									setDraft({ ...draft, sitemapEnabled: !!c })
								}
							/>
							<Label
								htmlFor="seo-sitemap-enabled"
								className="cursor-pointer font-normal text-xs"
							>
								XML Sitemap
							</Label>
						</div>
						<div className="flex items-center gap-2">
							<Checkbox
								id="seo-structured-data"
								checked={draft.structuredData}
								onCheckedChange={(c) =>
									setDraft({ ...draft, structuredData: !!c })
								}
							/>
							<Label
								htmlFor="seo-structured-data"
								className="cursor-pointer font-normal text-xs"
							>
								JSON-LD Schema
							</Label>
						</div>
					</div>

					<Button
						type="submit"
						size="sm"
						disabled={isSaving}
						className="rounded-lg active:scale-[0.97]"
					>
						<Save className="size-3.5" />
						<span>Save SEO Settings</span>
					</Button>
				</div>

				<div className="space-y-3 rounded-xl border border-border/80 bg-card p-4 lg:col-span-5">
					<div className="font-semibold text-muted-foreground text-xs uppercase tracking-wider">
						Search Snippet Preview
					</div>
					<div className="rounded-lg border border-border/70 bg-background/60 p-3">
						<div className="truncate text-[11px] text-emerald-500">
							{draft.canonicalBase}
						</div>
						<div className="mt-0.5 truncate font-medium text-primary text-sm">
							{draft.siteTitle} {draft.titleSeparator} Managed SOC &amp; Cloud
							Security
						</div>
						<p className="mt-1 line-clamp-2 text-muted-foreground text-xs">
							{draft.defaultDescription}
						</p>
					</div>

					<div className="space-y-2 border-border/60 border-t pt-3">
						<Label htmlFor="og-title" className="text-xs">
							Open Graph Title
						</Label>
						<Input
							id="og-title"
							value={draft.ogTitle}
							onChange={(e) => setDraft({ ...draft, ogTitle: e.target.value })}
							className="h-8 rounded-lg text-xs"
						/>
					</div>
				</div>
			</form>

			<div className="rounded-xl border border-border/80 bg-card p-4">
				<div className="mb-3 flex items-center justify-between">
					<h2 className="font-semibold text-foreground text-sm">
						Content SEO Audit
					</h2>
					<span className="text-muted-foreground text-xs tabular-nums">
						{allEntries.length} entries checked
					</span>
				</div>
				<div className="divide-y divide-border/70">
					{allEntries.map((entry) => {
						const hasTitle = entry.seoTitle.trim().length > 0;
						const hasDesc = entry.seoDesc.trim().length >= 30;
						const healthy = hasTitle && hasDesc;
						return (
							<div
								key={entry.id}
								className="flex flex-wrap items-center justify-between gap-2 py-2.5 first:pt-1 last:pb-1"
							>
								<div className="min-w-0">
									<div className="flex items-center gap-2">
										<Badge
											variant="outline"
											className="rounded px-1.5 py-0 text-[10px]"
										>
											{entry.kind}
										</Badge>
										<span className="truncate font-medium text-foreground text-xs">
											{entry.title}
										</span>
									</div>
									<div className="mt-0.5 font-mono text-[11px] text-muted-foreground">
										{entry.slug}
									</div>
								</div>

								{healthy ? (
									<span className="inline-flex items-center gap-1 font-medium text-[11px] text-emerald-500">
										<CheckCircle2 className="size-3.5" />
										<span>Optimized</span>
									</span>
								) : (
									<span className="inline-flex items-center gap-1 font-medium text-[11px] text-amber-500">
										<AlertTriangle className="size-3.5" />
										<span>Missing meta description</span>
									</span>
								)}
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
}

function CmsSettingsView({
	settings,
	isSaving,
	onSaveSettings,
	user,
	apiStatus,
}: {
	settings: GeneralSettingsPayload;
	isSaving: boolean;
	onSaveSettings: (next: GeneralSettingsPayload) => Promise<void>;
	user: { name?: string | null; email?: string | null };
	apiStatus: string;
}) {
	const [draft, setDraft] = useState<GeneralSettingsPayload>(settings);

	useEffect(() => {
		setDraft(settings);
	}, [settings]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await onSaveSettings(draft);
	};

	return (
		<div className="grid gap-4 lg:grid-cols-12">
			<form
				onSubmit={handleSubmit}
				className="space-y-4 rounded-xl border border-border/80 bg-card p-4 lg:col-span-7"
			>
				<div className="grid gap-3 sm:grid-cols-2">
					<div className="space-y-1.5">
						<Label htmlFor="site-name" className="text-xs">
							Site Name
						</Label>
						<Input
							id="site-name"
							value={draft.siteName}
							onChange={(e) => setDraft({ ...draft, siteName: e.target.value })}
							className="h-9 rounded-lg text-xs"
						/>
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="admin-email" className="text-xs">
							Admin Email
						</Label>
						<Input
							id="admin-email"
							type="email"
							value={draft.adminEmail}
							onChange={(e) =>
								setDraft({ ...draft, adminEmail: e.target.value })
							}
							className="h-9 rounded-lg text-xs"
						/>
					</div>
				</div>

				<div className="space-y-1.5">
					<Label htmlFor="site-tagline" className="text-xs">
						Tagline
					</Label>
					<Input
						id="site-tagline"
						value={draft.tagline}
						onChange={(e) => setDraft({ ...draft, tagline: e.target.value })}
						className="h-9 rounded-lg text-xs"
					/>
				</div>

				<div className="grid gap-3 sm:grid-cols-2">
					<div className="space-y-1.5">
						<Label htmlFor="site-url" className="text-xs">
							Site URL
						</Label>
						<Input
							id="site-url"
							value={draft.siteUrl}
							onChange={(e) => setDraft({ ...draft, siteUrl: e.target.value })}
							className="h-9 rounded-lg font-mono text-xs"
						/>
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="permalink" className="text-xs">
							Permalink Format
						</Label>
						<select
							id="permalink"
							value={draft.permalinkStyle}
							onChange={(e) =>
								setDraft({ ...draft, permalinkStyle: e.target.value })
							}
							className="h-9 w-full rounded-lg border border-input bg-background px-2.5 font-mono text-foreground text-xs"
						>
							<option value="/blog/:slug">/blog/:slug</option>
							<option value="/:year/:slug">/:year/:slug</option>
							<option value="/:slug">/:slug</option>
						</select>
					</div>
				</div>

				<div className="grid gap-3 border-border/60 border-t pt-3 sm:grid-cols-2">
					<div className="space-y-1.5">
						<Label htmlFor="contact-email" className="text-xs">
							Footer Contact Email
						</Label>
						<Input
							id="contact-email"
							value={draft.contactEmail}
							onChange={(e) =>
								setDraft({ ...draft, contactEmail: e.target.value })
							}
							className="h-8 rounded-lg text-xs"
						/>
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="contact-phone" className="text-xs">
							Footer Phone
						</Label>
						<Input
							id="contact-phone"
							value={draft.contactPhone}
							onChange={(e) =>
								setDraft({ ...draft, contactPhone: e.target.value })
							}
							className="h-8 rounded-lg text-xs"
						/>
					</div>
				</div>

				<div className="grid gap-3 sm:grid-cols-2">
					<div className="space-y-1.5">
						<Label htmlFor="iso-badge" className="text-xs">
							ISO Badge Text
						</Label>
						<Input
							id="iso-badge"
							value={draft.isoBadgeText}
							onChange={(e) =>
								setDraft({ ...draft, isoBadgeText: e.target.value })
							}
							className="h-8 rounded-lg text-xs"
						/>
					</div>
					<div className="space-y-1.5">
						<Label htmlFor="copyright" className="text-xs">
							Copyright Text
						</Label>
						<Input
							id="copyright"
							value={draft.copyrightText}
							onChange={(e) =>
								setDraft({ ...draft, copyrightText: e.target.value })
							}
							className="h-8 rounded-lg text-xs"
						/>
					</div>
				</div>

				<Button
					type="submit"
					size="sm"
					disabled={isSaving}
					className="rounded-lg active:scale-[0.97]"
				>
					<Save className="size-3.5" />
					<span>Save Settings</span>
				</Button>
			</form>

			<div className="space-y-3 rounded-xl border border-border/80 bg-card p-4 lg:col-span-5">
				<div className="font-semibold text-muted-foreground text-xs uppercase tracking-wider">
					Session &amp; API
				</div>
				<div className="rounded-lg border border-border/60 bg-background/50 p-3 text-xs">
					<div className="text-muted-foreground">Operator</div>
					<div className="mt-0.5 font-medium text-foreground">
						{user.name || "CMS Editor"} ({user.email || "—"})
					</div>
				</div>
				<div className="rounded-lg border border-border/60 bg-background/50 p-3 text-xs">
					<div className="text-muted-foreground">oRPC Connection</div>
					<div className="mt-0.5 font-mono text-foreground">{apiStatus}</div>
				</div>
			</div>
		</div>
	);
}

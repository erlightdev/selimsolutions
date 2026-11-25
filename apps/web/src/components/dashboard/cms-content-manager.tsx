import { Badge } from "@selimsolutions/ui/components/badge";
import { Button } from "@selimsolutions/ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@selimsolutions/ui/components/card";
import { Checkbox } from "@selimsolutions/ui/components/checkbox";
import { Input } from "@selimsolutions/ui/components/input";
import { Label } from "@selimsolutions/ui/components/label";
import { Separator } from "@selimsolutions/ui/components/separator";
import {
	ArrowLeft,
	Copy,
	Edit3,
	Layers,
	Plus,
	Save,
	Trash2,
} from "lucide-react";
import { useState } from "react";

import { TiptapEditor } from "./tiptap-editor";

export type ApiPageSection = {
	id: string;
	pageId: string;
	type: string;
	title: string;
	subtitle: string | null;
	contentHtml: string | null;
	sortOrder: number;
	isVisible: boolean;
};

export type ApiPage = {
	id: string;
	title: string;
	slug: string;
	template: "LANDING" | "STANDARD" | "SERVICE" | "SOLUTION" | "LEGAL";
	status: "DRAFT" | "PUBLISHED";
	isSystem: boolean;
	contentHtml: string;
	seoTitle: string;
	seoDesc: string;
	canonicalUrl?: string | null;
	ogImageUrl?: string | null;
	noIndex: boolean;
	updatedAt: string | Date;
	sections: ApiPageSection[];
};

export type ApiCategory = {
	id: string;
	name: string;
	slug: string;
};

export type ApiPost = {
	id: string;
	title: string;
	slug: string;
	excerpt: string;
	contentHtml: string;
	coverImage: string | null;
	readTime: string;
	featured: boolean;
	status: "DRAFT" | "PUBLISHED";
	categoryId: string | null;
	category: ApiCategory | null;
	seoTitle: string;
	seoDesc: string;
	canonicalUrl?: string | null;
	ogImageUrl?: string | null;
	noIndex: boolean;
	updatedAt: string | Date;
};

interface CmsPagesManagerProps {
	pages: ApiPage[];
	searchQuery: string;
	siteBaseUrl: string;
	isSaving: boolean;
	defaultTemplate?: ApiPage["template"];
	entityLabel?: string;
	onCreate: (payload: {
		title: string;
		slug: string;
		template: ApiPage["template"];
		status: ApiPage["status"];
		contentHtml: string;
		seoTitle: string;
		seoDesc: string;
		canonicalUrl?: string | null;
		ogImageUrl?: string | null;
		noIndex: boolean;
	}) => Promise<void>;
	onUpdate: (payload: {
		id: string;
		title: string;
		slug: string;
		template: ApiPage["template"];
		status: ApiPage["status"];
		contentHtml: string;
		seoTitle: string;
		seoDesc: string;
		canonicalUrl?: string | null;
		ogImageUrl?: string | null;
		noIndex: boolean;
	}) => Promise<void>;
	onDuplicate: (id: string) => void;
	onDelete: (id: string) => void;
	onUpsertSection: (payload: {
		id?: string;
		pageId: string;
		type: string;
		title: string;
		subtitle?: string | null;
		sortOrder: number;
		isVisible: boolean;
	}) => Promise<void>;
	onDeleteSection: (id: string) => void;
}

interface CmsPostsManagerProps {
	posts: ApiPost[];
	categories: ApiCategory[];
	searchQuery: string;
	siteBaseUrl: string;
	isSaving: boolean;
	onCreate: (payload: {
		title: string;
		slug: string;
		excerpt: string;
		contentHtml: string;
		coverImage?: string | null;
		readTime: string;
		featured: boolean;
		status: ApiPost["status"];
		categoryId?: string | null;
		seoTitle: string;
		seoDesc: string;
		noIndex: boolean;
	}) => Promise<void>;
	onUpdate: (payload: {
		id: string;
		title: string;
		slug: string;
		excerpt: string;
		contentHtml: string;
		coverImage?: string | null;
		readTime: string;
		featured: boolean;
		status: ApiPost["status"];
		categoryId?: string | null;
		seoTitle: string;
		seoDesc: string;
		noIndex: boolean;
	}) => Promise<void>;
	onDuplicate: (id: string) => void;
	onDelete: (id: string) => void;
}

function slugify(value: string) {
	return value
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9\s-]/g, "")
		.replace(/\s+/g, "-");
}

function formatDate(val: string | Date) {
	const d = typeof val === "string" ? new Date(val) : val;
	if (Number.isNaN(d.getTime())) return "Recently";
	return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export function CmsPagesManager({
	pages,
	searchQuery,
	siteBaseUrl,
	isSaving,
	defaultTemplate = "STANDARD",
	entityLabel = "Page",
	onCreate,
	onUpdate,
	onDuplicate,
	onDelete,
	onUpsertSection,
	onDeleteSection,
}: CmsPagesManagerProps) {
	const [statusFilter, setStatusFilter] = useState<
		"all" | "PUBLISHED" | "DRAFT"
	>("all");
	const [editing, setEditing] = useState<ApiPage | null>(null);
	const [isNew, setIsNew] = useState(false);

	const [newSecType, setNewSecType] = useState("RICH_TEXT");
	const [newSecTitle, setNewSecTitle] = useState("");
	const [newSecSubtitle, setNewSecSubtitle] = useState("");

	const filtered = pages.filter((item) => {
		const matchesStatus =
			statusFilter === "all" || item.status === statusFilter;
		const q = searchQuery.trim().toLowerCase();
		const matchesQuery =
			!q ||
			item.title.toLowerCase().includes(q) ||
			item.slug.toLowerCase().includes(q);
		return matchesStatus && matchesQuery;
	});

	const startNew = () => {
		setIsNew(true);
		const prefix =
			defaultTemplate === "SERVICE"
				? "/services/"
				: defaultTemplate === "SOLUTION"
					? "/solutions/"
					: "/";
		setEditing({
			id: "",
			title: "",
			slug: prefix,
			template: defaultTemplate,
			status: "DRAFT",
			isSystem: false,
			contentHtml: "",
			seoTitle: "",
			seoDesc: "",
			noIndex: false,
			updatedAt: new Date(),
			sections: [],
		});
	};

	const handleSave = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!editing?.title.trim()) return;
		const normalizedSlug = editing.slug.trim() || `/${slugify(editing.title)}`;
		const payload = {
			title: editing.title.trim(),
			slug: normalizedSlug.startsWith("/")
				? normalizedSlug
				: `/${normalizedSlug}`,
			template: editing.template,
			status: editing.status,
			contentHtml: editing.contentHtml,
			seoTitle: editing.seoTitle,
			seoDesc: editing.seoDesc,
			canonicalUrl: editing.canonicalUrl,
			ogImageUrl: editing.ogImageUrl,
			noIndex: editing.noIndex,
		};
		if (isNew) {
			await onCreate(payload);
		} else {
			await onUpdate({ id: editing.id, ...payload });
		}
		setEditing(null);
	};

	const liveEditing = editing
		? (pages.find((p) => p.id === editing.id) ?? editing)
		: null;

	if (editing && liveEditing) {
		const seoTitle = editing.seoTitle || editing.title || "Untitled";
		const seoDesc =
			editing.seoDesc ||
			"Add a meta description to control how this page appears in search results.";
		const previewUrl = `${siteBaseUrl}${editing.slug.startsWith("/") ? editing.slug : `/${editing.slug}`}`;

		return (
			<form onSubmit={handleSave} className="flex flex-col gap-4">
				<div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/80 bg-card px-4 py-3">
					<Button
						type="button"
						variant="ghost"
						size="sm"
						onClick={() => setEditing(null)}
						className="rounded-lg active:scale-[0.97]"
					>
						<ArrowLeft className="size-3.5" />
						<span>Back to Pages</span>
					</Button>

					<div className="flex items-center gap-2">
						<select
							value={editing.status}
							onChange={(e) =>
								setEditing({
									...editing,
									status: e.target.value as ApiPage["status"],
								})
							}
							className="h-8 rounded-lg border border-input bg-background px-2.5 font-medium text-foreground text-xs"
						>
							<option value="DRAFT">Draft</option>
							<option value="PUBLISHED">Published</option>
						</select>

						<Button
							type="submit"
							size="sm"
							disabled={isSaving}
							className="h-8 rounded-lg px-3 active:scale-[0.97]"
						>
							<Save className="size-3.5" />
							<span>{isNew ? "Create" : "Save"}</span>
						</Button>
					</div>
				</div>

				<div className="grid gap-4 lg:grid-cols-12">
					<div className="space-y-4 rounded-xl border border-border/80 bg-card p-4 lg:col-span-8">
						<div className="grid gap-3 sm:grid-cols-2">
							<div className="space-y-1.5">
								<Label htmlFor="pg-title" className="text-xs">
									Title
								</Label>
								<Input
									id="pg-title"
									required
									value={editing.title}
									onChange={(e) => {
										const title = e.target.value;
										setEditing({
											...editing,
											title,
											slug:
												isNew && (!editing.slug || editing.slug === "/")
													? `/${slugify(title)}`
													: editing.slug,
										});
									}}
									className="h-9 rounded-lg text-xs"
								/>
							</div>

							<div className="space-y-1.5">
								<Label htmlFor="pg-slug" className="text-xs">
									Slug
								</Label>
								<Input
									id="pg-slug"
									disabled={editing.isSystem}
									value={editing.slug}
									onChange={(e) =>
										setEditing({ ...editing, slug: e.target.value })
									}
									className="h-9 rounded-lg font-mono text-xs"
								/>
							</div>
						</div>

						<div className="space-y-1.5">
							<Label htmlFor="pg-template" className="text-xs">
								Template
							</Label>
							<select
								id="pg-template"
								value={editing.template}
								onChange={(e) =>
									setEditing({
										...editing,
										template: e.target.value as ApiPage["template"],
									})
								}
								className="h-9 w-full rounded-lg border border-input bg-background px-2.5 text-foreground text-xs"
							>
								<option value="LANDING">Landing</option>
								<option value="STANDARD">Standard</option>
								<option value="SERVICE">Service</option>
								<option value="SOLUTION">Solution</option>
								<option value="LEGAL">Legal</option>
							</select>
						</div>

						<div className="space-y-1.5">
							<Label className="text-xs">Body</Label>
							<TiptapEditor
								value={editing.contentHtml}
								onChange={(html) =>
									setEditing({ ...editing, contentHtml: html })
								}
							/>
						</div>

						{/* Page Sections Builder (available after page is created) */}
						{!isNew && (
							<div className="space-y-3 border-border/70 border-t pt-4">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2 font-semibold text-foreground text-xs">
										<Layers className="size-3.5 text-primary" />
										<span>Page Sections ({liveEditing.sections.length})</span>
									</div>
								</div>

								<div className="divide-y divide-border/70 rounded-lg border border-border/70 bg-background/50">
									{liveEditing.sections.length === 0 ? (
										<div className="px-3 py-4 text-center text-muted-foreground text-xs">
											No sections yet. Add a section block below.
										</div>
									) : (
										liveEditing.sections.map((sec) => (
											<div
												key={sec.id}
												className="flex flex-wrap items-center justify-between gap-2 px-3 py-2"
											>
												<div className="min-w-0">
													<div className="flex items-center gap-2">
														<Badge
															variant="outline"
															className="rounded px-1.5 py-0 font-mono text-[10px]"
														>
															{sec.type}
														</Badge>
														<span className="truncate font-medium text-foreground text-xs">
															{sec.title}
														</span>
													</div>
													{sec.subtitle && (
														<div className="mt-0.5 truncate text-[11px] text-muted-foreground">
															{sec.subtitle}
														</div>
													)}
												</div>
												<Button
													type="button"
													variant="ghost"
													size="icon-xs"
													onClick={() => onDeleteSection(sec.id)}
													className="rounded-md text-muted-foreground hover:text-destructive"
												>
													<Trash2 className="size-3" />
												</Button>
											</div>
										))
									)}
								</div>

								<div className="flex flex-wrap items-center gap-2">
									<select
										value={newSecType}
										onChange={(e) => setNewSecType(e.target.value)}
										className="h-8 rounded-lg border border-input bg-background px-2 text-xs"
									>
										<option value="HERO">Hero</option>
										<option value="FEATURE_SHOWCASE">Feature Showcase</option>
										<option value="SERVICES_TABS">Services Tabs</option>
										<option value="TESTIMONIALS">Testimonials</option>
										<option value="FAQ">FAQ</option>
										<option value="RICH_TEXT">Rich Text</option>
										<option value="CTA">CTA</option>
									</select>
									<Input
										value={newSecTitle}
										onChange={(e) => setNewSecTitle(e.target.value)}
										placeholder="Section title"
										className="h-8 min-w-36 flex-1 rounded-lg text-xs"
									/>
									<Input
										value={newSecSubtitle}
										onChange={(e) => setNewSecSubtitle(e.target.value)}
										placeholder="Subtitle (optional)"
										className="h-8 min-w-36 flex-1 rounded-lg text-xs"
									/>
									<Button
										type="button"
										size="xs"
										variant="outline"
										onClick={async () => {
											if (!newSecTitle.trim()) return;
											await onUpsertSection({
												pageId: liveEditing.id,
												type: newSecType,
												title: newSecTitle.trim(),
												subtitle: newSecSubtitle.trim() || null,
												sortOrder: liveEditing.sections.length,
												isVisible: true,
											});
											setNewSecTitle("");
											setNewSecSubtitle("");
										}}
										className="h-8 rounded-lg px-2.5 active:scale-[0.97]"
									>
										<Plus className="size-3.5" />
										<span>Add</span>
									</Button>
								</div>
							</div>
						)}
					</div>

					{/* SEO Sidebar */}
					<Card className="h-fit rounded-xl border-border/80 lg:col-span-4">
						<CardHeader className="pb-3">
							<div className="flex items-center justify-between gap-2">
								<CardTitle className="text-sm">Search &amp; SEO</CardTitle>
								<Badge
									variant="outline"
									className={
										editing.seoTitle.trim() &&
										editing.seoDesc.trim().length >= 30
											? "border-emerald-500/30 bg-emerald-500/10 text-emerald-500"
											: "border-amber-500/30 bg-amber-500/10 text-amber-500"
									}
								>
									{editing.seoTitle.trim() &&
									editing.seoDesc.trim().length >= 30
										? "Optimized"
										: "Incomplete"}
								</Badge>
							</div>
							<CardDescription className="text-xs">
								Per-page metadata and search preview.
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							<div className="space-y-1.5">
								<div className="flex items-center justify-between">
									<Label htmlFor="pg-seo-title" className="text-xs">
										Meta Title
									</Label>
									<span className="text-[11px] text-muted-foreground tabular-nums">
										{seoTitle.length}/60
									</span>
								</div>
								<Input
									id="pg-seo-title"
									value={editing.seoTitle}
									onChange={(e) =>
										setEditing({ ...editing, seoTitle: e.target.value })
									}
									className="h-9 rounded-lg text-xs"
								/>
							</div>

							<div className="space-y-1.5">
								<div className="flex items-center justify-between">
									<Label htmlFor="pg-seo-desc" className="text-xs">
										Meta Description
									</Label>
									<span className="text-[11px] text-muted-foreground tabular-nums">
										{editing.seoDesc.length}/160
									</span>
								</div>
								<textarea
									id="pg-seo-desc"
									rows={3}
									value={editing.seoDesc}
									onChange={(e) =>
										setEditing({ ...editing, seoDesc: e.target.value })
									}
									className="w-full resize-none rounded-lg border border-input bg-transparent px-3 py-2 text-foreground text-xs focus-visible:border-ring focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring/50"
								/>
							</div>

							<div className="space-y-1.5">
								<Label htmlFor="pg-canonical" className="text-xs">
									Canonical URL (optional)
								</Label>
								<Input
									id="pg-canonical"
									value={editing.canonicalUrl ?? ""}
									onChange={(e) =>
										setEditing({
											...editing,
											canonicalUrl: e.target.value || null,
										})
									}
									placeholder={previewUrl}
									className="h-8 rounded-lg font-mono text-xs"
								/>
							</div>

							<div className="space-y-1.5">
								<Label htmlFor="pg-og-img" className="text-xs">
									OG Image URL (optional)
								</Label>
								<Input
									id="pg-og-img"
									value={editing.ogImageUrl ?? ""}
									onChange={(e) =>
										setEditing({
											...editing,
											ogImageUrl: e.target.value || null,
										})
									}
									placeholder="/selim-logo-white.svg"
									className="h-8 rounded-lg font-mono text-xs"
								/>
							</div>

							<div className="flex items-center gap-2">
								<Checkbox
									id="pg-noindex"
									checked={editing.noIndex}
									onCheckedChange={(c) =>
										setEditing({ ...editing, noIndex: !!c })
									}
								/>
								<Label
									htmlFor="pg-noindex"
									className="cursor-pointer font-normal text-xs"
								>
									Hide from search engines (noindex)
								</Label>
							</div>

							<Separator />

							<div className="rounded-lg border border-border/70 bg-background/60 p-3">
								<div className="mb-1.5 font-medium text-[10px] text-muted-foreground uppercase tracking-wider">
									SERP Preview
								</div>
								<div className="truncate text-[11px] text-emerald-500">
									{editing.canonicalUrl || previewUrl}
								</div>
								<div className="mt-0.5 truncate font-medium text-primary text-sm">
									{seoTitle}
								</div>
								<p className="mt-1 line-clamp-2 text-muted-foreground text-xs">
									{seoDesc}
								</p>
							</div>
						</CardContent>
					</Card>
				</div>
			</form>
		);
	}

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-wrap items-center justify-between gap-3">
				<div className="flex items-center gap-1 rounded-lg border border-border/80 bg-muted/40 p-0.5">
					{(["all", "PUBLISHED", "DRAFT"] as const).map((status) => (
						<button
							key={status}
							type="button"
							onClick={() => setStatusFilter(status)}
							className={`rounded-md px-2.5 py-1 font-medium text-xs capitalize transition-[background-color,color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] ${
								statusFilter === status
									? "bg-background text-foreground shadow-2xs"
									: "text-muted-foreground hover:text-foreground"
							}`}
						>
							{status.toLowerCase()}
						</button>
					))}
				</div>

				<Button
					size="sm"
					onClick={startNew}
					className="h-8 rounded-lg px-3 active:scale-[0.97]"
				>
					<Plus className="size-3.5" />
					<span>New {entityLabel}</span>
				</Button>
			</div>

			<div className="overflow-hidden rounded-xl border border-border/80 bg-card">
				<div className="divide-y divide-border/70">
					{filtered.length === 0 ? (
						<div className="py-10 text-center text-muted-foreground text-xs">
							No pages match your filter.
						</div>
					) : (
						filtered.map((item) => (
							<div
								key={item.id}
								className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 transition-colors duration-150 hover:bg-muted/30"
							>
								<div className="min-w-0 flex-1">
									<div className="flex flex-wrap items-center gap-2">
										<button
											type="button"
											onClick={() => {
												setIsNew(false);
												setEditing(item);
											}}
											className="truncate text-left font-semibold text-foreground text-xs hover:text-primary"
										>
											{item.title}
										</button>
										<Badge
											variant="outline"
											className={`rounded-md px-1.5 py-0 text-[10px] capitalize ${
												item.status === "PUBLISHED"
													? "border-emerald-500/30 bg-emerald-500/10 text-emerald-500"
													: "border-border bg-muted text-muted-foreground"
											}`}
										>
											{item.status.toLowerCase()}
										</Badge>
									</div>
									<div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
										<span className="font-mono">{item.slug}</span>
										<span>·</span>
										<span className="capitalize">
											{item.template.toLowerCase()}
										</span>
										<span>·</span>
										<span className="tabular-nums">
											{item.sections.length} sections
										</span>
										<span>·</span>
										<span className="tabular-nums">
											{formatDate(item.updatedAt)}
										</span>
									</div>
								</div>

								<div className="flex items-center gap-1">
									<Button
										variant="ghost"
										size="icon-sm"
										onClick={() => {
											setIsNew(false);
											setEditing(item);
										}}
										title="Edit"
										className="rounded-lg active:scale-[0.97]"
									>
										<Edit3 className="size-3.5" />
									</Button>
									<Button
										variant="ghost"
										size="icon-sm"
										onClick={() => onDuplicate(item.id)}
										title="Duplicate"
										className="rounded-lg active:scale-[0.97]"
									>
										<Copy className="size-3.5" />
									</Button>
									{!item.isSystem && (
										<Button
											variant="ghost"
											size="icon-sm"
											onClick={() => onDelete(item.id)}
											title="Delete"
											className="rounded-lg text-muted-foreground hover:text-destructive active:scale-[0.97]"
										>
											<Trash2 className="size-3.5" />
										</Button>
									)}
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
}

export function CmsPostsManager({
	posts,
	categories,
	searchQuery,
	siteBaseUrl,
	isSaving,
	onCreate,
	onUpdate,
	onDuplicate,
	onDelete,
}: CmsPostsManagerProps) {
	const [statusFilter, setStatusFilter] = useState<
		"all" | "PUBLISHED" | "DRAFT"
	>("all");
	const [editing, setEditing] = useState<ApiPost | null>(null);
	const [isNew, setIsNew] = useState(false);

	const filtered = posts.filter((item) => {
		const matchesStatus =
			statusFilter === "all" || item.status === statusFilter;
		const q = searchQuery.trim().toLowerCase();
		const matchesQuery =
			!q ||
			item.title.toLowerCase().includes(q) ||
			item.slug.toLowerCase().includes(q);
		return matchesStatus && matchesQuery;
	});

	const startNew = () => {
		setIsNew(true);
		setEditing({
			id: "",
			title: "",
			slug: "",
			excerpt: "",
			contentHtml: "",
			coverImage: null,
			readTime: "5 min read",
			featured: false,
			status: "DRAFT",
			categoryId: categories[0]?.id ?? null,
			category: categories[0] ?? null,
			seoTitle: "",
			seoDesc: "",
			noIndex: false,
			updatedAt: new Date(),
		});
	};

	const handleSave = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!editing?.title.trim()) return;
		const slug = editing.slug.trim() || slugify(editing.title);
		const payload = {
			title: editing.title.trim(),
			slug,
			excerpt: editing.excerpt,
			contentHtml: editing.contentHtml,
			coverImage: editing.coverImage,
			readTime: editing.readTime,
			featured: editing.featured,
			status: editing.status,
			categoryId: editing.categoryId,
			seoTitle: editing.seoTitle,
			seoDesc: editing.seoDesc,
			noIndex: editing.noIndex,
		};
		if (isNew) {
			await onCreate(payload);
		} else {
			await onUpdate({ id: editing.id, ...payload });
		}
		setEditing(null);
	};

	if (editing) {
		const seoTitle = editing.seoTitle || editing.title || "Untitled";
		const seoDesc =
			editing.seoDesc ||
			editing.excerpt ||
			"Add a meta description to control how this post appears in search results.";
		const previewUrl = `${siteBaseUrl}/blog/${editing.slug || "untitled"}`;

		return (
			<form onSubmit={handleSave} className="flex flex-col gap-4">
				<div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border/80 bg-card px-4 py-3">
					<Button
						type="button"
						variant="ghost"
						size="sm"
						onClick={() => setEditing(null)}
						className="rounded-lg active:scale-[0.97]"
					>
						<ArrowLeft className="size-3.5" />
						<span>Back to Posts</span>
					</Button>

					<div className="flex items-center gap-2">
						<select
							value={editing.status}
							onChange={(e) =>
								setEditing({
									...editing,
									status: e.target.value as ApiPost["status"],
								})
							}
							className="h-8 rounded-lg border border-input bg-background px-2.5 font-medium text-foreground text-xs"
						>
							<option value="DRAFT">Draft</option>
							<option value="PUBLISHED">Published</option>
						</select>

						<Button
							type="submit"
							size="sm"
							disabled={isSaving}
							className="h-8 rounded-lg px-3 active:scale-[0.97]"
						>
							<Save className="size-3.5" />
							<span>{isNew ? "Create" : "Save"}</span>
						</Button>
					</div>
				</div>

				<div className="grid gap-4 lg:grid-cols-12">
					<div className="space-y-4 rounded-xl border border-border/80 bg-card p-4 lg:col-span-8">
						<div className="grid gap-3 sm:grid-cols-2">
							<div className="space-y-1.5">
								<Label htmlFor="pst-title" className="text-xs">
									Title
								</Label>
								<Input
									id="pst-title"
									required
									value={editing.title}
									onChange={(e) => {
										const title = e.target.value;
										setEditing({
											...editing,
											title,
											slug:
												isNew && !editing.slug ? slugify(title) : editing.slug,
										});
									}}
									className="h-9 rounded-lg text-xs"
								/>
							</div>

							<div className="space-y-1.5">
								<Label htmlFor="pst-slug" className="text-xs">
									Slug
								</Label>
								<Input
									id="pst-slug"
									value={editing.slug}
									onChange={(e) =>
										setEditing({ ...editing, slug: e.target.value })
									}
									className="h-9 rounded-lg font-mono text-xs"
								/>
							</div>
						</div>

						<div className="grid gap-3 sm:grid-cols-3">
							<div className="space-y-1.5">
								<Label htmlFor="pst-category" className="text-xs">
									Category
								</Label>
								<select
									id="pst-category"
									value={editing.categoryId ?? ""}
									onChange={(e) =>
										setEditing({
											...editing,
											categoryId: e.target.value || null,
										})
									}
									className="h-9 w-full rounded-lg border border-input bg-background px-2.5 text-foreground text-xs"
								>
									<option value="">Uncategorized</option>
									{categories.map((cat) => (
										<option key={cat.id} value={cat.id}>
											{cat.name}
										</option>
									))}
								</select>
							</div>
							<div className="space-y-1.5">
								<Label htmlFor="pst-readtime" className="text-xs">
									Read Time
								</Label>
								<Input
									id="pst-readtime"
									value={editing.readTime}
									onChange={(e) =>
										setEditing({ ...editing, readTime: e.target.value })
									}
									className="h-9 rounded-lg text-xs"
								/>
							</div>
							<div className="space-y-1.5">
								<Label htmlFor="pst-cover" className="text-xs">
									Cover Image URL
								</Label>
								<Input
									id="pst-cover"
									value={editing.coverImage ?? ""}
									onChange={(e) =>
										setEditing({
											...editing,
											coverImage: e.target.value || null,
										})
									}
									placeholder="https://..."
									className="h-9 rounded-lg font-mono text-xs"
								/>
							</div>
						</div>

						<div className="space-y-1.5">
							<Label htmlFor="pst-excerpt" className="text-xs">
								Excerpt
							</Label>
							<Input
								id="pst-excerpt"
								value={editing.excerpt}
								onChange={(e) =>
									setEditing({ ...editing, excerpt: e.target.value })
								}
								className="h-9 rounded-lg text-xs"
							/>
						</div>

						<div className="space-y-1.5">
							<Label className="text-xs">Body</Label>
							<TiptapEditor
								value={editing.contentHtml}
								onChange={(html) =>
									setEditing({ ...editing, contentHtml: html })
								}
							/>
						</div>
					</div>

					{/* SEO Sidebar */}
					<div className="space-y-4 rounded-xl border border-border/80 bg-card p-4 lg:col-span-4">
						<div className="font-semibold text-muted-foreground text-xs uppercase tracking-wider">
							Search &amp; SEO
						</div>

						<div className="flex items-center gap-2">
							<Checkbox
								id="pst-featured"
								checked={editing.featured}
								onCheckedChange={(c) =>
									setEditing({ ...editing, featured: !!c })
								}
							/>
							<Label
								htmlFor="pst-featured"
								className="cursor-pointer font-normal text-xs"
							>
								Featured article
							</Label>
						</div>

						<div className="space-y-1.5">
							<div className="flex items-center justify-between">
								<Label htmlFor="pst-seo-title" className="text-xs">
									Meta Title
								</Label>
								<span className="text-[11px] text-muted-foreground tabular-nums">
									{seoTitle.length}/60
								</span>
							</div>
							<Input
								id="pst-seo-title"
								value={editing.seoTitle}
								onChange={(e) =>
									setEditing({ ...editing, seoTitle: e.target.value })
								}
								className="h-9 rounded-lg text-xs"
							/>
						</div>

						<div className="space-y-1.5">
							<div className="flex items-center justify-between">
								<Label htmlFor="pst-seo-desc" className="text-xs">
									Meta Description
								</Label>
								<span className="text-[11px] text-muted-foreground tabular-nums">
									{editing.seoDesc.length}/160
								</span>
							</div>
							<textarea
								id="pst-seo-desc"
								rows={3}
								value={editing.seoDesc}
								onChange={(e) =>
									setEditing({ ...editing, seoDesc: e.target.value })
								}
								className="w-full resize-none rounded-lg border border-input bg-transparent px-3 py-2 text-foreground text-xs focus-visible:border-ring focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring/50"
							/>
						</div>

						<div className="rounded-lg border border-border/70 bg-background/60 p-3">
							<div className="mb-1.5 font-medium text-[10px] text-muted-foreground uppercase tracking-wider">
								SERP Preview
							</div>
							<div className="truncate text-[11px] text-emerald-500">
								{previewUrl}
							</div>
							<div className="mt-0.5 truncate font-medium text-primary text-sm">
								{seoTitle}
							</div>
							<p className="mt-1 line-clamp-2 text-muted-foreground text-xs">
								{seoDesc}
							</p>
						</div>
					</div>
				</div>
			</form>
		);
	}

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-wrap items-center justify-between gap-3">
				<div className="flex items-center gap-1 rounded-lg border border-border/80 bg-muted/40 p-0.5">
					{(["all", "PUBLISHED", "DRAFT"] as const).map((status) => (
						<button
							key={status}
							type="button"
							onClick={() => setStatusFilter(status)}
							className={`rounded-md px-2.5 py-1 font-medium text-xs capitalize transition-[background-color,color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] ${
								statusFilter === status
									? "bg-background text-foreground shadow-2xs"
									: "text-muted-foreground hover:text-foreground"
							}`}
						>
							{status.toLowerCase()}
						</button>
					))}
				</div>

				<Button
					size="sm"
					onClick={startNew}
					className="h-8 rounded-lg px-3 active:scale-[0.97]"
				>
					<Plus className="size-3.5" />
					<span>New Post</span>
				</Button>
			</div>

			<div className="overflow-hidden rounded-xl border border-border/80 bg-card">
				<div className="divide-y divide-border/70">
					{filtered.length === 0 ? (
						<div className="py-10 text-center text-muted-foreground text-xs">
							No posts match your filter.
						</div>
					) : (
						filtered.map((item) => (
							<div
								key={item.id}
								className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 transition-colors duration-150 hover:bg-muted/30"
							>
								<div className="min-w-0 flex-1">
									<div className="flex flex-wrap items-center gap-2">
										<button
											type="button"
											onClick={() => {
												setIsNew(false);
												setEditing(item);
											}}
											className="truncate text-left font-semibold text-foreground text-xs hover:text-primary"
										>
											{item.title}
										</button>
										<Badge
											variant="outline"
											className={`rounded-md px-1.5 py-0 text-[10px] capitalize ${
												item.status === "PUBLISHED"
													? "border-emerald-500/30 bg-emerald-500/10 text-emerald-500"
													: "border-border bg-muted text-muted-foreground"
											}`}
										>
											{item.status.toLowerCase()}
										</Badge>
									</div>
									<div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
										<span className="font-mono">{item.slug}</span>
										<span>·</span>
										<span>{item.category?.name ?? "Uncategorized"}</span>
										<span>·</span>
										<span className="tabular-nums">
											{formatDate(item.updatedAt)}
										</span>
									</div>
								</div>

								<div className="flex items-center gap-1">
									<Button
										variant="ghost"
										size="icon-sm"
										onClick={() => {
											setIsNew(false);
											setEditing(item);
										}}
										title="Edit"
										className="rounded-lg active:scale-[0.97]"
									>
										<Edit3 className="size-3.5" />
									</Button>
									<Button
										variant="ghost"
										size="icon-sm"
										onClick={() => onDuplicate(item.id)}
										title="Duplicate"
										className="rounded-lg active:scale-[0.97]"
									>
										<Copy className="size-3.5" />
									</Button>
									<Button
										variant="ghost"
										size="icon-sm"
										onClick={() => onDelete(item.id)}
										title="Delete"
										className="rounded-lg text-muted-foreground hover:text-destructive active:scale-[0.97]"
									>
										<Trash2 className="size-3.5" />
									</Button>
								</div>
							</div>
						))
					)}
				</div>
			</div>
		</div>
	);
}

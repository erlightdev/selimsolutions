import { Badge } from "@selimsolutions/ui/components/badge";
import { Button } from "@selimsolutions/ui/components/button";
import { Input } from "@selimsolutions/ui/components/input";
import { Label } from "@selimsolutions/ui/components/label";
import { ArrowLeft, Copy, Edit3, Plus, Save, Trash2 } from "lucide-react";
import { useState } from "react";

import type { CmsPage, CmsPost, ContentStatus } from "./cms-data";
import { TiptapEditor } from "./tiptap-editor";

type ContentMode = "page" | "post";

interface CmsContentManagerProps {
	mode: ContentMode;
	items: (CmsPage | CmsPost)[];
	searchQuery: string;
	siteBaseUrl: string;
	onCreate: (item: CmsPage | CmsPost) => void;
	onUpdate: (item: CmsPage | CmsPost) => void;
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

export function CmsContentManager({
	mode,
	items,
	searchQuery,
	siteBaseUrl,
	onCreate,
	onUpdate,
	onDuplicate,
	onDelete,
}: CmsContentManagerProps) {
	const [statusFilter, setStatusFilter] = useState<"all" | ContentStatus>(
		"all",
	);
	const [editing, setEditing] = useState<CmsPage | CmsPost | null>(null);
	const [isNew, setIsNew] = useState(false);

	const filtered = items.filter((item) => {
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
		if (mode === "page") {
			setEditing({
				id: `pg-${Date.now()}`,
				title: "",
				slug: "/",
				template: "Standard",
				status: "draft",
				content: "",
				updatedAt: "Just now",
				seo: { metaTitle: "", metaDescription: "" },
			});
		} else {
			setEditing({
				id: `pst-${Date.now()}`,
				title: "",
				slug: "",
				category: "Security",
				excerpt: "",
				content: "",
				status: "draft",
				author: "Selim Admin",
				updatedAt: "Just now",
				seo: { metaTitle: "", metaDescription: "" },
			});
		}
	};

	const startEdit = (item: CmsPage | CmsPost) => {
		setIsNew(false);
		setEditing({ ...item, seo: { ...item.seo } });
	};

	const handleSave = (e: React.FormEvent) => {
		e.preventDefault();
		if (!editing?.title.trim()) return;
		const normalizedSlug =
			editing.slug.trim() ||
			(mode === "page" ? `/${slugify(editing.title)}` : slugify(editing.title));
		const payload = {
			...editing,
			title: editing.title.trim(),
			slug: normalizedSlug,
			updatedAt: "Just now",
		};
		if (isNew) {
			onCreate(payload);
		} else {
			onUpdate(payload);
		}
		setEditing(null);
	};

	if (editing) {
		const seoTitle = editing.seo.metaTitle || editing.title || "Untitled";
		const seoDesc =
			editing.seo.metaDescription ||
			("excerpt" in editing ? editing.excerpt : "") ||
			"Add a meta description to control how this entry appears in search results.";
		const previewUrl =
			mode === "page"
				? `${siteBaseUrl}${editing.slug.startsWith("/") ? editing.slug : `/${editing.slug}`}`
				: `${siteBaseUrl}/blog/${editing.slug || "untitled"}`;

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
						<span>Back to {mode === "page" ? "Pages" : "Posts"}</span>
					</Button>

					<div className="flex items-center gap-2">
						<select
							value={editing.status}
							onChange={(e) =>
								setEditing({
									...editing,
									status: e.target.value as ContentStatus,
								})
							}
							className="h-8 rounded-lg border border-input bg-background px-2.5 font-medium text-foreground text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
						>
							<option value="draft">Draft</option>
							<option value="published">Published</option>
						</select>

						<Button
							type="submit"
							size="sm"
							className="h-8 rounded-lg px-3 active:scale-[0.97]"
						>
							<Save className="size-3.5" />
							<span>{isNew ? "Create" : "Save"}</span>
						</Button>
					</div>
				</div>

				<div className="grid gap-4 lg:grid-cols-12">
					{/* Main Editor */}
					<div className="space-y-4 rounded-xl border border-border/80 bg-card p-4 lg:col-span-8">
						<div className="grid gap-3 sm:grid-cols-2">
							<div className="space-y-1.5">
								<Label htmlFor="editor-title" className="text-xs">
									Title
								</Label>
								<Input
									id="editor-title"
									required
									value={editing.title}
									onChange={(e) => {
										const title = e.target.value;
										setEditing({
											...editing,
											title,
											slug:
												isNew && (!editing.slug || editing.slug === "/")
													? mode === "page"
														? `/${slugify(title)}`
														: slugify(title)
													: editing.slug,
										});
									}}
									placeholder={mode === "page" ? "Page title" : "Post headline"}
									className="h-9 rounded-lg text-xs"
								/>
							</div>

							<div className="space-y-1.5">
								<Label htmlFor="editor-slug" className="text-xs">
									Slug
								</Label>
								<Input
									id="editor-slug"
									value={editing.slug}
									onChange={(e) =>
										setEditing({ ...editing, slug: e.target.value })
									}
									placeholder={mode === "page" ? "/about" : "post-slug"}
									className="h-9 rounded-lg font-mono text-xs"
								/>
							</div>
						</div>

						{"category" in editing ? (
							<div className="grid gap-3 sm:grid-cols-2">
								<div className="space-y-1.5">
									<Label htmlFor="editor-category" className="text-xs">
										Category
									</Label>
									<select
										id="editor-category"
										value={editing.category}
										onChange={(e) =>
											setEditing({
												...editing,
												category: e.target.value as CmsPost["category"],
											})
										}
										className="h-9 w-full rounded-lg border border-input bg-background px-2.5 text-foreground text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
									>
										<option value="Security">Security</option>
										<option value="Cloud">Cloud</option>
										<option value="Compliance">Compliance</option>
										<option value="Engineering">Engineering</option>
									</select>
								</div>
								<div className="space-y-1.5">
									<Label htmlFor="editor-excerpt" className="text-xs">
										Excerpt
									</Label>
									<Input
										id="editor-excerpt"
										value={editing.excerpt}
										onChange={(e) =>
											setEditing({ ...editing, excerpt: e.target.value })
										}
										placeholder="Short summary..."
										className="h-9 rounded-lg text-xs"
									/>
								</div>
							</div>
						) : (
							<div className="space-y-1.5">
								<Label htmlFor="editor-template" className="text-xs">
									Template
								</Label>
								<select
									id="editor-template"
									value={editing.template}
									onChange={(e) =>
										setEditing({
											...editing,
											template: e.target.value as CmsPage["template"],
										})
									}
									className="h-9 w-full rounded-lg border border-input bg-background px-2.5 text-foreground text-xs focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
								>
									<option value="Landing">Landing</option>
									<option value="Standard">Standard</option>
									<option value="Legal">Legal</option>
								</select>
							</div>
						)}

						<div className="space-y-1.5">
							<Label className="text-xs">Body</Label>
							<TiptapEditor
								value={editing.content}
								onChange={(html) => setEditing({ ...editing, content: html })}
								placeholder="Write clean, structured content..."
							/>
						</div>
					</div>

					{/* SEO Sidebar */}
					<div className="space-y-4 rounded-xl border border-border/80 bg-card p-4 lg:col-span-4">
						<div className="font-semibold text-muted-foreground text-xs uppercase tracking-wider">
							Search &amp; SEO
						</div>

						<div className="space-y-1.5">
							<div className="flex items-center justify-between">
								<Label htmlFor="seo-title" className="text-xs">
									Meta Title
								</Label>
								<span className="text-[11px] text-muted-foreground tabular-nums">
									{seoTitle.length}/60
								</span>
							</div>
							<Input
								id="seo-title"
								value={editing.seo.metaTitle}
								onChange={(e) =>
									setEditing({
										...editing,
										seo: { ...editing.seo, metaTitle: e.target.value },
									})
								}
								placeholder="SEO title"
								className="h-9 rounded-lg text-xs"
							/>
						</div>

						<div className="space-y-1.5">
							<div className="flex items-center justify-between">
								<Label htmlFor="seo-desc" className="text-xs">
									Meta Description
								</Label>
								<span className="text-[11px] text-muted-foreground tabular-nums">
									{editing.seo.metaDescription.length}/160
								</span>
							</div>
							<textarea
								id="seo-desc"
								rows={3}
								value={editing.seo.metaDescription}
								onChange={(e) =>
									setEditing({
										...editing,
										seo: { ...editing.seo, metaDescription: e.target.value },
									})
								}
								placeholder="Concise search snippet..."
								className="w-full resize-none rounded-lg border border-input bg-transparent px-3 py-2 text-foreground text-xs placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring/50"
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
					{(["all", "published", "draft"] as const).map((status) => (
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
							{status}
						</button>
					))}
				</div>

				<Button
					size="sm"
					onClick={startNew}
					className="h-8 rounded-lg px-3 active:scale-[0.97]"
				>
					<Plus className="size-3.5" />
					<span>New {mode === "page" ? "Page" : "Post"}</span>
				</Button>
			</div>

			<div className="overflow-hidden rounded-xl border border-border/80 bg-card">
				<div className="divide-y divide-border/70">
					{filtered.length === 0 ? (
						<div className="py-10 text-center text-muted-foreground text-xs">
							No {mode === "page" ? "pages" : "posts"} match your filter.
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
											onClick={() => startEdit(item)}
											className="truncate text-left font-semibold text-foreground text-xs hover:text-primary"
										>
											{item.title}
										</button>
										<Badge
											variant="outline"
											className={`rounded-md px-1.5 py-0 text-[10px] capitalize ${
												item.status === "published"
													? "border-emerald-500/30 bg-emerald-500/10 text-emerald-500"
													: "border-border bg-muted text-muted-foreground"
											}`}
										>
											{item.status}
										</Badge>
									</div>
									<div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-muted-foreground">
										<span className="font-mono">{item.slug}</span>
										<span>·</span>
										<span>
											{"category" in item ? item.category : item.template}
										</span>
										<span>·</span>
										<span className="tabular-nums">{item.updatedAt}</span>
									</div>
								</div>

								<div className="flex items-center gap-1">
									<Button
										variant="ghost"
										size="icon-sm"
										onClick={() => startEdit(item)}
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

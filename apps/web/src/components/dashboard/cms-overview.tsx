import { Badge } from "@selimsolutions/ui/components/badge";
import { Button } from "@selimsolutions/ui/components/button";
import { Input } from "@selimsolutions/ui/components/input";
import { Label } from "@selimsolutions/ui/components/label";
import {
	ArrowRight,
	CheckCircle2,
	FileText,
	Newspaper,
	Plus,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import type { CmsMediaItem, CmsPage, CmsPost, CmsView } from "./cms-data";

interface CmsOverviewProps {
	pages: CmsPage[];
	posts: CmsPost[];
	media: CmsMediaItem[];
	seoScore: number;
	onNavigate: (view: CmsView) => void;
	onCreateQuickDraft: (title: string, excerpt: string) => void;
}

export function CmsOverview({
	pages,
	posts,
	media,
	seoScore,
	onNavigate,
	onCreateQuickDraft,
}: CmsOverviewProps) {
	const [draftTitle, setDraftTitle] = useState("");
	const [draftNotes, setDraftNotes] = useState("");

	const publishedPages = pages.filter((p) => p.status === "published").length;
	const publishedPosts = posts.filter((p) => p.status === "published").length;
	const draftCount =
		pages.filter((p) => p.status === "draft").length +
		posts.filter((p) => p.status === "draft").length;

	const handleQuickDraft = (e: React.FormEvent) => {
		e.preventDefault();
		if (!draftTitle.trim()) return;
		onCreateQuickDraft(draftTitle.trim(), draftNotes.trim());
		setDraftTitle("");
		setDraftNotes("");
		toast.success("Draft saved to Posts.");
	};

	return (
		<div className="flex flex-col gap-5">
			{/* Metrics */}
			<section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
				<button
					type="button"
					onClick={() => onNavigate("pages")}
					className="rounded-xl border border-border/80 bg-card p-4 text-left transition-[border-color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-border active:scale-[0.99]"
				>
					<div className="font-medium text-muted-foreground text-xs">Pages</div>
					<div className="mt-2 font-semibold text-2xl text-foreground tabular-nums">
						{pages.length}
					</div>
					<div className="mt-1 text-[11px] text-muted-foreground tabular-nums">
						{publishedPages} published
					</div>
				</button>

				<button
					type="button"
					onClick={() => onNavigate("posts")}
					className="rounded-xl border border-border/80 bg-card p-4 text-left transition-[border-color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-border active:scale-[0.99]"
				>
					<div className="font-medium text-muted-foreground text-xs">Posts</div>
					<div className="mt-2 font-semibold text-2xl text-foreground tabular-nums">
						{posts.length}
					</div>
					<div className="mt-1 text-[11px] text-muted-foreground tabular-nums">
						{publishedPosts} published · {draftCount} drafts
					</div>
				</button>

				<button
					type="button"
					onClick={() => onNavigate("media")}
					className="rounded-xl border border-border/80 bg-card p-4 text-left transition-[border-color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-border active:scale-[0.99]"
				>
					<div className="font-medium text-muted-foreground text-xs">
						Media Library
					</div>
					<div className="mt-2 font-semibold text-2xl text-foreground tabular-nums">
						{media.length}
					</div>
					<div className="mt-1 text-[11px] text-muted-foreground">
						Images &amp; video assets
					</div>
				</button>

				<button
					type="button"
					onClick={() => onNavigate("settings")}
					className="rounded-xl border border-border/80 bg-card p-4 text-left transition-[border-color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:border-border active:scale-[0.99]"
				>
					<div className="font-medium text-muted-foreground text-xs">
						SEO Health
					</div>
					<div className="mt-2 font-semibold text-2xl text-foreground tabular-nums">
						{seoScore}%
					</div>
					<div className="mt-1 flex items-center gap-1 text-[11px] text-emerald-500">
						<CheckCircle2 className="size-3" />
						<span>Indexable &amp; sitemap active</span>
					</div>
				</button>
			</section>

			{/* Quick Draft + Recent Content */}
			<section className="grid gap-4 lg:grid-cols-12">
				<form
					onSubmit={handleQuickDraft}
					className="flex flex-col justify-between rounded-xl border border-border/80 bg-card p-4 lg:col-span-5"
				>
					<div className="space-y-3">
						<div className="flex items-center justify-between">
							<h2 className="font-semibold text-foreground text-sm">
								Quick Draft
							</h2>
							<span className="text-[11px] text-muted-foreground">
								Saves to Posts
							</span>
						</div>

						<div className="space-y-1.5">
							<Label htmlFor="quick-title" className="text-xs">
								Title
							</Label>
							<Input
								id="quick-title"
								value={draftTitle}
								onChange={(e) => setDraftTitle(e.target.value)}
								placeholder="e.g. Q4 Cloud Security Checklist"
								className="h-9 rounded-lg text-xs"
							/>
						</div>

						<div className="space-y-1.5">
							<Label htmlFor="quick-notes" className="text-xs">
								Notes
							</Label>
							<textarea
								id="quick-notes"
								rows={4}
								value={draftNotes}
								onChange={(e) => setDraftNotes(e.target.value)}
								placeholder="Outline key points..."
								className="w-full resize-none rounded-lg border border-input bg-transparent px-3 py-2 text-foreground text-xs placeholder:text-muted-foreground focus-visible:border-ring focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring/50"
							/>
						</div>
					</div>

					<Button
						type="submit"
						size="sm"
						className="mt-4 w-full rounded-lg active:scale-[0.97]"
					>
						<Plus className="size-3.5" />
						<span>Save Draft</span>
					</Button>
				</form>

				<div className="rounded-xl border border-border/80 bg-card p-4 lg:col-span-7">
					<div className="mb-3 flex items-center justify-between">
						<h2 className="font-semibold text-foreground text-sm">
							Recent Content
						</h2>
						<Button
							variant="ghost"
							size="xs"
							onClick={() => onNavigate("posts")}
							className="rounded-lg text-xs active:scale-[0.97]"
						>
							<span>All Posts</span>
							<ArrowRight className="size-3" />
						</Button>
					</div>

					<div className="divide-y divide-border/70">
						{posts.slice(0, 3).map((post) => (
							<div
								key={post.id}
								className="flex items-center justify-between gap-3 py-2.5 first:pt-1"
							>
								<div className="flex min-w-0 items-center gap-2.5">
									<Newspaper className="size-3.5 shrink-0 text-muted-foreground" />
									<div className="min-w-0">
										<div className="truncate font-medium text-foreground text-xs">
											{post.title}
										</div>
										<div className="text-[11px] text-muted-foreground">
											{post.category} · {post.updatedAt}
										</div>
									</div>
								</div>
								<Badge
									variant="outline"
									className={`rounded-md px-1.5 py-0 text-[10px] capitalize ${
										post.status === "published"
											? "border-emerald-500/30 bg-emerald-500/10 text-emerald-500"
											: "border-border bg-muted text-muted-foreground"
									}`}
								>
									{post.status}
								</Badge>
							</div>
						))}

						{pages.slice(0, 2).map((page) => (
							<div
								key={page.id}
								className="flex items-center justify-between gap-3 py-2.5 last:pb-1"
							>
								<div className="flex min-w-0 items-center gap-2.5">
									<FileText className="size-3.5 shrink-0 text-muted-foreground" />
									<div className="min-w-0">
										<div className="truncate font-medium text-foreground text-xs">
											{page.title}
										</div>
										<div className="font-mono text-[11px] text-muted-foreground">
											{page.slug}
										</div>
									</div>
								</div>
								<Badge
									variant="outline"
									className={`rounded-md px-1.5 py-0 text-[10px] capitalize ${
										page.status === "published"
											? "border-emerald-500/30 bg-emerald-500/10 text-emerald-500"
											: "border-border bg-muted text-muted-foreground"
									}`}
								>
									{page.status}
								</Badge>
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}

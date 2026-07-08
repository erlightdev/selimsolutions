import { Badge } from "@selimsolutions/ui/components/badge";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Clock } from "lucide-react";
import { type BlogPost, blogPosts } from "@/data/blog";

function PostThumb({ img, alt }: { img: string; alt: string }) {
	return (
		<div className="relative aspect-16/10 w-full overflow-hidden rounded-none bg-muted">
			<img
				src={img}
				alt={alt}
				loading="lazy"
				className="h-full w-full object-cover transition-transform duration-350 ease-out group-hover:scale-105"
			/>
		</div>
	);
}

function FeaturedCard({ post }: { post: BlogPost }) {
	return (
		<Link
			to="/blog/$slug"
			params={{ slug: post.slug }}
			className="group flex flex-col gap-6 rounded-none border border-border bg-card p-5 transition-all duration-200 hover:border-foreground/20 hover:shadow-[0_4px_12px_rgba(0,0,0,0.02)] active:scale-[0.99] lg:flex-row lg:p-6"
		>
			<div className="lg:w-1/2">
				<PostThumb img={post.img} alt={post.title} />
			</div>
			<div className="flex flex-1 flex-col justify-center">
				<div className="flex items-center gap-3">
					<Badge
						variant="secondary"
						className="rounded-none font-semibold text-[10px] uppercase tracking-wider"
					>
						{post.category}
					</Badge>
					<span className="flex items-center gap-1.5 font-medium text-muted-foreground text-xs">
						<Clock className="h-3.5 w-3.5" />
						{post.readTime}
					</span>
				</div>
				<h3 className="mt-4 text-balance font-serif text-2xl text-foreground leading-snug tracking-tight sm:text-3xl">
					{post.title}
				</h3>
				<p className="mt-3 text-pretty text-foreground/75 text-sm leading-relaxed dark:text-zinc-300">
					{post.excerpt}
				</p>
				<div className="mt-6 flex items-center justify-between border-border/20 border-t pt-4">
					<span className="text-foreground/50 text-xs">{post.date}</span>
					<span className="inline-flex items-center gap-1.5 font-bold text-primary text-sm">
						Read insight
						<ArrowRight className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-1" />
					</span>
				</div>
			</div>
		</Link>
	);
}

function PostCard({ post }: { post: BlogPost }) {
	return (
		<Link
			to="/blog/$slug"
			params={{ slug: post.slug }}
			className="group flex flex-col rounded-none border border-border bg-card p-5 transition-all duration-200 hover:border-foreground/20 hover:shadow-[0_4px_12px_rgba(0,0,0,0.02)] active:scale-[0.98]"
		>
			<PostThumb img={post.img} alt={post.title} />
			<div className="mt-5 flex items-center gap-3">
				<Badge
					variant="outline"
					className="rounded-none font-semibold text-[10px] uppercase tracking-wider"
				>
					{post.category}
				</Badge>
				<span className="flex items-center gap-1.5 font-medium text-muted-foreground text-xs">
					<Clock className="h-3.5 w-3.5" />
					{post.readTime}
				</span>
			</div>
			<h3 className="mt-3 text-balance font-serif text-foreground text-lg leading-snug tracking-tight sm:text-xl">
				{post.title}
			</h3>
			<p className="mt-2.5 flex-1 text-pretty text-foreground/75 text-sm leading-relaxed dark:text-zinc-300">
				{post.excerpt}
			</p>
			<div className="mt-6 flex items-center justify-between border-border/20 border-t pt-4">
				<span className="text-foreground/50 text-xs">{post.date}</span>
				<ArrowUpRight className="h-4 w-4 text-muted-foreground/40 transition-colors group-hover:text-primary" />
			</div>
		</Link>
	);
}

export default function BlogInsights() {
	const [featured, ...rest] = blogPosts;

	return (
		<section className="border-border/40 border-t bg-background py-16 sm:py-24">
			<div className="mx-auto max-w-7xl px-6 lg:px-10">
				{/* Header */}
				<div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
					<div className="max-w-xl">
						<p className="font-bold font-mono text-[10px] text-primary uppercase tracking-[0.25em]">
							Insights
						</p>
						<h2 className="mt-4 text-balance font-serif text-4xl text-foreground leading-[1.05] tracking-[-0.02em] sm:text-5xl">
							From the security floor
						</h2>
						<p className="mt-4 text-pretty text-muted-foreground text-sm leading-relaxed sm:text-base">
							Field notes, real-world incident walkthroughs, and proactive
							threat prevention playbooks curated by our security research team.
						</p>
					</div>
					<Link
						to="/blog"
						className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-none border border-border bg-muted/20 px-5 py-2.5 font-bold text-foreground text-xs uppercase tracking-wider transition-all duration-200 hover:bg-muted/40 active:scale-[0.96]"
					>
						All insights
						<ArrowUpRight className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
					</Link>
				</div>

				{/* Featured */}
				<div className="mt-14">
					<FeaturedCard post={featured} />
				</div>

				{/* Grid */}
				<div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
					{rest.slice(0, 2).map((post) => (
						<PostCard key={post.slug} post={post} />
					))}
				</div>
			</div>
		</section>
	);
}

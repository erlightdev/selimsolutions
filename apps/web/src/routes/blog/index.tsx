import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Clock, ArrowRight, ArrowUpRight } from "lucide-react";
import { blogPosts, BlogPost } from "@/data/blog";
import { Badge } from "@selimsolutions/ui/components/badge";

export const Route = createFileRoute("/blog/")({
	component: BlogIndexPage,
	head: () => ({
		meta: [
			{ title: "Security Insights, VAPT & Threat Intel Blog | Selim Solution" },
			{
				name: "description",
				content:
					"Read practical cybersecurity playbooks, 24/7 SOC threat analyses, VAPT penetration testing guides, and ISO 27001 readiness checklists from Selim Solution.",
			},
		],
	}),
});

function BlogIndexPage() {
	const [activeCategory, setActiveTab] = useState<string>("All");

	const categories = ["All", "Threat Intel", "VAPT", "Compliance"];

	const filteredPosts = activeCategory === "All"
		? blogPosts
		: blogPosts.filter((post) => post.category === activeCategory);

	const featuredPost = blogPosts.find((p) => p.featured) || blogPosts[0];
	const gridPosts = filteredPosts.filter((p) => p.slug !== featuredPost.slug || activeCategory !== "All");

	return (
		<section className="relative isolate overflow-hidden bg-background py-16 sm:py-24">
			<div
				className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[680px] opacity-60"
				style={{
					backgroundImage:
						"linear-gradient(to right, color-mix(in oklab, var(--foreground) 11%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--foreground) 11%, transparent) 1px, transparent 1px)",
					backgroundSize: "56px 56px",
					WebkitMaskImage:
						"radial-gradient(ellipse 70% 58% at 50% 0%, #000 52%, transparent 100%)",
					maskImage:
						"radial-gradient(ellipse 70% 58% at 50% 0%, #000 52%, transparent 100%)",
				}}
			/>
			<div className="pointer-events-none absolute top-10 left-1/2 z-0 h-[620px] w-[620px] -translate-x-1/2 rounded-full border border-primary/10" />
			<div className="pointer-events-none absolute top-28 left-1/2 z-0 h-[360px] w-[360px] -translate-x-1/2 rounded-full border border-primary/6" />
			<div className="pointer-events-none absolute top-0 left-1/2 z-0 h-[520px] w-full max-w-7xl -translate-x-1/2 bg-[radial-gradient(42%_42%_at_50%_0%,rgba(0,98,227,0.14),transparent_100%)]" />

			<div className="relative mx-auto max-w-6xl px-6 lg:px-10">
				{/* Page Header */}
				<div className="max-w-3xl border-b border-border/40 pb-12">
					<p className="anim-fade-up font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
						Selim Solution Research
					</p>
					<h1 className="anim-fade-up mt-4 text-balance font-serif text-4xl text-foreground leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl [animation-delay:40ms]">
						Insights from the security floor
					</h1>
					<p className="anim-fade-up mt-5 max-w-xl text-pretty text-muted-foreground text-sm leading-relaxed sm:text-base [animation-delay:80ms]">
						Field notes, real-world incident timeline audits, manual exploit writeups, and compliance strategies curated directly by our security operations analysts.
					</p>
				</div>

				{/* Filter Badges Row */}
				<div className="anim-fade-up mt-10 flex flex-wrap gap-2 pb-6 border-b border-border/20 [animation-delay:120ms]">
					{categories.map((cat) => {
						const isSelected = activeCategory === cat;
						return (
							<button
								key={cat}
								onClick={() => setActiveTab(cat)}
								type="button"
								className={`px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-widest border rounded-none transition-transform duration-150 active:scale-[0.96] ${
									isSelected
										? "bg-primary border-primary text-primary-foreground shadow-sm"
										: "bg-muted/15 border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
								}`}
							>
								{cat}
							</button>
						);
					})}
				</div>

				{/* Featured Post Showcase */}
				{activeCategory === "All" && featuredPost && (
					<div className="anim-fade-up mt-12 [animation-delay:160ms]">
						<Link
							to="/blog/$slug"
							params={{ slug: featuredPost.slug }}
							className="group flex flex-col gap-8 rounded-none border border-border/40 bg-card p-6 transition-all duration-300 hover:border-foreground/15 hover:shadow-lg active:scale-[0.98] lg:flex-row lg:p-8"
						>
							<div className="aspect-16/10 w-full overflow-hidden rounded-none bg-muted lg:w-1/2 border border-border/20">
								<img
									src={featuredPost.img}
									alt={featuredPost.title}
									loading="eager"
									className="h-full w-full object-cover transition-transform duration-500 ease-out-strong group-hover:scale-102"
								/>
							</div>
							<div className="flex flex-1 flex-col justify-center">
								<div className="flex items-center gap-3">
									<Badge variant="secondary" className="rounded-none font-semibold uppercase tracking-wider text-[9px] px-2 py-0.5">
										{featuredPost.category}
									</Badge>
									<span className="flex items-center gap-1.5 text-muted-foreground text-xs font-semibold">
										<Clock className="h-3.5 w-3.5" />
										{featuredPost.readTime}
									</span>
								</div>
								<h2 className="mt-4 text-balance font-serif text-2xl sm:text-3xl text-foreground leading-snug tracking-tight transition-colors duration-200 group-hover:text-primary">
									{featuredPost.title}
								</h2>
								<p className="mt-3 text-pretty text-sm text-foreground/75 dark:text-zinc-300 leading-relaxed">
									{featuredPost.excerpt}
								</p>
								<div className="mt-8 flex items-center justify-between border-t border-border/20 pt-4">
									<span className="text-foreground/50 text-xs">{featuredPost.date}</span>
									<span className="inline-flex items-center gap-1.5 font-bold text-primary text-xs uppercase tracking-widest">
										Read Insight
										<ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 ease-out-strong group-hover:translate-x-1" />
									</span>
								</div>
							</div>
						</Link>
					</div>
				)}

				{/* Post Grid (Staggered animation entries) */}
				<div className={`mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 ${activeCategory !== "All" ? "mt-12" : ""}`}>
					{gridPosts.map((post, i) => (
						<Link
							key={post.slug}
							to="/blog/$slug"
							params={{ slug: post.slug }}
							className="anim-fade-up group flex flex-col rounded-none border border-border/40 bg-card p-6 transition-all duration-300 hover:border-foreground/15 hover:shadow-lg active:scale-[0.98]"
							style={{ animationDelay: `${200 + i * 80}ms` }}
						>
							<div className="aspect-16/10 w-full overflow-hidden rounded-none bg-muted border border-border/20">
								<img
									src={post.img}
									alt={post.title}
									loading="lazy"
									className="h-full w-full object-cover transition-transform duration-500 ease-out-strong group-hover:scale-102"
								/>
							</div>
							<div className="mt-5 flex items-center gap-3">
								<Badge variant="outline" className="rounded-none font-semibold uppercase tracking-wider text-[9px] px-2 py-0.5">
									{post.category}
								</Badge>
								<span className="flex items-center gap-1.5 text-muted-foreground text-xs font-semibold">
									<Clock className="h-3.5 w-3.5" />
									{post.readTime}
								</span>
							</div>
							<h3 className="mt-3 text-balance font-serif text-lg sm:text-xl text-foreground leading-snug tracking-tight transition-colors duration-200 group-hover:text-primary">
								{post.title}
							</h3>
							<p className="mt-2.5 flex-1 text-pretty text-sm text-foreground/70 dark:text-zinc-300 leading-relaxed">
								{post.excerpt}
							</p>
							<div className="mt-6 flex items-center justify-between border-t border-border/20 pt-4">
								<span className="text-foreground/50 text-xs">{post.date}</span>
								<div className="h-6 w-6 flex items-center justify-center border border-border/40 bg-muted/20 text-foreground/60 transition-all duration-300 group-hover:border-primary/20 group-hover:bg-primary/5 group-hover:text-primary rounded-none">
									<ArrowUpRight className="h-3.5 w-3.5" />
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}

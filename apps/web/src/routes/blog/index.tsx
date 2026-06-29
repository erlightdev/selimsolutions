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
		<section className="bg-background py-16 sm:py-28 relative overflow-hidden">
			{/* Decorative Background Atmospheric Layer */}
			<div className="pointer-events-none absolute top-0 left-1/2 h-[350px] w-[600px] -translate-x-1/2 rounded-full bg-primary/5 blur-[100px]" />

			<div className="mx-auto max-w-5xl px-6 lg:px-10 relative">
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
								<p className="mt-3 text-pretty text-muted-foreground text-sm leading-relaxed max-w-[45ch]">
									{featuredPost.excerpt}
								</p>
								<div className="mt-8 flex items-center justify-between border-t border-border/20 pt-4">
									<span className="text-muted-foreground text-xs">{featuredPost.date}</span>
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
							<p className="mt-2.5 flex-1 text-pretty text-muted-foreground text-xs sm:text-sm leading-relaxed max-w-[45ch]">
								{post.excerpt}
							</p>
							<div className="mt-6 flex items-center justify-between border-t border-border/20 pt-4">
								<span className="text-muted-foreground text-xs">{post.date}</span>
								<div className="h-6 w-6 flex items-center justify-center border border-border/40 bg-muted/20 text-muted-foreground transition-all duration-300 group-hover:border-primary/20 group-hover:bg-primary/5 group-hover:text-primary rounded-none">
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

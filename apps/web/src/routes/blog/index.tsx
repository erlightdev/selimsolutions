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
		<section className="bg-background py-16 sm:py-24">
			<div className="mx-auto max-w-5xl px-6 lg:px-10">
				{/* Page Header */}
				<div className="max-w-3xl">
					<p className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-primary">
						Selim Solution Research
					</p>
					<h1 className="mt-4 text-balance font-serif text-4xl text-foreground leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
						Insights from the security floor
					</h1>
					<p className="mt-5 max-w-xl text-pretty text-muted-foreground text-sm leading-relaxed sm:text-base">
						Field notes, threat breakdowns, manual VAPT exploit playbooks, and continuous compliance strategies written directly by our security operations analysts.
					</p>
				</div>

				{/* Filter Badges Row */}
				<div className="mt-12 flex flex-wrap gap-2 border-b border-border/40 pb-6">
					{categories.map((cat) => {
						const isSelected = activeCategory === cat;
						return (
							<button
								key={cat}
								onClick={() => setActiveTab(cat)}
								type="button"
								className={`px-4 py-2 text-xs font-semibold uppercase tracking-wider border rounded-none transition-all duration-200 active:scale-[0.96] ${
									isSelected
										? "bg-primary border-primary text-primary-foreground shadow-sm"
										: "bg-muted/10 border-border text-muted-foreground hover:text-foreground hover:border-foreground/20"
								}`}
							>
								{cat}
							</button>
						);
					})}
				</div>

				{/* Featured Post Showcase (only shown when 'All' is selected) */}
				{activeCategory === "All" && featuredPost && (
					<div className="mt-12">
						<Link
							to="/blog/$slug"
							params={{ slug: featuredPost.slug }}
							className="group flex flex-col gap-6 rounded-none border border-border bg-card p-5 transition-all duration-250 hover:border-foreground/20 hover:shadow-[0_4px_12px_rgba(0,0,0,0.02)] active:scale-[0.99] lg:flex-row lg:p-8"
						>
							<div className="aspect-16/10 w-full overflow-hidden rounded-none bg-muted lg:w-1/2">
								<img
									src={featuredPost.img}
									alt={featuredPost.title}
									loading="eager"
									className="h-full w-full object-cover transition-transform duration-350 ease-out group-hover:scale-105"
								/>
							</div>
							<div className="flex flex-1 flex-col justify-center">
								<div className="flex items-center gap-3">
									<Badge variant="secondary" className="rounded-none font-semibold uppercase tracking-wider text-[10px]">
										{featuredPost.category}
									</Badge>
									<span className="flex items-center gap-1.5 text-muted-foreground text-xs font-medium">
										<Clock className="h-3.5 w-3.5" />
										{featuredPost.readTime}
									</span>
								</div>
								<h2 className="mt-4 text-balance font-serif text-2xl text-foreground leading-snug tracking-tight sm:text-3xl">
									{featuredPost.title}
								</h2>
								<p className="mt-3 text-pretty text-muted-foreground text-sm leading-relaxed">
									{featuredPost.excerpt}
								</p>
								<div className="mt-6 flex items-center justify-between border-t border-border/20 pt-4">
									<span className="text-muted-foreground text-xs">{featuredPost.date}</span>
									<span className="inline-flex items-center gap-1.5 font-bold text-primary text-sm">
										Read article
										<ArrowRight className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-1" />
									</span>
								</div>
							</div>
						</Link>
					</div>
				)}

				{/* Post Grid */}
				<div className={`mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 ${activeCategory !== "All" ? "mt-12" : ""}`}>
					{gridPosts.map((post) => (
						<Link
							key={post.slug}
							to="/blog/$slug"
							params={{ slug: post.slug }}
							className="group flex flex-col rounded-none border border-border bg-card p-5 transition-all duration-250 hover:border-foreground/20 hover:shadow-[0_4px_12px_rgba(0,0,0,0.02)] active:scale-[0.98]"
						>
							<div className="aspect-16/10 w-full overflow-hidden rounded-none bg-muted">
								<img
									src={post.img}
									alt={post.title}
									loading="lazy"
									className="h-full w-full object-cover transition-transform duration-350 ease-out group-hover:scale-105"
								/>
							</div>
							<div className="mt-5 flex items-center gap-3">
								<Badge variant="outline" className="rounded-none font-semibold uppercase tracking-wider text-[10px]">
									{post.category}
								</Badge>
								<span className="flex items-center gap-1.5 text-muted-foreground text-xs font-medium">
									<Clock className="h-3.5 w-3.5" />
									{post.readTime}
								</span>
							</div>
							<h3 className="mt-3 text-balance font-serif text-lg sm:text-xl text-foreground leading-snug tracking-tight">
								{post.title}
							</h3>
							<p className="mt-2.5 flex-1 text-pretty text-muted-foreground text-xs sm:text-sm leading-relaxed">
								{post.excerpt}
							</p>
							<div className="mt-6 flex items-center justify-between border-t border-border/20 pt-4">
								<span className="text-muted-foreground text-xs">{post.date}</span>
								<ArrowUpRight className="h-4 w-4 text-muted-foreground/40 transition-colors group-hover:text-primary" />
							</div>
						</Link>
					))}
				</div>
			</div>
		</section>
	);
}

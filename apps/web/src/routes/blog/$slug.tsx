import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Clock, ArrowLeft, ArrowUpRight, Share2, Copy } from "lucide-react";
import { blogPosts } from "@/data/blog";
import { Badge } from "@selimsolutions/ui/components/badge";
import { Separator } from "@selimsolutions/ui/components/separator";
import { useState } from "react";

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 24 24" fill="currentColor" {...props}>
		<path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
	</svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
	<svg viewBox="0 0 24 24" fill="currentColor" {...props}>
		<path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H10.95V9H14.4v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z" />
	</svg>
);

export const Route = createFileRoute("/blog/$slug")({
	loader: async ({ params }) => {
		const post = blogPosts.find((p) => p.slug === params.slug);
		if (!post) {
			throw notFound();
		}
		return { post };
	},
	component: BlogPostDetailPage,
	head: ({ loaderData }) => {
		if (!loaderData?.post) return {};
		const { post } = loaderData;
		return {
			meta: [
				{ title: `${post.seoTitle} | Selim Solution Blog` },
				{ name: "description", content: post.seoDesc },
				{ property: "og:title", content: post.title },
				{ property: "og:description", content: post.seoDesc },
				{ property: "og:image", content: post.img },
			],
		};
	},
});

function BlogPostDetailPage() {
	const { post } = Route.useLoaderData();
	const [copied, setCopied] = useState(false);

	const relatedPosts = blogPosts
		.filter((p) => p.slug !== post.slug)
		.slice(0, 2);

	const copyLink = () => {
		navigator.clipboard.writeText(window.location.href);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	return (
		<article className="bg-background py-16 relative overflow-hidden">
			{/* Soft Ambient Background Light Layer */}
			<div className="pointer-events-none absolute top-0 left-1/2 h-[350px] w-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-[100px]" />

			<div className="mx-auto max-w-4xl px-6 lg:px-10 relative">
				{/* Back Navigation */}
				<Link
					to="/blog"
					className="group inline-flex items-center gap-2 text-muted-foreground text-[10px] font-bold uppercase tracking-widest transition-colors duration-150 hover:text-foreground mb-10"
				>
					<ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 ease-out-strong group-hover:-translate-x-1" />
					Back to insights
				</Link>

				{/* Header Metas */}
				<div className="anim-fade-up flex items-center gap-3">
					<Badge variant="secondary" className="rounded-none font-semibold uppercase tracking-wider text-[9px] px-2 py-0.5">
						{post.category}
					</Badge>
					<span className="flex items-center gap-1.5 text-muted-foreground text-xs font-semibold">
						<Clock className="h-3.5 w-3.5" />
						{post.readTime}
					</span>
					<span className="text-muted-foreground/30 text-xs">•</span>
					<span className="text-muted-foreground text-xs font-medium">{post.date}</span>
				</div>

				{/* Article Headline */}
				<h1 className="anim-fade-up mt-5 text-balance font-serif text-3xl sm:text-4xl lg:text-5xl text-foreground leading-[1.05] tracking-[-0.02em] [animation-delay:40ms]">
					{post.title}
				</h1>

				{/* Article Hero Image */}
				<div className="anim-fade-up mt-10 aspect-21/9 w-full overflow-hidden rounded-none bg-muted border border-border/40 [animation-delay:80ms]">
					<img
						src={post.img}
						alt={post.title}
						className="h-full w-full object-cover"
					/>
				</div>

				{/* Content Shell with Optimal Line Width for Prose */}
				<div className="anim-fade-up mt-12 flex flex-col gap-10 md:flex-row items-start [animation-delay:120ms]">
					{/* Share Side Rail (Desktop) */}
					<div className="sticky top-28 hidden md:flex flex-col gap-5 border border-border/40 bg-muted/10 p-3 rounded-none">
						<button
							onClick={copyLink}
							type="button"
							className="text-muted-foreground hover:text-primary transition-property:transform,color duration-150 ease-out-strong relative active:scale-[0.92]"
							title="Copy article link"
						>
							<Copy className="h-4 w-4" />
							{copied && (
								<span className="absolute left-full ml-3 text-[9px] bg-foreground text-background px-2 py-0.5 rounded-none font-bold uppercase tracking-wider whitespace-nowrap anim-fade-up">
									Copied
								</span>
							)}
						</button>
						<a
							href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
							target="_blank"
							rel="noreferrer"
							className="text-muted-foreground hover:text-primary transition-colors duration-150 active:scale-[0.92]"
							title="Share on X"
						>
							<TwitterIcon className="h-4 w-4" />
						</a>
						<a
							href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
							target="_blank"
							rel="noreferrer"
							className="text-muted-foreground hover:text-primary transition-colors duration-150 active:scale-[0.92]"
							title="Share on LinkedIn"
						>
							<LinkedinIcon className="h-4 w-4" />
						</a>
					</div>

					{/* Article Body (Optimized Line-Width & High-End Type Spacing) */}
					<div className="flex-1 max-w-[65ch] text-pretty text-foreground/80 text-[17px] leading-[1.8] font-normal">
						{post.content.split("\n\n").map((para, i) => {
							const text = para.trim();
							if (!text) return null;

							// Check if it's an H2 header
							if (text.startsWith("## ")) {
								return (
									<h2 key={i} className="font-serif text-xl sm:text-2xl text-foreground mt-10 mb-4 tracking-tight font-semibold border-b border-border/20 pb-2">
										{text.replace("## ", "")}
									</h2>
								);
							}
							
							// Check if it's an H1 header
							if (text.startsWith("# ")) {
								return null; // Already rendered main H1
							}

							// Check if it's a separator
							if (text === "---") {
								return <Separator key={i} className="my-10" />;
							}

							// Check if it's a bullet list block
							if (text.startsWith("* ") || text.startsWith("- ")) {
								const items = text.split("\n").map(li => li.replace(/^[*-\s]+/, ""));
								return (
									<ul key={i} className="flex flex-col gap-3 my-6 pl-1 text-muted-foreground">
										{items.map((item, idx) => (
											<li key={idx} className="flex items-start gap-3">
												<span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-none bg-primary/40" />
												<span className="text-pretty">{item}</span>
											</li>
										))}
									</ul>
								);
							}

							// Check if it's a numbered list block
							if (/^\d+\./.test(text)) {
								const items = text.split("\n").map(li => li.replace(/^\d+\.\s+/, ""));
								return (
									<ol key={i} className="flex flex-col gap-3 my-6 pl-1 text-muted-foreground">
										{items.map((item, idx) => (
											<li key={idx} className="flex items-start gap-3">
												<span className="font-mono text-xs text-primary font-bold mt-0.5 shrink-0">
													{idx + 1}.
												</span>
												<span className="text-pretty">{item}</span>
											</li>
										))}
									</ol>
								);
							}

							// Standard Paragraph
							return (
								<p key={i} className="mb-6">
									{text}
								</p>
							);
						})}
					</div>
				</div>

				<Separator className="my-16" />

				{/* Tactile diagnostic audit CTA card */}
				<div className="anim-fade-up border border-border/40 bg-card p-6 sm:p-10 rounded-none mb-20 text-center relative overflow-hidden [animation-delay:160ms]">
					<div className="absolute top-0 right-0 h-40 w-40 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
					<h3 className="font-serif text-2xl text-foreground tracking-tight leading-snug">
						Secure your cloud infrastructure today
					</h3>
					<p className="mt-4 text-xs sm:text-sm text-muted-foreground max-w-xl mx-auto leading-relaxed">
						Ensure continuous compliance audits and eliminate critical zero-day exploits. Schedule a comprehensive manual penetration audit with Kathmandu's expert engineering team.
					</p>
					<div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
						<Link
							to="/certifications"
							className="px-5 py-3 border border-border/40 bg-muted/10 text-[10px] font-bold uppercase tracking-widest rounded-none active:scale-[0.96] transition-transform hover:bg-muted/30"
						>
							Certifications portal
						</Link>
						<a
							href="mailto:info@selimsolution.com"
							className="px-5 py-3 bg-primary border border-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest rounded-none active:scale-[0.96] transition-transform hover:opacity-95"
						>
							Book a consultation
						</a>
					</div>
				</div>

				{/* Related Posts Grid (SEO internal link-juice optimization) */}
				<div className="anim-fade-up [animation-delay:200ms]">
					<h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.25em] text-primary mb-8">
						Keep reading related insights
					</h3>
					<div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
						{relatedPosts.map((post) => (
							<Link
								key={post.slug}
								to="/blog/$slug"
								params={{ slug: post.slug }}
								className="group flex flex-col rounded-none border border-border/40 bg-card p-5 transition-all duration-300 hover:border-foreground/15 hover:shadow-lg active:scale-[0.98]"
							>
								<div className="aspect-16/10 w-full overflow-hidden rounded-none bg-muted border border-border/20">
									<img
										src={post.img}
										alt={post.title}
										loading="lazy"
										className="h-full w-full object-cover transition-transform duration-500 ease-out-strong group-hover:scale-102"
									/>
								</div>
								<h4 className="mt-4 font-serif text-base text-foreground leading-snug tracking-tight transition-colors duration-200 group-hover:text-primary">
									{post.title}
								</h4>
								<p className="mt-2 text-pretty text-muted-foreground text-xs leading-relaxed line-clamp-2 max-w-[45ch]">
									{post.excerpt}
								</p>
								<div className="mt-4 flex items-center justify-between border-t border-border/20 pt-3">
									<span className="text-muted-foreground text-[10px]">{post.date}</span>
									<div className="h-6 w-6 flex items-center justify-center border border-border/40 bg-muted/20 text-muted-foreground transition-all duration-300 group-hover:border-primary/20 group-hover:bg-primary/5 group-hover:text-primary rounded-none">
										<ArrowUpRight className="h-3 w-3" />
									</div>
								</div>
							</Link>
						))}
					</div>
				</div>
			</div>
		</article>
	);
}

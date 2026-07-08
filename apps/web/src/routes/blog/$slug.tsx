import { Badge } from "@selimsolutions/ui/components/badge";
import { Separator } from "@selimsolutions/ui/components/separator";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Clock, Copy, Share2 } from "lucide-react";
import { useState } from "react";
import { blogPosts } from "@/data/blog";

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
		<article className="relative overflow-hidden bg-background py-16">
			{/* Soft Ambient Background Light Layer */}
			<div className="pointer-events-none absolute top-0 left-1/2 h-[350px] w-[500px] -translate-x-1/2 rounded-full bg-primary/5 blur-[100px]" />

			<div className="relative mx-auto max-w-6xl px-6 lg:px-10">
				{/* Back Navigation */}
				<Link
					to="/blog"
					className="group mb-10 inline-flex items-center gap-2 font-bold text-[10px] text-muted-foreground uppercase tracking-widest transition-colors duration-150 hover:text-foreground"
				>
					<ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 ease-out-strong group-hover:-translate-x-1" />
					Back to insights
				</Link>

				{/* Header Metas */}
				<div className="anim-fade-up flex items-center gap-3">
					<Badge
						variant="secondary"
						className="rounded-none px-2 py-0.5 font-semibold text-[9px] uppercase tracking-wider"
					>
						{post.category}
					</Badge>
					<span className="flex items-center gap-1.5 font-semibold text-muted-foreground text-xs">
						<Clock className="h-3.5 w-3.5" />
						{post.readTime}
					</span>
					<span className="text-muted-foreground/30 text-xs">•</span>
					<span className="font-medium text-muted-foreground text-xs">
						{post.date}
					</span>
				</div>

				{/* Article Headline */}
				<h1 className="anim-fade-up mt-5 text-balance font-serif text-3xl text-foreground leading-[1.05] tracking-[-0.02em] [animation-delay:40ms] sm:text-4xl lg:text-5xl">
					{post.title}
				</h1>

				{/* Article Hero Image */}
				<div className="anim-fade-up mt-10 aspect-21/9 w-full overflow-hidden rounded-none border border-border/40 bg-muted [animation-delay:80ms]">
					<img
						src={post.img}
						alt={post.title}
						className="h-full w-full object-cover"
					/>
				</div>

				{/* Content Shell with Optimal Line Width for Prose */}
				<div className="anim-fade-up mt-12 flex flex-col items-start gap-10 [animation-delay:120ms] md:flex-row">
					{/* Share Side Rail (Desktop) */}
					<div className="sticky top-28 hidden flex-col gap-5 rounded-none border border-border/40 bg-muted/10 p-3 md:flex">
						<button
							onClick={copyLink}
							type="button"
							className="transition-property:transform,color relative text-muted-foreground duration-150 ease-out-strong hover:text-primary active:scale-[0.92]"
							title="Copy article link"
						>
							<Copy className="h-4 w-4" />
							{copied && (
								<span className="anim-fade-up absolute left-full ml-3 whitespace-nowrap rounded-none bg-foreground px-2 py-0.5 font-bold text-[9px] text-background uppercase tracking-wider">
									Copied
								</span>
							)}
						</button>
						<a
							href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
							target="_blank"
							rel="noreferrer"
							className="text-muted-foreground transition-colors duration-150 hover:text-primary active:scale-[0.92]"
							title="Share on X"
						>
							<TwitterIcon className="h-4 w-4" />
						</a>
						<a
							href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(typeof window !== "undefined" ? window.location.href : "")}`}
							target="_blank"
							rel="noreferrer"
							className="text-muted-foreground transition-colors duration-150 hover:text-primary active:scale-[0.92]"
							title="Share on LinkedIn"
						>
							<LinkedinIcon className="h-4 w-4" />
						</a>
					</div>

					{/* Article Body (Optimized Line-Width & High-End Type Spacing) */}
					<div className="max-w-[65ch] flex-1 text-pretty font-normal text-[17px] text-foreground/80 leading-[1.8]">
						{post.content.split("\n\n").map((para, i) => {
							const text = para.trim();
							if (!text) return null;

							// Check if it's an H2 header
							if (text.startsWith("## ")) {
								return (
									<h2
										key={i}
										className="mt-10 mb-4 border-border/20 border-b pb-2 font-semibold font-serif text-foreground text-xl tracking-tight sm:text-2xl"
									>
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
								const items = text
									.split("\n")
									.map((li) => li.replace(/^[*-\s]+/, ""));
								return (
									<ul
										key={i}
										className="my-6 flex flex-col gap-3 pl-1 text-muted-foreground"
									>
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
								const items = text
									.split("\n")
									.map((li) => li.replace(/^\d+\.\s+/, ""));
								return (
									<ol
										key={i}
										className="my-6 flex flex-col gap-3 pl-1 text-muted-foreground"
									>
										{items.map((item, idx) => (
											<li key={idx} className="flex items-start gap-3">
												<span className="mt-0.5 shrink-0 font-bold font-mono text-primary text-xs">
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
				<div className="anim-fade-up relative mb-20 overflow-hidden rounded-none border border-border/40 bg-card p-6 text-center [animation-delay:160ms] sm:p-10">
					<div className="pointer-events-none absolute top-0 right-0 h-40 w-40 rounded-full bg-primary/5 blur-3xl" />
					<h3 className="font-serif text-2xl text-foreground leading-snug tracking-tight">
						Secure your cloud infrastructure today
					</h3>
					<p className="mx-auto mt-4 max-w-xl text-muted-foreground text-xs leading-relaxed sm:text-sm">
						Ensure continuous compliance audits and eliminate critical zero-day
						exploits. Schedule a comprehensive manual penetration audit with
						Kathmandu's expert engineering team.
					</p>
					<div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
						<Link
							to="/certifications"
							className="rounded-none border border-border/40 bg-muted/10 px-5 py-3 font-bold text-[10px] uppercase tracking-widest transition-transform hover:bg-muted/30 active:scale-[0.96]"
						>
							Certifications portal
						</Link>
						<a
							href="mailto:contact@selim.solutions"
							className="rounded-none border border-primary bg-primary px-5 py-3 font-bold text-[10px] text-primary-foreground uppercase tracking-widest transition-transform hover:opacity-95 active:scale-[0.96]"
						>
							Book a consultation
						</a>
					</div>
				</div>

				{/* Related Posts Grid (SEO internal link-juice optimization) */}
				<div className="anim-fade-up [animation-delay:200ms]">
					<h3 className="mb-8 font-bold font-mono text-[10px] text-primary uppercase tracking-[0.25em]">
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
								<div className="aspect-16/10 w-full overflow-hidden rounded-none border border-border/20 bg-muted">
									<img
										src={post.img}
										alt={post.title}
										loading="lazy"
										className="h-full w-full object-cover transition-transform duration-500 ease-out-strong group-hover:scale-102"
									/>
								</div>
								<h4 className="mt-4 font-serif text-foreground text-lg leading-snug tracking-tight transition-colors duration-200 group-hover:text-primary">
									{post.title}
								</h4>
								<p className="mt-2 line-clamp-2 text-pretty text-foreground/70 text-sm leading-relaxed dark:text-zinc-300">
									{post.excerpt}
								</p>
								<div className="mt-5 flex items-center justify-between border-border/20 border-t pt-4">
									<span className="text-foreground/50 text-xs">
										{post.date}
									</span>
									<div className="flex h-6 w-6 items-center justify-center rounded-none border border-border/40 bg-muted/20 text-foreground/60 transition-all duration-300 group-hover:border-primary/20 group-hover:bg-primary/5 group-hover:text-primary">
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

import { ArrowRight, ArrowUpRight, Clock } from "lucide-react";

type Post = {
	category: string;
	title: string;
	excerpt: string;
	date: string;
	readTime: string;
	href: string;
	img: string;
	featured?: boolean;
};

const IMG =
	"https://images.unsplash.com/photo-PLACEHOLDER?w=900&q=80&auto=format&fit=crop";

const posts: readonly Post[] = [
	{
		category: "Threat Intel",
		title: "Inside a 3 AM credential-stuffing attack — and how our SOC stopped it",
		excerpt:
			"A real timeline of detection, triage, and containment from the Kathmandu floor. What the telemetry showed, and the five minutes that mattered most.",
		date: "Jun 12, 2026",
		readTime: "8 min read",
		href: "/case-studies",
		img: IMG.replace("PLACEHOLDER", "1550751827-4bd374c3f58b"),
		featured: true,
	},
	{
		category: "VAPT",
		title: "The vulnerability three vendors missed",
		excerpt:
			"How a chained misconfiguration slipped past automated scans — and the manual testing that caught it.",
		date: "Jun 4, 2026",
		readTime: "6 min read",
		href: "/case-studies",
		img: IMG.replace("PLACEHOLDER", "1563013544-824ae1b704d3"),
	},
	{
		category: "Compliance",
		title: "ISO 27001 readiness in weeks, not quarters",
		excerpt:
			"A pragmatic control-mapping approach that turns audits from dread into a checklist you actually trust.",
		date: "May 28, 2026",
		readTime: "5 min read",
		href: "/case-studies",
		img: IMG.replace("PLACEHOLDER", "1518770660439-4636190af475"),
	},
];

function PostThumb({ img, alt }: { img: string; alt: string }) {
	return (
		<div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl bg-muted">
			<img
				src={img}
				alt={alt}
				loading="lazy"
				className="h-full w-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
			/>
			<div className="absolute inset-0 bg-linear-to-t from-black/40 to-transparent" />
		</div>
	);
}

function FeaturedCard({ post }: { post: Post }) {
	return (
		<a
			href={post.href}
			className="group flex flex-col gap-6 rounded-3xl border border-border bg-card p-5 transition-colors hover:border-[#405cfe]/50 lg:flex-row lg:p-6"
		>
			<div className="lg:w-1/2">
				<PostThumb img={post.img} alt={post.title} />
			</div>
			<div className="flex flex-1 flex-col justify-center">
				<div className="flex items-center gap-3">
					<span className="rounded-full bg-[#405cfe]/10 px-3 py-1 font-medium text-[#405cfe] text-xs">
						{post.category}
					</span>
					<span className="flex items-center gap-1.5 text-muted-foreground text-xs">
						<Clock className="h-3.5 w-3.5" />
						{post.readTime}
					</span>
				</div>
				<h3 className="mt-4 text-balance font-serif text-2xl text-foreground leading-snug tracking-tight sm:text-3xl">
					{post.title}
				</h3>
				<p className="mt-3 text-pretty text-muted-foreground text-sm leading-relaxed">
					{post.excerpt}
				</p>
				<div className="mt-6 flex items-center justify-between">
					<span className="text-muted-foreground text-xs">{post.date}</span>
					<span className="inline-flex items-center gap-1.5 font-medium text-[#405cfe] text-sm">
						Read insight
						<ArrowRight className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5" />
					</span>
				</div>
			</div>
		</a>
	);
}

function PostCard({ post }: { post: Post }) {
	return (
		<a
			href={post.href}
			className="group flex flex-col rounded-3xl border border-border bg-card p-5 transition-colors hover:border-[#405cfe]/50"
		>
			<PostThumb img={post.img} alt={post.title} />
			<div className="mt-5 flex items-center gap-3">
				<span className="rounded-full bg-[#405cfe]/10 px-3 py-1 font-medium text-[#405cfe] text-xs">
					{post.category}
				</span>
				<span className="flex items-center gap-1.5 text-muted-foreground text-xs">
					<Clock className="h-3.5 w-3.5" />
					{post.readTime}
				</span>
			</div>
			<h3 className="mt-3 text-balance font-serif text-xl text-foreground leading-snug tracking-tight">
				{post.title}
			</h3>
			<p className="mt-2.5 flex-1 text-pretty text-muted-foreground text-sm leading-relaxed">
				{post.excerpt}
			</p>
			<span className="mt-5 text-muted-foreground text-xs">{post.date}</span>
		</a>
	);
}

export default function BlogInsights() {
	const [featured, ...rest] = posts;

	return (
		<section className="bg-background py-16">
			<div className="mx-auto max-w-7xl px-6 lg:px-10">
				{/* Header */}
				<div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
					<div className="max-w-xl">
						<p className="font-medium font-mono text-xs uppercase tracking-[0.3em]">
							<span className="bg-linear-to-r from-[#405cfe] to-[#7d8efc] bg-clip-text text-transparent">
								Insights
							</span>
						</p>
						<h2 className="mt-5 text-balance font-serif text-4xl text-foreground leading-[1.1] tracking-tight sm:text-5xl">
							From the security floor
						</h2>
						<p className="mt-4 text-pretty text-muted-foreground text-sm leading-relaxed sm:text-base">
							Field notes, threat breakdowns, and compliance playbooks — written
							by the analysts defending Nepal's digital frontier.
						</p>
					</div>
					<a
						href="/case-studies"
						className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-xl border border-border bg-muted px-5 py-2.5 font-medium text-foreground text-sm transition-colors hover:bg-muted/70"
					>
						All insights
						<ArrowUpRight className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
					</a>
				</div>

				{/* Featured */}
				<div className="mt-14">
					<FeaturedCard post={featured} />
				</div>

				{/* Grid */}
				<div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
					{rest.map((post) => (
						<PostCard key={post.title} post={post} />
					))}
				</div>
			</div>
		</section>
	);
}

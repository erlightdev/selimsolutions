import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles } from "lucide-react";

import { Badge } from "@selimsolutions/ui/components/badge";

import { sectorHighlights, solutionItems } from "@/data/offerings";

export const Route = createFileRoute("/solutions")({
	component: SolutionsPage,
	head: () => ({
		meta: [
			{ title: "Industry Security Solutions | Selim Solution" },
			{
				name: "description",
				content:
					"Explore Selim Solution security solutions for banking, insurance, government, telecom, healthcare, education, and NGOs.",
			},
		],
	}),
});

function SolutionsPage() {
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
			<div className="pointer-events-none absolute top-0 left-1/2 z-0 h-[520px] w-full max-w-7xl -translate-x-1/2 bg-[radial-gradient(42%_42%_at_50%_0%,rgba(0,98,227,0.14),transparent_100%)]" />

			<div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
				<div className="grid gap-12 lg:grid-cols-12 lg:items-start">
					<div className="lg:col-span-7">
						<Badge
							variant="outline"
							className="rounded-none border-primary/20 bg-primary/5 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-widest text-primary"
						>
							Solutions
						</Badge>
						<h1 className="mt-6 max-w-4xl text-balance font-serif text-4xl text-foreground leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
							Security programs tuned to how each sector actually operates.
						</h1>
						<p className="mt-6 max-w-2xl text-pretty text-base text-foreground/75 leading-relaxed dark:text-zinc-300 sm:text-lg">
							We shape monitoring, escalation, and control priorities around industry-specific systems, operational pressure, and data sensitivity.
						</p>
					</div>
					<div className="lg:col-span-5 lg:pt-4">
						<div className="border border-border/30 bg-card p-7 sm:p-8">
							<div className="flex items-center gap-2 text-[#405cfe]">
								<Sparkles className="h-4 w-4" />
								<p className="font-semibold text-foreground text-sm">How we adapt</p>
							</div>
							<ul className="mt-5 space-y-3">
								{sectorHighlights.map((item) => (
									<li key={item} className="text-foreground/75 text-sm leading-relaxed dark:text-zinc-300 sm:text-base">
										{item}
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>

				<div className="mt-20 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
					{solutionItems.map(({ label, href, description, icon: Icon }) => {
						const id = href.split("#")[1] ?? undefined;

						return (
							<section
								key={label}
								id={id}
								className="rounded-none border border-border/30 bg-card p-7 transition-colors duration-200 hover:border-primary/35"
							>
								<div className="flex h-11 w-11 items-center justify-center rounded-none border border-border/30 bg-foreground/[0.02] text-primary">
									<Icon className="h-5 w-5" />
								</div>
								<h2 className="mt-5 font-serif text-2xl text-foreground leading-tight">
									{label}
								</h2>
								<p className="mt-4 text-pretty text-sm leading-relaxed text-foreground/75 dark:text-zinc-300 sm:text-base">
									{description}
								</p>
								<Link
									to="/free-assessment"
									className="group mt-6 inline-flex items-center gap-2 font-semibold text-foreground text-sm"
								>
									Discuss this sector
									<ArrowRight className="h-4 w-4 text-[#405cfe] transition-transform duration-150 ease-out group-hover:translate-x-0.5" />
								</Link>
							</section>
						);
					})}
				</div>
			</div>
		</section>
	);
}

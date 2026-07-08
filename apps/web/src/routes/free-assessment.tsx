import { Badge } from "@selimsolutions/ui/components/badge";
import { createFileRoute } from "@tanstack/react-router";
import {
	ArrowRight,
	ArrowUpRight,
	Clock3,
	FileCheck,
	Radar,
	ShieldCheck,
	Waypoints,
} from "lucide-react";

export const Route = createFileRoute("/free-assessment")({
	component: FreeAssessmentPage,
	head: () => ({
		meta: [
			{ title: "Free Security Assessment | Selim Solution" },
			{
				name: "description",
				content:
					"Request a free security assessment from Selim Solution. Review monitoring gaps, incident readiness, and priority risks with our security team.",
			},
		],
	}),
});

const assessmentAreas = [
	{
		title: "Visibility gaps",
		detail:
			"We review what is and is not being monitored across endpoints, identities, cloud systems, and network traffic.",
		icon: Radar,
	},
	{
		title: "Incident readiness",
		detail:
			"We check escalation paths, alert triage maturity, and the current ability to contain suspicious activity quickly.",
		icon: ShieldCheck,
	},
	{
		title: "Priority risks",
		detail:
			"We identify the exposures most likely to affect operations, compliance, and business continuity first.",
		icon: Waypoints,
	},
] as const;

const process = [
	"Share your current tools, infrastructure, and main concerns.",
	"We map the most important monitoring and response gaps.",
	"You get a concise summary with recommended next steps.",
] as const;

const deliverables = [
	"Initial monitoring posture review",
	"High-priority risk summary",
	"Response and containment recommendations",
	"Suggested service fit across SOC, VAPT, cloud, or compliance",
] as const;

function FreeAssessmentPage() {
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

			<div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10">
				<div className="grid gap-12 lg:grid-cols-12 lg:items-start">
					<div className="lg:col-span-7">
						<Badge
							variant="outline"
							className="rounded-none border-primary/20 bg-primary/5 px-3.5 py-1.5 font-mono text-[11px] text-primary uppercase tracking-widest"
						>
							Free Assessment
						</Badge>
						<h1 className="mt-6 max-w-4xl text-balance font-serif text-4xl text-foreground leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
							See where your security posture breaks before an attacker does.
						</h1>
						<p className="mt-6 max-w-2xl text-pretty text-base text-foreground/75 leading-relaxed sm:text-lg dark:text-zinc-300">
							A short working session with our team to review visibility gaps,
							incident readiness, and the highest-priority risks across your
							environment.
						</p>
						<div className="mt-8 flex flex-col gap-3 sm:flex-row">
							<a
								href="/contact"
								className="inline-flex items-center justify-center gap-2 rounded-none border border-primary bg-primary px-5 py-3 font-semibold text-primary-foreground text-sm transition-colors duration-150 hover:bg-primary/90"
							>
								Book the assessment
								<ArrowRight className="h-4 w-4" />
							</a>
							<a
								href="mailto:contact@selim.solutions?subject=Free%20Security%20Assessment"
								className="inline-flex items-center justify-center gap-2 rounded-none border border-border/30 bg-foreground/[0.02] px-5 py-3 font-medium text-foreground/80 text-sm transition-colors duration-150 hover:border-primary/30 hover:text-foreground"
							>
								Email security team
								<ArrowUpRight className="h-4 w-4" />
							</a>
						</div>
					</div>

					<div className="lg:col-span-5 lg:pt-3">
						<div className="border border-border/30 bg-card p-7 sm:p-8">
							<div className="flex items-center gap-3">
								<div className="flex h-11 w-11 items-center justify-center border border-primary/20 bg-primary/5 text-primary">
									<Clock3 className="h-5 w-5" />
								</div>
								<div>
									<p className="font-mono text-[11px] text-primary/70 uppercase tracking-widest">
										What you get
									</p>
									<h2 className="mt-1 font-serif text-2xl text-foreground sm:text-3xl">
										Clear next steps.
									</h2>
								</div>
							</div>
							<div className="mt-8 space-y-4">
								{deliverables.map((item) => (
									<div key={item} className="flex gap-3">
										<span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
											<FileCheck className="h-3.5 w-3.5" />
										</span>
										<p className="text-pretty text-foreground/75 text-sm leading-relaxed sm:text-base dark:text-zinc-300">
											{item}
										</p>
									</div>
								))}
							</div>
						</div>
					</div>
				</div>

				<div className="mt-20 grid gap-4 md:grid-cols-3">
					{assessmentAreas.map(({ title, detail, icon: Icon }) => (
						<div
							key={title}
							className="rounded-none border border-border/30 bg-card p-7 transition-colors duration-200 hover:border-primary/35"
						>
							<div className="flex h-11 w-11 items-center justify-center rounded-none border border-border/30 bg-foreground/[0.02] text-primary">
								<Icon className="h-5 w-5" />
							</div>
							<h2 className="mt-5 font-serif text-2xl text-foreground leading-tight">
								{title}
							</h2>
							<p className="mt-4 text-pretty text-foreground/75 text-sm leading-relaxed sm:text-base dark:text-zinc-300">
								{detail}
							</p>
						</div>
					))}
				</div>

				<div className="mt-20 grid gap-10 lg:grid-cols-12">
					<div className="lg:col-span-7">
						<Badge
							variant="outline"
							className="rounded-none border-primary/20 bg-primary/5 px-3.5 py-1.5 font-mono text-[11px] text-primary uppercase tracking-widest"
						>
							Assessment Process
						</Badge>
						<div className="mt-6 grid gap-px overflow-hidden border border-foreground/10 bg-foreground/10">
							{process.map((step, index) => (
								<div
									key={step}
									className="bg-background px-6 py-7 sm:px-8 sm:py-8"
								>
									<p className="font-mono text-[11px] text-primary/70 uppercase tracking-widest">
										Step 0{index + 1}
									</p>
									<p className="mt-3 max-w-[60ch] text-pretty font-serif text-2xl text-foreground leading-tight sm:text-[2rem]">
										{step}
									</p>
								</div>
							))}
						</div>
					</div>

					<div className="lg:col-span-5">
						<div className="border border-border/30 bg-foreground/[0.02] p-7 sm:p-8">
							<p className="font-mono text-[11px] text-primary/70 uppercase tracking-widest">
								Best fit
							</p>
							<h2 className="mt-2 font-serif text-3xl text-foreground leading-tight">
								For teams that need signal, not noise.
							</h2>
							<p className="mt-5 text-pretty text-foreground/75 text-sm leading-relaxed sm:text-base dark:text-zinc-300">
								This is designed for organizations evaluating SOC coverage,
								preparing for compliance pressure, or trying to reduce blind
								spots before scaling security operations.
							</p>
							<a
								href="/contact"
								className="mt-8 inline-flex items-center gap-2 font-semibold text-primary text-sm transition-colors hover:text-primary/80"
							>
								Talk to the team
								<ArrowRight className="h-4 w-4" />
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

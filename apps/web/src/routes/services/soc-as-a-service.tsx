import { Badge } from "@selimsolutions/ui/components/badge";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
	Activity,
	ArrowLeft,
	ArrowRight,
	Database,
	ShieldAlert,
} from "lucide-react";

import {
	CmsFaqSection,
	CmsRichBodySection,
	CmsStepsSection,
	CmsTestimonialSection,
	CmsUseCasesSection,
} from "@/components/cms-detail-sections";
import { useCmsPageData } from "@/hooks/use-cms-page";

export const Route = createFileRoute("/services/soc-as-a-service")({
	component: SocServicePage,
	head: () => ({
		meta: [
			{ title: "24/7 Managed SOC as a Service | Selim Solution" },
			{
				name: "description",
				content:
					"Analyst-led 24/7 security operations center (SOC). Real-time syslog aggregation, continuous correlation rules, and rapid threat containment by our expert team in Kathmandu.",
			},
		],
	}),
});

const useCases = [
	{
		number: "01",
		title: "3 AM Compromise Mitigation",
		description:
			"Our active night analysts identify credential-stuffing or remote privilege escalations and instantly coordinate endpoint lockdowns to isolate infected nodes.",
		metric: "< 15 Min MTTR",
	},
	{
		number: "02",
		title: "Multi-Source Telemetry Aggregation",
		description:
			"Unify system outputs across firewalls, cloud containers, active directories, and local databases into one central correlation pipeline.",
		metric: "Unified Console",
	},
	{
		number: "03",
		title: "Log Integrity & Masking",
		description:
			"Filter, mask, and securely forward database syslogs, ensuring absolute data privacy while satisfying local audit retention laws.",
		metric: "Sovereign Logging",
	},
] as const;

const steps = [
	{
		number: "01",
		title: "Collector Agent Rollout",
		subtitle:
			"Install lightweight log aggregation collectors and establish secure API connections to cloud workspace systems.",
	},
	{
		number: "02",
		title: "Rule Calibration & Tuning",
		subtitle:
			"Calibrate parsing rules and alert thresholds specifically mapped to match your company's normal active network levels.",
	},
	{
		number: "03",
		title: "24/7 Operations Coverage",
		subtitle:
			"Continuous threat monitoring begins. Our active triaging queues isolate threats and assist with incident recovery.",
	},
] as const;

const faqs = [
	{
		question: "How does your SOC team coordinate escalations?",
		answer:
			"We filter noisy events and only escalate verified, prioritized alerts. During critical incidents, we reach out immediately via your preferred hotlines, providing step-by-step containment guides.",
	},
	{
		question: "What types of telemetry can your SIEM ingest?",
		answer:
			"We ingest standard syslogs, endpoint events, cloud access tokens (Google, O365, AWS, Azure), database queries, and custom application server transactional logs.",
	},
	{
		question: "Do you provide on-premises log hosting options?",
		answer:
			"Yes. We configure and manage localized log aggregates that compile, filter, and mask logs locally, routing only structured threat indicators to our SOC center.",
	},
] as const;

function SocServicePage() {
	const { page, cms } = useCmsPageData("/services/soc-as-a-service", {
		hero: {
			eyebrow: "Core Security Operations",
			headline: "Round-the-clock analyst-led defense.",
			subheadline:
				"We run persistent security operations, log aggregation, and real-time SIEM correlation, backed by certified security analysts who monitor and lock down threats 24/7/365.",
			ctaLabel: "Request SOC Trial",
			ctaHref: "/free-assessment",
		},
		useCases: [...useCases],
		steps: [...steps],
		testimonial: {
			quote:
				"Selim's SOC flagged a credential-stuffing attack at 3 AM and contained it before a single account fell. Their team feels like an extension of ours.",
			author: "Aarav Shrestha",
			role: "CISO, Himalayan Bank",
		},
		faqs: [...faqs],
	});
	return (
		<section className="relative isolate overflow-hidden bg-background py-16 sm:py-24">
			{/* Grid Pattern and Ambient Light */}
			<div
				className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[720px] opacity-40 dark:opacity-60"
				style={{
					backgroundImage:
						"linear-gradient(to right, color-mix(in oklab, var(--foreground) 9%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--foreground) 9%, transparent) 1px, transparent 1px)",
					backgroundSize: "56px 56px",
					WebkitMaskImage:
						"radial-gradient(ellipse 65% 55% at 50% 0%, #000 45%, transparent 100%)",
					maskImage:
						"radial-gradient(ellipse 65% 55% at 50% 0%, #000 45%, transparent 100%)",
				}}
			/>
			<div className="pointer-events-none absolute top-0 left-1/2 z-0 h-[500px] w-full max-w-7xl -translate-x-1/2 bg-[radial-gradient(42%_42%_at_50%_0%,rgba(0,98,227,0.12),transparent_100%)]" />

			<div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
				{/* Back navigation */}
				<Link
					to="/services"
					className="group mb-12 inline-flex items-center gap-2 font-bold text-[10px] text-muted-foreground uppercase tracking-widest transition-colors duration-150 hover:text-foreground active:scale-[0.97]"
				>
					<ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 ease-out-strong group-hover:-translate-x-0.5" />
					Back to services
				</Link>

				{/* HERO SECTION */}
				<div className="grid gap-12 lg:grid-cols-12 lg:items-center">
					<div className="lg:col-span-6">
						<Badge
							variant="outline"
							className="rounded-none border-primary/20 bg-primary/5 px-3.5 py-1.5 font-mono text-[11px] text-primary uppercase tracking-widest"
						>
							{cms.hero?.eyebrow || "Core Security Operations"}
						</Badge>
						<h1 className="mt-6 text-balance font-serif text-4xl text-foreground leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
							{cms.hero?.headline || "Round-the-clock analyst-led defense."}
						</h1>
						<p className="mt-6 max-w-xl text-pretty text-base text-foreground/75 leading-relaxed sm:text-lg dark:text-zinc-300">
							{cms.hero?.subheadline}
						</p>
						<div className="mt-8 flex flex-wrap gap-4">
							<Link
								to={
									(cms.hero?.ctaHref ||
										"/free-assessment") as "/free-assessment"
								}
								className="group inline-flex items-center justify-center gap-2 rounded-none bg-primary px-6 py-3 font-semibold text-primary-foreground text-sm tracking-wide transition-all duration-150 hover:bg-primary/90 active:scale-[0.97]"
							>
								{cms.hero?.ctaLabel || "Request SOC Trial"}
								<ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
							</Link>
						</div>
					</div>

					{/* VISUAL IMAGE REPRESENTATION: Tactile Micro-Dashboard */}
					<div className="lg:col-span-6">
						<div className="relative rounded-none border border-border/40 bg-card p-6 shadow-2xl transition-all duration-300 hover:border-primary/20">
							{/* Soft top-right glow */}
							<div className="pointer-events-none absolute -top-12 -right-12 h-36 w-36 rounded-full bg-primary/10 blur-2xl" />

							{/* Micro-Dashboard Header */}
							<div className="flex items-center justify-between border-border/20 border-b pb-4">
								<div className="flex items-center gap-3">
									<span className="relative flex h-2 w-2">
										<span className="absolute inline-flex h-full w-full animate-pulse rounded-full bg-emerald-400 opacity-75" />
										<span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
									</span>
									<span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
										SOC SIEM MONITOR
									</span>
								</div>
								<span className="rounded-none bg-[#405cfe]/10 px-2 py-0.5 font-bold font-mono text-[9px] text-primary">
									ACTIVE THREAT HUNTING
								</span>
							</div>

							{/* Visual Panels */}
							<div className="mt-5 space-y-4">
								{/* Activity Block 1: Log processing metrics */}
								<div className="rounded-none border border-border/20 bg-muted/10 p-3">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-3">
											<Activity className="h-4 w-4 text-[#405cfe]" />
											<p className="font-serif text-foreground text-sm">
												Global Log Ingestion Rate
											</p>
										</div>
										<span className="font-mono font-semibold text-foreground text-xs tabular-nums">
											1.42M EPS
										</span>
									</div>
								</div>

								{/* Activity Block 2: Intercepted compromise status */}
								<div className="relative overflow-hidden rounded-none border border-red-500/20 bg-red-500/[0.02] p-3">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-3">
											<ShieldAlert className="h-4 w-4 text-red-500" />
											<div>
												<p className="font-serif text-foreground text-sm leading-none">
													Brute-Force Intercepted
												</p>
												<p className="mt-1 font-mono text-[9px] text-muted-foreground">
													3 AM Active IP Banned
												</p>
											</div>
										</div>
										<span className="rounded-none bg-red-500/15 px-2 py-0.5 font-bold font-mono text-[8px] text-red-500">
											Mitigated
										</span>
									</div>
								</div>

								{/* Activity Block 3: Verification Check */}
								<div className="flex items-center justify-between rounded-none border border-border/20 bg-muted/10 p-3">
									<div className="flex items-center gap-3">
										<Database className="h-4 w-4 text-emerald-500" />
										<span className="font-serif text-foreground text-sm">
											Database Audit Trail integrity
										</span>
									</div>
									<span className="rounded-none bg-emerald-500/10 px-1.5 py-0.5 font-mono font-semibold text-[8px] text-emerald-500">
										Immutable Mode
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<CmsUseCasesSection
					eyebrow="Proven Defenses"
					heading="Operational scenarios our analysts routinely resolve"
					subtitle="From late-night attacks to complex exfiltration attempts, our team ensures continuous visibility."
					items={cms.useCases ?? useCases}
				/>
				<CmsStepsSection
					heading="How our SOC integrates with your team"
					subtitle="A highly coordinated deployment, parsing, and triaging workflow designed to deliver clarity without operational friction."
					items={cms.steps ?? steps}
				/>
				<CmsTestimonialSection
					testimonial={cms.testimonial ?? {}}
					avatarUrl="https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150"
				/>
				<CmsFaqSection
					subtitle="Direct, technical answers regarding logging compliance, data isolation, and SOC configuration speeds."
					items={cms.faqs ?? faqs}
				/>
				<CmsRichBodySection html={page?.contentHtml} />
			</div>
		</section>
	);
}

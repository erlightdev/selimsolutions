import { Badge } from "@selimsolutions/ui/components/badge";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
	ArrowLeft,
	ArrowRight,
	Laptop,
	Shield,
	ShieldCheck,
} from "lucide-react";

import {
	CmsFaqSection,
	CmsRichBodySection,
	CmsStepsSection,
	CmsTestimonialSection,
	CmsUseCasesSection,
} from "@/components/cms-detail-sections";
import { useCmsPageData } from "@/hooks/use-cms-page";

export const Route = createFileRoute("/services/edr")({
	component: EdrServicePage,
	head: () => ({
		meta: [
			{
				title:
					"Endpoint Detection & Response (EDR) Management | Selim Solution",
			},
			{
				name: "description",
				content:
					"Active EDR agent installation, continuous log correlation, and automated ransomware mitigation. We protect workstations off-network from file encrypting payloads.",
			},
		],
	}),
});

const useCases = [
	{
		number: "01",
		title: "Ransomware Behavioral Interception",
		description:
			"EDR monitors trace process behavior in memory. If any unknown utility attempts to mass-encrypt files, the sensor terminates the process and rolls back modifications instantly.",
		metric: "< 5 Min Containment",
	},
	{
		number: "02",
		title: "Off-Network Endpoint Monitoring",
		description:
			"Workstations and laptops remain secure even when disconnected from corporate firewalls, updating telemetry via encrypted cloud log aggregators.",
		metric: "Always-Protected",
	},
	{
		number: "03",
		title: "In-Depth Post-Incident Forensics",
		description:
			"EDR preserves exact memory snapshots, process execution timelines, and file hashes, simplifying forensic root-cause analysis during audits.",
		metric: "Forensic-Ready",
	},
] as const;

const steps = [
	{
		number: "01",
		title: "Silent Agent Rollout",
		subtitle:
			"Deploy light, optimized EDR agents across all workstations silently using standard directory installation tools.",
	},
	{
		number: "02",
		title: "Heuristic Baseline Tuning",
		subtitle:
			"Establish behavioral rules, whitelisting corporate utilities to prevent false indicators of compromise.",
	},
	{
		number: "03",
		title: "SOC Triaging Active",
		subtitle:
			"Connect the endpoint log feed to our active 24/7 Kathmandu operations room for instant threat containment.",
	},
] as const;

const faqs = [
	{
		question: "How does EDR differ from standard antivirus software?",
		answer:
			"Antivirus only scans for known static signatures. EDR tracks live runtime behavioral heuristics, detecting zero-days and memory exploitation patterns that static tools completely miss.",
	},
	{
		question: "Does the EDR sensor slow down user workstations?",
		answer:
			"No. Our agents are highly optimized, averaging less than 1% CPU utilization and minimal memory allocations, ensuring zero impact on daily operations.",
	},
	{
		question: "Can you isolate a compromised workstation remotely?",
		answer:
			"Yes. In case of verified threats, our SOC can isolate the node with a single click, cutting off lateral network paths while maintaining a secure troubleshooting shell.",
	},
] as const;

function EdrServicePage() {
	const { page, cms } = useCmsPageData("/services/edr", {
		hero: {
			eyebrow: "Endpoint Security Operations",
			headline: "Uncompromising workstation security.",
			subheadline:
				"We deploy, configure, and monitor advanced endpoint detection and response (EDR) systems to isolate compromised devices, terminate ransomware in memory, and defend off-network systems.",
			ctaLabel: "Request EDR Demo",
			ctaHref: "/free-assessment",
		},
		useCases: [...useCases],
		steps: [...steps],
		testimonial: {
			quote:
				"24/7 monitoring means real people who know our stack respond in minutes, not tickets that rot overnight. Our endpoint security is solid, off-network and remote Adjuster mean response speeds dropped under 15 minutes.",
			author: "Bishal Gurung",
			role: "CTO, Daraz Logistics",
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
							{cms.hero?.eyebrow || "Endpoint Security Operations"}
						</Badge>
						<h1 className="mt-6 text-balance font-serif text-4xl text-foreground leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
							{cms.hero?.headline || "Uncompromising workstation security."}
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
								{cms.hero?.ctaLabel || "Request EDR Demo"}
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
										<span className="absolute inline-flex h-full w-full animate-pulse rounded-full bg-red-400 opacity-75" />
										<span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
									</span>
									<span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
										ENDPOINT telemetry STATUS
									</span>
								</div>
								<span className="rounded-none bg-[#405cfe]/10 px-2 py-0.5 font-bold font-mono text-[9px] text-primary">
									EDR ACTIVE
								</span>
							</div>

							{/* Visual Panels */}
							<div className="mt-5 space-y-4">
								{/* Activity Block 1: Device statuses */}
								<div className="rounded-none border border-border/20 bg-muted/10 p-3">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2 text-primary">
											<Laptop className="h-4 w-4" />
											<span className="font-serif text-foreground text-sm">
												Registered Devices
											</span>
										</div>
										<span className="font-mono font-semibold text-foreground text-xs tabular-nums">
											248 Active
										</span>
									</div>
								</div>

								{/* Activity Block 2: Workstation Isolated status */}
								<div className="relative overflow-hidden rounded-none border border-red-500/20 bg-red-500/[0.02] p-3">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-3">
											<Shield className="h-4 w-4 text-red-500" />
											<div>
												<p className="font-serif text-foreground text-sm leading-none">
													Terminal room-208
												</p>
												<p className="mt-1 font-mono text-[9px] text-muted-foreground">
													Malware memory hook isolated
												</p>
											</div>
										</div>
										<span className="rounded-none bg-red-500/15 px-2 py-0.5 font-bold font-mono text-[8px] text-red-500">
											Isolated
										</span>
									</div>
								</div>

								{/* Activity Block 3: Verification */}
								<div className="flex items-center justify-between rounded-none border border-border/20 bg-muted/10 p-3">
									<div className="flex items-center gap-3">
										<ShieldCheck className="h-4 w-4 text-emerald-500" />
										<span className="font-serif text-foreground text-sm">
											Heuristic Baseline Integrity
										</span>
									</div>
									<span className="rounded-none bg-emerald-500/10 px-1.5 py-0.5 font-mono font-semibold text-[8px] text-emerald-500">
										Active
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<CmsUseCasesSection
					eyebrow="Proven Safeguards"
					heading="Operational scenarios we routinely defend"
					subtitle="Behavioral endpoint visibility, automated ransomware rollback, and remote node isolation."
					items={cms.useCases ?? useCases}
				/>
				<CmsStepsSection
					heading="How we collaborate with your team"
					subtitle="Silent agent rollout, heuristic tuning, and 24/7 Kathmandu SOC triage."
					items={cms.steps ?? steps}
				/>
				<CmsTestimonialSection
					testimonial={cms.testimonial ?? {}}
					avatarUrl="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150"
				/>
				<CmsFaqSection
					subtitle="Direct, technical answers regarding endpoint sensors, remote workstation isolation, and operational overhead."
					items={cms.faqs ?? faqs}
				/>
				<CmsRichBodySection html={page?.contentHtml} />
			</div>
		</section>
	);
}

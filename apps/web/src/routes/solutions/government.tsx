import { Badge } from "@selimsolutions/ui/components/badge";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Globe, Server } from "lucide-react";

import {
	CmsFaqSection,
	CmsRichBodySection,
	CmsStepsSection,
	CmsTestimonialSection,
	CmsUseCasesSection,
} from "@/components/cms-detail-sections";
import { useCmsPageData } from "@/hooks/use-cms-page";

export const Route = createFileRoute("/solutions/government")({
	component: GovernmentSolutionPage,
	head: () => ({
		meta: [
			{ title: "Government Cybersecurity Solutions | Selim Solution" },
			{
				name: "description",
				content:
					"Hardening municipal and federal digital infrastructure, securing civil registries, and providing 24/7 rapid security response coordination for national agencies.",
			},
		],
	}),
});

const useCases = [
	{
		number: "01",
		title: "Securing Public & Civil Registries",
		description:
			"Continuous penetration auditing and deep log correlation across citizen databases and identification registries, preventing unauthorized modifications and massive registry exfiltration.",
		metric: "Sovereign Log Control",
	},
	{
		number: "02",
		title: "Critical Utility & Utility Infrastructure Monitoring",
		description:
			"Aggregating and correlating logs from SCADA interfaces, building systems, and critical state-owned grid logs, flagging coordinated sabotage or lateral movement indicators.",
		metric: "24/7 Core Continuity",
	},
	{
		number: "03",
		title: "Ministerial Web Portal Hardening",
		description:
			"Securing high-visibility public-facing government portals against state-sponsored defacement, distributed denial of service (DDoS) campaigns, and API-based record scraping.",
		metric: "Defacement Shielded",
	},
] as const;

const steps = [
	{
		number: "01",
		title: "Sovereign Collector Deployment",
		subtitle:
			"Install localized log forwarding sensors inside air-gapped agency subnets, isolating all metadata in compliance with sovereign policies.",
	},
	{
		number: "02",
		title: "Advanced Threat Detection",
		subtitle:
			"Correlate portal and server events against advanced persistent threat (APT) indicators and state-sponsored intrusion signatures.",
	},
	{
		number: "03",
		title: "Joint-Agency Mobilization",
		subtitle:
			"Coordinate rapid blocklists and host containment in unison with federal CERT administrators and system operations directors.",
	},
] as const;

const faqs = [
	{
		question:
			"Can you provide entirely on-premises security log hosting for state networks?",
		answer:
			"Yes. We support localized syslog aggregation appliances, offline analysis setups, and highly secure local forwarding configurations, ensuring that sensitive state telemetry never exits sovereign borders.",
	},
	{
		question:
			"What security clearance and vetting do your threat analyst teams have?",
		answer:
			"All analysts and engineers operating on public-sector queues undergo strict multi-tiered background verification, sign comprehensive national security NDAs, and hold advanced professional certifications (OSCP, CISSP).",
	},
	{
		question:
			"How does your team coordinate with national cybersecurity centers (CERT)?",
		answer:
			"We maintain direct, standardized notification channels and export threat telemetry in structured STIX/TAXII formats. This allows for immediate, automated distribution of incident indicators to national agencies.",
	},
] as const;

function GovernmentSolutionPage() {
	const { page, cms } = useCmsPageData("/solutions/government", {
		hero: {
			eyebrow: "Government",
			headline: "Hardening digital state services.",
			subheadline:
				"We protect public-sector infrastructure with continuous threat modeling, sovereign data boundaries, and 24/7 defense protocols tailored for federal, regional, and national utilities.",
			ctaLabel: "Request State Assessment",
			ctaHref: "/free-assessment",
		},
		useCases: [...useCases],
		steps: [...steps],
		testimonial: {
			quote:
				"Selim's manual penetration audits identified deep systemic integration vulnerabilities that several automated tools completely missed. Their 24/7 SOC is truly elite and designed for real operational pressure.",
			author: "Devendra Shrestha",
			role: "Director of IT, National Registry Bureau",
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
					to="/solutions"
					className="group mb-12 inline-flex items-center gap-2 font-bold text-[10px] text-muted-foreground uppercase tracking-widest transition-all duration-150 hover:text-foreground active:scale-[0.97]"
				>
					<ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 ease-out-strong group-hover:-translate-x-0.5" />
					Back to solutions
				</Link>

				{/* HERO SECTION */}
				<div className="grid gap-12 lg:grid-cols-12 lg:items-center">
					<div className="lg:col-span-6">
						<Badge
							variant="outline"
							className="rounded-none border-primary/20 bg-primary/5 px-3.5 py-1.5 font-mono text-[11px] text-primary uppercase tracking-widest"
						>
							{cms.hero?.eyebrow || "Government"}
						</Badge>
						<h1 className="mt-6 text-balance font-serif text-4xl text-foreground leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
							{cms.hero?.headline || "Hardening digital state services."}
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
								{cms.hero?.ctaLabel || "Request State Assessment"}
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
										<span className="absolute inline-flex h-full w-full animate-pulse rounded-full bg-indigo-400 opacity-75" />
										<span className="relative inline-flex h-2 w-2 rounded-full bg-indigo-500" />
									</span>
									<span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
										Sovereign Gateway Status
									</span>
								</div>
								<span className="rounded-none bg-indigo-500/10 px-2 py-0.5 font-bold font-mono text-[9px] text-indigo-500">
									State Registry Mode
								</span>
							</div>

							{/* Visual Graphic Representation Panels */}
							<div className="mt-5 space-y-4">
								{/* Activity Block 1: Active Node Map Logs */}
								<div className="rounded-none border border-border/20 bg-muted/10 p-3">
									<p className="font-serif text-foreground text-sm">
										Federal Core Gateway Nodes
									</p>
									<div className="mt-3 grid grid-cols-2 gap-3">
										<div className="rounded-none border border-border/10 bg-background/50 p-2 text-center">
											<p className="font-mono text-[9px] text-muted-foreground">
												Kathmandu Core
											</p>
											<span className="mt-1 inline-flex items-center gap-1.5 font-bold font-mono text-emerald-500 text-xs">
												<span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />{" "}
												Secure
											</span>
										</div>
										<div className="rounded-none border border-border/10 bg-background/50 p-2 text-center">
											<p className="font-mono text-[9px] text-muted-foreground">
												Pokhara Registry
											</p>
											<span className="mt-1 inline-flex items-center gap-1.5 font-bold font-mono text-emerald-500 text-xs">
												<span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />{" "}
												Secure
											</span>
										</div>
									</div>
								</div>

								{/* Activity Block 2: National Compliance Status */}
								<div className="flex items-center justify-between rounded-none border border-border/20 bg-muted/10 p-3">
									<div className="flex items-center gap-3">
										<Server className="h-4 w-4 text-[#405cfe]" />
										<div>
											<p className="font-serif text-foreground text-sm leading-none">
												Log Compliance
											</p>
											<p className="mt-1 font-mono text-[9px] text-muted-foreground">
												Federal Records Retention
											</p>
										</div>
									</div>
									<div className="text-right">
										<span className="inline-block rounded-none bg-[#405cfe]/10 px-1.5 py-0.5 font-mono font-semibold text-[#405cfe] text-[8px]">
											NIA 2076 compliant
										</span>
									</div>
								</div>

								{/* Activity Block 3: Verification */}
								<div className="flex items-center justify-between rounded-none border border-border/20 bg-muted/10 p-3">
									<div className="flex items-center gap-3">
										<Globe className="h-4 w-4 text-emerald-500" />
										<div>
											<p className="font-serif text-foreground text-sm leading-none">
												Ministerial Portals
											</p>
											<p className="mt-1 font-mono text-[9px] text-muted-foreground">
												WAF defacement defense
											</p>
										</div>
									</div>
									<span className="inline-block rounded-none bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[8px] text-emerald-500">
										Active
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<CmsUseCasesSection
					eyebrow="Sovereign Defense"
					heading="Resilience for critical civic processes"
					subtitle="Defending civic identities, public logs, and administrative infrastructure against highly organized advanced adversaries."
					items={cms.useCases ?? useCases}
				/>
				<CmsStepsSection
					heading="How we collaborate with your team"
					subtitle="A highly coordinated deployment, parsing, and triaging workflow designed to deliver clarity without operational friction."
					items={cms.steps ?? steps}
				/>
				<CmsTestimonialSection
					testimonial={cms.testimonial ?? {}}
					avatarUrl="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150"
				/>
				<CmsFaqSection
					subtitle="Direct, technical answers regarding local data hosting, clearance standards, and agency coordination."
					items={cms.faqs ?? faqs}
				/>
				<CmsRichBodySection html={page?.contentHtml} />
			</div>
		</section>
	);
}

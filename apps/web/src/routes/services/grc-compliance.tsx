import { Badge } from "@selimsolutions/ui/components/badge";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, BadgeCheck, FileLock } from "lucide-react";

import {
	CmsFaqSection,
	CmsRichBodySection,
	CmsStepsSection,
	CmsTestimonialSection,
	CmsUseCasesSection,
} from "@/components/cms-detail-sections";
import { useCmsPageData } from "@/hooks/use-cms-page";

export const Route = createFileRoute("/services/grc-compliance")({
	component: GrcServicePage,
	head: () => ({
		meta: [
			{ title: "GRC & Security Compliance Preparation | Selim Solution" },
			{
				name: "description",
				content:
					"Control mapping, gap analysis, and policy audit preparation custom-fit for your operations. We prepare companies for ISO 27001, PCI-DSS, SOC 2, and NRB compliance.",
			},
		],
	}),
});

const useCases = [
	{
		number: "01",
		title: "Continuous Mapping & Gap Audits",
		description:
			"Automatically correlate configurations and logging states, matching raw parameters to expected ISO, SOC 2, or NRB standard controls.",
		metric: "Zero Posture Drift",
	},
	{
		number: "02",
		title: "Operational Policy Drafting",
		description:
			"Build and compile custom internal policy guidelines, data handling logs, and incident playbook documentation mapped to pass external audits.",
		metric: "100% Policy Compliant",
	},
	{
		number: "03",
		title: "Interactive Evidence Aggregation",
		description:
			"Aggregate real-time configuration snapshots and VAPT reports, compiling them into a single, clean dashboard to fast-track external auditor walkthroughs.",
		metric: "Auditor-Ready Data",
	},
] as const;

const steps = [
	{
		number: "01",
		title: "Framework Baseline Selection",
		subtitle:
			"Select and establish baseline parameters matching your targeted auditing standards (ISO 27001, PCI, SOC 2).",
	},
	{
		number: "02",
		title: "Control Analysis & Remediation",
		subtitle:
			"Audit system configurations, user access levels, and logs, closing critical technical gaps on subnets.",
	},
	{
		number: "03",
		title: "External Audit Representation",
		subtitle:
			"Generate read-only evidence cards and walkthrough guides, coordinating with third-party certification bodies during inspections.",
	},
] as const;

const faqs = [
	{
		question: "Which compliance standards can you prepare us for?",
		answer:
			"We offer comprehensive preparation and control mapping for ISO 27001, PCI-DSS, SOC 2, NIST CSF, and Nepal Rastra Bank (NRB) IT Guidelines.",
	},
	{
		question: "How do your tools automate evidence aggregation?",
		answer:
			"We integrate light read-only API connectors with cloud workspaces, servers, and endpoint monitors, compiling configuration evidence blocks automatically.",
	},
	{
		question: "Do you supply customized corporate security templates?",
		answer:
			"Yes. We provide complete, bespoke internal procedures templates, business continuity plans, disaster recovery blueprints, and access privilege sheets.",
	},
] as const;

function GrcServicePage() {
	const { page, cms } = useCmsPageData("/services/grc-compliance", {
		hero: {
			eyebrow: "GRC & COMPLIANCE PREPARATION",
			headline: "Standard compliance built for operations.",
			subheadline:
				"We translate compliance guidelines into clean technical controls. Map operations, automate log audits, and generate structured evidence files to clear external inspections with zero friction.",
			ctaLabel: "Request Compliance Prep",
			ctaHref: "/free-assessment",
		},
		useCases: [...useCases],
		steps: [...steps],
		testimonial: {
			quote:
				"ISO 27001 and SOC 2 readiness that used to take quarters took weeks. Selim Solution mapped controls to our reality instead of handing us a generic checklist.",
			author: "Rohan Karki",
			role: "GRC Lead, NIC Asia",
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
							{cms.hero?.eyebrow || "GRC & COMPLIANCE PREPARATION"}
						</Badge>
						<h1 className="mt-6 text-balance font-serif text-4xl text-foreground leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
							{cms.hero?.headline ||
								"Standard compliance built for operations."}
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
								{cms.hero?.ctaLabel || "Request Compliance Prep"}
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
										COMPLIANCE CONTROLS AUDITOR
									</span>
								</div>
								<span className="rounded-none bg-[#405cfe]/10 px-2 py-0.5 font-bold font-mono text-[9px] text-primary">
									MULTI-STANDARD ALIGNED
								</span>
							</div>

							{/* Visual Panels */}
							<div className="mt-5 space-y-4">
								{/* Activity Block 1: Readiness slider progress */}
								<div className="rounded-none border border-border/20 bg-muted/10 p-3">
									<div className="flex items-center justify-between">
										<span className="font-serif text-foreground text-sm">
											Global Audit Readiness
										</span>
										<span className="font-mono font-semibold text-emerald-500 text-xs tabular-nums">
											Passed: 100%
										</span>
									</div>
									<div className="mt-2.5 h-2 w-full bg-border/20">
										<div
											className="h-full bg-emerald-500"
											style={{ width: "100%" }}
										/>
									</div>
								</div>

								{/* Activity Block 2: Evidence locks */}
								<div className="flex items-center justify-between rounded-none border border-border/20 bg-muted/10 p-3">
									<div className="flex items-center gap-3">
										<FileLock className="h-4 w-4 text-[#405cfe]" />
										<div>
											<p className="font-serif text-foreground text-sm leading-none">
												ISO 27001 ISMS Binders
											</p>
											<p className="mt-1 font-mono text-[9px] text-muted-foreground">
												Automated evidence mapping files
											</p>
										</div>
									</div>
									<span className="rounded-none bg-emerald-500/10 px-1.5 py-0.5 font-bold font-mono text-[8px] text-emerald-500">
										Verified OK
									</span>
								</div>

								<div className="flex items-center justify-between rounded-none border border-border/20 bg-muted/10 p-3">
									<div className="flex items-center gap-3">
										<BadgeCheck className="h-4 w-4 text-emerald-500" />
										<span className="font-serif text-foreground text-sm">
											PCI-DSS Requirement 10 logs
										</span>
									</div>
									<span className="rounded-none bg-emerald-500/10 px-1.5 py-0.5 font-bold font-mono font-semibold text-[8px] text-emerald-500">
										Audit ready
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<CmsUseCasesSection
					eyebrow="Proven Compliance"
					heading="Operational scenarios we routinely defend"
					subtitle="Continuous control mapping, policy drafting, and automated auditor-ready evidence collection."
					items={cms.useCases ?? useCases}
				/>
				<CmsStepsSection
					heading="How we collaborate with your team"
					subtitle="Baseline selection, control remediation, and external audit representation."
					items={cms.steps ?? steps}
				/>
				<CmsTestimonialSection
					testimonial={cms.testimonial ?? {}}
					avatarUrl="https://images.pexels.com/photos/2182968/pexels-photo-2182968.jpeg?auto=compress&cs=tinysrgb&w=150"
				/>
				<CmsFaqSection
					subtitle="Direct, technical answers regarding compliance frameworks, automated evidence, and policy templates."
					items={cms.faqs ?? faqs}
				/>
				<CmsRichBodySection html={page?.contentHtml} />
			</div>
		</section>
	);
}

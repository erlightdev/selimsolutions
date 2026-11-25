import { Badge } from "@selimsolutions/ui/components/badge";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Cloud, Key } from "lucide-react";

import {
	CmsFaqSection,
	CmsRichBodySection,
	CmsStepsSection,
	CmsTestimonialSection,
	CmsUseCasesSection,
} from "@/components/cms-detail-sections";
import { useCmsPageData } from "@/hooks/use-cms-page";

export const Route = createFileRoute("/services/cloud-security")({
	component: CloudSecurityPage,
	head: () => ({
		meta: [
			{
				title: "Cloud Security Hardening & Posture Management | Selim Solution",
			},
			{
				name: "description",
				content:
					"Secure AWS, Azure, and Google Workspace setups. We automate configuration drift tracking, perform identity checks, and enforce localized sovereignty compliance.",
			},
		],
	}),
});

const useCases = [
	{
		number: "01",
		title: "Continuous Configuration Drift Scanning",
		description:
			"Automatically scan infrastructure-as-code registers and production nodes to flag unauthorized permission changes or exposed database buckets.",
		metric: "Zero Configuration Drift",
	},
	{
		number: "02",
		title: "Cloud Identity & Token Reviews",
		description:
			"Map and trace directory roles, administrative sessions, and active API access keys to shut down credential hijacking and lateral account shifts.",
		metric: "Identity-Hardened",
	},
	{
		number: "03",
		title: "Sovereign Cloud Data Control",
		description:
			"Review data flow configurations and localized syslog repositories to fulfill regional financial auditing standards and retain data on-premises.",
		metric: "Sovereign-Ready",
	},
] as const;

const steps = [
	{
		number: "01",
		title: "Cloud Posture Mapping",
		subtitle:
			"Scan cloud accounts (AWS, Azure, Google Cloud) using read-only APIs to compile a complete controls gap list.",
	},
	{
		number: "02",
		title: "Security Group Hardening",
		subtitle:
			"Remediate open ports, tighten API gateways, align multi-factor settings, and restrict root account operations.",
	},
	{
		number: "03",
		title: "Persistent Compliance Audits",
		subtitle:
			"Initialize automated scanning templates to flag configuration drift and deliver audit logs to central panels.",
	},
] as const;

const faqs = [
	{
		question: "Which public clouds and workspace platforms do you secure?",
		answer:
			"We provide complete coverage for Amazon Web Services (AWS), Microsoft Azure, Google Cloud Platform (GCP), Google Workspace, and Microsoft Office 365 environments.",
	},
	{
		question: "How do your automated audits affect active system latency?",
		answer:
			"They have zero impact. Our checks run out-of-band via read-only cloud metadata APIs, auditing configurations and access rules without introducing any latency.",
	},
	{
		question: "How do you secure third-party integration tokens?",
		answer:
			"We review and log API access permissions, tracking outbound calls and identifying overly broad administrative privileges to minimize integration exposure.",
	},
] as const;

function CloudSecurityPage() {
	const { page, cms } = useCmsPageData("/services/cloud-security", {
		hero: {
			eyebrow: "Cloud Infrastructure Defense",
			headline: "Defend and harden cloud infrastructure.",
			subheadline:
				"We secure distributed cloud clusters, protect transaction nodes, and defend databases from configuration drifts, credential hijacks, and lateral pivots.",
			ctaLabel: "Audit Cloud Security",
			ctaHref: "/free-assessment",
		},
		useCases: [...useCases],
		steps: [...steps],
		testimonial: {
			quote:
				"Managing hundreds of cloud databases across multiple regions, we needed unyielding, automated posture governance. Selim Solution locked down our structures and simplified audit tracing completely.",
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
					className="group mb-12 inline-flex items-center gap-2 font-bold text-[10px] text-muted-foreground uppercase tracking-widest transition-all duration-150 hover:text-foreground active:scale-[0.97]"
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
							{cms.hero?.eyebrow || "Cloud Infrastructure Defense"}
						</Badge>
						<h1 className="mt-6 text-balance font-serif text-4xl text-foreground leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
							{cms.hero?.headline || "Defend and harden cloud infrastructure."}
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
								{cms.hero?.ctaLabel || "Audit Cloud Security"}
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
										CLOUD POSTURE MONITOR
									</span>
								</div>
								<span className="rounded-none bg-[#405cfe]/10 px-2 py-0.5 font-bold font-mono text-[9px] text-primary">
									CSPM Drift Shield
								</span>
							</div>

							{/* Visual Panels */}
							<div className="mt-5 space-y-4">
								{/* Activity Block 1: Posture status bars */}
								<div className="rounded-none border border-border/20 bg-muted/10 p-3">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2.5 text-primary">
											<Cloud className="h-4 w-4" />
											<p className="font-serif text-foreground text-sm leading-none">
												AWS Configuration Baseline
											</p>
										</div>
										<span className="font-mono font-semibold text-emerald-500 text-xs tabular-nums">
											Secure
										</span>
									</div>
								</div>

								{/* Activity Block 2: Interactive permission checking */}
								<div className="flex items-center justify-between rounded-none border border-border/20 bg-muted/10 p-3">
									<div className="flex items-center gap-3">
										<Key className="h-4 w-4 text-emerald-500" />
										<div>
											<p className="font-serif text-foreground text-sm leading-none">
												Google Workspace Admin Tokens
											</p>
											<p className="mt-1 font-mono text-[9px] text-muted-foreground">
												Privileged Access Validation
											</p>
										</div>
									</div>
									<span className="rounded-none bg-emerald-500/10 px-1.5 py-0.5 font-mono font-semibold text-[8px] text-emerald-500">
										Verified OK
									</span>
								</div>

								<div className="relative overflow-hidden rounded-none border border-amber-500/20 bg-amber-500/[0.02] p-3">
									<div className="flex items-center justify-between">
										<div>
											<p className="font-serif text-foreground text-sm leading-none">
												Configuration Drift Detected
											</p>
											<p className="mt-1 font-mono text-[9px] text-muted-foreground">
												S3 Bucket permissions reverted
											</p>
										</div>
										<span className="rounded-none bg-amber-500/15 px-2 py-0.5 font-bold font-mono text-[8px] text-amber-500">
											Auto-Healed
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<CmsUseCasesSection
					eyebrow="Proven Safeguards"
					heading="Operational scenarios we routinely defend"
					subtitle="Continuous configuration scanning, IAM review, and sovereign data governance across multi-cloud accounts."
					items={cms.useCases ?? useCases}
				/>
				<CmsStepsSection
					heading="How we collaborate with your team"
					subtitle="A highly coordinated deployment, hardening, and auditing workflow designed for zero latency."
					items={cms.steps ?? steps}
				/>
				<CmsTestimonialSection
					testimonial={cms.testimonial ?? {}}
					avatarUrl="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150"
				/>
				<CmsFaqSection
					subtitle="Direct, technical answers regarding cloud coverage, read-only posture scans, and token governance."
					items={cms.faqs ?? faqs}
				/>
				<CmsRichBodySection html={page?.contentHtml} />
			</div>
		</section>
	);
}

import { Badge } from "@selimsolutions/ui/components/badge";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ShieldCheck, Siren } from "lucide-react";

import {
	CmsFaqSection,
	CmsRichBodySection,
	CmsStepsSection,
	CmsTestimonialSection,
	CmsUseCasesSection,
} from "@/components/cms-detail-sections";
import { useCmsPageData } from "@/hooks/use-cms-page";

export const Route = createFileRoute("/services/dfir")({
	component: DfirServicePage,
	head: () => ({
		meta: [
			{
				title: "Digital Forensics & Incident Response (DFIR) | Selim Solution",
			},
			{
				name: "description",
				content:
					"Emergency incident response, root-cause forensics, legal log isolation, and recovery blueprints. Our 24/7 Kathmandu response team isolates breaches and recovers systems.",
			},
		],
	}),
});

const useCases = [
	{
		number: "01",
		title: "Emergency Root-Cause Diagnostics",
		description:
			"Execute deep network and system forensics to trace breach entrance locations, identify compromised admin tokens, and verify exfiltrated directories.",
		metric: "Fast Root-Cause",
	},
	{
		number: "02",
		title: "Malware Reverse Engineering",
		description:
			"Isolate and decompile custom payloads inside sandbox labs to identify command-and-control IP coordinates, encryption routines, and lateral movement methods.",
		metric: "Sandbox Labs",
	},
	{
		number: "03",
		title: "Legal Forensic Data Isolation",
		description:
			"Isolate and sign event logs and file-integrity check hashes, creating immutable, legally binding digital evidence packages ready for GRC requirements.",
		metric: "Chain-of-Custody Secure",
	},
] as const;

const steps = [
	{
		number: "01",
		title: "Containment & Isolation",
		subtitle:
			"Immediately isolate compromised servers, lock administrative sessions, and block malware callbacks to prevent exfiltration.",
	},
	{
		number: "02",
		title: "Forensic Investigation",
		subtitle:
			"Examine registry tables, volatile system memory, and log trails to reconstruct the attacker's timeline.",
	},
	{
		number: "03",
		title: "System Restoration & Hardening",
		subtitle:
			"Rebuild baseline servers, rotate corporate credentials, patch zero-days, and restore clean backups.",
	},
] as const;

const faqs = [
	{
		question: "How fast is your emergency incident response mobilization?",
		answer:
			"Our dedicated 24/7 incident hotline is continuously active. Emergency response triaging and remote containment starts within 15 minutes of initial mobilization.",
	},
	{
		question: "Can we engage your DFIR team if we don't have a retainer?",
		answer:
			"Yes. We support emergency ad-hoc incident contracts, mobilizing immediate remote assistance to contain active breaches and isolate local systems.",
	},
	{
		question:
			"What is your data recovery success rate after ransomware attacks?",
		answer:
			"We identify and restore untouched volume shadow copies and system logs to reconstruct files. Where safe, clean backups exist, we guarantee 100% complete restoration.",
	},
] as const;

function DfirServicePage() {
	const { page, cms } = useCmsPageData("/services/dfir", {
		hero: {
			eyebrow: "Emergency Incident Response",
			headline: "Fast, decisive threat resolution.",
			subheadline:
				"We contain breaches and restore system sanity. Our certified digital forensics and incident response (DFIR) specialists halt active compromises, decompile malware, and reconstruct systems securely under heavy pressure.",
			ctaLabel: "Contact DFIR Emergency",
			ctaHref: "mailto:contact@selim.solutions",
		},
		useCases: [...useCases],
		steps: [...steps],
		testimonial: {
			quote:
				"Their DFIR runbook turned what could've been a week-long outage into a four-hour recovery. Calm, precise, and brutally fast under pressure.",
			author: "Sneha Thapa",
			role: "VP Engineering, Khalti",
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
							{cms.hero?.eyebrow || "Emergency Incident Response"}
						</Badge>
						<h1 className="mt-6 text-balance font-serif text-4xl text-foreground leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
							{cms.hero?.headline || "Fast, decisive threat resolution."}
						</h1>
						<p className="mt-6 max-w-xl text-pretty text-base text-foreground/75 leading-relaxed sm:text-lg dark:text-zinc-300">
							{cms.hero?.subheadline}
						</p>
						<div className="mt-8 flex flex-wrap gap-4">
							<a
								href={cms.hero?.ctaHref || "mailto:contact@selim.solutions"}
								className="group inline-flex items-center justify-center gap-2 rounded-none bg-primary px-6 py-3 font-semibold text-primary-foreground text-sm tracking-wide transition-all duration-150 hover:bg-primary/90 active:scale-[0.97]"
							>
								{cms.hero?.ctaLabel || "Contact DFIR Emergency"}
								<ArrowRight className="h-4 w-4 transition-transform duration-150 group-hover:translate-x-0.5" />
							</a>
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
										DFIR MALWARE Sandbox
									</span>
								</div>
								<span className="rounded-none bg-red-500/10 px-2 py-0.5 font-bold font-mono text-[9px] text-red-500">
									EMERENCY RESPONSE ACTIVE
								</span>
							</div>

							{/* Visual Panels */}
							<div className="mt-5 space-y-4">
								{/* Activity Block 1: Attack details */}
								<div className="rounded-none border border-border/20 bg-muted/10 p-3">
									<p className="font-serif text-foreground text-sm">
										Malware Sample Audited
									</p>
									<div className="mt-2.5 flex justify-between font-mono text-[10px] text-muted-foreground">
										<span>Type: Ransomware</span>
										<span>Hash: SHA256 ALIGNED</span>
									</div>
								</div>

								{/* Activity Block 2: Incident Status */}
								<div className="relative overflow-hidden rounded-none border border-emerald-500/20 bg-emerald-500/[0.02] p-3">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-3">
											<Siren className="h-4 w-4 text-emerald-500" />
											<div>
												<p className="font-serif text-foreground text-sm leading-none">
													Ransomware Payload
												</p>
												<p className="mt-1 font-mono text-[9px] text-muted-foreground">
													Host isolations complete
												</p>
											</div>
										</div>
										<span className="rounded-none bg-emerald-500/15 px-2 py-0.5 font-bold font-mono text-[8px] text-emerald-500">
											Mitigated
										</span>
									</div>
								</div>

								{/* Activity Block 3: Verification */}
								<div className="flex items-center justify-between rounded-none border border-border/20 bg-muted/10 p-3">
									<div className="flex items-center gap-3">
										<ShieldCheck className="h-4 w-4 text-emerald-500" />
										<span className="font-serif text-foreground text-sm">
											Chain of Custody Snapshot
										</span>
									</div>
									<span className="rounded-none bg-emerald-500/10 px-1.5 py-0.5 font-mono font-semibold text-[8px] text-emerald-500">
										Locked
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<CmsUseCasesSection
					eyebrow="Proven Safeguards"
					heading="Operational scenarios we routinely defend"
					subtitle="Root-cause forensics, sandbox malware analysis, and chain-of-custody evidence preservation."
					items={cms.useCases ?? useCases}
				/>
				<CmsStepsSection
					heading="How we collaborate with your team"
					subtitle="Rapid containment, deep forensic investigation, and clean server restoration."
					items={cms.steps ?? steps}
				/>
				<CmsTestimonialSection
					testimonial={cms.testimonial ?? {}}
					avatarUrl="https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg?auto=compress&cs=tinysrgb&w=150"
				/>
				<CmsFaqSection
					subtitle="Direct, technical answers regarding response mobilization speeds, backup recovery, and ad-hoc engagements."
					items={cms.faqs ?? faqs}
				/>
				<CmsRichBodySection html={page?.contentHtml} />
			</div>
		</section>
	);
}

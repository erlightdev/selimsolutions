import { Badge } from "@selimsolutions/ui/components/badge";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Bug, FileText } from "lucide-react";

import {
	CmsFaqSection,
	CmsRichBodySection,
	CmsStepsSection,
	CmsTestimonialSection,
	CmsUseCasesSection,
} from "@/components/cms-detail-sections";
import { useCmsPageData } from "@/hooks/use-cms-page";

export const Route = createFileRoute("/services/vapt")({
	component: VaptServicePage,
	head: () => ({
		meta: [
			{
				title: "Vulnerability Assessment & Pentesting (VAPT) | Selim Solution",
			},
			{
				name: "description",
				content:
					"Manual logical penetration testing and continuous vulnerability assessments. We audit web apps, mobile backends, AD networks, and local subnets to isolate critical threats.",
			},
		],
	}),
});

const useCases = [
	{
		number: "01",
		title: "Web & Mobile API Penetration Audits",
		description:
			"We manually reverse engineer API endpoints and logical workflows to intercept business logic bypasses, SQL injections, and horizontal privilege escalations.",
		metric: "4.2x More Findings",
	},
	{
		number: "02",
		title: "Active Directory & Lateral Checks",
		description:
			"Simulate a local network compromise to map internal lateral migration capabilities, identifying misconfigured privileges and insecure kerberos setups.",
		metric: "In-Depth Lateral maps",
	},
	{
		number: "03",
		title: "Compliance-Mandated VAPT Scans",
		description:
			"Conduct standard-ready vulnerability cycles satisfying PCI-DSS requirement 11, NRB directives, and ISO Annex A control standards, generating board-ready reports.",
		metric: "100% Audit Success",
	},
] as const;

const steps = [
	{
		number: "01",
		title: "Reconnaissance & Mapping",
		subtitle:
			"Scan and map entire external threat surfaces, identifying active endpoints, ports, and exposed database indices.",
	},
	{
		number: "02",
		title: "Exploitation & Logic Auditing",
		subtitle:
			"Certified ethical hackers manually execute custom payloads to bypass logical configurations and escalate system privileges.",
	},
	{
		number: "03",
		title: "Remediation & Report Verification",
		subtitle:
			"Compile a detailed reporting card with exact code-fix blocks and run re-test validations to confirm mitigations are verified.",
	},
] as const;

const faqs = [
	{
		question: "How do your manual pentests differ from automated scanning?",
		answer:
			"Scanners only search for known signatures. Our certified hackers write customized scripts, map application business logic, and construct chains of low-severity exploits to achieve administrative domain access.",
	},
	{
		question: "How long does a standard web application VAPT engagement take?",
		answer:
			"A standard assessment ranges from 5 to 10 business days depending on API complexity. We deliver complete, verified technical draft reports within 3 days of completion.",
	},
	{
		question: "Do you provide code-level remediation guidance?",
		answer:
			"Yes. Every finding in our board-ready reporting packages contains exact line-of-code fix samples, secure configuration blocks, and architectural isolation instructions.",
	},
] as const;

function VaptServicePage() {
	const { page, cms } = useCmsPageData("/services/vapt", {
		hero: {
			eyebrow: "Offensive Security Validation",
			headline: "Identify and eliminate zero-day risks.",
			subheadline:
				"We manually probe your boundaries. Our certified ethical hacking team isolates architectural flaws, logical bypasses, and endpoint vulnerabilities before malicious actors can exploit them.",
			ctaLabel: "Request Vulnerability Test",
			ctaHref: "/free-assessment",
		},
		useCases: [...useCases],
		steps: [...steps],
		testimonial: {
			quote:
				"After a VAPT engagement they closed gaps three previous vendors had completely missed. Patient data has never been more defensible — and the final reporting is completely board-ready.",
			author: "Priya Maharjan",
			role: "Head of IT, MedTrust Hospitals",
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
							{cms.hero?.eyebrow || "Offensive Security Validation"}
						</Badge>
						<h1 className="mt-6 text-balance font-serif text-4xl text-foreground leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
							{cms.hero?.headline || "Identify and eliminate zero-day risks."}
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
								{cms.hero?.ctaLabel || "Request Vulnerability Test"}
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
										VAPT VULNERABILITY MONITOR
									</span>
								</div>
								<span className="rounded-none bg-emerald-500/10 px-2 py-0.5 font-bold font-mono text-[9px] text-emerald-500">
									ACTIVE PENTESTING
								</span>
							</div>

							{/* Visual Panels */}
							<div className="mt-5 space-y-4">
								{/* Activity Block 1: Vulnerability categories logs */}
								<div className="rounded-none border border-border/20 bg-muted/10 p-3">
									<p className="font-serif text-foreground text-sm">
										Target Audits Checklist
									</p>
									<div className="mt-3.5 space-y-2">
										<div className="flex justify-between font-mono text-[10px]">
											<span className="text-muted-foreground">
												OWASP TOP 10 (Web Apps)
											</span>
											<span className="font-bold text-emerald-500">
												100% Audited
											</span>
										</div>
										<div className="flex justify-between font-mono text-[10px]">
											<span className="text-muted-foreground">
												API Logical Workflows
											</span>
											<span className="font-bold text-[#405cfe]">
												In-Progress
											</span>
										</div>
									</div>
								</div>

								{/* Activity Block 2: Interactive bug trace log */}
								<div className="relative overflow-hidden rounded-none border border-red-500/20 bg-red-500/[0.02] p-3">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-3">
											<Bug className="h-4 w-4 animate-pulse text-red-500" />
											<div>
												<p className="font-serif text-foreground text-sm leading-none">
													Logical Privilege Escalation
												</p>
												<p className="mt-1 font-mono text-[9px] text-muted-foreground">
													API Header bypass resolved
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
										<FileText className="h-4 w-4 text-emerald-500" />
										<span className="font-serif text-foreground text-sm">
											Board-Ready Report draft
										</span>
									</div>
									<span className="rounded-none bg-emerald-500/10 px-1.5 py-0.5 font-mono font-semibold text-[8px] text-emerald-500">
										Generated
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<CmsUseCasesSection
					eyebrow="Proven Safeguards"
					heading="Operational scenarios we routinely defend"
					subtitle="Manual penetration testing and vulnerability verification across your critical applications and internal networks."
					items={cms.useCases ?? useCases}
				/>
				<CmsStepsSection
					heading="How we collaborate with your team"
					subtitle="A structured reconnaissance, manual exploitation, and verification cycle built for engineering clarity."
					items={cms.steps ?? steps}
				/>
				<CmsTestimonialSection
					testimonial={cms.testimonial ?? {}}
					avatarUrl="https://images.pexels.com/photos/3760514/pexels-photo-3760514.jpeg?auto=compress&cs=tinysrgb&w=150"
				/>
				<CmsFaqSection
					subtitle="Direct, technical answers regarding manual pentests, turnaround speed, and code-level remediation."
					items={cms.faqs ?? faqs}
				/>
				<CmsRichBodySection html={page?.contentHtml} />
			</div>
		</section>
	);
}

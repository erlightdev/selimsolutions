import { Badge } from "@selimsolutions/ui/components/badge";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, MailCheck, Users } from "lucide-react";

import {
	CmsFaqSection,
	CmsRichBodySection,
	CmsStepsSection,
	CmsTestimonialSection,
	CmsUseCasesSection,
} from "@/components/cms-detail-sections";
import { useCmsPageData } from "@/hooks/use-cms-page";

export const Route = createFileRoute("/solutions/education-ngos")({
	component: EducationNgosSolutionPage,
	head: () => ({
		meta: [
			{ title: "Education & NGO Cybersecurity Solutions | Selim Solution" },
			{
				name: "description",
				content:
					"Practical, high-impact security programs, student and donor data protection, and 24/7 endpoint threat response tailored for schools and NGOs.",
			},
		],
	}),
});

const useCases = [
	{
		number: "01",
		title: "Protecting Donor & Student Databases",
		description:
			"Offensive security testing and access-control validation to prevent leaks of student directories, grades, academic records, and confidential donor billing info.",
		metric: "Database Hardened",
	},
	{
		number: "02",
		title: "Securing Distributed Remote Teams",
		description:
			"Deploying lightweight cloud-managed EDR telemetry to secure remote field adjusters, researchers, and administrators working on public networks.",
		metric: "Low-Bandwidth Sync",
	},
	{
		number: "03",
		title: "Email Security & Spoofing Defense",
		description:
			"Implementing aggressive DMARC, DKIM, and SPF validation checks to block phishing, Business Email Compromise (BEC), and wire-transfer fraud attempts.",
		metric: "Phish-Mitigated",
	},
] as const;

const steps = [
	{
		number: "01",
		title: "Low-Friction Configuration",
		subtitle:
			"Integrate email records and cloud directories using non-disruptive automated API scripts, keeping setup simple for lean teams.",
	},
	{
		number: "02",
		title: "Log Normalization & Pruning",
		subtitle:
			"Aggregate events inside cloud endpoints, compression-filtering telemetry to safeguard remote-office bandwidth overheads.",
	},
	{
		number: "03",
		title: "Phish & Threat Interception",
		subtitle:
			"Our SOC actively tracks phishing lures, spoofed executives, and compromised credentials, locking threats before money can move.",
	},
] as const;

const faqs = [
	{
		question:
			"Our IT team is tiny. How much support do you provide during onboarding?",
		answer:
			"We take care of the heavy lifting. Our engineers configure the collectors, design the monitoring playbooks, and provide complete, copy-paste deployment scripts to make setup seamless.",
	},
	{
		question:
			"Do you offer special licensing models or discounts for non-profits and schools?",
		answer:
			"Yes. We offer special pricing plans and multi-year contract flexibility designed to fit comfortably within non-profit, humanitarian, and educational budget cycles.",
	},
	{
		question:
			"How do your endpoint security agents handle extremely remote work regions?",
		answer:
			"Our sensors are highly optimized to run silently, using minimal bandwidth. In areas with spotty 3G/4G connectivity, sensors queue event telemetry locally and securely upload once network connections stabilize.",
	},
] as const;

function EducationNgosSolutionPage() {
	const { page, cms } = useCmsPageData("/solutions/education-ngos", {
		hero: {
			eyebrow: "Education & NGOs",
			headline: "Practical security built for distributed, lean teams.",
			subheadline:
				"We defend educational institutions and non-profits with cost-effective threat visibility, strong remote-work identities, and 24/7 managed detection and response.",
			ctaLabel: "Request NGO Assessment",
			ctaHref: "/free-assessment",
		},
		useCases: [...useCases],
		steps: [...steps],
		testimonial: {
			quote:
				"We operate with a highly distributed team in remote districts. Selim Solution gave us corporate-level security visibility and monitoring that we could easily manage within our non-profit's operating budget.",
			author: "Amrita Bajracharya",
			role: "Director of Operations, Rural Action Trust",
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
							{cms.hero?.eyebrow || "Education & NGOs"}
						</Badge>
						<h1 className="mt-6 text-balance font-serif text-4xl text-foreground leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
							{cms.hero?.headline ||
								"Practical security built for distributed, lean teams."}
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
								{cms.hero?.ctaLabel || "Request NGO Assessment"}
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
										<span className="absolute inline-flex h-full w-full animate-pulse rounded-full bg-pink-400 opacity-75" />
										<span className="relative inline-flex h-2 w-2 rounded-full bg-pink-500" />
									</span>
									<span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
										NGO Identity Guardian
									</span>
								</div>
								<span className="rounded-none bg-pink-500/10 px-2 py-0.5 font-bold font-mono text-[9px] text-pink-500">
									Lean-Team Active
								</span>
							</div>

							{/* Visual Graphic Representation Panels */}
							<div className="mt-5 space-y-4">
								{/* Activity Block 1: Email integrity check */}
								<div className="flex items-center justify-between rounded-none border border-border/20 bg-muted/10 p-3">
									<div className="flex items-center gap-3">
										<MailCheck className="h-4 w-4 text-[#405cfe]" />
										<div>
											<p className="font-serif text-foreground text-sm leading-none">
												Domain spoofing defense
											</p>
											<p className="mt-1 font-mono text-[9px] text-muted-foreground">
												DMARC / DKIM status
											</p>
										</div>
									</div>
									<span className="rounded-none bg-emerald-500/10 px-1.5 py-0.5 font-bold font-mono text-[8px] text-emerald-500">
										Aligned
									</span>
								</div>

								{/* Activity Block 2: Remote Staff Locations */}
								<div className="rounded-none border border-border/20 bg-muted/10 p-3">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-3">
											<Users className="h-4 w-4 text-emerald-500" />
											<span className="font-serif text-foreground text-sm">
												Remote Staff Devices
											</span>
										</div>
										<span className="font-mono font-semibold text-muted-foreground text-xs">
											Local Sensor OK
										</span>
									</div>
									<div className="mt-2.5 flex items-center justify-between font-mono text-[10px] text-muted-foreground">
										<span>Bandwidth optimization</span>
										<span className="font-bold text-emerald-500">
											Enabled (90% Saved)
										</span>
									</div>
								</div>

								{/* Activity Block 3: Cloud safeguards check */}
								<div className="flex items-center justify-between rounded-none border border-border/20 bg-muted/10 p-3">
									<div>
										<p className="font-serif text-foreground text-sm leading-none">
											Cloud Workspace Audit
										</p>
										<p className="mt-1 font-mono text-[9px] text-muted-foreground">
											Google Workspace / O365
										</p>
									</div>
									<span className="rounded-none bg-emerald-500/10 px-1.5 py-0.5 font-mono font-semibold text-[8px] text-emerald-500">
										Monitored
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<CmsUseCasesSection
					eyebrow="Proven Security"
					heading="Cost-effective protection for lean networks"
					subtitle="Designed around the unique resource constraints and wide exposure profiles of public institutions."
					items={cms.useCases ?? useCases}
				/>
				<CmsStepsSection
					heading="How we collaborate with your team"
					subtitle="A highly coordinated deployment, parsing, and triaging workflow designed to deliver clarity without operational friction."
					items={cms.steps ?? steps}
				/>
				<CmsTestimonialSection
					testimonial={cms.testimonial ?? {}}
					avatarUrl="https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg?auto=compress&cs=tinysrgb&w=150"
				/>
				<CmsFaqSection
					subtitle="Direct, technical answers regarding small-team onboarding, educational budget support, and unstable connectivity."
					items={cms.faqs ?? faqs}
				/>
				<CmsRichBodySection html={page?.contentHtml} />
			</div>
		</section>
	);
}

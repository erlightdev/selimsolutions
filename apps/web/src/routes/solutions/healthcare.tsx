import { Badge } from "@selimsolutions/ui/components/badge";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Heart, ShieldCheck } from "lucide-react";

import {
	CmsFaqSection,
	CmsRichBodySection,
	CmsStepsSection,
	CmsTestimonialSection,
	CmsUseCasesSection,
} from "@/components/cms-detail-sections";
import { useCmsPageData } from "@/hooks/use-cms-page";

export const Route = createFileRoute("/solutions/healthcare")({
	component: HealthcareSolutionPage,
	head: () => ({
		meta: [
			{ title: "Healthcare Cybersecurity Solutions | Selim Solution" },
			{
				name: "description",
				content:
					"HIPAA-ready patient data protection, clinical system network hardening, IoMT device isolation, and 24/7 hospital threat response defense programs.",
			},
		],
	}),
});

const useCases = [
	{
		number: "01",
		title: "Protecting Electronic Health Records (EHR)",
		description:
			"Continuous access tracking and correlation surrounding medical records databases, immediately shutting down abnormal mass record export or unauthorized administrative lookups.",
		metric: "Patient Data Shielded",
	},
	{
		number: "02",
		title: "IoMT & Medical Device Security Isolation",
		description:
			"Boundary telemetry monitoring for network-connected clinical instruments (MRI, CT scanners, ICU monitors), shutting down lateral movement vectors at the subnet level.",
		metric: "Subnet-Level Guard",
	},
	{
		number: "03",
		title: "Ransomware Prevention in Clinical Environments",
		description:
			"Behavioral endpoint telemetry configured to identify active file encryptor signatures within milliseconds, safeguarding ICU, pharmacy, and laboratory workstations.",
		metric: "< 5 Min Containment",
	},
] as const;

const steps = [
	{
		number: "01",
		title: "Clinical Profiling & Mapping",
		subtitle:
			"Locate and register all active IoMT instruments, clinical workstations, and patient database query paths across hospital subnets.",
	},
	{
		number: "02",
		title: "Boundary Sensor Configuration",
		subtitle:
			"Establish localized network-switch monitoring filters to track VLAN movement and block unauthorized outbound device queries.",
	},
	{
		number: "03",
		title: "Life-Safety Action",
		subtitle:
			"Our analysts triage logs instantly, triggering remote agent locks on ransomware vectors before they can pivot to active clinical beds.",
	},
] as const;

const faqs = [
	{
		question:
			"How do you protect legacy medical equipment that cannot host security agents?",
		answer:
			"We utilize passive network telemetry and advanced segment boundary logging. By tracking interactions at the clinical VLAN switch, we instantly identify and alert on anomalous outbound connections or internal port scanning originating from legacy medical hardware.",
	},
	{
		question:
			"How do your logging policies and reports support healthcare compliance (HIPAA)?",
		answer:
			"We map our continuous aggregation, audit trail retention, and VAPT assessments directly to HIPAA administrative and technical safeguards, generating regular board-ready compliance reports.",
	},
	{
		question:
			"Can your 24/7 SOC interface directly with our clinical emergency night staff?",
		answer:
			"Yes. We configure dedicated high-priority escalations via phone, SMS, and secure messaging channels to notify your active hospital IT shift during critical, time-sensitive events.",
	},
] as const;

function HealthcareSolutionPage() {
	const { page, cms } = useCmsPageData("/solutions/healthcare", {
		hero: {
			eyebrow: "Healthcare",
			headline: "Securing clinical systems and patient records.",
			subheadline:
				"We protect hospitals, laboratories, and health networks with HIPAA-aligned logging, connected medical device boundary guards, and rapid ransomware containment systems.",
			ctaLabel: "Request Clinical Audit",
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
							{cms.hero?.eyebrow || "Healthcare"}
						</Badge>
						<h1 className="mt-6 text-balance font-serif text-4xl text-foreground leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
							{cms.hero?.headline ||
								"Securing clinical systems and patient records."}
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
								{cms.hero?.ctaLabel || "Request Clinical Audit"}
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
										Hospital Ward Telemetry
									</span>
								</div>
								<span className="rounded-none bg-red-500/10 px-2 py-0.5 font-bold font-mono text-[9px] text-red-500">
									Clinical Core
								</span>
							</div>

							{/* Visual Graphic Representation Panels */}
							<div className="mt-5 space-y-4">
								{/* Activity Block 1: Device subnets check */}
								<div className="rounded-none border border-border/20 bg-muted/10 p-3">
									<p className="font-serif text-foreground text-sm">
										Subnet Isolation Status
									</p>
									<div className="mt-3 space-y-2">
										<div className="flex items-center justify-between font-mono text-[10px]">
											<span className="text-muted-foreground">
												MRI/CT Scan VLAN
											</span>
											<span className="font-bold text-emerald-500">
												Segregated & Secure
											</span>
										</div>
										<div className="flex items-center justify-between font-mono text-[10px]">
											<span className="text-muted-foreground">
												EMR Database VLAN
											</span>
											<span className="font-bold text-emerald-500">
												Encrypted & Secure
											</span>
										</div>
									</div>
								</div>

								{/* Activity Block 2: Workstation Isolation Status */}
								<div className="relative overflow-hidden rounded-none border border-red-500/20 bg-red-500/[0.02] p-3">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-3">
											<Heart className="h-4 w-4 animate-pulse text-red-500" />
											<div>
												<p className="font-serif text-foreground text-sm leading-none">
													Emergency Ward PC-08
												</p>
												<p className="mt-1 font-mono text-[9px] text-muted-foreground">
													Ransomware Heuristic Flagged
												</p>
											</div>
										</div>
										<span className="rounded-none bg-red-500/15 px-2 py-0.5 font-bold font-mono text-[8px] text-red-500">
											Workstation Isolated
										</span>
									</div>
								</div>

								{/* Activity Block 3: HIPAA status */}
								<div className="flex items-center justify-between rounded-none border border-border/20 bg-muted/10 p-3">
									<div className="flex items-center gap-3">
										<ShieldCheck className="h-4 w-4 text-emerald-500" />
										<span className="font-serif text-foreground text-sm">
											Compliance Safeguard
										</span>
									</div>
									<span className="rounded-none bg-emerald-500/10 px-1.5 py-0.5 font-mono font-semibold text-[8px] text-emerald-500">
										HIPAA Valid
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				<CmsUseCasesSection
					eyebrow="Clinical Resilience"
					heading="Defending critical care environments"
					subtitle="Targeting vulnerabilities across complex medical subnets and massive patient record stores."
					items={cms.useCases ?? useCases}
				/>
				<CmsStepsSection
					heading="How we collaborate with your team"
					subtitle="A highly coordinated deployment, parsing, and triaging workflow designed to deliver clarity without operational friction."
					items={cms.steps ?? steps}
				/>
				<CmsTestimonialSection
					testimonial={cms.testimonial ?? {}}
					avatarUrl="https://images.pexels.com/photos/3760514/pexels-photo-3760514.jpeg?auto=compress&cs=tinysrgb&w=150"
				/>
				<CmsFaqSection
					subtitle="Direct, technical answers regarding un-agentable hardware, compliance alignments, and coordination."
					items={cms.faqs ?? faqs}
				/>
				<CmsRichBodySection html={page?.contentHtml} />
			</div>
		</section>
	);
}

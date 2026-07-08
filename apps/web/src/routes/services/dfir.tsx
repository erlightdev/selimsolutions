import { Badge } from "@selimsolutions/ui/components/badge";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
	Activity,
	ArrowLeft,
	ArrowRight,
	ChevronDown,
	FileText,
	ShieldAlert,
	ShieldCheck,
	Siren,
	Sparkles,
	Star,
} from "lucide-react";

export const Route = createFileRoute("/services/dfir")({
	component: DfirServicePage,
	head: () => ({
		meta: [
			{ title: "Digital Forensics & Incident Response (DFIR) | Selim Solution" },
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
		subtitle: "Immediately isolate compromised servers, lock administrative sessions, and block malware callbacks to prevent exfiltration.",
	},
	{
		number: "02",
		title: "Forensic Investigation",
		subtitle: "Examine registry tables, volatile system memory, and log trails to reconstruct the attacker's timeline.",
	},
	{
		number: "03",
		title: "System Restoration & Hardening",
		subtitle: "Rebuild baseline servers, rotate corporate credentials, patch zero-days, and restore clean backups.",
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
		question: "What is your data recovery success rate after ransomware attacks?",
		answer:
			"We identify and restore untouched volume shadow copies and system logs to reconstruct files. Where safe, clean backups exist, we guarantee 100% complete restoration.",
	},
] as const;

function DfirServicePage() {
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
							Emergency Incident Response
						</Badge>
						<h1 className="mt-6 text-balance font-serif text-4xl text-foreground leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
							Fast, decisive threat resolution.
						</h1>
						<p className="mt-6 max-w-xl text-pretty text-base text-foreground/75 leading-relaxed sm:text-lg dark:text-zinc-300">
							We contain breaches and restore system sanity. Our certified digital forensics and incident response (DFIR) specialists
							halt active compromises, decompile malware, and reconstruct systems securely under heavy pressure.
						</p>
						<div className="mt-8 flex flex-wrap gap-4">
							<a
								href="mailto:contact@selim.solutions"
								className="group inline-flex items-center justify-center gap-2 rounded-none bg-primary px-6 py-3 font-semibold text-primary-foreground text-sm tracking-wide transition-all duration-150 hover:bg-primary/90 active:scale-[0.97]"
							>
								Contact DFIR Emergency
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
									<span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
										DFIR MALWARE Sandbox
									</span>
								</div>
								<span className="rounded-none bg-red-500/10 px-2 py-0.5 font-mono text-[9px] font-bold text-red-500">
									EMERENCY RESPONSE ACTIVE
								</span>
							</div>

							{/* Visual Panels */}
							<div className="mt-5 space-y-4">
								{/* Activity Block 1: Attack details */}
								<div className="rounded-none border border-border/20 bg-muted/10 p-3">
									<p className="font-serif text-sm text-foreground">Malware Sample Audited</p>
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
												<p className="font-serif text-sm text-foreground leading-none">Ransomware Payload</p>
												<p className="mt-1 font-mono text-[9px] text-muted-foreground">Host isolations complete</p>
											</div>
										</div>
										<span className="rounded-none bg-emerald-500/15 px-2 py-0.5 font-mono text-[8px] font-bold text-emerald-500">
											Mitigated
										</span>
									</div>
								</div>

								{/* Activity Block 3: Verification */}
								<div className="flex items-center justify-between rounded-none border border-border/20 bg-muted/10 p-3">
									<div className="flex items-center gap-3">
										<ShieldCheck className="h-4 w-4 text-emerald-500" />
										<span className="font-serif text-sm text-foreground">Chain of Custody Snapshot</span>
									</div>
									<span className="rounded-none bg-emerald-500/10 px-1.5 py-0.5 font-mono text-[8px] font-semibold text-emerald-500">
										Locked
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>

				{/* USE-CASE SECTION */}
				<div className="mt-24 sm:mt-32 border-border/30 border-t pt-16 sm:pt-24">
					<div className="max-w-3xl">
						<span className="font-mono text-[10px] text-primary uppercase tracking-[0.25em]">
							Proven Safeguards
						</span>
						<h2 className="mt-4 font-serif text-3xl text-foreground leading-[1.1] tracking-tight sm:text-4xl">
							Operational scenarios we routinely defend
						</h2>
						<p className="mt-4 text-pretty text-muted-foreground text-sm leading-relaxed sm:text-base">
							We shift monitoring, prioritization, and response rules to target the
							critical choke points in digital and core banking environments.
						</p>
					</div>

					<div className="mt-16 grid gap-6 md:grid-cols-3">
						{useCases.map((uc) => (
							<div
								key={uc.number}
								className="group flex flex-col justify-between rounded-none border border-border/30 bg-card p-6 transition-all duration-300 hover:border-primary/25 hover:translate-y-[-2px]"
							>
								<div>
									<div className="flex items-center justify-between">
										<span className="font-mono text-xl font-bold text-[#405cfe]/30 group-hover:text-primary/70 transition-colors">
											{uc.number}
										</span>
										<span className="rounded-none bg-[#405cfe]/5 border border-primary/15 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-[#405cfe]">
											{uc.metric}
										</span>
									</div>
									<h3 className="mt-6 font-serif text-xl text-foreground leading-snug">
										{uc.title}
									</h3>
									<p className="mt-3 text-pretty text-sm text-foreground/70 leading-relaxed dark:text-zinc-300">
										{uc.description}
									</p>
								</div>
							</div>
						))}
					</div>
				</div>

				{/* THE WORKING PROCESS SECTION */}
				<div className="mt-24 sm:mt-32 border-border/30 border-t pt-16 sm:pt-24">
					<div className="mx-auto max-w-3xl text-center">
						<span className="font-mono text-[10px] text-primary uppercase tracking-[0.25em]">
							Operational Cycle
						</span>
						<h2 className="mt-4 font-serif text-3xl text-foreground leading-[1.1] tracking-tight sm:text-4xl">
							How we collaborate with your team
						</h2>
						<p className="mx-auto mt-4 max-w-lg text-pretty text-muted-foreground text-sm leading-relaxed sm:text-base">
							A highly coordinated deployment, parsing, and triaging workflow designed to deliver clarity without operational friction.
						</p>
					</div>

					{/* Process Timeline Blocks */}
					<div className="relative mt-16 grid gap-8 md:grid-cols-3">
						{/* Dotted connecting line */}
						<div className="pointer-events-none absolute top-10 left-0 hidden h-[1px] w-full border-muted-foreground/25 border-t border-dashed md:block" />

						{steps.map((st) => (
							<div key={st.number} className="relative z-10 flex flex-col items-center text-center">
								{/* Step Number Badge */}
								<div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-card text-primary font-mono text-sm font-semibold shadow-md transition-all duration-300 hover:border-primary/80">
									{st.number}
								</div>
								<h3 className="mt-6 font-serif text-lg text-foreground">
									{st.title}
								</h3>
								<p className="mt-3 text-pretty text-xs text-muted-foreground leading-relaxed max-w-xs">
									{st.subtitle}
								</p>
							</div>
						))}
					</div>
				</div>

				{/* TESTIMONIAL SECTION */}
				<div className="mt-24 sm:mt-32 rounded-none border border-border/30 bg-[#405cfe]/[0.02] p-8 sm:p-12">
					<div className="mx-auto max-w-4xl text-center">
						<div className="flex justify-center gap-0.5">
							{Array.from({ length: 5 }).map((_, i) => (
								<Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
							))}
						</div>
						<blockquote className="mt-6 font-serif text-xl text-foreground leading-relaxed sm:text-2xl">
							&ldquo;Their DFIR runbook turned what could've been a week-long outage into a four-hour recovery.
							Calm, precise, and brutally fast under pressure.&rdquo;
						</blockquote>
						<div className="mt-8 flex items-center justify-center gap-3">
							<span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-[#405cfe] to-cyan-400">
								<img
									src="https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg?auto=compress&cs=tinysrgb&w=150"
									alt="Sneha Thapa"
									className="h-full w-full object-cover"
								/>
							</span>
							<div className="text-left">
								<p className="font-semibold text-foreground text-sm">
									Sneha Thapa
								</p>
								<p className="text-muted-foreground text-xs">
									VP Engineering, Khalti
								</p>
							</div>
						</div>
					</div>
				</div>

				{/* FAQ SECTION */}
				<div className="mt-24 sm:mt-32 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
					<div>
						<p className="font-bold font-mono text-[10px] text-primary uppercase tracking-[0.25em]">
							FAQ
						</p>
						<h2 className="mt-4 text-balance font-serif text-3xl text-foreground leading-[1.05] tracking-tight sm:text-4xl">
							Answering your team's core concerns
						</h2>
						<p className="mt-4 max-w-md text-pretty text-muted-foreground text-sm leading-relaxed sm:text-base">
							Direct, technical answers regarding response mobilization speeds, backup recovery, and ad-hoc engagements.
						</p>
					</div>

					<div className="space-y-3">
						{faqs.map((faq) => (
							<details
								key={faq.question}
								className="group rounded-none border border-border/30 bg-card/60 p-5 transition-colors open:border-[#405cfe]/30 open:bg-[#405cfe]/[0.02]"
							>
								<summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-foreground text-sm sm:text-base">
									<span>{faq.question}</span>
									<span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-transform duration-200 group-open:rotate-180 group-open:text-[#405cfe]">
										<ChevronDown className="h-4 w-4" />
									</span>
								</summary>
								<p className="text-pretty pt-4 pr-10 text-muted-foreground text-sm leading-relaxed">
									{faq.answer}
								</p>
							</details>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

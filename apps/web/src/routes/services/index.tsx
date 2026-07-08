import { Badge } from "@selimsolutions/ui/components/badge";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
	Activity,
	ArrowLeft,
	ArrowRight,
	BadgeCheck,
	ChevronDown,
	Cloud,
	Database,
	Layers,
	ScanSearch,
	Shield,
	ShieldCheck,
	Siren,
	Sparkles,
	TowerControl,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import type { Swiper as SwiperClass } from "swiper";
import gsap from "gsap";

import "swiper/css";

export const Route = createFileRoute("/services/")({
	component: ServicesPage,
	head: () => ({
		meta: [
			{ title: "Premium Cybersecurity Services | Selim Solution" },
			{
				name: "description",
				content:
					"Explore Selim Solution's premium security coverage: 24/7 SOC, VAPT pentesting, cloud hardening, EDR integration, compliance GRC, and DFIR response.",
			},
		],
	}),
});

/* ── Content (Services Data) ─────────────────────────────────────────── */

const premiumServices = [
	{
		id: "soc-as-a-service",
		num: "01",
		title: "SOC as a Service",
		icon: TowerControl,
		tagline: "Analyst-led 24/7 threat hunting and triage.",
		description:
			"We ingest security telemetry across endpoints, identity gateways, and cloud networks. Our Kathmandu-based operations center runs continuous correlation rule models to detect and contain attacks before they disrupt your business.",
		image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
		bgGlow: "from-blue-500/10 to-transparent",
		color: "#3b82f6",
		stats: { label: "MTTR Response Time", val: "< 15 Mins" },
		checklist: [
			"Continuous 24/7/365 telemetry monitoring",
			"Active threat containment and remote lockouts",
			"Custom detection rules and SIEM tuning",
		],
	},
	{
		id: "vapt",
		num: "02",
		title: "Vulnerability Assessment & Pentesting",
		icon: ScanSearch,
		tagline: "Manual offensive validation of your threat boundaries.",
		description:
			"No generic automated reports. Our certified ethical hacking team manually audits your web apps, mobile backends, active directories, and local subnets to locate zero-day threats and logical bypasses.",
		image: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
		bgGlow: "from-emerald-500/10 to-transparent",
		color: "#10b981",
		stats: { label: "Average Manual Findings", val: "4.2x More" },
		checklist: [
			"Manual application logic exploitation",
			"Active Directory escalation analysis",
			"C-Suite board-ready technical report cards",
		],
	},
	{
		id: "cloud-security",
		num: "03",
		title: "Cloud Security Hardening",
		description:
			"Posture audit, cloud identity checks, and automated drift protection across AWS, Azure, and Google Workspace environments.",
		tagline: "Secure your high-value cloud assets.",
		icon: Cloud,
		image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80",
		bgGlow: "from-indigo-500/10 to-transparent",
		color: "#6366f1",
		stats: { label: "Drift Detection Speed", val: "Continuous" },
		checklist: [
			"Multi-cloud posture audits and misconfiguration logs",
			"Google Workspace & Office 365 identity checks",
			"Local compliance regulatory mapping",
		],
	},
	{
		id: "edr",
		num: "04",
		title: "EDR Integration & Management",
		description:
			"Deployment of advanced endpoint sensors and continuous monitoring to stop zero-day ransomware before it encrypts files.",
		tagline: "Uncompromising security on every workstation.",
		icon: Shield,
		image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
		bgGlow: "from-purple-500/10 to-transparent",
		color: "#a855f7",
		stats: { label: "Workstations Monitored", val: "Active 24/7" },
		checklist: [
			"Lightweight, optimized endpoint agent sensors",
			"Ransomware encryption heuristic locks",
			"Full system memory behavioral scanning",
		],
	},
	{
		id: "grc-compliance",
		num: "05",
		title: "GRC & Compliance Prep",
		description:
			"Control mapping, manual audits, and evidence gathering prepared for ISO 27001, PCI-DSS, SOC 2, and NRB directives.",
		tagline: "Standard compliance built around operations.",
		icon: BadgeCheck,
		image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=800&q=80",
		bgGlow: "from-amber-500/10 to-transparent",
		color: "#f59e0b",
		stats: { label: "Certification Success Rate", val: "100%" },
		checklist: [
			"Automated evidence compiling dashboards",
			"Gap analysis custom compliance models",
			"Internal policy drafting templates",
		],
	},
	{
		id: "dfir",
		num: "06",
		title: "Digital Forensics & Incident Response",
		description:
			"Emergency root-cause forensics, legal log isolation, malware extraction, and systematic system-state recovery.",
		tagline: "Calm, precise, and fast under breach pressure.",
		icon: Siren,
		image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
		bgGlow: "from-rose-500/10 to-transparent",
		color: "#f43f5e",
		stats: { label: "Emergency Response Hotline", val: "24/7 Active" },
		checklist: [
			"Preserving legal forensic data trails",
			"In-depth malware decompiling models",
			"Structured data-reconstruction blueprints",
		],
	},
] as const;

const socHighlightsSlides = [
	{
		title: "24/7 Security Operations Room",
		desc: "Active threat triage desks monitoring critical gateways and endpoint telemetry in real-time, based in Kathmandu.",
		img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80",
	},
	{
		title: "Continuous Pentesting Labs",
		desc: "Safe execute sandbox environments to analyze live hacker payloads and custom-engineered malware vectors.",
		img: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80",
	},
	{
		title: "Disaster Recovery hot-sites",
		desc: "Highly redundant secondary hot-site hosting, data backups, and remote syslog recovery vaults.",
		img: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=800&q=80",
	},
 ] as const;

const faqs = [
	{
		question: "How does Selim Solution differ from automated scanners?",
		answer:
			"Automated scanners only detect known signatures. Our certified analysts execute manual logical bypasses, script API exploits, and perform live threat correlation to locate zero-days and deep logical vulnerabilities.",
	},
	{
		question: "What is your typical onboarding timeline for SOC as a Service?",
		answer:
			"We can initiate log parsing and integrate initial cloud directories or endpoint collectors within 48 hours. Comprehensive correlation dashboard configuration settles within 10 to 14 business days.",
	},
	{
		question: "How do you handle emergency incident response for non-retained clients?",
		answer:
			"We operate a dedicated 24/7 hotline. Incident triage engineers can be mobilized immediately under structured emergency contracts to isolate and recover systems.",
	},
] as const;

/* ── Component Render ───────────────────────────────────────────────── */

export default function ServicesPage() {
	const containerRef = useRef<HTMLDivElement>(null);
	const [swiper, setSwiper] = useState<SwiperClass | null>(null);
	const [activeSlide, setActiveSlide] = useState(0);

	// GSAP Entry Animation Context (leak-free unmounting via context.revert)
	useEffect(() => {
		const ctx = gsap.context(() => {
			gsap.from(".gsap-fade-up", {
				y: 35,
				opacity: 0,
				duration: 0.8,
				stagger: 0.15,
				ease: "power3.out",
			});
			gsap.from(".gsap-scale-in", {
				scale: 0.95,
				opacity: 0,
				duration: 1,
				ease: "power2.out",
				delay: 0.3,
			});
		}, containerRef);

		return () => ctx.revert();
	}, []);

	return (
		<section
			ref={containerRef}
			className="relative isolate overflow-hidden bg-background py-16 sm:py-24"
		>
			{/* Grid Pattern and Glow Elements */}
			<div
				className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[800px] opacity-40 dark:opacity-60"
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
			<div className="pointer-events-none absolute top-0 left-1/2 z-0 h-[500px] w-full max-w-7xl -translate-x-1/2 bg-[radial-gradient(42%_42%_at_50%_0%,rgba(0,98,227,0.14),transparent_100%)]" />

			<div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-10">
				{/* Back navigation */}
				<Link
					to="/"
					className="gsap-fade-up group mb-12 inline-flex items-center gap-2 font-bold text-[10px] text-muted-foreground uppercase tracking-widest transition-all duration-150 hover:text-foreground active:scale-[0.97]"
				>
					<ArrowLeft className="h-3.5 w-3.5 transition-transform duration-200 ease-out-strong group-hover:-translate-x-0.5" />
					Back to home
				</Link>

				{/* ── HERO SECTION ────────────────────────────────────────────── */}
				<div className="grid gap-12 lg:grid-cols-12 lg:items-start">
					<div className="lg:col-span-7">
						<Badge
							variant="outline"
							className="gsap-fade-up rounded-none border-primary/20 bg-primary/5 px-3.5 py-1.5 font-mono text-[11px] text-primary uppercase tracking-widest"
						>
							Premium Services
						</Badge>
						<h1 className="gsap-fade-up mt-6 max-w-4xl text-balance font-serif text-4xl text-foreground leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
							Security operations engineered for high-risk profiles.
						</h1>
						<p className="gsap-fade-up mt-6 max-w-2xl text-pretty text-base text-foreground/75 leading-relaxed sm:text-lg dark:text-zinc-300">
							From continuous 24/7 security logging to aggressive penetration pentesting,
							each operational workflow is fine-tuned to block active threats and assure compliance.
						</p>
					</div>
					<div className="lg:col-span-5 lg:pt-4">
						<div className="gsap-fade-up rounded-none border border-border/30 bg-card p-7 sm:p-8">
							<div className="flex items-center gap-2 text-[#405cfe]">
								<Sparkles className="h-4 w-4" />
								<p className="font-semibold text-foreground text-sm">
									Our Core Mandates
								</p>
							</div>
							<ul className="mt-5 space-y-3 font-serif text-foreground/85 text-sm dark:text-zinc-300">
								<li className="flex gap-2">
									<span className="text-primary font-bold">✓</span> Analyst-led triage desks — zero outsourced queues
								</li>
								<li className="flex gap-2">
									<span className="text-primary font-bold">✓</span> Manual pentesting logical bypass validation
								</li>
								<li className="flex gap-2">
									<span className="text-primary font-bold">✓</span> Sovereign data hosting & masked transaction fields
								</li>
							</ul>
						</div>
					</div>
				</div>

				{/* ── VISUAL SWIPER GALLERY SECTION ───────────────────────────── */}
				<div className="mt-20 sm:mt-28 border-border/30 border-t pt-16 sm:pt-20">
					<div className="max-w-2xl gsap-fade-up">
						<span className="font-mono text-[10px] text-primary uppercase tracking-[0.25em]">
							Behind The Glass
						</span>
						<h2 className="mt-4 font-serif text-3xl text-foreground leading-[1.1] tracking-tight sm:text-4xl">
							Our operational environments and labs
						</h2>
						<p className="mt-4 text-pretty text-muted-foreground text-sm leading-relaxed sm:text-base">
							Take a premium look inside our active monitoring environments, sandboxes, and recovery hot-sites.
						</p>
					</div>

					{/* Swiper Interactive Slider Container */}
					<div className="gsap-scale-in mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
						<div className="relative overflow-hidden rounded-none border border-border/40 bg-card p-2 shadow-2xl">
							<Swiper
								onSwiper={setSwiper}
								onSlideChange={(s) => setActiveSlide(s.activeIndex)}
								className="h-[320px] sm:h-[440px] w-full"
								loop={false}
							>
								{socHighlightsSlides.map((slide) => (
									<SwiperSlide key={slide.title} className="relative h-full">
										<img
											src={slide.img}
											alt={slide.title}
											className="h-full w-full object-cover"
										/>
										{/* Sleek bottom text slide labels */}
										<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/45 to-transparent p-6 text-white">
											<p className="font-serif text-lg sm:text-xl font-bold">{slide.title}</p>
											<p className="mt-1 font-mono text-[10px] text-zinc-300 uppercase tracking-wider">
												Selim Solution Base — Kathmandu
											</p>
										</div>
									</SwiperSlide>
								))}
							</Swiper>
						</div>

						{/* Slide description controller details panel */}
						<div className="flex flex-col justify-center space-y-6">
							{socHighlightsSlides.map((slide, i) => {
								const isActive = i === activeSlide;
								return (
									<button
										key={slide.title}
										onClick={() => swiper?.slideTo(i)}
										type="button"
										className={`group text-left border p-5 transition-all duration-200 rounded-none active:scale-[0.98] ${
											isActive
												? "border-[#405cfe] bg-[#405cfe]/[0.02]"
												: "border-border/30 bg-muted/10 hover:border-foreground/15"
										}`}
									>
										<div className="flex items-center gap-3">
											<span
												className={`font-mono text-sm font-semibold rounded-none px-2 py-0.5 ${
													isActive
														? "bg-primary text-primary-foreground"
														: "bg-muted-foreground/10 text-muted-foreground"
												}`}
											>
												0{i + 1}
											</span>
											<p className="font-serif text-base text-foreground font-semibold leading-none">
												{slide.title}
											</p>
										</div>
										<p
											className={`mt-3 text-pretty text-xs leading-relaxed transition-all duration-200 ${
												isActive ? "text-foreground/80" : "text-muted-foreground"
											}`}
										>
											{slide.desc}
										</p>
									</button>
								);
							})}
						</div>
					</div>
				</div>

				{/* ── CARD STACKING SERVICES VIEW ─────────────────────────────── */}
				<div className="mt-28 sm:mt-36 border-border/30 border-t pt-16 sm:pt-24">
					<div className="max-w-3xl">
						<span className="font-mono text-[10px] text-primary uppercase tracking-[0.25em]">
							Technical Offerings
						</span>
						<h2 className="mt-4 font-serif text-3xl text-foreground leading-[1.1] tracking-tight sm:text-4xl">
							Deploying end-to-end security safeguards
						</h2>
						<p className="mt-4 text-pretty text-muted-foreground text-sm leading-relaxed sm:text-base">
							Scroll down to unpack our stacked operational defenses. Each module acts as a dedicated security shield.
						</p>
					</div>

					{/* 3D-Like Card Stacking Scroll Layer */}
					<div className="mt-16 space-y-12 sm:space-y-16">
						{premiumServices.map((service, idx) => {
							const Icon = service.icon;

							return (
								<div
									key={service.id}
									id={service.id}
									style={{
										top: `${90 + idx * 24}px`,
									}}
									className="sticky z-20 rounded-none border border-border/40 bg-card shadow-2xl p-6 sm:p-10 grid gap-8 md:grid-cols-12 md:items-center transition-all duration-300 hover:border-primary/25"
								>
									{/* Glow highlights background */}
									<div
										className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${service.bgGlow} z-0 opacity-50`}
									/>

									{/* Left data column */}
									<div className="relative z-10 md:col-span-7">
										<div className="flex items-center gap-3">
											<span className="font-mono text-sm font-bold text-muted-foreground/45">
												{service.num}
											</span>
											<span
												style={{ color: service.color, backgroundColor: `${service.color}12` }}
												className="inline-flex h-9 w-9 items-center justify-center rounded-none font-bold"
											>
												<Icon className="h-4.5 w-4.5" />
											</span>
											<span className="font-mono text-[10px] font-bold text-primary uppercase tracking-widest">
												{service.tagline}
											</span>
										</div>

										<h3 className="mt-6 font-serif text-2xl text-foreground leading-tight sm:text-3xl">
											{service.title}
										</h3>

										<p className="mt-4 text-pretty text-foreground/75 text-sm leading-relaxed sm:text-base dark:text-zinc-300">
											{service.description}
										</p>

										{/* Checklist */}
										<ul className="mt-6 space-y-2 border-border/20 border-t pt-5">
											{service.checklist.map((item) => (
												<li key={item} className="flex items-start gap-2.5 text-xs text-foreground/80">
													<ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-emerald-500" />
													<span>{item}</span>
												</li>
											))}
										</ul>

										{/* High-speed client router link */}
										<Link
											to={`/services/${service.id}` as any}
											className="group mt-8 inline-flex items-center gap-2 font-mono text-[10px] text-primary uppercase tracking-widest font-bold hover:text-foreground active:scale-[0.97]"
										>
											Explore full capability
											<ArrowRight className="h-3.5 w-3.5 transition-transform duration-150 group-hover:translate-x-0.5" />
										</Link>
									</div>

									{/* Right premium illustration graphic / Unsplash image */}
									<div className="relative z-10 md:col-span-5">
										<div className="relative overflow-hidden aspect-16/10 rounded-none border border-border/30 bg-muted">
											<img
												src={service.image}
												alt={service.title}
												className="h-full w-full object-cover transition-transform duration-500 hover:scale-102"
											/>
										</div>

										{/* Interactive statistic card badge */}
										<div className="mt-4 flex items-center justify-between rounded-none border border-border/30 bg-background/80 p-3 shadow-md">
											<span className="font-mono text-[10px] uppercase text-muted-foreground font-semibold">
												{service.stats.label}
											</span>
											<span className="font-mono text-xs font-bold text-[#405cfe] tabular-nums">
												{service.stats.val}
											</span>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>

				{/* ── THE COLLABORATION WORKFLOW SECTION ──────────────────────── */}
				<div className="mt-28 sm:mt-36 border-border/30 border-t pt-16 sm:pt-24">
					<div className="mx-auto max-w-3xl text-center">
						<span className="font-mono text-[10px] text-primary uppercase tracking-[0.25em]">
							The Partnership Cycle
						</span>
						<h2 className="mt-4 font-serif text-3xl text-foreground leading-[1.1] tracking-tight sm:text-4xl">
							How we integrate with your stack
						</h2>
						<p className="mx-auto mt-4 max-w-lg text-pretty text-muted-foreground text-sm leading-relaxed sm:text-base">
							A secure, multi-stage deployment loop built to deliver transparent security intelligence from day one.
						</p>
					</div>

					<div className="relative mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
						{/* Interconnecting dashed border row for desktop */}
						<div className="pointer-events-none absolute top-10 left-0 hidden h-[1px] w-full border-muted-foreground/20 border-t border-dashed lg:block" />

						<div className="relative z-10 flex flex-col items-center text-center p-4">
							<div className="flex h-11 w-11 items-center justify-center rounded-full border border-primary bg-primary/5 text-primary font-mono text-sm font-bold shadow-md">
								01
							</div>
							<h3 className="mt-6 font-serif text-base font-semibold text-foreground">Secure Ingest Config</h3>
							<p className="mt-2.5 text-pretty text-xs text-muted-foreground leading-relaxed max-w-xs">
								We run localized scripts to configure syslog forwarding interfaces, cloud APIs, and workspace directories cleanly.
							</p>
						</div>

						<div className="relative z-10 flex flex-col items-center text-center p-4">
							<div className="flex h-11 w-11 items-center justify-center rounded-full border border-primary bg-primary/5 text-primary font-mono text-sm font-bold shadow-md">
								02
							</div>
							<h3 className="mt-6 font-serif text-base font-semibold text-foreground">Rule Alignment & Tuning</h3>
							<p className="mt-2.5 text-pretty text-xs text-muted-foreground leading-relaxed max-w-xs">
								Our engineering team calibrates log parsers, establishing clean behavioral models aligned to your exact assets.
							</p>
						</div>

						<div className="relative z-10 flex flex-col items-center text-center p-4">
							<div className="flex h-11 w-11 items-center justify-center rounded-full border border-primary bg-primary/5 text-primary font-mono text-sm font-bold shadow-md">
								03
							</div>
							<h3 className="mt-6 font-serif text-base font-semibold text-foreground">Joint Threat Triage</h3>
							<p className="mt-2.5 text-pretty text-xs text-muted-foreground leading-relaxed max-w-xs">
								Our active 24/7 operations room routes verified, prioritized escalations to your engineers, offering precise recovery guides.
							</p>
						</div>
					</div>
				</div>

				{/* ── FAQ SECTION ─────────────────────────────────────────────── */}
				<div className="mt-28 sm:mt-36 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
					<div>
						<p className="font-bold font-mono text-[10px] text-primary uppercase tracking-[0.25em]">
							FAQ
						</p>
						<h2 className="mt-4 text-balance font-serif text-3xl text-foreground leading-[1.05] tracking-tight sm:text-4xl">
							Questions security teams ask before onboarding
						</h2>
						<p className="mt-4 max-w-md text-pretty text-muted-foreground text-sm leading-relaxed sm:text-base">
							Direct, technical answers regarding logging compliance, data separation, and SOC setup speeds.
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

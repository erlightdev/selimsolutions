import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import type { Swiper as SwiperClass } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import {
	Shield,
	Activity,
	Terminal,
	Lock,
	ArrowRight,
	Globe,
	Cpu,
	Award,
	UserCheck,
	Sparkles,
} from "lucide-react";

import { Badge } from "@selimsolutions/ui/components/badge";
import "swiper/css";

export const Route = createFileRoute("/about")({
	component: AboutPage,
	head: () => ({
		meta: [
			{ title: "Brand Story & Security Command | Selim Solution" },
			{
				name: "description",
				content:
					"Discover Selim Solution's story. We are a premier Managed Cyber Security Service Provider (MSSP) delivering 24/7 sovereign SOC, VAPT, and threat-containment services.",
			},
		],
	}),
});

interface TeamMember {
	name: string;
	role: string;
	certs: string[];
	avatar: string;
}

const stats = [
	{ value: "2021", label: "Year Founded" },
	{ value: "24/7/365", label: "SOC Command" },
	{ value: "<15m", label: "Containment SLA" },
	{ value: "100%", label: "Sovereign Engineers" },
] as const;

const pillars = [
	{
		id: "01",
		title: "Sovereign SOC Command",
		subtitle: "24/7/365 Continuous Oversight",
		description:
			"We stand guard over critical infrastructure around the clock. Our Kathmandu-based Security Operations Center ingests, parses, and acts on hundreds of millions of events daily, translating raw infrastructure telemetry into actionable intelligence and immediate threat containment.",
		icon: Activity,
		highlight: "Active telemetry oversight & live triage desks",
	},
	{
		id: "02",
		title: "Penetration Testing (VAPT)",
		subtitle: "Rigorous Offensive Simulations",
		description:
			"True resilience demands continuous pressure. Our offensive security specialists simulate real-world Advanced Persistent Threat (APT) techniques, carrying out deep manual penetration testing across web apps, legacy APIs, and hybrid networks to eliminate exposures before they are capitalized on.",
		icon: Terminal,
		highlight: "Zero-noise reporting & certified manual validation",
	},
	{
		id: "03",
		title: "GRC & Governance Align",
		subtitle: "Trust Architectures & Compliance",
		description:
			"Security is also a framework of corporate trust. We bridge technical configurations with rigorous executive compliance. We prepare organizations for ISO 27001, SOC 2, and payment regulatory benchmarks through clear, painless control mapping that matches your actual operational reality.",
		icon: Lock,
		highlight: "Control mapping automation & audit readiness",
	},
	{
		id: "04",
		title: "Active Incident Response",
		subtitle: "Fast Mitigation & Forensic Recovery",
		description:
			"When an active compromise strikes, hesitation is a fatal vulnerability. Our elite Digital Forensics and Incident Response (DFIR) operators contain active breaches, purge adversaries from systems, and restore business operations under tight pressure with clean, legally defensible audit logs.",
		icon: Shield,
		highlight: "Immediate threat eradication & root-cause forensic reports",
	},
] as const;

const team: readonly TeamMember[] = [
	{
		name: "Sujat Dahal",
		role: "Founder & Chief Cyber Commander",
		certs: ["CISSP", "OSCP", "CISM"],
		avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80",
	},
	{
		name: "Aman Shrestha",
		role: "VP of Security Operations (SOC Lead)",
		certs: ["GCIA", "CEH", "Sec+"],
		avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&h=300&q=80",
	},
	{
		name: "Alisha Shakya",
		role: "Head of Risk, Governance & Compliance (GRC)",
		certs: ["CISA", "ISO 27001 LA", "CRISC"],
		avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&h=300&q=80",
	},
];

function AboutPage() {
	const [swiper, setSwiper] = useState<SwiperClass | null>(null);
	const [activePillar, setActivePillar] = useState(0);

	return (
		<div className="bg-background py-16 sm:py-24 relative isolate overflow-hidden">
			{/* Hero grid pattern */}
			<div
				className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[720px] opacity-60"
				style={{
					backgroundImage:
						"linear-gradient(to right, color-mix(in oklab, var(--foreground) 12%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--foreground) 12%, transparent) 1px, transparent 1px)",
					backgroundSize: "56px 56px",
					WebkitMaskImage:
						"radial-gradient(ellipse 70% 55% at 50% 0%, #000 52%, transparent 100%)",
					maskImage:
						"radial-gradient(ellipse 70% 55% at 50% 0%, #000 52%, transparent 100%)",
				}}
			/>
			<div className="pointer-events-none absolute top-12 left-1/2 z-0 h-[680px] w-[680px] -translate-x-1/2 rounded-full border border-primary/10" />
			<div className="pointer-events-none absolute top-40 left-1/2 z-0 h-[420px] w-[420px] -translate-x-1/2 rounded-full border border-primary/5" />

			{/* Ambient security mesh layer */}
			<div className="pointer-events-none absolute top-0 left-1/2 z-0 h-[500px] w-full max-w-7xl -translate-x-1/2 bg-[radial-gradient(40%_40%_at_50%_0%,rgba(0,98,227,0.12),transparent_100%)]" />

			<div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10">
				{/* Back button or tiny category cue */}
				<p className="anim-fade-up text-[10px] font-bold uppercase tracking-widest text-primary mb-4">
					Who We Are
				</p>

				{/* Title Section */}
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
					<div className="lg:col-span-7">
						<h1 className="anim-fade-up text-balance font-serif text-4xl sm:text-5xl lg:text-6xl text-foreground leading-[1.1] tracking-[-0.02em]">
							Defending digital borders with continuous engineering.
						</h1>
					</div>
					<div className="lg:col-span-5 pt-2 sm:pt-4">
						<p className="text-foreground/75 dark:text-zinc-300 text-lg sm:text-[19px] leading-[1.8] max-w-[65ch]">
							Selim Solution is a premier Managed Cyber Security Service Provider (MSSP). Founded with the vision to deliver world-class cybersecurity defense, we provide 24/7 Security Operations Center monitoring, manual penetration testing, risk governance compliance, and tactical digital forensics response.
						</p>
					</div>
				</div>

				{/* High-Contrast Stats Section */}
				<div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-foreground/10 ring-1 ring-foreground/10 mb-28 rounded-none overflow-hidden">
					{stats.map((s) => (
						<div key={s.label} className="bg-background p-8 sm:p-10 relative group">
							<span className="block font-serif text-4xl sm:text-5xl text-foreground tracking-tight group-hover:text-primary transition-colors duration-200">
								{s.value}
							</span>
							<span className="block mt-3 font-mono text-xs text-foreground/50 uppercase tracking-widest">
								{s.label}
							</span>
						</div>
					))}
				</div>

				{/* Vertical Tab Swiper Section */}
				<div className="mb-32">
					<div className="max-w-2xl mb-16">
						<Badge variant="outline" className="border-primary/20 text-primary bg-primary/5 rounded-none font-mono text-[11px] tracking-widest uppercase mb-4 px-3.5 py-1.5">
							Sovereign Pillars
						</Badge>
						<h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-[1.15] tracking-tight">
							Designed for elite cyber readiness.
						</h2>
						<p className="mt-4 text-foreground/75 dark:text-zinc-300 text-base leading-relaxed max-w-[65ch]">
							We replace generalized, high-level auditing templates with concrete technical implementations, continuous simulated attacks, and hands-on crisis command.
						</p>
					</div>

					{/* Swiper Swapper Layout */}
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
						{/* Left: Tab selection columns (Desktop Only) */}
						<div className="hidden lg:flex lg:col-span-4 flex-col gap-4 justify-center">
							{pillars.map((p, idx) => {
								const active = idx === activePillar;
								const IconComp = p.icon;
								return (
									<button
										key={p.id}
										type="button"
										onClick={() => {
											setActivePillar(idx);
											swiper?.slideTo(idx);
										}}
										className={`w-full text-left p-6 transition-all duration-200 rounded-none border border-border/20 text-balance flex items-start gap-5 group relative ${
											active
												? "bg-foreground/5 border-primary/50 ring-1 ring-primary/30"
												: "bg-background hover:bg-foreground/[0.02] hover:border-foreground/20"
										}`}
									>
										{/* Active Accent Border indicator */}
										{active && (
											<div className="absolute top-0 bottom-0 left-0 w-1 bg-primary" />
										)}

										<span className={`font-mono text-sm ${active ? "text-primary" : "text-foreground/30"}`}>
											{p.id}
										</span>

										<div>
											<span className={`block font-serif text-lg font-medium transition-colors ${
												active ? "text-foreground" : "text-foreground/70 group-hover:text-foreground"
											}`}>
												{p.title}
											</span>
											<span className="block mt-1.5 text-xs text-foreground/45">
												{p.subtitle}
											</span>
										</div>
									</button>
								);
							})}
						</div>

						{/* Right: The content Swiper Slide deck (Fully responsive swipe container) */}
						<div className="col-span-1 lg:col-span-8 border border-border/30 bg-foreground/[0.01] dark:bg-zinc-900/10 p-8 sm:p-12 relative flex flex-col justify-between min-h-[420px]">
							{/* Laser accent line details on the slide deck container */}
							<div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />
							<div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-primary/10 to-transparent" />

							{/* Mobile Tablet quick pill bar selector (renders horizontal badging rows) */}
							<div className="lg:hidden flex gap-2 overflow-x-auto pb-4 mb-8 border-b border-border/10 scrollbar-none">
								{pillars.map((p, idx) => {
									const active = idx === activePillar;
									return (
										<button
											key={p.id}
											type="button"
											onClick={() => {
												setActivePillar(idx);
												swiper?.slideTo(idx);
											}}
											className={`shrink-0 px-4 py-2.5 font-mono text-xs uppercase tracking-wider transition-all rounded-none ${
												active
													? "bg-primary text-primary-foreground border border-primary font-bold"
													: "bg-muted text-muted-foreground border border-border"
											}`}
										>
											{p.title}
										</button>
									);
								})}
							</div>

							<Swiper
								onSwiper={setSwiper}
								onSlideChange={(s) => setActivePillar(s.activeIndex)}
								spaceBetween={30}
								slidesPerView={1}
								className="w-full h-full"
							>
								{pillars.map((p) => {
									const IconComponent = p.icon;
									return (
										<SwiperSlide key={p.id} className="h-full flex flex-col justify-between">
											<div>
												<div className="flex items-center gap-4 mb-8">
													<div className="p-3.5 bg-primary/5 border border-primary/20 text-primary">
														<IconComponent className="h-6 w-6" />
													</div>
													<div>
														<span className="block font-mono text-[11px] text-primary/70 uppercase tracking-widest font-bold">
															Pillar {p.id}
														</span>
														<h3 className="font-serif text-2xl sm:text-3xl text-foreground font-medium mt-1">
															{p.title}
														</h3>
													</div>
												</div>

												<p className="text-foreground/85 dark:text-zinc-200 text-base sm:text-[17px] leading-[1.8] text-pretty max-w-[65ch]">
													{p.description}
												</p>
											</div>

											<div className="mt-10 pt-8 border-t border-border/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-foreground/[0.01] p-5 border border-border/5">
												<div className="flex items-center gap-2.5 flex-wrap">
													<Sparkles className="h-4 w-4 text-primary anim-pulse-flow" />
													<span className="font-mono text-xs text-foreground/50 uppercase tracking-wider">
														Technical Focus:
													</span>
													<span className="text-sm text-foreground/85 font-medium">
														{p.highlight}
													</span>
												</div>

												<div className="flex items-center gap-1.5 text-sm text-primary font-semibold group cursor-pointer shrink-0">
													<span>Learn about capabilities</span>
													<ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
												</div>
											</div>
										</SwiperSlide>
									);
								})}
							</Swiper>
						</div>
					</div>
				</div>

				{/* Leadership & Core Command Team Section */}
				<div>
					<div className="max-w-2xl mb-16">
						<Badge variant="outline" className="border-primary/20 text-primary bg-primary/5 rounded-none font-mono text-[11px] tracking-widest uppercase mb-4 px-3.5 py-1.5">
							The Command Team
						</Badge>
						<h2 className="font-serif text-3xl sm:text-4xl text-foreground leading-[1.15] tracking-tight">
							Managed by certified operators.
						</h2>
						<p className="mt-4 text-foreground/75 dark:text-zinc-300 text-base leading-relaxed max-w-[65ch]">
							Our sovereign security operations are designed, supervised, and conducted by veteran local engineers who hold respected cybersecurity certifications.
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
						{team.map((m) => (
							<div
								key={m.name}
								className="relative group border border-border/30 bg-foreground/[0.01] dark:bg-zinc-900/10 p-6 sm:p-8 rounded-none overflow-hidden hover:border-primary/40 transition-colors duration-200"
							>
								{/* Card Laser Highlights */}
								<div className="absolute top-0 left-0 w-full h-[2px] bg-linear-to-r from-transparent via-primary/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />

								{/* Profile Avatar Frame */}
								<div className="relative h-64 sm:h-72 w-full overflow-hidden bg-muted mb-6 border border-border/10">
									<img
										src={m.avatar}
										alt={m.name}
										className="h-full w-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
										loading="lazy"
									/>
									<div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent" />
									
									<div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
										{m.certs.map((c) => (
											<span
												key={c}
												className="px-2 py-0.5 bg-background/90 text-primary border border-primary/25 font-mono text-[10px] uppercase font-bold tracking-wider"
											>
												{c}
											</span>
										))}
									</div>
								</div>

								<h3 className="font-serif text-xl sm:text-2xl text-foreground font-semibold">
									{m.name}
								</h3>
								<p className="font-mono text-xs text-primary/70 uppercase tracking-widest mt-1.5 font-semibold">
									{m.role}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

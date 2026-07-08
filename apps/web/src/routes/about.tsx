import { Badge } from "@selimsolutions/ui/components/badge";
import { createFileRoute } from "@tanstack/react-router";
import {
	Activity,
	ArrowRight,
	Award,
	Cpu,
	Globe,
	Lock,
	Shield,
	Sparkles,
	Terminal,
	UserCheck,
} from "lucide-react";
import { useState } from "react";
import type { Swiper as SwiperClass } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
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
		avatar:
			"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&h=300&q=80",
	},
	{
		name: "Aman Shrestha",
		role: "VP of Security Operations (SOC Lead)",
		certs: ["GCIA", "CEH", "Sec+"],
		avatar:
			"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&h=300&q=80",
	},
	{
		name: "Alisha Shakya",
		role: "Head of Risk, Governance & Compliance (GRC)",
		certs: ["CISA", "ISO 27001 LA", "CRISC"],
		avatar:
			"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&h=300&q=80",
	},
];

function AboutPage() {
	const [swiper, setSwiper] = useState<SwiperClass | null>(null);
	const [activePillar, setActivePillar] = useState(0);

	return (
		<div className="relative isolate overflow-hidden bg-background py-16 sm:py-24">
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
				<p className="anim-fade-up mb-4 font-bold text-[10px] text-primary uppercase tracking-widest">
					Who We Are
				</p>

				{/* Title Section */}
				<div className="mb-24 grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
					<div className="lg:col-span-7">
						<h1 className="anim-fade-up text-balance font-serif text-4xl text-foreground leading-[1.1] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
							Defending digital borders with continuous engineering.
						</h1>
					</div>
					<div className="pt-2 sm:pt-4 lg:col-span-5">
						<p className="max-w-[65ch] text-foreground/75 text-lg leading-[1.8] sm:text-[19px] dark:text-zinc-300">
							Selim Solution is a premier Managed Cyber Security Service
							Provider (MSSP). Founded with the vision to deliver world-class
							cybersecurity defense, we provide 24/7 Security Operations Center
							monitoring, manual penetration testing, risk governance
							compliance, and tactical digital forensics response.
						</p>
					</div>
				</div>

				{/* High-Contrast Stats Section */}
				<div className="mb-28 grid grid-cols-2 gap-px overflow-hidden rounded-none bg-foreground/10 ring-1 ring-foreground/10 lg:grid-cols-4">
					{stats.map((s) => (
						<div
							key={s.label}
							className="group relative bg-background p-8 sm:p-10"
						>
							<span className="block font-serif text-4xl text-foreground tracking-tight transition-colors duration-200 group-hover:text-primary sm:text-5xl">
								{s.value}
							</span>
							<span className="mt-3 block font-mono text-foreground/50 text-xs uppercase tracking-widest">
								{s.label}
							</span>
						</div>
					))}
				</div>

				{/* Vertical Tab Swiper Section */}
				<div className="mb-32">
					<div className="mb-16 max-w-2xl">
						<Badge
							variant="outline"
							className="mb-4 rounded-none border-primary/20 bg-primary/5 px-3.5 py-1.5 font-mono text-[11px] text-primary uppercase tracking-widest"
						>
							Sovereign Pillars
						</Badge>
						<h2 className="font-serif text-3xl text-foreground leading-[1.15] tracking-tight sm:text-4xl">
							Designed for elite cyber readiness.
						</h2>
						<p className="mt-4 max-w-[65ch] text-base text-foreground/75 leading-relaxed dark:text-zinc-300">
							We replace generalized, high-level auditing templates with
							concrete technical implementations, continuous simulated attacks,
							and hands-on crisis command.
						</p>
					</div>

					{/* Swiper Swapper Layout */}
					<div className="grid grid-cols-1 items-stretch gap-10 lg:grid-cols-12">
						{/* Left: Tab selection columns (Desktop Only) */}
						<div className="hidden flex-col justify-center gap-4 lg:col-span-4 lg:flex">
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
										className={`group relative flex w-full items-start gap-5 text-balance rounded-none border border-border/20 p-6 text-left transition-all duration-200 ${
											active
												? "border-primary/50 bg-foreground/5 ring-1 ring-primary/30"
												: "bg-background hover:border-foreground/20 hover:bg-foreground/[0.02]"
										}`}
									>
										{/* Active Accent Border indicator */}
										{active && (
											<div className="absolute top-0 bottom-0 left-0 w-1 bg-primary" />
										)}

										<span
											className={`font-mono text-sm ${active ? "text-primary" : "text-foreground/30"}`}
										>
											{p.id}
										</span>

										<div>
											<span
												className={`block font-medium font-serif text-lg transition-colors ${
													active
														? "text-foreground"
														: "text-foreground/70 group-hover:text-foreground"
												}`}
											>
												{p.title}
											</span>
											<span className="mt-1.5 block text-foreground/45 text-xs">
												{p.subtitle}
											</span>
										</div>
									</button>
								);
							})}
						</div>

						{/* Right: The content Swiper Slide deck (Fully responsive swipe container) */}
						<div className="relative col-span-1 flex min-h-[420px] flex-col justify-between border border-border/30 bg-foreground/[0.01] p-8 sm:p-12 lg:col-span-8 dark:bg-zinc-900/10">
							{/* Laser accent line details on the slide deck container */}
							<div className="absolute top-0 right-0 left-0 h-px bg-linear-to-r from-transparent via-primary/40 to-transparent" />
							<div className="absolute right-0 bottom-0 left-0 h-px bg-linear-to-r from-transparent via-primary/10 to-transparent" />

							{/* Mobile Tablet quick pill bar selector (renders horizontal badging rows) */}
							<div className="scrollbar-none mb-8 flex gap-2 overflow-x-auto border-border/10 border-b pb-4 lg:hidden">
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
											className={`shrink-0 rounded-none px-4 py-2.5 font-mono text-xs uppercase tracking-wider transition-all ${
												active
													? "border border-primary bg-primary font-bold text-primary-foreground"
													: "border border-border bg-muted text-muted-foreground"
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
								className="h-full w-full"
							>
								{pillars.map((p) => {
									const IconComponent = p.icon;
									return (
										<SwiperSlide
											key={p.id}
											className="flex h-full flex-col justify-between"
										>
											<div>
												<div className="mb-8 flex items-center gap-4">
													<div className="border border-primary/20 bg-primary/5 p-3.5 text-primary">
														<IconComponent className="h-6 w-6" />
													</div>
													<div>
														<span className="block font-bold font-mono text-[11px] text-primary/70 uppercase tracking-widest">
															Pillar {p.id}
														</span>
														<h3 className="mt-1 font-medium font-serif text-2xl text-foreground sm:text-3xl">
															{p.title}
														</h3>
													</div>
												</div>

												<p className="max-w-[65ch] text-pretty text-base text-foreground/85 leading-[1.8] sm:text-[17px] dark:text-zinc-200">
													{p.description}
												</p>
											</div>

											<div className="mt-10 flex flex-col justify-between gap-4 border border-border/10 border-border/5 border-t bg-foreground/[0.01] p-5 pt-8 sm:flex-row sm:items-center">
												<div className="flex flex-wrap items-center gap-2.5">
													<Sparkles className="anim-pulse-flow h-4 w-4 text-primary" />
													<span className="font-mono text-foreground/50 text-xs uppercase tracking-wider">
														Technical Focus:
													</span>
													<span className="font-medium text-foreground/85 text-sm">
														{p.highlight}
													</span>
												</div>

												<div className="group flex shrink-0 cursor-pointer items-center gap-1.5 font-semibold text-primary text-sm">
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
					<div className="mb-16 max-w-2xl">
						<Badge
							variant="outline"
							className="mb-4 rounded-none border-primary/20 bg-primary/5 px-3.5 py-1.5 font-mono text-[11px] text-primary uppercase tracking-widest"
						>
							The Command Team
						</Badge>
						<h2 className="font-serif text-3xl text-foreground leading-[1.15] tracking-tight sm:text-4xl">
							Managed by certified operators.
						</h2>
						<p className="mt-4 max-w-[65ch] text-base text-foreground/75 leading-relaxed dark:text-zinc-300">
							Our sovereign security operations are designed, supervised, and
							conducted by veteran local engineers who hold respected
							cybersecurity certifications.
						</p>
					</div>

					<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
						{team.map((m) => (
							<div
								key={m.name}
								className="group relative overflow-hidden rounded-none border border-border/30 bg-foreground/[0.01] p-6 transition-colors duration-200 hover:border-primary/40 sm:p-8 dark:bg-zinc-900/10"
							>
								{/* Card Laser Highlights */}
								<div className="absolute top-0 left-0 h-[2px] w-full scale-x-0 bg-linear-to-r from-transparent via-primary/30 to-transparent transition-transform duration-300 group-hover:scale-x-100" />

								{/* Profile Avatar Frame */}
								<div className="relative mb-6 h-64 w-full overflow-hidden border border-border/10 bg-muted sm:h-72">
									<img
										src={m.avatar}
										alt={m.name}
										className="h-full w-full object-cover grayscale transition-all duration-300 group-hover:scale-105 group-hover:grayscale-0"
										loading="lazy"
									/>
									<div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/20 to-transparent" />

									<div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
										{m.certs.map((c) => (
											<span
												key={c}
												className="border border-primary/25 bg-background/90 px-2 py-0.5 font-bold font-mono text-[10px] text-primary uppercase tracking-wider"
											>
												{c}
											</span>
										))}
									</div>
								</div>

								<h3 className="font-semibold font-serif text-foreground text-xl sm:text-2xl">
									{m.name}
								</h3>
								<p className="mt-1.5 font-mono font-semibold text-primary/70 text-xs uppercase tracking-widest">
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

import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import {
	Activity,
	ArrowRight,
	Award,
	BadgeCheck,
	Bell,
	Check,
	ChevronDown,
	GitBranch,
	Globe,
	House,
	LayoutGrid,
	Lock,
	Settings,
	ShieldAlert,
	Sparkles,
} from "lucide-react";

import { Marquee } from "@selimsolutions/ui/components/marquee";

import BlogInsights from "@/components/blog-insights";
import FeatureShowcase from "@/components/feature-showcase";
import ServicesTabs from "@/components/services-tabs";
import OrchestrationTabs from "@/components/orchestration-tabs";
import Testimonials from "@/components/testimonials";
import { orpc } from "@/utils/orpc";

export const Route = createFileRoute("/")({
	component: HomeComponent,
});

const logos = [
	"NTC",
	"Khalti",
	"eSewa",
	"NIC Asia",
	"Daraz",
	"F1Soft",
	"Worldlink",
] as const;

const stats = [
	{ value: "24/7", label: "Monitoring" },
	{ value: "<15m", label: "Avg response" },
	{ value: "6+", label: "Core services" },
	{ value: "100%", label: "Local team" },
] as const;

/* ── Hero dashboard mockup (decorative) ────────────────────────────── */

const radarAxes = [
	"External Threat",
	"Endpoint",
	"Network",
	"Identity",
	"Cloud",
	"Applications",
	"Email",
	"Behavior",
] as const;

// Octagon ring points (viewBox 200×200, center 100,100).
const RING_OUTER =
	"100,30 149.5,50.5 170,100 149.5,149.5 100,170 50.5,149.5 30,100 50.5,50.5";
const RING_MID =
	"100,53 133.2,66.8 147,100 133.2,133.2 100,147 66.8,133.2 53,100 66.8,66.8";
const RING_INNER =
	"100,77 116.3,83.7 123,100 116.3,116.3 100,123 83.7,116.3 77,100 83.7,83.7";
const DATA_SHAPE =
	"100,40 128.3,71.7 168,100 124.7,124.7 100,155 78.8,121.2 50,100 68.2,68.2";
const SPOKES = [
	[100, 30],
	[149.5, 50.5],
	[170, 100],
	[149.5, 149.5],
	[100, 170],
	[50.5, 149.5],
	[30, 100],
	[50.5, 50.5],
] as const;

function AlertRadar() {
	return (
		<svg
			viewBox="0 0 200 200"
			className="mx-auto h-44 w-44"
			role="img"
			aria-label="Origin of alerts radar chart"
		>
			<title>Origin of alerts</title>
			<defs>
				<radialGradient id="radar-fill" cx="50%" cy="50%" r="50%">
					<stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9" />
					<stop offset="55%" stopColor="#f97316" stopOpacity="0.7" />
					<stop offset="100%" stopColor="#ef4444" stopOpacity="0.55" />
				</radialGradient>
			</defs>

			{[RING_OUTER, RING_MID, RING_INNER].map((pts) => (
				<polygon
					key={pts}
					points={pts}
					fill="none"
					stroke="currentColor"
					strokeWidth="1"
					className="text-white/10"
				/>
			))}

			{SPOKES.map(([x, y]) => (
				<line
					key={`${x}-${y}`}
					x1="100"
					y1="100"
					x2={x}
					y2={y}
					stroke="currentColor"
					strokeWidth="1"
					className="text-white/10"
				/>
			))}

			<polygon
				points={DATA_SHAPE}
				fill="url(#radar-fill)"
				stroke="#fb923c"
				strokeWidth="1.5"
			/>
		</svg>
	);
}

function HeroDashboard() {
	const railIcons = [House, Activity, ShieldAlert, GitBranch, Settings];

	return (
		<div className="relative mx-auto w-full max-w-md text-white">
			{/* Main panel */}
			<div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0a0e1f]/90 shadow-2xl shadow-black/50 backdrop-blur-sm">
				{/* Title bar */}
				<div className="flex items-center gap-2.5 border-white/5 border-b px-4 py-3">
					<LayoutGrid className="h-4 w-4 text-white/40" />
					<span className="font-bold text-sm italic tracking-tight">
						SELIM<span className="text-[#405cfe]">7</span>
					</span>
				</div>

				<div className="flex">
					{/* Sidebar rail */}
					<div className="flex flex-col items-center gap-5 border-white/5 border-r px-3 py-5 text-white/30">
						{railIcons.map((Icon, i) => (
							<Icon
								key={Icon.displayName ?? i}
								className={i === 2 ? "h-4 w-4 text-[#405cfe]" : "h-4 w-4"}
							/>
						))}
					</div>

					{/* Body */}
					<div className="flex-1 p-4">
						<p className="font-semibold text-[0.65rem] text-white/90 uppercase tracking-[0.16em]">
							Detection &amp; Response
						</p>
						<div className="mt-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">
							<p className="text-center font-semibold text-white text-xs">
								Origin of Alerts
							</p>
							<AlertRadar />
							<div className="mt-1 flex flex-wrap justify-center gap-x-2 gap-y-1">
								{radarAxes.map((a) => (
									<span key={a} className="text-[0.55rem] text-white/40">
										{a}
									</span>
								))}
							</div>
						</div>
					</div>
				</div>

				{/* Stat chips */}
				<div className="grid grid-cols-3 gap-2 border-white/5 border-t p-3">
					{[
						["86%", "triaged"],
						["93%", "closed"],
						["18%", "escalated"],
					].map(([v, l]) => (
						<div
							key={l}
							className="rounded-lg border border-white/5 bg-white/[0.02] px-2 py-2 text-center"
						>
							<p className="font-semibold text-sm text-white tabular-nums">
								{v}
							</p>
							<p className="text-[0.55rem] text-white/40">Alerts {l}</p>
						</div>
					))}
				</div>
			</div>

			{/* Floating "Suspicious Logins" card */}
			<div className="anim-float absolute -top-8 -right-6 w-60 rounded-2xl border border-white/10 bg-[#0e1326]/95 p-4 shadow-2xl shadow-black/60 backdrop-blur">
				<div className="flex items-center gap-2">
					<span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/20">
						<ShieldAlert className="h-3.5 w-3.5 text-red-400" />
					</span>
					<span className="font-semibold text-sm">Suspicious Logins</span>
				</div>

				{/* Suggested next steps */}
				<div className="mt-3 rounded-xl border border-white/10 bg-gradient-to-br from-[#405cfe]/25 to-red-500/15 p-3">
					<div className="flex items-center gap-1.5">
						<Sparkles className="h-3 w-3 text-white/80" />
						<span className="font-medium text-[0.7rem] text-white/90">
							Suggested Next Steps
						</span>
					</div>
					<div className="mt-2.5 space-y-2">
						{[28, 20, 24].map((w) => (
							<div key={w} className="flex items-center gap-2">
								<span className="flex h-3.5 w-3.5 items-center justify-center rounded-[4px] bg-white/15">
									<Check className="h-2.5 w-2.5 text-white/80" />
								</span>
								<span
									className="h-1.5 rounded-full bg-white/15"
									style={{ width: `${w * 4}px` }}
								/>
							</div>
						))}
					</div>
				</div>

				<button
					type="button"
					className="mt-3 w-full rounded-lg bg-white px-3 py-2 font-medium text-[0.7rem] text-neutral-950 transition-[background-color,scale] duration-150 ease-out hover:bg-white/90 active:scale-[0.96]"
				>
					Create New Investigation
				</button>

				<div className="mt-3 flex items-center gap-2">
					<Bell className="h-3 w-3 text-white/40" />
					<span className="text-[0.6rem] text-white/50">Managed</span>
					<div className="flex -space-x-1.5">
						{[
							"from-[#405cfe] to-cyan-400",
							"from-orange-400 to-red-500",
							"from-emerald-400 to-teal-500",
						].map((g) => (
							<span
								key={g}
								className={`h-4 w-4 rounded-full border border-[#0e1326] bg-gradient-to-br ${g}`}
							/>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}

const metrics = [
	{ value: "125K", accent: "+", label: "Protected Endpoints" },
	{ value: "24", accent: "/7", label: "Threat Monitoring" },
	{ value: "99.99", accent: "%", label: "System Uptime" },
	{ value: "2M", accent: "+", label: "Threats Blocked" },
] as const;

const certifications = [
	{
		name: "SOC 2",
		Icon: BadgeCheck,
		featured: true,
		desc: "Enterprise-grade controls for secure data handling, monitoring, and operational integrity.",
	},
	{
		name: "GDPR",
		Icon: Globe,
		featured: false,
		desc: "Privacy-first infrastructure designed to protect customer data across global environments.",
	},
	{
		name: "ISO 27001",
		Icon: Award,
		featured: false,
		desc: "Internationally recognized standards for information security management systems.",
	},
	{
		name: "CCPA",
		Icon: Lock,
		featured: false,
		desc: "Advanced consumer privacy protection aligned with California compliance requirements.",
	},
] as const;

function HomeComponent() {
	const healthCheck = useQuery(orpc.healthCheck.queryOptions());

	return (
		<>
			{/* Hero — full-bleed video, slides under the fixed navbar (-mt-23) */}
			<section className="relative -mt-23 flex min-h-svh items-center overflow-hidden">
				<video
					className="absolute inset-0 h-full w-full object-cover"
					src="/hero-video.mp4"
					autoPlay
					muted
					loop
					playsInline
				/>
				{/* Layered overlays — left gradient for text contrast, bottom fade into the page */}
				<div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-transparent" />
				{/* Keep the bottom dark/translucent in both themes (not the light page bg) */}
				<div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent" />
				{/* Brand glow */}
				<div className="pointer-events-none absolute top-1/4 -left-40 h-96 w-96 rounded-full bg-[#405cfe]/20 blur-3xl" />

				<div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-6 pt-32 pb-28 lg:grid-cols-2 lg:px-10">
					<div className="max-w-2xl text-white">
						{/* Live status pill */}
						<div className="anim-fade-up inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 backdrop-blur-sm">
							<span className="relative flex h-2 w-2">
								<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
								<span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
							</span>
							<span className="font-medium text-white/80 text-xs uppercase tracking-[0.16em]">
								SOC operational
							</span>
						</div>

						<h1 className="anim-fade-up mt-6 text-balance font-semibold text-5xl leading-[1.02] tracking-tight [animation-delay:80ms] sm:text-6xl lg:text-7xl">
							Clarity from the{" "}
							<span className="bg-gradient-to-r from-white via-white to-[#7d8efc] bg-clip-text text-transparent">
								highest ground.
							</span>
						</h1>

						<p className="anim-fade-up mt-6 max-w-xl text-pretty text-base text-white/70 leading-relaxed [animation-delay:160ms] sm:text-lg">
							Selim Solution guards your digital
							frontier — a 24/7 SOC with threat detection, incident response and
							compliance.
						</p>

						<div className="anim-fade-up mt-9 flex flex-col gap-3 [animation-delay:240ms] sm:flex-row sm:items-center">
							<a
								href="/contact"
								className="group inline-flex items-center justify-center gap-2 rounded-xl bg-[#405cfe] px-6 py-3 font-medium text-sm text-white transition-[background-color,scale] duration-150 ease-out hover:bg-[#3550e0] active:scale-[0.96]"
							>
								Get Free Assessment
								<ArrowRight className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5" />
							</a>
							<a
								href="/services"
								className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-medium text-sm text-white backdrop-blur-sm transition-[background-color,scale] duration-150 ease-out hover:bg-white/10 active:scale-[0.96]"
							>
								Explore services
							</a>
						</div>

						{/* Trust stats */}
						<dl className="anim-fade-up mt-12 grid max-w-lg grid-cols-2 gap-x-8 gap-y-6 border-white/10 border-t pt-8 [animation-delay:320ms] sm:grid-cols-4">
							{stats.map(({ value, label }) => (
								<div key={label}>
									<dt className="font-semibold text-2xl text-white tabular-nums tracking-tight">
										{value}
									</dt>
									<dd className="mt-1 text-white/55 text-xs">{label}</dd>
								</div>
							))}
						</dl>
					</div>

					{/* Right: dashboard mockup */}
					<div className="anim-fade-up relative hidden [animation-delay:200ms] lg:block">
						<HeroDashboard />
					</div>
				</div>

				{/* Scroll cue */}
				<div className="anim-fade-up absolute bottom-6 left-1/2 -translate-x-1/2 [animation-delay:480ms]">
					<ChevronDown className="h-5 w-5 animate-bounce text-white/40" />
				</div>
			</section>

			{/* Trusted-by logo marquee */}
			<section className="border-border/60 border-b bg-background py-4">
			
				<div className="relative">
					<Marquee pauseOnHover className="[--duration:30s]">
						{logos.map((name) => (
							<span
								key={name}
								className="px-8 font-semibold text-2xl text-foreground/40 tracking-tight transition-colors hover:text-foreground/70"
							>
								{name}
							</span>
						))}
					</Marquee>
					{/* Edge fades */}
					<div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-linear-to-r from-background" />
					<div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-linear-to-l from-background" />
				</div>
			</section>

			{/* Intro statement */}
			<section className="bg-background py-16">
				<div className="mx-auto max-w-3xl px-6 text-center">
					<p className="font-medium font-mono text-xs uppercase tracking-[0.3em]">
						<span className="bg-gradient-to-r from-[#405cfe] to-[#7d8efc] bg-clip-text text-transparent">
							Enterprise Security
						</span>
					</p>
					<h2 className="mt-6 text-balance font-serif text-5xl text-foreground leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
						Take Control of Your Cybersecurity Future
					</h2>
					<p className="mx-auto mt-6 max-w-xl text-pretty text-base text-muted-foreground leading-relaxed sm:text-lg">
						Protect critical systems, monitor evolving threats, and secure every
						digital operation with intelligent enterprise-grade defense.
					</p>
				</div>
			</section>

			{/* Metrics band */}
			<section className="border-border border-t bg-background">
				<div className="mx-auto max-w-7xl px-6 lg:px-10">
					<dl className="grid grid-cols-2 overflow-hidden lg:grid-cols-4">
						{metrics.map((m) => (
							<div
								key={m.label}
								className="-mt-px -ml-px flex flex-col items-center gap-2 border border-border/50 px-6 py-12 text-center sm:py-16"
							>
								<dt className="font-semibold text-4xl text-foreground tabular-nums tracking-tight sm:text-5xl">
									{m.value}
									<span className="text-[#405cfe]">{m.accent}</span>
								</dt>
								<dd className="text-muted-foreground text-sm">{m.label}</dd>
							</div>
						))}
					</dl>
				</div>
			</section>

			{/* Security standards */}
			<section className="bg-background py-16">
				<div className="mx-auto max-w-3xl px-6 text-center">
					<p className="font-medium font-mono text-xs uppercase tracking-[0.3em]">
						<span className="bg-gradient-to-r from-[#405cfe] to-[#7d8efc] bg-clip-text text-transparent">
							Security Standards
						</span>
					</p>
					<h2 className="mt-6 text-balance font-serif text-4xl text-foreground leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
						Certified Protection for Enterprise Operations
					</h2>
					<p className="mx-auto mt-6 max-w-xl text-pretty text-base text-muted-foreground leading-relaxed sm:text-lg">
						Built to meet global cybersecurity standards with compliance-focused
						infrastructure and trusted security frameworks.
					</p>
				</div>

				<div className="mx-auto mt-16 max-w-5xl px-6 lg:px-10">
					<div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-border/60 sm:grid-cols-2">
						{certifications.map(({ name, Icon, desc, featured }) => (
							<div
								key={name}
								className={`-mt-px -ml-px flex flex-col items-center gap-4 border border-border/40 px-8 py-12 text-center ${
									featured
										? "bg-gradient-to-br from-[#405cfe]/15 via-transparent to-transparent"
										: ""
								}`}
							>
								<div
									className={`flex h-20 w-20 items-center justify-center rounded-full border ${
										featured
											? "border-[#405cfe]/40 bg-[#405cfe]/10"
											: "border-border bg-muted/30"
									}`}
								>
									<Icon
										className={`h-8 w-8 ${featured ? "text-[#405cfe]" : "text-foreground/70"}`}
									/>
								</div>
								<h3 className="font-semibold text-foreground text-lg">
									{name}
								</h3>
								<p className="max-w-xs text-pretty text-muted-foreground text-sm leading-relaxed">
									{desc}
								</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Orchestration Tabs */}
			<OrchestrationTabs />

			{/* Services tabs */}
			<ServicesTabs />

			{/* Feature showcase */}
			<FeatureShowcase />

			{/* Testimonials carousel */}
			<Testimonials />

			{/* Blog / Insights */}
			<BlogInsights />

			
		</>
	);
}

import { ArrowUpRight } from "lucide-react";

/* ── Pill CTA (dark pill + brand circular arrow) ──────────────────── */

function PillButton({ label, href }: { label: string; href: string }) {
	return (
		<a
			href={href}
			className="group inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/5 py-1.5 pr-1.5 pl-5 font-medium text-sm text-white backdrop-blur-sm transition-colors hover:bg-white/10"
		>
			{label}
			<span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#405cfe] text-white transition-transform duration-150 ease-out group-hover:rotate-45">
				<ArrowUpRight className="h-4 w-4" />
			</span>
		</a>
	);
}

/* ── Line chart card (offensive testing) ──────────────────────────── */

function LineCard() {
	return (
		<div className="rounded-3xl border border-white/10 bg-white/3 p-6 backdrop-blur-sm">
			<p className="font-semibold text-base text-white">
				Cyber Defense Offensive Testing
			</p>
			<p className="mt-1.5 max-w-xs text-sm text-white/45 leading-relaxed">
				Cyber defense offensive testing identifies vulnerabilities, simulates
				attacks, strengthens systems.
			</p>

			<div className="relative mt-5 overflow-hidden rounded-2xl border border-white/5 bg-[#0a0e1f]/80 p-5">
				<p className="font-semibold text-4xl text-white tabular-nums tracking-tight">
					85%
				</p>
				<p className="text-sm text-white/45">since last month</p>

				<svg
					viewBox="0 0 320 130"
					className="mt-3 h-32 w-full"
					role="img"
					aria-label="Vulnerability detection trend"
					preserveAspectRatio="none"
				>
					<title>Detection trend</title>
					<defs>
						<linearGradient id="line-stroke" x1="0" y1="0" x2="1" y2="0">
							<stop offset="0%" stopColor="#405cfe" />
							<stop offset="100%" stopColor="#22d3ee" />
						</linearGradient>
						<linearGradient id="line-fill" x1="0" y1="0" x2="0" y2="1">
							<stop offset="0%" stopColor="#405cfe" stopOpacity="0.25" />
							<stop offset="100%" stopColor="#405cfe" stopOpacity="0" />
						</linearGradient>
					</defs>

					{/* Area + line */}
					<path
						d="M0,110 C40,108 60,80 90,82 C120,84 130,40 165,48 C195,55 205,90 240,70 C265,56 275,30 300,38 L300,130 L0,130 Z"
						fill="url(#line-fill)"
					/>
					<path
						d="M0,110 C40,108 60,80 90,82 C120,84 130,40 165,48 C195,55 205,90 240,70 C265,56 275,30 300,38"
						fill="none"
						stroke="url(#line-stroke)"
						strokeWidth="2.5"
						strokeLinecap="round"
					/>

					{/* Markers */}
					<circle cx="90" cy="82" r="4" fill="#fff" />
					<circle
						cx="300"
						cy="38"
						r="5"
						fill="#22d3ee"
						stroke="#fff"
						strokeWidth="2"
					/>
				</svg>

				{/* Marker labels */}
				<span className="absolute bottom-12 left-[26%] text-[0.7rem] text-white/55">
					7.26k
				</span>
				<span className="absolute top-[58%] right-3 text-[0.7rem] text-white/70">
					16.75k
				</span>
			</div>
		</div>
	);
}

/* ── Bar chart card (SOC sessions) ────────────────────────────────── */

const bars: { month: string; h: number; active?: boolean }[] = [
	{ month: "MAY", h: 55 },
	{ month: "JUN", h: 42 },
	{ month: "JUL", h: 92, active: true },
	{ month: "AUG", h: 60 },
	{ month: "SEP", h: 70 },
];

function BarCard() {
	return (
		<div className="rounded-3xl border border-white/10 bg-white/3 p-6 backdrop-blur-sm">
			<div className="rounded-2xl border border-white/5 bg-[#0a0e1f]/80 p-5">
				<div className="flex items-end gap-2">
					<p className="font-semibold text-3xl text-white tabular-nums tracking-tight">
						13.5K
					</p>
					<p className="mb-1 text-sm text-white/45 leading-tight">
						Sessions in
						<br />
						past 7 days
					</p>
				</div>

				<div className="mt-6 flex items-end justify-between gap-3">
					{bars.map((b) => (
						<div
							key={b.month}
							className="flex flex-1 flex-col items-center gap-2"
						>
							<div className="relative flex h-36 w-full items-end">
								{b.active && (
									<div className="absolute -top-1 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1">
										<span className="h-2 w-2 rounded-full bg-white" />
										<span className="whitespace-nowrap rounded-md bg-white px-2 py-1 font-semibold text-[0.7rem] text-neutral-950 shadow-lg">
											$45k
										</span>
									</div>
								)}
								<div
									className={`w-full rounded-lg ${
										b.active
											? "bg-[#405cfe]"
											: "bg-linear-to-b from-white/10 to-white/2"
									}`}
									style={{ height: `${b.h}%` }}
								/>
							</div>
							<span className="text-[0.65rem] text-white/40 tracking-wide">
								{b.month}
							</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

/* ── Feature copy block ───────────────────────────────────────────── */

function FeatureCopy({
	title,
	accent,
	rest,
	body,
	cta,
	href,
}: {
	title: string;
	accent: string;
	rest?: string;
	body: string;
	cta: string;
	href: string;
}) {
	return (
		<div className="max-w-md">
			<h3 className="font-semibold text-4xl text-white leading-[1.1] tracking-tight sm:text-5xl">
				{title} <span className="text-[#405cfe]">{accent}</span>
				{rest ? ` ${rest}` : ""}
			</h3>
			<p className="mt-5 text-pretty text-white/55 leading-relaxed">{body}</p>
			<div className="mt-8">
				<PillButton label={cta} href={href} />
			</div>
		</div>
	);
}

export default function FeatureShowcase() {
	return (
		<section className="bg-background py-16">
			<div className="mx-auto max-w-7xl px-6 lg:px-10">
				<div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#08080b] px-6 py-16 sm:px-12 lg:px-16">
					{/* Brand glows */}
					<div className="pointer-events-none absolute -top-20 -left-20 h-80 w-80 rounded-full bg-[#405cfe]/15 blur-3xl" />
					<div className="pointer-events-none absolute -right-20 -bottom-20 h-80 w-80 rounded-full bg-[#405cfe]/10 blur-3xl" />

					<div className="relative space-y-20">
						{/* Row 1 — text left, line chart right */}
						<div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
							<FeatureCopy
								title="Offensive security testing for"
								accent="cyber defense"
								body="Simulate real-world attacks to uncover hidden vulnerabilities across your systems. Identify risks early, prioritize critical gaps, and strengthen your defense."
								cta="Start Testing"
								href="/services#vapt"
							/>
							<LineCard />
						</div>

						{/* Row 2 — bar chart left, text right */}
						<div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
							<div className="lg:order-1">
								<BarCard />
							</div>
							<div className="lg:order-2">
								<FeatureCopy
									title="AI-Powered SOC for"
									accent="Real-Time"
									rest="Threat Protection"
									body="Autonomous security operations center leveraging advanced machine learning systems for real-time threat detection and response automation."
									cta="Start Monitoring"
									href="/services#soc"
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

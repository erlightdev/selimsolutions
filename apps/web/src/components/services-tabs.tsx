import { ArrowRight } from "lucide-react";
import { useState } from "react";
import { Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

type Service = {
	tab: string;
	title: string;
	desc: string;
	href: string;
	img: string;
};

const IMG =
	"https://images.unsplash.com/photo-PLACEHOLDER?w=1000&q=80&auto=format&fit=crop";

const services: readonly Service[] = [
	{
		tab: "Managed SOC",
		title: "24/7 Managed SOC with unlimited incident response",
		desc: "Gain round-the-clock monitoring, triage, and remediation from analysts in Kathmandu who extend your team and own the threat from alert to closure.",
		href: "/services#soc",
		img: IMG.replace("PLACEHOLDER", "1550751827-4bd374c3f58b"),
	},
	{
		tab: "VAPT",
		title: "Offensive testing that finds what scanners miss",
		desc: "Manual vulnerability assessment and penetration testing across apps, networks, and cloud — chained exploits, real proof, and board-ready remediation paths.",
		href: "/services#vapt",
		img: IMG.replace("PLACEHOLDER", "1526374965328-7f61d4dc18c5"),
	},
	{
		tab: "Cloud Security",
		title: "Secure every workload across your cloud estate",
		desc: "Posture management, misconfiguration detection, and identity hardening for AWS, Azure, and GCP — continuous guardrails instead of one-off audits.",
		href: "/services#cloud",
		img: IMG.replace("PLACEHOLDER", "1451187580459-43490279c0fa"),
	},
	{
		tab: "EDR",
		title: "Endpoint detection and response at machine speed",
		desc: "Behavioral detection, isolation, and rollback on every endpoint — stopping ransomware and lateral movement before it spreads through your environment.",
		href: "/services#edr",
		img: IMG.replace("PLACEHOLDER", "1558494949-ef010cbdcc31"),
	},
	{
		tab: "GRC",
		title: "Compliance mapped to your reality, not a checklist",
		desc: "ISO 27001, SOC 2, and PCI readiness with control mapping, gap analysis, and audit support that turns quarters of dread into weeks of clarity.",
		href: "/services#grc",
		img: IMG.replace("PLACEHOLDER", "1504384308090-c894fdcc538d"),
	},
	{
		tab: "DFIR",
		title: "Digital forensics and incident response when it counts",
		desc: "Rapid containment, root-cause forensics, and recovery runbooks that turn a week-long outage into a four-hour recovery — calm and precise under pressure.",
		href: "/services#dfir",
		img: IMG.replace("PLACEHOLDER", "1555949963-aa79dcee981c"),
	},
	{
		tab: "Awareness Training",
		title: "Turn your people into the first line of defense",
		desc: "Phishing simulations and security awareness training that measurably cut human risk — localized for Nepali teams and reinforced continuously.",
		href: "/services#training",
		img: IMG.replace("PLACEHOLDER", "1573164713988-8665fc963095"),
	},
];

export default function ServicesTabs() {
	const [active, setActive] = useState(0);
	const current = services[active];

	return (
		<section className="bg-background py-16">
			<div className="mx-auto max-w-7xl px-6 lg:px-10">
				{/* Section header */}
				<div className="mx-auto mb-12 max-w-3xl text-center">
					<p className="font-medium font-mono text-xs uppercase tracking-[0.3em]">
						<span className="bg-linear-to-r from-[#405cfe] to-[#7d8efc] bg-clip-text text-transparent">
							What we do
						</span>
					</p>
					<h2 className="mt-6 text-balance font-serif text-4xl text-foreground leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
						End-to-end security, one team
					</h2>
					<p className="mx-auto mt-5 max-w-xl text-pretty text-muted-foreground text-sm leading-relaxed sm:text-base">
						From 24/7 monitoring to offensive testing and compliance — explore
						the services our Kathmandu SOC runs to defend your stack.
					</p>
				</div>

				{/* Desktop — tabbed panel */}
				<div className="relative hidden overflow-hidden rounded-[2rem] border border-border bg-card lg:block">
					{/* Tab bar */}
					<div className="border-border border-b">
						<div className="flex gap-1 overflow-x-auto px-4 sm:justify-center">
							{services.map((s, i) => {
								const on = i === active;
								return (
									<button
										key={s.tab}
										type="button"
										onClick={() => setActive(i)}
										className={`relative whitespace-nowrap px-4 py-5 font-semibold text-xs uppercase tracking-[0.12em] transition-colors ${
											on
												? "text-foreground"
												: "text-muted-foreground hover:text-foreground"
										}`}
									>
										{s.tab}
										{on && (
											<span className="absolute right-4 bottom-0 left-4 h-0.5 rounded-full bg-[#405cfe]" />
										)}
									</button>
								);
							})}
						</div>
					</div>

					{/* Panel */}
					<div className="relative grid grid-cols-1 items-center gap-10 p-8 sm:p-12 lg:grid-cols-2 lg:gap-14 lg:p-16">
						{/* Brand glow */}
						<div className="pointer-events-none absolute top-1/2 -left-24 h-80 w-80 -translate-y-1/2 rounded-full bg-[#405cfe]/15 blur-3xl" />

						{/* Copy */}
						<div className="relative">
							<h3 className="font-semibold text-3xl text-foreground leading-[1.1] tracking-tight sm:text-4xl">
								{current.title}
							</h3>
							<p className="mt-5 max-w-md text-pretty text-muted-foreground leading-relaxed">
								{current.desc}
							</p>
							<a
								href={current.href}
								className="group mt-8 inline-flex items-center gap-2 font-semibold text-foreground text-sm uppercase tracking-[0.12em]"
							>
								Explore service
								<ArrowRight className="h-4 w-4 text-[#405cfe] transition-transform duration-150 ease-out group-hover:translate-x-1" />
							</a>
						</div>

						{/* Image */}
						<div className="relative overflow-hidden rounded-2xl border border-border shadow-2xl shadow-black/30">
							<img
								key={current.img}
								src={current.img}
								alt={current.title}
								loading="lazy"
								className="aspect-4/3 w-full object-cover"
							/>
							<div className="pointer-events-none absolute inset-0 bg-linear-to-tr from-[#405cfe]/20 via-transparent to-transparent" />
						</div>
					</div>
				</div>

				{/* Mobile — auto-looping card swiper */}
				<div className="lg:hidden">
					<Swiper
						modules={[Autoplay]}
						loop
						slidesPerView={1.25}
						spaceBetween={16}
						centeredSlides
						autoplay={{ delay: 3500, disableOnInteraction: false }}
						className="overflow-visible!"
					>
						{services.map((s) => (
							<SwiperSlide key={s.tab} className="h-auto">
								<div className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card">
									<div className="relative">
										<img
											src={s.img}
											alt={s.title}
											loading="lazy"
											className="aspect-16/10 w-full object-cover"
										/>
										<div className="pointer-events-none absolute inset-0 bg-linear-to-t from-card via-transparent to-transparent" />
										<span className="absolute top-3 left-3 rounded-full bg-[#405cfe] px-3 py-1 font-semibold text-[0.65rem] text-white uppercase tracking-[0.12em]">
											{s.tab}
										</span>
									</div>
									<div className="flex flex-1 flex-col p-5">
										<h3 className="font-semibold text-foreground text-xl leading-snug tracking-tight">
											{s.title}
										</h3>
										<p className="mt-3 flex-1 text-pretty text-muted-foreground text-sm leading-relaxed">
											{s.desc}
										</p>
										<a
											href={s.href}
											className="group mt-5 inline-flex items-center gap-2 font-semibold text-foreground text-sm uppercase tracking-[0.12em]"
										>
											Explore service
											<ArrowRight className="h-4 w-4 text-[#405cfe] transition-transform duration-150 ease-out group-hover:translate-x-1" />
										</a>
									</div>
								</div>
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</section>
	);
}

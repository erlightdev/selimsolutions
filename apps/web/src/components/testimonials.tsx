import { ArrowLeft, ArrowRight, Sparkles, Star } from "lucide-react";
import { useState } from "react";
import type { Swiper as SwiperClass } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";

type Testimonial = {
	name: string;
	role: string;
	image: string;
	gradient: string;
	rating: number;
	quote: string;
	tags: readonly string[];
};

const testimonials: readonly Testimonial[] = [
	{
		name: "Aarav Shrestha",
		role: "CISO, Himalayan Bank",
		image:
			"https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=150",
		gradient: "from-[#405cfe] to-cyan-400",
		rating: 5,
		quote:
			"Selim's SOC flagged a credential-stuffing attack at 3 AM and contained it before a single account fell. Their team feels like an extension of ours.",
		tags: ["SOC", "Incident Response", "Fintech"],
	},
	{
		name: "Priya Maharjan",
		role: "Head of IT, MedTrust Hospitals",
		image:
			"https://images.pexels.com/photos/3760514/pexels-photo-3760514.jpeg?auto=compress&cs=tinysrgb&w=150",
		gradient: "from-emerald-400 to-teal-500",
		rating: 5,
		quote:
			"After a VAPT engagement they closed gaps three vendors had missed. Patient data has never been more defensible — and the reporting is board-ready.",
		tags: ["VAPT", "Healthcare", "Compliance"],
	},
	{
		name: "Bishal Gurung",
		role: "CTO, Daraz Logistics",
		image:
			"https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150",
		gradient: "from-orange-400 to-red-500",
		rating: 5,
		quote:
			"24/7 monitoring means real people who know our stack respond in minutes, not tickets that rot overnight. Mean-time-to-respond dropped under 15 minutes.",
		tags: ["24/7 SOC", "Cloud Security", "MTTR"],
	},
	{
		name: "Sneha Thapa",
		role: "VP Engineering, Khalti",
		image:
			"https://images.pexels.com/photos/3760529/pexels-photo-3760529.jpeg?auto=compress&cs=tinysrgb&w=150",
		gradient: "from-fuchsia-400 to-purple-500",
		rating: 5,
		quote:
			"Their DFIR runbook turned what could've been a week-long outage into a four-hour recovery. Calm, precise, and brutally fast under pressure.",
		tags: ["DFIR", "Payments", "Resilience"],
	},
	{
		name: "Rohan Karki",
		role: "GRC Lead, NIC Asia",
		image:
			"https://images.pexels.com/photos/2182968/pexels-photo-2182968.jpeg?auto=compress&cs=tinysrgb&w=150",
		gradient: "from-sky-400 to-indigo-500",
		rating: 5,
		quote:
			"ISO 27001 and SOC 2 readiness that used to take quarters took weeks. Selim mapped controls to our reality instead of handing us a generic checklist.",
		tags: ["GRC", "ISO 27001", "Audit"],
	},
];

function Avatar({
	image,
	gradient,
	size,
}: {
	image: string;
	gradient: string;
	size: "sm" | "lg";
}) {
	const dim = size === "lg" ? "h-11 w-11" : "h-14 w-14";
	return (
		<span
			className={`flex ${dim} shrink-0 items-center justify-center overflow-hidden rounded-full bg-linear-to-br ${gradient}`}
		>
			<img
				src={image}
				alt=""
				className="h-full w-full object-cover"
				loading="lazy"
			/>
		</span>
	);
}

function Stars({ rating }: { rating: number }) {
	return (
		<div className="flex items-center gap-1.5">
			<div className="flex gap-0.5">
				{Array.from({ length: 5 }, (_, i) => (
					<Star
						// biome-ignore lint/suspicious/noArrayIndexKey: fixed 5-star row
						key={i}
						className={`h-4 w-4 ${
							i < rating
								? "fill-amber-400 text-amber-400"
								: "fill-foreground/10 text-foreground/10"
						}`}
					/>
				))}
			</div>
			<span className="font-semibold text-foreground text-sm tabular-nums">
				{rating.toFixed(1)}
			</span>
		</div>
	);
}

export default function Testimonials() {
	const [swiper, setSwiper] = useState<SwiperClass | null>(null);
	const [activeIndex, setActiveIndex] = useState(0);

	return (
		<section className="relative overflow-hidden bg-background py-16">
			{/* Brand glow */}
			<div className="pointer-events-none absolute top-1/3 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#405cfe]/15 blur-3xl" />

			<div className="relative mx-auto max-w-7xl px-6 lg:px-10">
				{/* Header */}
				<div className="mx-auto max-w-2xl text-center">
					<span className="inline-block rounded-full border border-border bg-muted px-4 py-1.5 font-medium font-mono text-[0.7rem] text-muted-foreground uppercase tracking-[0.25em]">
						Our customers
					</span>
					<h2 className="mt-6 text-balance font-serif text-5xl text-foreground leading-[1.05] tracking-tight sm:text-6xl">
						Our success stories
					</h2>
					<p className="mx-auto mt-5 max-w-lg text-pretty text-muted-foreground text-sm leading-relaxed sm:text-base">
						Security leaders share how Selim Solution turned blind spots into
						round-the-clock defense.
					</p>
				</div>

				{/* Avatar selector row */}
				<div className="mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
					{testimonials.map((t, i) => {
						const active = i === activeIndex;
						return (
							<button
								key={t.name}
								type="button"
								onClick={() => swiper?.slideToLoop(i)}
								aria-label={`Show testimonial from ${t.name}`}
								className={`rounded-full transition-all duration-200 ${
									active
										? "scale-110 ring-2 ring-[#405cfe] ring-offset-2 ring-offset-background"
										: "opacity-50 hover:opacity-100"
								}`}
							>
								<Avatar image={t.image} gradient={t.gradient} size="sm" />
							</button>
						);
					})}
				</div>

				{/* Carousel */}
				<div className="mt-14">
					<Swiper
						onSwiper={setSwiper}
						onSlideChange={(s) => setActiveIndex(s.realIndex)}
						loop
						centeredSlides
						spaceBetween={24}
						slidesPerView={1.1}
						breakpoints={{
							640: { slidesPerView: 1.6 },
							1024: { slidesPerView: 2.3 },
						}}
						className="overflow-visible!"
					>
						{testimonials.map((t) => (
							<SwiperSlide key={t.name} className="h-auto">
								{({ isActive }) => (
									<div
										className={`relative h-full rounded-3xl border p-7 transition-all duration-300 sm:p-8 ${
											isActive
												? "border-[#405cfe]/60 bg-card bg-linear-to-br from-[#405cfe]/10 to-transparent shadow-[#405cfe]/10 shadow-xl"
												: "border-border bg-muted/30 opacity-45"
										}`}
									>
										{/* Watermark */}
										<div className="mb-6 flex items-center gap-2 text-muted-foreground">
											<Sparkles className="h-4 w-4" />
											<span className="font-medium text-xs uppercase tracking-[0.16em]">
												Verified client
											</span>
										</div>

										{/* Identity */}
										<div className="flex items-center gap-3.5">
											<Avatar image={t.image} gradient={t.gradient} size="lg" />
											<div>
												<p className="font-semibold text-foreground">
													{t.name}
												</p>
												<p className="text-muted-foreground text-sm">
													{t.role}
												</p>
											</div>
										</div>

										<div className="mt-6">
											<Stars rating={t.rating} />
										</div>

										<blockquote className="mt-5 text-pretty text-foreground/80 leading-relaxed">
											&ldquo;{t.quote}&rdquo;
										</blockquote>

										<div className="mt-7 flex flex-wrap gap-2">
											{t.tags.map((tag) => (
												<span
													key={tag}
													className="rounded-lg border border-border bg-muted px-3 py-1.5 text-muted-foreground text-xs"
												>
													{tag}
												</span>
											))}
										</div>
									</div>
								)}
							</SwiperSlide>
						))}
					</Swiper>
				</div>

				{/* Nav arrows */}
				<div className="mt-10 flex items-center justify-center gap-3">
					<button
						type="button"
						onClick={() => swiper?.slidePrev()}
						aria-label="Previous testimonial"
						className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-muted text-muted-foreground transition-[background-color,scale] duration-150 ease-out hover:bg-muted/70 active:scale-[0.94]"
					>
						<ArrowLeft className="h-4 w-4" />
					</button>
					<button
						type="button"
						onClick={() => swiper?.slideNext()}
						aria-label="Next testimonial"
						className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#405cfe] text-white transition-[background-color,scale] duration-150 ease-out hover:bg-[#3550e0] active:scale-[0.94]"
					>
						<ArrowRight className="h-4 w-4" />
					</button>
				</div>
			</div>
		</section>
	);
}

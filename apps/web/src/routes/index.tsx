import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck } from "lucide-react";

import { orpc } from "@/utils/orpc";

export const Route = createFileRoute("/")({
	component: HomeComponent,
});

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
				{/* readability overlay */}
				<div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-background" />

				<div className="relative mx-auto w-full max-w-7xl px-6 pt-32 pb-24 lg:px-10">
					<div className="max-w-2xl text-white">
						<span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-3 py-1 font-medium text-xs uppercase tracking-[0.16em] backdrop-blur-sm">
							<ShieldCheck className="h-3.5 w-3.5 text-[#405cfe]" />
							Nepal's vigilant SOC
						</span>

						<h1 className="mt-6 font-semibold text-4xl leading-[1.05] tracking-tight sm:text-6xl">
							Clarity from the
							<br />
							highest ground.
						</h1>

						<p className="mt-6 max-w-xl text-base text-white/70 leading-relaxed sm:text-lg">
							Vigilant. Resilient. Nepali. Selim Solution guards Nepal's digital
							frontier with a 24/7 SOC, threat detection and incident response —
							from Kathmandu.
						</p>

						<div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
							<a
								href="/contact"
								className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#405cfe] px-6 py-3 font-medium text-sm text-white transition-colors hover:bg-[#3550e0]"
							>
								Get Free Assessment
								<ArrowRight className="h-4 w-4" />
							</a>
							<a
								href="/services"
								className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-medium text-sm text-white backdrop-blur-sm transition-colors hover:bg-white/10"
							>
								Explore services
							</a>
						</div>
					</div>
				</div>
			</section>

			{/* API status (dev health check) */}
			<section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
				<div className="rounded-lg border p-4">
					<h2 className="mb-2 font-medium">API Status</h2>
					<div className="flex items-center gap-2">
						<div
							className={`h-2 w-2 rounded-full ${healthCheck.data ? "bg-green-500" : "bg-red-500"}`}
						/>
						<span className="text-muted-foreground text-sm">
							{healthCheck.isLoading
								? "Checking..."
								: healthCheck.data
									? "Connected"
									: "Disconnected"}
						</span>
					</div>
				</div>
			</section>
		</>
	);
}

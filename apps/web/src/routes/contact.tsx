import {
	ArrowUpRight,
	Clock3,
	Mail,
	MapPin,
	MessageCircle,
	Phone,
	ShieldAlert,
	Sparkles,
} from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";

import { Badge } from "@selimsolutions/ui/components/badge";

const contactMethods = [
	{
		title: "Email",
		value: "info@selimsolution.com",
		detail: "Best for assessments, proposals, and partnership requests.",
		href: "mailto:info@selimsolution.com",
		icon: Mail,
	},
	{
		title: "24/7 Hotline",
		value: "+977 - 24/7 hotline",
		detail: "For urgent escalation paths and active security incidents.",
		href: null,
		icon: Phone,
	},
	{
		title: "Kathmandu Command",
		value: "Kathmandu, Nepal",
		detail: "Sovereign monitoring, response, and coordination from Nepal.",
		href: null,
		icon: MapPin,
	},
	{
		title: "WhatsApp / Viber",
		value: "Private coordination",
		detail: "Used for fast coordination after initial contact is established.",
		href: "mailto:info@selimsolution.com?subject=WhatsApp%20or%20Viber%20coordination",
		icon: MessageCircle,
	},
] as const;

const engagementPaths = [
	{
		title: "Free assessment",
		detail:
			"Share your current security posture, priorities, and known gaps. We will map the fastest next step.",
	},
	{
		title: "Incident response",
		detail:
			"If you are dealing with suspicious activity, containment needs, or forensics pressure, contact us immediately.",
	},
	{
		title: "Compliance planning",
		detail:
			"For ISO 27001, SOC 2, and control alignment work, we can scope technical and governance tracks together.",
	},
] as const;

const expectations = [
	"Initial assessment conversations are handled directly by the security team.",
	"Urgent cases are prioritized around the clock from our Kathmandu command center.",
	"We keep outreach concise, technical, and aligned to your current maturity.",
] as const;

export const Route = createFileRoute("/contact")({
	component: ContactPage,
	head: () => ({
		meta: [
			{ title: "Contact Selim Solution | Security Assessment & SOC Response" },
			{
				name: "description",
				content:
					"Contact Selim Solution for security assessments, incident response coordination, SOC services, VAPT, and compliance planning from Kathmandu.",
			},
		],
	}),
});

function ContactPage() {
	return (
		<section className="relative isolate overflow-hidden bg-background py-16 sm:py-24">
			<div
				className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[680px] opacity-60"
				style={{
					backgroundImage:
						"linear-gradient(to right, color-mix(in oklab, var(--foreground) 11%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in oklab, var(--foreground) 11%, transparent) 1px, transparent 1px)",
					backgroundSize: "56px 56px",
					WebkitMaskImage:
						"radial-gradient(ellipse 70% 58% at 50% 0%, #000 52%, transparent 100%)",
					maskImage:
						"radial-gradient(ellipse 70% 58% at 50% 0%, #000 52%, transparent 100%)",
				}}
			/>
			<div className="pointer-events-none absolute top-10 left-1/2 z-0 h-[620px] w-[620px] -translate-x-1/2 rounded-full border border-primary/10" />
			<div className="pointer-events-none absolute top-28 left-1/2 z-0 h-[360px] w-[360px] -translate-x-1/2 rounded-full border border-primary/6" />
			<div className="pointer-events-none absolute top-0 left-1/2 z-0 h-[520px] w-full max-w-7xl -translate-x-1/2 bg-[radial-gradient(42%_42%_at_50%_0%,rgba(0,98,227,0.14),transparent_100%)]" />

			<div className="relative z-10 mx-auto max-w-6xl px-6 lg:px-10">
				<div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
					<div className="lg:col-span-7">
						<p className="text-[10px] font-bold uppercase tracking-widest text-primary">
							Contact
						</p>
						<h1 className="mt-5 max-w-3xl text-balance font-serif text-4xl text-foreground leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
							Talk directly to the security team.
						</h1>
					</div>
					<div className="lg:col-span-5 lg:pt-4">
						
						<div className="mt-8 flex flex-wrap gap-3">
							<a
								href="mailto:info@selimsolution.com"
								className="inline-flex items-center gap-2 rounded-none border border-primary bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors duration-150 hover:bg-primary/90"
							>
								Email security team
								<ArrowUpRight className="h-4 w-4" />
							</a>
							<div className="inline-flex items-center gap-2 rounded-none border border-border/30 bg-foreground/[0.02] px-5 py-3 text-sm text-foreground/75 dark:text-zinc-300">
								<Clock3 className="h-4 w-4 text-primary" />
								24/7 response posture
							</div>
						</div>
					</div>
				</div>

				<div className="mt-20 grid gap-4 md:grid-cols-2">
					{contactMethods.map(({ title, value, detail, href, icon: Icon }) => {
						const content = (
							<>
								<div className="flex items-start justify-between gap-4">
									<div className="flex items-center gap-3.5">
										<div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-none border border-border/30 bg-foreground/[0.02] text-primary">
											<Icon className="h-5 w-5" />
										</div>
										<div>
											<p className="font-mono text-[11px] uppercase tracking-widest text-foreground/45">
												{title}
											</p>
											<h2 className="mt-2 text-balance font-serif text-2xl leading-tight text-foreground sm:text-[2rem]">
												{value}
											</h2>
										</div>
									</div>
									{href ? <ArrowUpRight className="mt-1 h-4 w-4 text-primary" /> : null}
								</div>
								<p className="mt-6 max-w-[52ch] text-pretty text-sm leading-relaxed text-foreground/75 dark:text-zinc-300 sm:text-base">
									{detail}
								</p>
							</>
						);

						if (href) {
							return (
								<a
									key={title}
									href={href}
									className="group rounded-none border border-border/30 bg-card p-7 transition-[border-color,background-color,transform] duration-200 hover:border-primary/35 hover:bg-foreground/[0.02]"
								>
									{content}
								</a>
							);
						}

						return (
							<div
								key={title}
								className="rounded-none border border-border/30 bg-card p-7"
							>
								{content}
							</div>
						);
					})}
				</div>

				<div className="mt-20 grid gap-10 lg:grid-cols-12">
					<div className="lg:col-span-7">
						<Badge
							variant="outline"
							className="rounded-none border-primary/20 bg-primary/5 px-3.5 py-1.5 font-mono text-[11px] uppercase tracking-widest text-primary"
						>
							Engagement Paths
						</Badge>
						<div className="mt-6 grid gap-px overflow-hidden border border-foreground/10 bg-foreground/10">
							{engagementPaths.map(({ title, detail }) => (
								<div key={title} className="bg-background px-6 py-7 sm:px-8 sm:py-8">
									<h3 className="font-serif text-2xl leading-tight text-foreground">
										{title}
									</h3>
									<p className="mt-4 max-w-[60ch] text-pretty text-sm leading-relaxed text-foreground/75 dark:text-zinc-300 sm:text-base">
										{detail}
									</p>
								</div>
							))}
						</div>
					</div>

					<div className="lg:col-span-5">
						<div className="border border-border/30 bg-foreground/[0.02] p-7 sm:p-8">
							<div className="flex items-center gap-3">
								<div className="flex h-11 w-11 items-center justify-center border border-primary/20 bg-primary/5 text-primary">
									<ShieldAlert className="h-5 w-5" />
								</div>
								<div>
									<p className="font-mono text-[11px] uppercase tracking-widest text-primary/70">
										What to expect
									</p>
									<h2 className="mt-1 font-serif text-2xl text-foreground sm:text-3xl">
										Clear next steps.
									</h2>
								</div>
							</div>

							<div className="mt-8 space-y-5">
								{expectations.map((item) => (
									<div key={item} className="flex gap-3">
										<Sparkles className="mt-1 h-4 w-4 shrink-0 text-primary" />
										<p className="text-pretty text-sm leading-relaxed text-foreground/75 dark:text-zinc-300 sm:text-base">
											{item}
										</p>
									</div>
								))}
							</div>

							<div className="mt-8 border-t border-border/20 pt-6">
								<p className="font-mono text-[11px] uppercase tracking-widest text-foreground/45">
									Primary inbox
								</p>
								<a
									href="mailto:info@selimsolution.com"
									className="mt-3 inline-flex items-center gap-2 text-lg text-foreground underline decoration-foreground/20 underline-offset-4 transition-colors hover:decoration-foreground"
								>
									info@selimsolution.com
									<ArrowUpRight className="h-4 w-4" />
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

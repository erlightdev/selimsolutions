import {
	ArrowUpRight,
	BadgeCheck,
	CircleCheck,
	Globe,
	Lock,
	ShieldCheck,
} from "lucide-react";
import { createFileRoute } from "@tanstack/react-router";

import { Badge } from "@selimsolutions/ui/components/badge";

const standards = [
	{
		name: "ISO 27001",
		status: "Certified",
		desc: "Information security management system standard for protecting confidential data.",
		icon: ShieldCheck,
		badgeClass: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20",
	},
	{
		name: "SOC 2",
		status: "Operational",
		desc: "Trust service criteria for security, availability, and confidentiality controls.",
		icon: Lock,
		badgeClass: "bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20",
	},
	{
		name: "GDPR",
		status: "Aligned",
		desc: "European data protection regulation compliance for privacy-first operations.",
		icon: Globe,
		badgeClass: "bg-violet-500/10 text-violet-600 dark:text-violet-400 border-violet-500/20",
	},
	{
		name: "PCI-DSS",
		status: "Baseline",
		desc: "Payment card industry data security standard for handling sensitive transactions.",
		icon: BadgeCheck,
		badgeClass: "bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20",
	},
];

const commitments = [
	{
		title: "Regular audits",
		detail:
			"Internal and external assessments to verify that security controls remain effective and current.",
	},
	{
		title: "Policy documentation",
		detail:
			"Written information security policies reviewed and updated to reflect evolving threats and standards.",
	},
	{
		title: "Incident response",
		detail:
			"Documented procedures for detecting, containing, and reporting security incidents promptly.",
	},
	{
		title: "Vendor management",
		detail:
			"Security review of third-party providers with access to systems, data, or infrastructure.",
	},
	{
		title: "Continuous monitoring",
		detail:
			"Ongoing surveillance of systems and networks to identify vulnerabilities before they become risks.",
	},
	{
		title: "Access control",
		detail:
			"Role-based access policies ensuring only authorized personnel handle sensitive data and systems.",
	},
];

export const Route = createFileRoute("/certifications")({
	component: CertificationsPage,
	head: () => ({
		meta: [
			{ title: "Certifications & Standards | Selim Solution" },
			{
				name: "description",
				content:
					"Selim Solution certifications, security standards, and trust signals for the public website.",
			},
		],
	}),
});

function CertificationsPage() {
	return (
		<section className="bg-background py-16 sm:py-24">
			<div className="mx-auto max-w-5xl px-6 lg:px-10">
				{/* Header */}
				<div className="max-w-2xl">
					<p className="anim-fade-up font-medium text-muted-foreground text-[0.65rem] uppercase tracking-[0.16em]">
						Certifications & Standards
					</p>
					<h1 className="anim-fade-up mt-4 text-balance font-serif text-4xl text-foreground leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
						Security credentials
					</h1>
					<p className="anim-fade-up mt-5 max-w-xl text-pretty text-muted-foreground text-base leading-relaxed [animation-delay:80ms] sm:text-lg">
						The certifications, frameworks, and operational standards we follow
						to protect systems, data, and client trust.
					</p>
				</div>

				{/* Standards grid */}
				<div className="mt-16 grid gap-4 sm:grid-cols-2">
					{standards.map(({ name, status, desc, icon: Icon, badgeClass }, i) => (
						<div
							key={name}
							className="anim-fade-up group relative overflow-hidden rounded-none border border-border bg-card p-6 transition-all duration-200 ease-out hover:border-foreground/20 hover:bg-muted/10 active:scale-[0.98] hover:shadow-[0_4px_12px_rgba(0,0,0,0.02)]"
							style={{ animationDelay: `${120 + i * 80}ms` }}
						>
							<div className="flex items-start justify-between">
								<div className="flex items-center gap-3.5">
									<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-none border border-border bg-muted/25 text-foreground transition-colors group-hover:bg-muted/50">
										<Icon className="h-5 w-5 stroke-[1.5]" />
									</div>
									<div className="flex flex-col gap-1">
										<h3 className="font-semibold text-foreground text-base sm:text-lg tracking-tight">
											{name}
										</h3>
										<Badge
											variant="outline"
											className={`h-4 border rounded-none px-1.5 py-0 text-[9px] font-semibold uppercase tracking-wider ${badgeClass}`}
										>
											{status}
										</Badge>
									</div>
								</div>
								<ArrowUpRight className="h-4 w-4 text-muted-foreground/30 transition-all duration-200 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-muted-foreground" />
							</div>
							<p className="mt-5 text-pretty text-muted-foreground text-sm leading-relaxed">
								{desc}
							</p>
						</div>
					))}
				</div>

				{/* Commitments */}
				<div className="mt-24">
					<div className="max-w-2xl">
						<p className="anim-fade-up font-medium text-muted-foreground text-[0.65rem] uppercase tracking-[0.16em]">
							Operational commitments
						</p>
						<h2 className="anim-fade-up mt-4 text-balance font-serif text-3xl text-foreground tracking-[-0.02em] sm:text-4xl">
							How we maintain trust
						</h2>
						<p className="anim-fade-up mt-4 max-w-xl text-pretty text-muted-foreground text-sm leading-relaxed [animation-delay:80ms] sm:text-base">
							Beyond certifications, these practices shape how we secure systems
							and handle data on a daily basis.
						</p>
					</div>

					<div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
						{commitments.map(({ title, detail }, i) => (
							<div
								key={title}
								className="anim-fade-up rounded-none border border-border bg-card/40 p-5 transition-all duration-200 hover:border-foreground/15 hover:bg-card hover:shadow-[0_4px_12px_rgba(0,0,0,0.01)]"
								style={{ animationDelay: `${200 + i * 60}ms` }}
							>
								<div className="flex items-center gap-3">
									<div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-none border border-border bg-muted/30 text-[#405cfe]">
										<CircleCheck className="h-3 w-3 stroke-[2]" />
									</div>
									<h3 className="font-semibold text-foreground text-sm tracking-tight">
										{title}
									</h3>
								</div>
								<p className="mt-3.5 text-pretty text-muted-foreground text-sm leading-relaxed">
									{detail}
								</p>
							</div>
						))}
					</div>
				</div>

				{/* CTA */}
				<div className="anim-fade-up mt-24 overflow-hidden rounded-none border border-border bg-card p-8 sm:p-12 [animation-delay:600ms]">
					<div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
						<div className="max-w-md">
							<h3 className="font-serif text-2xl text-foreground tracking-tight">
								Need verification?
							</h3>
							<p className="mt-3 text-pretty text-muted-foreground text-sm leading-relaxed">
								Request certification scope, audit dates, or compliance
								documentation for your vendor review process.
							</p>
						</div>
						<a
							href="mailto:info@selimsolution.com"
							className="group inline-flex w-fit items-center justify-center gap-2 rounded-none bg-[#405cfe] px-6 py-3 font-medium text-sm text-white transition-all duration-150 ease-out hover:bg-[#3550e0] active:scale-[0.96] active:translate-y-[1px]"
						>
							Request details
							<ArrowUpRight className="h-4 w-4 transition-transform duration-150 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
						</a>
					</div>
				</div>
			</div>
		</section>
	);
}

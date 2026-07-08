import { Link } from "@tanstack/react-router";
import { Globe, Mail, MessageCircle, Phone } from "lucide-react";

const services = [
	{ label: "SOC as a Service", href: "/services#soc" },
	{ label: "VAPT", href: "/services#vapt" },
	{ label: "Cloud Security", href: "/services#cloud" },
	{ label: "EDR", href: "/services#edr" },
	{ label: "GRC & Compliance", href: "/services#grc" },
	{ label: "DFIR", href: "/services#dfir" },
	{ label: "Security Awareness Training", href: "/services#training" },
] as const;

const solutions = [
	{ label: "Banking & Finance", href: "/solutions/banking-finance" },
	{ label: "Insurance", href: "/solutions/insurance" },
	{ label: "Government", href: "/solutions/government" },
	{ label: "Telecom & ISPs", href: "/solutions/telecom-isps" },
	{ label: "Healthcare", href: "/solutions/healthcare" },
	{ label: "Education & NGOs", href: "/solutions/education-ngos" },
] as const;

const company = [
	{ label: "About Us", href: "/about" },
	{ label: "Blog & Insights", href: "/blog" },
	{ label: "Contact Team", href: "/contact" },
] as const;

const legal = [
	{ label: "Privacy", href: "/privacy" },
	{ label: "Terms", href: "/terms" },
	{ label: "Certifications", href: "/certifications" },
] as const;

const socials = [
	{
		label: "LinkedIn",
		href: "https://linkedin.com",
		Icon: Globe,
		external: true,
	},
	{
		label: "Email",
		href: "mailto:contact@selim.solutions",
		Icon: Mail,
		external: true,
	},
] as const;

function FooterLink({
	href,
	external,
	children,
}: {
	href: string;
	external?: boolean;
	children: React.ReactNode;
}) {
	const className =
		"text-sm text-neutral-400 transition-colors hover:text-white";
	const isExternal = external || href.startsWith("http") || href.includes("#");

	if (!isExternal) {
		return (
			<Link to={href as "/about"} className={className}>
				{children}
			</Link>
		);
	}

	return (
		<a
			href={href}
			target={isExternal ? "_blank" : undefined}
			rel={isExternal ? "noreferrer" : undefined}
			className={className}
		>
			{children}
		</a>
	);
}

export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="mt-20">
			<div className="mx-auto mb-4 max-w-6xl px-3 text-white sm:-mb-52 sm:px-0">
				{/* CTA card — lifted to overlap content above (desktop only) */}
				<div className="relative z-10 overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0c] px-6 py-10 shadow-2xl shadow-black/50 sm:-mt-24 sm:px-12 sm:py-16">
					{/* brand glow */}
					<div className="pointer-events-none absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#405cfe]/30 blur-3xl" />

					{/* dotted globe */}
					<img
						src="/globe-dots.svg"
						alt=""
						aria-hidden="true"
						className="pointer-events-none absolute top-1/2 right-0 hidden aspect-square h-[125%] w-auto max-w-none translate-x-[42%] -translate-y-1/2 select-none sm:block"
					/>

					{/* content */}
					<div className="relative max-w-xl">
						<span className="font-medium text-neutral-400 text-xs uppercase tracking-[0.2em]">
							Get in touch
						</span>
						<h2 className="mt-4 font-semibold text-4xl leading-tight tracking-tight sm:text-5xl">
							Clarity from the
							<br />
							highest ground.
						</h2>
						<p className="mt-4 text-neutral-400 text-sm leading-relaxed">
							Vigilant. Resilient. Nepali. Selim Solution stands guard over
							Nepal's digital frontier — 24/7 from Kathmandu.
						</p>
						<a
							href="/contact"
							className="mt-8 inline-flex w-fit items-center justify-center rounded-xl bg-white px-6 py-3 font-medium text-neutral-950 text-sm transition-colors hover:bg-neutral-200"
						>
							Get started
						</a>
					</div>
				</div>
			</div>
			<div className="relative bg-neutral-950 sm:m-3 sm:rounded-2xl">
				<div className="mx-auto max-w-7xl px-6 pt-12 pb-16 sm:pt-48 lg:px-10 lg:pb-20">
					{/* Main grid */}
					<div className="grid grid-cols-1 gap-12 py-14 md:grid-cols-2 lg:grid-cols-12">
						{/* Brand + contact */}
						<div className="lg:col-span-3">
							<a href="/" className="inline-flex items-center">
								<img
									src="/selim-logo-white.svg"
									alt="Selim Solution"
									className="h-8 w-auto"
								/>
							</a>
							<p className="mt-5 max-w-xs text-neutral-400 text-sm leading-relaxed">
								Clarity from the highest ground.
							</p>

							<ul className="mt-8 space-y-4">
								<li className="flex items-start gap-3 text-neutral-400 text-sm">
									<Mail className="mt-0.5 h-4 w-4 shrink-0 text-neutral-500" />
									<a
										href="mailto:contact@selim.solutions"
										className="transition-colors hover:text-white"
									>
										contact@selim.solutions
									</a>
								</li>
								<li className="flex items-start gap-3 text-neutral-400 text-sm">
									<Phone className="mt-0.5 h-4 w-4 shrink-0 text-neutral-500" />
									<span>+977 — 24/7 hotline</span>
								</li>
								<li className="flex items-start gap-3 text-neutral-400 text-sm">
									<MessageCircle className="mt-0.5 h-4 w-4 shrink-0 text-neutral-500" />
									<a
										href="/contact"
										className="transition-colors hover:text-white"
									>
										WhatsApp / Viber
									</a>
								</li>
							</ul>
						</div>

						{/* Services */}
						<div className="lg:col-span-2">
							<h3 className="font-semibold text-sm text-white">Services</h3>
							<ul className="mt-5 space-y-3">
								{services.map(({ label, href }) => (
									<li key={label}>
										<FooterLink href={href}>{label}</FooterLink>
									</li>
								))}
							</ul>
						</div>

						{/* Solutions */}
						<div className="lg:col-span-3">
							<h3 className="font-semibold text-sm text-white">Solutions</h3>
							<ul className="mt-5 space-y-3">
								{solutions.map(({ label, href }) => (
									<li key={label}>
										<FooterLink href={href}>{label}</FooterLink>
									</li>
								))}
							</ul>
						</div>

						{/* Company */}
						<div className="lg:col-span-2">
							<h3 className="font-semibold text-sm text-white">Company</h3>
							<ul className="mt-5 space-y-3">
								{company.map(({ label, href }) => (
									<li key={label}>
										<FooterLink href={href}>{label}</FooterLink>
									</li>
								))}
							</ul>
						</div>

						{/* Connect + Legal */}
						<div className="lg:col-span-2">
							<h3 className="font-semibold text-sm text-white">Connect</h3>
							<ul className="mt-5 space-y-3">
								{socials.map(({ label, href, Icon }) => (
									<li key={label}>
										<a
											href={href}
											target={href.startsWith("http") ? "_blank" : undefined}
											rel={href.startsWith("http") ? "noreferrer" : undefined}
											className="inline-flex items-center gap-2 text-neutral-400 text-sm transition-colors hover:text-white"
										>
											<Icon className="h-4 w-4" />
											{label}
										</a>
									</li>
								))}
							</ul>

							<h3 className="mt-8 font-semibold text-sm text-white">Legal</h3>
							<ul className="mt-5 space-y-3">
								{legal.map(({ label, href }) => (
									<li key={label}>
										<FooterLink href={href}>{label}</FooterLink>
									</li>
								))}
							</ul>
						</div>
					</div>

					{/* Bottom bar */}
					<div className="flex flex-col gap-4 border-white/10 border-t pt-8 text-neutral-500 text-sm md:flex-row md:items-center md:justify-between">
						<p>© {year} Selim Solution. All rights reserved.</p>

						<div className="flex flex-wrap items-center gap-4">
							<span className="rounded-full border border-white/15 px-3 py-1 font-medium text-neutral-300 text-xs">
								ISO 27001
							</span>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}

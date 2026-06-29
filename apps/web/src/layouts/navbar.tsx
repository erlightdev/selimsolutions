import { cn } from "@selimsolutions/ui/lib/utils";
import {
	ArrowRight,
	ChevronDown,
	Mail,
	Menu,
	Moon,
	Sun,
	X,
} from "lucide-react";
import { useEffect, useState } from "react";

import { useTheme } from "@/components/theme-provider";
import { Link } from "@tanstack/react-router";

/* ── Content (source of truth) ─────────────────────────────────────── */

const primaryNav = [
	{ to: "/", label: "Home", description: "Brand & overview" },
	{ to: "/about", label: "About", description: "Our story from Seim Lake" },
	{
		to: "/blog",
		label: "Insights",
		description: "Read our security blog",
	},
	{ to: "/contact", label: "Contact", description: "Talk to our SOC team" },
] as const;

const services = [
	{
		label: "SOC as a Service",
		href: "/services/soc",
		description: "24/7 SIEM, threat detection & incident response.",
	},
	{
		label: "VAPT",
		href: "/services/vapt",
		description: "Vulnerability assessment & penetration testing.",
	},
	{
		label: "Cloud Security",
		href: "/services/cloud-security",
		description: "AWS, Azure, GCP posture management.",
	},
	{
		label: "EDR",
		href: "/services/edr",
		description: "Endpoint detection & response.",
	},
	{
		label: "GRC & Compliance",
		href: "/services/grc-compliance",
		description: "ISO 27001, NIA 2076, PCI-DSS.",
	},
	{
		label: "DFIR",
		href: "/services/dfir",
		description: "Digital forensics & incident response.",
	},
] as const;

const solutions = [
	{
		label: "Banking & Finance",
		href: "/solutions/banking-finance",
		description: "Nepal Rastra Bank directives.",
	},
	{
		label: "Insurance",
		href: "/solutions/insurance",
		description: "NIA Guideline 2076 advisory.",
	},
	{
		label: "Government",
		href: "/solutions/government",
		description: "Public-sector hardening & DDoS defence.",
	},
	{
		label: "Telecom & ISPs",
		href: "/solutions/telecom-isps",
		description: "Carrier-grade monitoring & response.",
	},
	{
		label: "Healthcare",
		href: "/solutions/healthcare",
		description: "Patient data protection & compliance.",
	},
	{
		label: "Education & NGOs",
		href: "/solutions/education-ngos",
		description: "Affordable, training-focused security.",
	},
] as const;

const compliance = [
	{ label: "ISO 27001", href: "/compliance/iso-27001" },
	{ label: "NIA Guideline 2076", href: "/compliance/nia-guideline-2076" },
	{ label: "PCI-DSS", href: "/compliance/pci-dss" },
	{ label: "NIST CSF", href: "/compliance/nist-csf" },
	{ label: "NRB Directives", href: "/compliance/nrb-directives" },
] as const;

const resources = [
	{ label: "Blog & Insights", href: "/blog" },
	{ label: "Certifications", href: "/certifications" },
	{ label: "Brand Story", href: "/about" },
	{ label: "Downloads", href: "/downloads" },
] as const;

/* ── Theme toggle ──────────────────────────────────────────────────── */

function AnimatedThemeToggler() {
	const { resolvedTheme, setTheme } = useTheme();
	const isDark = resolvedTheme === "dark";

	return (
		<button
			type="button"
			aria-label="Toggle theme"
			onClick={() => setTheme(isDark ? "light" : "dark")}
			className="relative inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground/80 transition-[background-color,color,scale] duration-150 ease-out hover:bg-foreground/5 hover:text-foreground active:scale-[0.96]"
		>
			<Sun className="h-[1.1rem] w-[1.1rem] rotate-0 scale-100 opacity-100 transition-[transform,opacity] duration-300 ease-out dark:-rotate-90 dark:scale-0 dark:opacity-0" />
			<Moon className="absolute h-[1.1rem] w-[1.1rem] rotate-90 scale-0 opacity-0 transition-[transform,opacity] duration-300 ease-out dark:rotate-0 dark:scale-100 dark:opacity-100" />
		</button>
	);
}

/* ── Megamenu ──────────────────────────────────────────────────────── */

function ServicesMegamenu() {
	return (
		<div className="grid w-[min(72rem,calc(100vw-2rem))] grid-cols-1 gap-8 p-6 lg:grid-cols-12">
			{/* Services */}
			<div className="lg:col-span-5">
				<p className="mb-3 font-semibold text-muted-foreground text-xs uppercase tracking-[0.16em]">
					Services
				</p>
				<ul className="grid grid-cols-1 gap-1 sm:grid-cols-2">
					{services.map(({ label, href, description }) => (
						<li key={label}>
							<a
								href={href}
								className="group block rounded-lg p-3 transition-colors hover:bg-foreground/5"
							>
								<span className="font-medium text-foreground text-sm">
									{label}
								</span>
								<span className="mt-0.5 block text-muted-foreground text-xs leading-snug">
									{description}
								</span>
							</a>
						</li>
					))}
				</ul>
			</div>

			{/* Solutions by Industry */}
			<div className="lg:col-span-4">
				<p className="mb-3 font-semibold text-muted-foreground text-xs uppercase tracking-[0.16em]">
					Solutions by Industry
				</p>
				<ul className="space-y-1">
					{solutions.map(({ label, href, description }) => (
						<li key={label}>
							<a
								href={href}
								className="block rounded-lg p-2.5 transition-colors hover:bg-foreground/5"
							>
								<span className="font-medium text-foreground text-sm">
									{label}
								</span>
								<span className="mt-0.5 block text-muted-foreground text-xs leading-snug">
									{description}
								</span>
							</a>
						</li>
					))}
				</ul>
			</div>

			{/* Compliance + Resources */}
			<div className="space-y-6 lg:col-span-3">
				<div>
					<p className="mb-3 font-semibold text-muted-foreground text-xs uppercase tracking-[0.16em]">
						Compliance
					</p>
					<ul className="space-y-1">
						{compliance.map(({ label, href }) => (
							<li key={label}>
								<a
									href={href}
									className="block rounded-md px-2 py-1.5 text-foreground/80 text-sm transition-colors hover:bg-foreground/5 hover:text-foreground"
								>
									{label}
								</a>
							</li>
						))}
					</ul>
				</div>
				<div>
					<p className="mb-3 font-semibold text-muted-foreground text-xs uppercase tracking-[0.16em]">
						Resources
					</p>
					<ul className="space-y-1">
						{resources.map(({ label, href }) => (
							<li key={label}>
								<a
									href={href}
									className="block rounded-md px-2 py-1.5 text-foreground/80 text-sm transition-colors hover:bg-foreground/5 hover:text-foreground"
								>
									{label}
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}

/* ── Mobile menu ───────────────────────────────────────────────────── */

function MobileMenu({ onClose }: { onClose: () => void }) {
	return (
		<div className="fixed inset-0 z-50 lg:hidden">
			<button
				type="button"
				aria-label="Close menu"
				className="anim-backdrop absolute inset-0 bg-black/40 backdrop-blur-sm"
				onClick={onClose}
			/>
			<div className="anim-drawer absolute inset-y-0 right-0 flex w-[min(22rem,90vw)] flex-col overflow-y-auto bg-background shadow-2xl">
				<div className="flex items-center justify-between border-border border-b px-5 py-4">
					<span className="font-semibold text-sm">Menu</span>
					<button
						type="button"
						aria-label="Close menu"
						onClick={onClose}
						className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground/80 transition-[background-color,scale] duration-150 ease-out hover:bg-foreground/5 active:scale-[0.96]"
					>
						<X className="h-4 w-4" />
					</button>
				</div>

				<nav className="flex-1 px-5 py-4">
					<ul className="space-y-1">
						{primaryNav.map(({ to, label }) => (
							<li key={to}>
								{to === "/" || to === "/blog" ? (
									<Link
										to={to === "/" ? "/" : "/blog"}
										onClick={onClose}
										className="block rounded-lg px-3 py-2.5 font-medium text-sm transition-colors hover:bg-foreground/5"
									>
										{label}
									</Link>
								) : (
									<a
										href={to}
										onClick={onClose}
										className="block rounded-lg px-3 py-2.5 font-medium text-sm transition-colors hover:bg-foreground/5"
									>
										{label}
									</a>
								)}
							</li>
						))}
					</ul>

					<div className="mt-6 border-border border-t pt-5">
						<p className="font-semibold text-muted-foreground text-xs uppercase tracking-[0.16em]">
							Services & Solutions
						</p>
						<p className="mt-1 text-muted-foreground text-xs">
							MSSP services + industries + compliance
						</p>
						<ul className="mt-3 space-y-1">
							{services.map(({ label, href }) => (
								<li key={label}>
									<a
										href={href}
										onClick={onClose}
										className="block rounded-lg px-3 py-2 text-foreground/80 text-sm transition-colors hover:bg-foreground/5 hover:text-foreground"
									>
										{label}
									</a>
								</li>
							))}
						</ul>
						<a
							href="/services"
							onClick={onClose}
							className="mt-2 inline-flex items-center gap-1 px-3 py-2 font-medium text-[#405cfe] text-sm"
						>
							View all services
							<ArrowRight className="h-4 w-4" />
						</a>
					</div>
				</nav>

				<div className="border-border border-t px-5 py-5">
					<a
						href="/contact"
						onClick={onClose}
						className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#405cfe] px-5 py-3 font-medium text-sm text-white transition-[background-color,scale] duration-150 ease-out hover:bg-[#3550e0] active:scale-[0.96]"
					>
						Get Free Assessment
						<ArrowRight className="h-4 w-4" />
					</a>
					<a
						href="mailto:info@selimsolution.com"
						className="mt-3 flex items-center justify-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
					>
						<Mail className="h-4 w-4" />
						info@selimsolution.com
					</a>
				</div>
			</div>
		</div>
	);
}

/* ── Navbar ────────────────────────────────────────────────────────── */

export default function Navbar() {
	const [servicesOpen, setServicesOpen] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 8);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	return (
		// Fixed → overlaps the hero/section below (grid row collapses to 0).
		<header className="fixed inset-x-0 top-0 z-40">
			{/* Announcement bar */}
			<div className="bg-[#405cfe] text-white">
				<a
					href="/contact"
					className="group mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center text-xs sm:text-sm"
				>
					{/* Live pulse */}
					<span className="relative flex h-2 w-2 shrink-0">
						<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
						<span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
					</span>
					<span className="font-medium">
						<span className="hidden sm:inline">
							Nepal’s vigilant SOC — 24/7 from Kathmandu.{" "}
						</span>
						<span className="sm:hidden">24/7 SOC · Kathmandu. </span>
						<span className="font-semibold underline-offset-2 group-hover:underline">
							Get a free assessment
						</span>
					</span>
					<ArrowRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-150 ease-out group-hover:translate-x-0.5" />
				</a>
			</div>

			{/* Main header */}
			<div
				className={cn(
					"border-b transition-[background-color,border-color,box-shadow] duration-300",
					// Light: solid white always. Dark: translucent + blur.
					"bg-white dark:bg-background/40 dark:backdrop-blur-sm",
					scrolled
						? "border-border shadow-sm dark:bg-background/85 dark:shadow-none dark:backdrop-blur-md"
						: "border-transparent",
				)}
			>
				{/* biome-ignore lint/a11y/noStaticElementInteractions: hover region for the megamenu; the trigger itself is a keyboard-accessible button */}
				<div
					className="relative mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 lg:px-6"
					onMouseLeave={() => setServicesOpen(false)}
				>
					{/* Logo */}
					<Link to="/" className="flex shrink-0 items-center">
						<img
							src="/selim-logo-light.svg"
							alt="Selim Solution"
							className="h-7 w-auto dark:hidden"
						/>
						<img
							src="/selim-logo-white.svg"
							alt="Selim Solution"
							className="hidden h-7 w-auto dark:block"
						/>
					</Link>

					{/* Desktop nav */}
					<nav className="hidden items-center gap-1 lg:flex">
						<Link
							to="/"
							onMouseEnter={() => setServicesOpen(false)}
							className="rounded-lg px-3 py-2 font-medium text-foreground/80 text-sm transition-colors hover:bg-foreground/5 hover:text-foreground"
						>
							Home
						</Link>

						{/* Services megamenu trigger */}
						<button
							type="button"
							aria-expanded={servicesOpen}
							onMouseEnter={() => setServicesOpen(true)}
							onClick={() => setServicesOpen((v) => !v)}
							className="inline-flex items-center gap-1 rounded-lg px-3 py-2 font-medium text-foreground/80 text-sm transition-colors hover:bg-foreground/5 hover:text-foreground"
						>
							Services
							<ChevronDown
								className={cn(
									"h-4 w-4 transition-transform duration-200",
									servicesOpen && "rotate-180",
								)}
							/>
						</button>

						{primaryNav
							.filter(({ to }) => to !== "/")
							.map(({ to, label }) => {
								if (to === "/blog") {
									return (
										<Link
											key={to}
											to="/blog"
											onMouseEnter={() => setServicesOpen(false)}
											className="rounded-lg px-3 py-2 font-medium text-foreground/80 text-sm transition-colors hover:bg-foreground/5 hover:text-foreground"
										>
											{label}
										</Link>
									);
								}
								return (
									<a
										key={to}
										href={to}
										onMouseEnter={() => setServicesOpen(false)}
										className="rounded-lg px-3 py-2 font-medium text-foreground/80 text-sm transition-colors hover:bg-foreground/5 hover:text-foreground"
									>
										{label}
									</a>
								);
							})}
					</nav>

					{/* Megamenu panel — anchored to the full-width row, centered on screen */}
					{servicesOpen && (
						<div className="absolute top-full left-1/2 z-50 hidden w-[min(72rem,calc(100vw-2rem))] -translate-x-1/2 pt-3 lg:block">
							<div className="anim-megamenu overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl shadow-black/20">
								<ServicesMegamenu />
							</div>
						</div>
					)}

					{/* Actions */}
					<div className="flex shrink-0 items-center gap-2">
						<AnimatedThemeToggler />
						<a
							href="/contact"
							className="hidden items-center gap-2 rounded-xl bg-[#405cfe] px-4 py-2 font-medium text-sm text-white transition-[background-color,scale] duration-150 ease-out hover:bg-[#3550e0] active:scale-[0.96] sm:inline-flex"
						>
							Get Free Assessment
							<ArrowRight className="h-4 w-4" />
						</a>
						<button
							type="button"
							aria-label="Open menu"
							onClick={() => setMobileOpen(true)}
							className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-foreground/80 transition-[background-color,scale] duration-150 ease-out hover:bg-foreground/5 active:scale-[0.96] lg:hidden"
						>
							<Menu className="h-5 w-5" />
						</button>
					</div>
				</div>
			</div>

			{mobileOpen && <MobileMenu onClose={() => setMobileOpen(false)} />}
		</header>
	);
}

import { cn } from "@selimsolutions/ui/lib/utils";
import { Link } from "@tanstack/react-router";
import {
	ArrowRight,
	ArrowUpRight,
	Blocks,
	ChevronDown,
	Mail,
	Menu,
	Moon,
	PanelsTopLeft,
	Sparkles,
	Sun,
	X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useTheme } from "@/components/theme-provider";
import {
	resourceItems,
	serviceItems,
	solutionItems,
} from "@/data/offerings";

/* ── Content (source of truth) ─────────────────────────────────────── */

const primaryNav = [
	{ to: "/about", label: "About", description: "Our story from Seim Lake" },
	{
		to: "/blog",
		label: "Insights",
		description: "Read our security blog",
	},
	{ to: "/contact", label: "Contact", description: "Talk to our SOC team" },
] as const;

const routerLinks = new Set([
	"/about",
	"/blog",
	"/certifications",
	"/contact",
	"/free-assessment",
	"/services",
	"/solutions",
	"/services/soc-as-a-service",
	"/services/vapt",
	"/services/cloud-security",
	"/services/edr",
	"/services/grc-compliance",
	"/services/dfir",
]);

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

function ServicesMegamenu({ onClose }: { onClose: () => void }) {
	return (
		<div className="grid w-[min(72rem,calc(100vw-2rem))] grid-cols-1 gap-8 p-6 lg:grid-cols-12">
			<div className="rounded-2xl border border-border bg-muted/30 p-5 lg:col-span-3">
				<span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#405cfe]/10 text-[#405cfe]">
					<PanelsTopLeft className="h-5 w-5" />
				</span>
				<p className="mt-4 font-semibold text-foreground text-lg">Services</p>
				<p className="mt-2 text-muted-foreground text-sm leading-relaxed">
					Security operations, offensive validation, response, and compliance
					designed as one operating layer.
				</p>
				<Link
					to="/services"
					onClick={onClose}
					className="group mt-5 inline-flex items-center gap-2 font-semibold text-foreground text-sm"
				>
					View all services
					<ArrowRight className="h-4 w-4 text-[#405cfe] transition-transform duration-150 ease-out group-hover:translate-x-0.5" />
				</Link>
			</div>

			<div className="lg:col-span-6">
				<p className="mb-3 font-semibold text-muted-foreground text-xs uppercase tracking-[0.16em]">
					Core Services
				</p>
				<ul className="grid grid-cols-1 gap-1 sm:grid-cols-2">
					{serviceItems.map(({ label, href, description, icon: Icon }) => (
						<li key={label}>
							<Link
								to={href}
								onClick={onClose}
								className="group flex gap-3 rounded-xl p-3 transition-colors hover:bg-foreground/5"
							>
								<span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-[#405cfe]">
									<Icon className="h-4 w-4" />
								</span>
								<span>
									<span className="font-medium text-foreground text-sm">
										{label}
									</span>
									<span className="mt-0.5 block text-muted-foreground text-xs leading-snug">
										{description}
									</span>
								</span>
							</Link>
						</li>
					))}
				</ul>
			</div>

			<div className="space-y-6 lg:col-span-3">
				<div>
					<p className="mb-3 font-semibold text-muted-foreground text-xs uppercase tracking-[0.16em]">
						Resources
					</p>
					<ul className="space-y-1">
						{resourceItems.map(({ label, href }) => (
							<li key={label}>
								{routerLinks.has(href) ? (
									<Link
										to={href as "/about" | "/blog" | "/certifications"}
										onClick={onClose}
										className="block rounded-md px-2 py-1.5 text-foreground/80 text-sm transition-colors hover:bg-foreground/5 hover:text-foreground"
									>
										{label}
									</Link>
								) : (
									<a
										href={href}
										onClick={onClose}
										className="block rounded-md px-2 py-1.5 text-foreground/80 text-sm transition-colors hover:bg-foreground/5 hover:text-foreground"
									>
										{label}
									</a>
								)}
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	);
}

function SolutionsMegamenu({ onClose }: { onClose: () => void }) {
	return (
		<div className="grid w-[min(72rem,calc(100vw-2rem))] grid-cols-1 gap-8 p-6 lg:grid-cols-12">
			<div className="rounded-2xl border border-border bg-muted/30 p-5 lg:col-span-3">
				<span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-[#405cfe]/10 text-[#405cfe]">
					<Blocks className="h-5 w-5" />
				</span>
				<p className="mt-4 font-semibold text-foreground text-lg">Solutions</p>
				<p className="mt-2 text-muted-foreground text-sm leading-relaxed">
					Industry-specific security programs shaped around operational
					pressure, risk posture, and data sensitivity.
				</p>
				<Link
					to="/solutions"
					onClick={onClose}
					className="group mt-5 inline-flex items-center gap-2 font-semibold text-foreground text-sm"
				>
					View all solutions
					<ArrowRight className="h-4 w-4 text-[#405cfe] transition-transform duration-150 ease-out group-hover:translate-x-0.5" />
				</Link>
			</div>

			<div className="lg:col-span-6">
				<p className="mb-3 font-semibold text-muted-foreground text-xs uppercase tracking-[0.16em]">
					Solutions by Industry
				</p>
				<ul className="grid grid-cols-1 gap-1 sm:grid-cols-2">
					{solutionItems.map(({ label, href, description, icon: Icon }) => (
						<li key={label}>
							<Link
								to={href}
								onClick={onClose}
								className="group flex gap-3 rounded-xl p-3 transition-colors hover:bg-foreground/5"
							>
								<span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-border bg-background text-[#405cfe]">
									<Icon className="h-4 w-4" />
								</span>
								<span>
									<span className="font-medium text-foreground text-sm">
										{label}
									</span>
									<span className="mt-0.5 block text-muted-foreground text-xs leading-snug">
										{description}
									</span>
								</span>
							</Link>
						</li>
					))}
				</ul>
			</div>

			<div className="space-y-6 lg:col-span-3">
				<div>
					<div className="rounded-2xl border border-border bg-background p-4">
						<div className="flex items-center gap-2 text-[#405cfe]">
							<Sparkles className="h-4 w-4" />
							<p className="font-semibold text-foreground text-sm">
								How we shape solutions
							</p>
						</div>
						<p className="mt-3 text-muted-foreground text-sm leading-relaxed">
							We adapt detection, escalation, and compliance workflows to the
							way each sector actually operates.
						</p>
					</div>
				</div>
				<div>
					<p className="mb-3 font-semibold text-muted-foreground text-xs uppercase tracking-[0.16em]">
						Resources
					</p>
					<ul className="space-y-1">
						{resourceItems.map(({ label, href }) => (
							<li key={label}>
								{routerLinks.has(href) ? (
									<Link
										to={href as "/about" | "/blog" | "/certifications"}
										onClick={onClose}
										className="block rounded-md px-2 py-1.5 text-foreground/80 text-sm transition-colors hover:bg-foreground/5 hover:text-foreground"
									>
										{label}
									</Link>
								) : (
									<a
										href={href}
										onClick={onClose}
										className="block rounded-md px-2 py-1.5 text-foreground/80 text-sm transition-colors hover:bg-foreground/5 hover:text-foreground"
									>
										{label}
									</a>
								)}
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
								<Link
									to={to}
									onClick={onClose}
									className="block rounded-lg px-3 py-2.5 font-medium text-sm transition-colors hover:bg-foreground/5"
								>
									{label}
								</Link>
							</li>
						))}
					</ul>

					<div className="mt-6 border-border border-t pt-5">
						<p className="font-semibold text-muted-foreground text-xs uppercase tracking-[0.16em]">
							Services
						</p>
						<ul className="mt-3 space-y-1">
							{serviceItems.map(({ label, href }) => (
								<li key={label}>
									<Link
										to={href}
										onClick={onClose}
										className="block rounded-lg px-3 py-2 text-foreground/80 text-sm transition-colors hover:bg-foreground/5 hover:text-foreground"
									>
										{label}
									</Link>
								</li>
							))}
						</ul>
						<Link
							to="/services"
							onClick={onClose}
							className="mt-2 inline-flex items-center gap-1 px-3 py-2 font-medium text-[#405cfe] text-sm"
						>
							View all services
							<ArrowRight className="h-4 w-4" />
						</Link>
					</div>

					<div className="mt-6 border-border border-t pt-5">
						<p className="font-semibold text-muted-foreground text-xs uppercase tracking-[0.16em]">
							Solutions
						</p>
						<ul className="mt-3 space-y-1">
							{solutionItems.map(({ label, href }) => (
								<li key={label}>
									<Link
										to={href}
										onClick={onClose}
										className="block rounded-lg px-3 py-2 text-foreground/80 text-sm transition-colors hover:bg-foreground/5 hover:text-foreground"
									>
										{label}
									</Link>
								</li>
							))}
						</ul>
						<Link
							to="/solutions"
							onClick={onClose}
							className="mt-2 inline-flex items-center gap-1 px-3 py-2 font-medium text-[#405cfe] text-sm"
						>
							View all solutions
							<ArrowRight className="h-4 w-4" />
						</Link>
					</div>
				</nav>

				<div className="border-border border-t px-5 py-5">
					<Link
						to="/free-assessment"
						onClick={onClose}
						className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#405cfe] px-5 py-3 font-medium text-sm text-white transition-[background-color,scale] duration-150 ease-out hover:bg-[#3550e0] active:scale-[0.96]"
					>
						Get Free Assessment
						<ArrowRight className="h-4 w-4" />
					</Link>
					<a
						href="mailto:contact@selim.solutions"
						className="mt-3 flex items-center justify-center gap-2 text-muted-foreground text-sm transition-colors hover:text-foreground"
					>
						<Mail className="h-4 w-4" />
						contact@selim.solutions
					</a>
				</div>
			</div>
		</div>
	);
}

/* ── Navbar ────────────────────────────────────────────────────────── */

export default function Navbar() {
	const [openMenu, setOpenMenu] = useState<"services" | "solutions" | null>(
		null,
	);
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
				<div className="mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2 text-center text-xs sm:text-sm">
					{/* Live pulse */}
					<span className="relative flex h-2 w-2 shrink-0">
						<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
						<span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
					</span>
					<span className="font-medium">
						<span className="hidden sm:inline">
							24/7 managed security operations, incident response, and
							continuous threat monitoring.
						</span>
						<span className="sm:hidden">24/7 SOC and threat monitoring.</span>
					</span>
				</div>
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
					onMouseLeave={() => setOpenMenu(null)}
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
						<button
							type="button"
							aria-expanded={openMenu === "services"}
							onMouseEnter={() => setOpenMenu("services")}
							onClick={() =>
								setOpenMenu((v) => (v === "services" ? null : "services"))
							}
							className="inline-flex items-center gap-1 rounded-lg px-3 py-2 font-medium text-foreground/80 text-sm transition-colors hover:bg-foreground/5 hover:text-foreground"
						>
							Services
							<ChevronDown
								className={cn(
									"h-4 w-4 transition-transform duration-200",
									openMenu === "services" && "rotate-180",
								)}
							/>
						</button>

						<button
							type="button"
							aria-expanded={openMenu === "solutions"}
							onMouseEnter={() => setOpenMenu("solutions")}
							onClick={() =>
								setOpenMenu((v) => (v === "solutions" ? null : "solutions"))
							}
							className="inline-flex items-center gap-1 rounded-lg px-3 py-2 font-medium text-foreground/80 text-sm transition-colors hover:bg-foreground/5 hover:text-foreground"
						>
							Solutions
							<ChevronDown
								className={cn(
									"h-4 w-4 transition-transform duration-200",
									openMenu === "solutions" && "rotate-180",
								)}
							/>
						</button>

						{primaryNav.map(({ to, label }) => (
							<Link
								key={to}
								to={to}
								onMouseEnter={() => setOpenMenu(null)}
								className="rounded-lg px-3 py-2 font-medium text-foreground/80 text-sm transition-colors hover:bg-foreground/5 hover:text-foreground"
							>
								{label}
							</Link>
						))}
					</nav>

					{/* Megamenu panel — anchored to the full-width row, centered on screen */}
					{openMenu && (
						<div className="absolute top-full left-1/2 z-50 hidden w-[min(72rem,calc(100vw-2rem))] -translate-x-1/2 pt-3 lg:block">
							<div className="anim-megamenu overflow-hidden rounded-2xl border border-border bg-popover shadow-2xl shadow-black/20">
								{openMenu === "services" ? (
									<ServicesMegamenu onClose={() => setOpenMenu(null)} />
								) : (
									<SolutionsMegamenu onClose={() => setOpenMenu(null)} />
								)}
							</div>
						</div>
					)}

					{/* Actions */}
					<div className="flex shrink-0 items-center gap-2">
						<AnimatedThemeToggler />
						<Link
							to="/free-assessment"
							className="group hidden items-center gap-3 rounded-full border border-border/70 bg-background/85 py-1.5 pr-1.5 pl-5 font-medium text-foreground text-sm backdrop-blur-sm transition-colors hover:bg-muted/80 sm:inline-flex dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
						>
							Get Free Assessment
							<span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#405cfe] text-white transition-transform duration-150 ease-out group-hover:rotate-45">
								<ArrowUpRight className="h-4 w-4" />
							</span>
						</Link>
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

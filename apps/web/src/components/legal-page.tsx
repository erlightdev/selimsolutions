import { Separator } from "@selimsolutions/ui/components/separator";
import { cn } from "@selimsolutions/ui/lib/utils";
import { type ReactNode, useEffect, useRef, useState } from "react";

type LegalLink = {
	href: string;
	label: string;
};

type LegalPageProps = {
	eyebrow: string;
	title: string;
	intro: string;
	updated: string;
	links: readonly LegalLink[];
	children: ReactNode;
};

export default function LegalPage({
	eyebrow,
	title,
	intro,
	updated,
	links,
	children,
}: LegalPageProps) {
	const [activeId, setActiveId] = useState<string>("");
	const scrollRef = useRef<HTMLUListElement>(null);

	useEffect(() => {
		const headings = links
			.map(({ href }) => document.getElementById(href.slice(1)))
			.filter(Boolean) as HTMLElement[];

		if (headings.length === 0) return;

		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (entry.isIntersecting) {
						setActiveId(entry.target.id);
					}
				}
			},
			{ rootMargin: "-80px 0px -60% 0px", threshold: 0 },
		);

		for (const el of headings) {
			observer.observe(el);
		}

		return () => observer.disconnect();
	}, [links]);

	// Scroll active pill into view on mobile
	useEffect(() => {
		if (!scrollRef.current) return;
		const activeEl = scrollRef.current.querySelector("[data-active=true]");
		if (activeEl) {
			activeEl.scrollIntoView({
				behavior: "smooth",
				block: "nearest",
				inline: "center",
			});
		}
	}, [activeId]);

	return (
		<section className="bg-background">
			{/* Mobile Hero header (Hidden on Desktop) */}
			<div className="px-6 pt-16 sm:pt-24 lg:hidden">
				<div className="mx-auto max-w-6xl">
					<p className="font-medium text-[0.65rem] text-muted-foreground uppercase tracking-[0.16em]">
						{eyebrow}
					</p>
					<h1 className="mt-3 text-balance font-serif text-4xl text-foreground leading-[1.05] tracking-[-0.02em] sm:text-5xl">
						{title}
					</h1>
					<p className="anim-fade-up mt-5 text-pretty text-muted-foreground text-sm leading-relaxed [animation-delay:60ms] sm:text-base">
						{intro}
					</p>
				</div>
			</div>

			{/* Mobile TOC — horizontal scrollable pills (Hidden on Desktop) */}
			<div className="sticky top-23 z-10 mt-8 border-border border-b bg-background/80 backdrop-blur-sm lg:hidden">
				<div className="mx-auto max-w-6xl px-6">
					<ul
						ref={scrollRef}
						className="scrollbar-none flex gap-1 overflow-x-auto py-3"
					>
						{links.map(({ href, label }) => {
							const isActive = activeId === href.slice(1);
							return (
								<li key={href} className="shrink-0">
									<a
										href={href}
										data-active={isActive}
										className={cn(
											"block whitespace-nowrap rounded-none border px-3 py-1.5 font-medium text-xs transition-colors duration-150",
											isActive
												? "border-foreground/20 bg-foreground text-background"
												: "border-transparent text-muted-foreground hover:text-foreground",
										)}
									>
										{label}
									</a>
								</li>
							);
						})}
					</ul>
				</div>
			</div>

			{/* Grid Content area */}
			<div className="px-6 pt-8 pb-16 sm:pb-24 lg:px-10 lg:py-24">
				<div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[14rem_minmax(0,1fr)]">
					{/* Desktop sidebar TOC (Hidden on Mobile) */}
					<aside className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
						<p className="px-3 font-medium text-[0.65rem] text-muted-foreground uppercase tracking-[0.16em]">
							{eyebrow}
						</p>
						<nav className="mt-6">
							<ul className="flex flex-col gap-0.5">
								{links.map(({ href, label }) => {
									const isActive = activeId === href.slice(1);
									return (
										<li key={href}>
											<a
												href={href}
												className={cn(
													"relative block px-3 py-1.5 text-sm transition-colors duration-150",
													isActive
														? "font-medium text-foreground"
														: "text-muted-foreground hover:text-foreground",
												)}
											>
												{isActive && (
													<span className="absolute inset-y-0 left-0 w-px bg-foreground/30" />
												)}
												{label}
											</a>
										</li>
									);
								})}
							</ul>
						</nav>
						<Separator className="mt-6" />
						<p className="mt-4 px-3 text-[0.65rem] text-muted-foreground">
							Updated {updated}
						</p>
					</aside>

					{/* Main content */}
					<article className="min-w-0">
						{/* Desktop-only Hero Header */}
						<div className="hidden lg:mb-12 lg:block">
							<h1 className="text-balance font-serif text-4xl text-foreground leading-[1.05] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
								{title}
							</h1>
							<p className="anim-fade-up mt-5 max-w-[70ch] text-pretty text-base text-muted-foreground leading-relaxed [animation-delay:60ms] sm:text-lg">
								{intro}
							</p>
							<Separator className="mt-10" />
						</div>

						<Separator className="mb-10 lg:hidden" />
						<div className="flex flex-col gap-14">{children}</div>
					</article>
				</div>
			</div>
		</section>
	);
}

import { ChevronDown, Star } from "lucide-react";

import type {
	CmsFaqItem,
	CmsStepItem,
	CmsTestimonialData,
	CmsUseCaseItem,
} from "@/lib/cms-types";

export function CmsUseCasesSection({
	eyebrow,
	heading,
	subtitle,
	items,
}: {
	eyebrow: string;
	heading: string;
	subtitle: string;
	items: readonly CmsUseCaseItem[];
}) {
	return (
		<div className="mt-24 border-border/30 border-t pt-16 sm:mt-32 sm:pt-24">
			<div className="max-w-3xl">
				<span className="font-mono text-[10px] text-primary uppercase tracking-[0.25em]">
					{eyebrow}
				</span>
				<h2 className="mt-4 font-serif text-3xl text-foreground leading-[1.1] tracking-tight sm:text-4xl">
					{heading}
				</h2>
				<p className="mt-4 text-pretty text-muted-foreground text-sm leading-relaxed sm:text-base">
					{subtitle}
				</p>
			</div>

			<div className="mt-16 grid gap-6 md:grid-cols-3">
				{items.map((uc) => (
					<div
						key={`${uc.number}-${uc.title}`}
						className="group flex flex-col justify-between rounded-none border border-border/30 bg-card p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25"
					>
						<div>
							<div className="flex items-center justify-between">
								<span className="font-bold font-mono text-[#405cfe]/30 text-xl transition-colors group-hover:text-primary/70">
									{uc.number}
								</span>
								<span className="rounded-none border border-primary/15 bg-[#405cfe]/5 px-2 py-0.5 font-mono text-[#405cfe] text-[9px] uppercase tracking-wider">
									{uc.metric}
								</span>
							</div>
							<h3 className="mt-6 font-serif text-foreground text-xl leading-snug">
								{uc.title}
							</h3>
							<p className="mt-3 text-pretty text-foreground/70 text-sm leading-relaxed dark:text-zinc-300">
								{uc.description}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export function CmsStepsSection({
	eyebrow = "Operational Cycle",
	heading,
	subtitle,
	items,
}: {
	eyebrow?: string;
	heading: string;
	subtitle: string;
	items: readonly CmsStepItem[];
}) {
	return (
		<div className="mt-24 border-border/30 border-t pt-16 sm:mt-32 sm:pt-24">
			<div className="mx-auto max-w-3xl text-center">
				<span className="font-mono text-[10px] text-primary uppercase tracking-[0.25em]">
					{eyebrow}
				</span>
				<h2 className="mt-4 font-serif text-3xl text-foreground leading-[1.1] tracking-tight sm:text-4xl">
					{heading}
				</h2>
				<p className="mx-auto mt-4 max-w-lg text-pretty text-muted-foreground text-sm leading-relaxed sm:text-base">
					{subtitle}
				</p>
			</div>

			<div className="relative mt-16 grid gap-8 md:grid-cols-3">
				<div className="pointer-events-none absolute top-10 left-0 hidden h-[1px] w-full border-muted-foreground/25 border-t border-dashed md:block" />

				{items.map((st) => (
					<div
						key={`${st.number}-${st.title}`}
						className="relative z-10 flex flex-col items-center text-center"
					>
						<div className="flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-card font-mono font-semibold text-primary text-sm shadow-md transition-all duration-300 hover:border-primary/80">
							{st.number}
						</div>
						<h3 className="mt-6 font-serif text-foreground text-lg">
							{st.title}
						</h3>
						<p className="mt-3 max-w-xs text-pretty text-muted-foreground text-xs leading-relaxed">
							{st.subtitle}
						</p>
					</div>
				))}
			</div>
		</div>
	);
}

export function CmsTestimonialSection({
	testimonial,
	avatarUrl,
}: {
	testimonial: CmsTestimonialData;
	avatarUrl: string;
}) {
	if (!testimonial.quote) return null;

	return (
		<div className="mt-24 rounded-none border border-border/30 bg-[#405cfe]/[0.02] p-8 sm:mt-32 sm:p-12">
			<div className="mx-auto max-w-4xl text-center">
				<div className="flex justify-center gap-0.5">
					<Star className="h-4 w-4 fill-amber-400 text-amber-400" />
					<Star className="h-4 w-4 fill-amber-400 text-amber-400" />
					<Star className="h-4 w-4 fill-amber-400 text-amber-400" />
					<Star className="h-4 w-4 fill-amber-400 text-amber-400" />
					<Star className="h-4 w-4 fill-amber-400 text-amber-400" />
				</div>
				<blockquote className="mt-6 font-serif text-foreground text-xl leading-relaxed sm:text-2xl">
					&ldquo;{testimonial.quote}&rdquo;
				</blockquote>
				<div className="mt-8 flex items-center justify-center gap-3">
					<span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-linear-to-br from-[#405cfe] to-cyan-400">
						<img
							src={avatarUrl}
							alt={testimonial.author || "Client"}
							className="h-full w-full object-cover"
						/>
					</span>
					<div className="text-left">
						<p className="font-semibold text-foreground text-sm">
							{testimonial.author}
						</p>
						<p className="text-muted-foreground text-xs">{testimonial.role}</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export function CmsFaqSection({
	subtitle,
	items,
}: {
	subtitle: string;
	items: readonly CmsFaqItem[];
}) {
	return (
		<div className="mt-24 grid gap-10 sm:mt-32 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
			<div>
				<p className="font-bold font-mono text-[10px] text-primary uppercase tracking-[0.25em]">
					FAQ
				</p>
				<h2 className="mt-4 text-balance font-serif text-3xl text-foreground leading-[1.05] tracking-tight sm:text-4xl">
					Answering your team&apos;s core concerns
				</h2>
				<p className="mt-4 max-w-md text-pretty text-muted-foreground text-sm leading-relaxed sm:text-base">
					{subtitle}
				</p>
			</div>

			<div className="space-y-3">
				{items.map((faq) => (
					<details
						key={faq.question}
						className="group rounded-none border border-border/30 bg-card/60 p-5 transition-colors open:border-[#405cfe]/30 open:bg-[#405cfe]/[0.02]"
					>
						<summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-foreground text-sm sm:text-base">
							<span>{faq.question}</span>
							<span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-transform duration-200 group-open:rotate-180 group-open:text-[#405cfe]">
								<ChevronDown className="h-4 w-4" />
							</span>
						</summary>
						<p className="text-pretty pt-4 pr-10 text-muted-foreground text-sm leading-relaxed">
							{faq.answer}
						</p>
					</details>
				))}
			</div>
		</div>
	);
}

export function CmsRichBodySection({ html }: { html?: string | null }) {
	if (!html?.trim() || html.trim() === "<p></p>") return null;
	return (
		<div className="mt-16 border-border/30 border-t pt-12">
			<div
				className="tiptap max-w-[70ch] text-pretty text-foreground/80 text-sm leading-relaxed sm:text-base"
				// biome-ignore lint/security/noDangerouslySetInnerHtml: TipTap HTML is sanitized server-side in sanitizeTipTapHtml
				dangerouslySetInnerHTML={{ __html: html }}
			/>
		</div>
	);
}

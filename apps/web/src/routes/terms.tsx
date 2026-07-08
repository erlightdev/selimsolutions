import { Badge } from "@selimsolutions/ui/components/badge";
import { Separator } from "@selimsolutions/ui/components/separator";
import { createFileRoute } from "@tanstack/react-router";

import LegalPage from "@/components/legal-page";

export const Route = createFileRoute("/terms")({
	component: TermsPage,
	head: () => ({
		meta: [
			{ title: "Terms & Conditions | Selim Solution" },
			{
				name: "description",
				content:
					"Terms for using the Selim Solution public website and related online content.",
			},
		],
	}),
});

function TermsPage() {
	return (
		<LegalPage
			eyebrow="Terms & Conditions"
			title="The rules for using this website"
			intro="These terms set expectations for how visitors can use the Selim Solution website, its content, and the contact channels linked from it."
			updated="June 29, 2026"
			links={[
				{ href: "#acceptance", label: "Acceptance" },
				{ href: "#use", label: "Permitted use" },
				{ href: "#prohibited", label: "Prohibited use" },
				{ href: "#content", label: "Content & IP" },
				{ href: "#links", label: "External links" },
				{ href: "#disclaimer", label: "Disclaimer" },
				{ href: "#liability", label: "Liability" },
				{ href: "#changes", label: "Changes" },
				{ href: "#contact", label: "Contact" },
			]}
		>
			<section id="acceptance" className="flex flex-col gap-4">
				<h2 className="text-balance font-serif text-2xl text-foreground tracking-[-0.01em] sm:text-3xl">
					Acceptance
				</h2>
				<p className="max-w-[70ch] text-pretty text-muted-foreground text-sm leading-relaxed sm:text-base">
					By browsing or using the Selim Solution website, you agree to these
					terms and to follow all applicable laws while doing so. If you do not
					agree with these terms, please do not use the site.
				</p>
			</section>

			<section id="use" className="flex flex-col gap-5">
				<h2 className="text-balance font-serif text-2xl text-foreground tracking-[-0.01em] sm:text-3xl">
					Permitted use
				</h2>
				<p className="max-w-[70ch] text-pretty text-muted-foreground text-sm leading-relaxed sm:text-base">
					You may use the website for legitimate business or informational
					purposes. Specifically:
				</p>
				<ul className="flex flex-col gap-3 pt-1">
					{[
						"Browse content, read case studies, and explore service descriptions",
						"Contact us through provided forms or email addresses",
						"Share public pages via direct links",
						"Reference publicly available information for research",
					].map((item) => (
						<li
							key={item}
							className="flex items-start gap-3 text-muted-foreground text-sm leading-relaxed sm:text-base"
						>
							<span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-none bg-foreground/30" />
							<span className="text-pretty">{item}</span>
						</li>
					))}
				</ul>
			</section>

			<Separator />

			<section id="prohibited" className="flex flex-col gap-6">
				<div className="flex flex-col gap-2">
					<h2 className="text-balance font-serif text-2xl text-foreground tracking-[-0.01em] sm:text-3xl">
						Prohibited use
					</h2>
					<p className="max-w-[70ch] text-pretty text-muted-foreground text-sm leading-relaxed sm:text-base">
						The following activities are strictly prohibited when using or
						interacting with this website:
					</p>
				</div>
				<div className="grid gap-4 sm:grid-cols-2">
					{[
						{
							category: "Disruption",
							detail:
								"Attempting to disrupt, probe, or abuse the site, its infrastructure, or connected services.",
						},
						{
							category: "Misrepresentation",
							detail:
								"Submitting false, harmful, or misleading information through contact forms or other channels.",
						},
						{
							category: "Unauthorized copying",
							detail:
								"Copying, redistributing, or commercially exploiting site content without written permission.",
						},
						{
							category: "Automated access",
							detail:
								"Using bots, scrapers, or automated tools to extract content or overload the site.",
						},
					].map(({ category, detail }) => (
						<div
							key={category}
							className="flex flex-col gap-3 rounded-none border border-border bg-card p-5 transition-all duration-200 hover:border-destructive/20 hover:shadow-[0_4px_12px_rgba(239,68,68,0.01)]"
						>
							<Badge
								variant="destructive"
								className="w-fit rounded-none font-semibold text-[10px] uppercase tracking-wider"
							>
								{category}
							</Badge>
							<p className="text-pretty text-muted-foreground text-sm leading-relaxed">
								{detail}
							</p>
						</div>
					))}
				</div>
			</section>

			<section id="content" className="flex flex-col gap-4">
				<h2 className="text-balance font-serif text-2xl text-foreground tracking-[-0.01em] sm:text-3xl">
					Content & intellectual property
				</h2>
				<p className="max-w-[70ch] text-pretty text-muted-foreground text-sm leading-relaxed sm:text-base">
					The text, visuals, logos, and page structure on this site belong to
					Selim Solution or its licensors unless stated otherwise. You may link
					to public pages, but you may not reuse assets in a way that suggests
					endorsement or affiliation.
				</p>
			</section>

			<Separator />

			<section id="links" className="flex flex-col gap-4">
				<h2 className="text-balance font-serif text-2xl text-foreground tracking-[-0.01em] sm:text-3xl">
					External links
				</h2>
				<p className="max-w-[70ch] text-pretty text-muted-foreground text-sm leading-relaxed sm:text-base">
					The website may contain links to third-party sites. We are not
					responsible for the content, privacy practices, or availability of
					external sites. Use external links at your own discretion.
				</p>
			</section>

			<section id="disclaimer" className="flex flex-col gap-4">
				<h2 className="text-balance font-serif text-2xl text-foreground tracking-[-0.01em] sm:text-3xl">
					Disclaimer
				</h2>
				<p className="max-w-[70ch] text-pretty text-muted-foreground text-sm leading-relaxed sm:text-base">
					The website is provided for general information and marketing
					purposes. We make reasonable efforts to keep information current, but
					we do not guarantee that every detail is complete, error-free, or
					always available. Content on the site does not constitute professional
					security advice.
				</p>
			</section>

			<Separator />

			<section id="liability" className="flex flex-col gap-4">
				<h2 className="text-balance font-serif text-2xl text-foreground tracking-[-0.01em] sm:text-3xl">
					Limitation of liability
				</h2>
				<p className="max-w-[70ch] text-pretty text-muted-foreground text-sm leading-relaxed sm:text-base">
					To the extent permitted by law, Selim Solution is not liable for any
					indirect, incidental, or consequential damages arising from your use
					of the website or reliance on its content. Our total liability for any
					claim is limited to the amount you paid us, if anything.
				</p>
			</section>

			<section id="changes" className="flex flex-col gap-4">
				<h2 className="text-balance font-serif text-2xl text-foreground tracking-[-0.01em] sm:text-3xl">
					Changes to these terms
				</h2>
				<p className="max-w-[70ch] text-pretty text-muted-foreground text-sm leading-relaxed sm:text-base">
					We may update these terms from time to time. When we do, we will
					revise the &ldquo;last updated&rdquo; date at the top of this page.
					Continued use of the site after changes are posted means you accept
					the updated terms.
				</p>
			</section>

			<Separator />

			<section id="contact" className="flex flex-col gap-4">
				<h2 className="text-balance font-serif text-2xl text-foreground tracking-[-0.01em] sm:text-3xl">
					Contact us
				</h2>
				<p className="max-w-[70ch] text-pretty text-muted-foreground text-sm leading-relaxed sm:text-base">
					Questions about these terms? Email{" "}
					<a
						className="text-foreground underline decoration-foreground/30 underline-offset-4 transition-colors duration-150 hover:decoration-foreground"
						href="mailto:contact@selim.solutions"
					>
						contact@selim.solutions
					</a>
					.
				</p>
			</section>
		</LegalPage>
	);
}

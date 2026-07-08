import { Badge } from "@selimsolutions/ui/components/badge";
import { Separator } from "@selimsolutions/ui/components/separator";
import { createFileRoute } from "@tanstack/react-router";

import LegalPage from "@/components/legal-page";

export const Route = createFileRoute("/privacy")({
	component: PrivacyPolicyPage,
	head: () => ({
		meta: [
			{ title: "Privacy Policy | Selim Solution" },
			{
				name: "description",
				content:
					"How Selim Solution collects, uses, and protects personal data on the public website.",
			},
		],
	}),
});

function PrivacyPolicyPage() {
	return (
		<LegalPage
			eyebrow="Privacy Policy"
			title="How we handle your information"
			intro="This page explains what information we collect on the public website, how we use it, and the choices you have when you contact Selim Solution or browse our site."
			updated="June 29, 2026"
			links={[
				{ href: "#overview", label: "Overview" },
				{ href: "#data-we-collect", label: "Data we collect" },
				{ href: "#how-we-use-data", label: "How we use data" },
				{ href: "#sharing", label: "Sharing" },
				{ href: "#retention", label: "Retention" },
				{ href: "#your-rights", label: "Your rights" },
				{ href: "#cookies", label: "Cookies" },
				{ href: "#security", label: "Security" },
				{ href: "#changes", label: "Changes" },
				{ href: "#contact", label: "Contact" },
			]}
		>
			<section id="overview" className="flex flex-col gap-4">
				<h2 className="text-balance font-serif text-2xl text-foreground tracking-[-0.01em] sm:text-3xl">
					Overview
				</h2>
				<p className="max-w-[70ch] text-pretty text-muted-foreground text-sm leading-relaxed sm:text-base">
					Selim Solution only collects the information needed to operate the
					website, respond to inquiries, and improve the experience for
					visitors. We keep our policy practical, transparent, and limited to
					what the public site does.
				</p>
			</section>

			<section id="data-we-collect" className="flex flex-col gap-6">
				<div className="flex flex-col gap-2">
					<h2 className="text-balance font-serif text-2xl text-foreground tracking-[-0.01em] sm:text-3xl">
						Data we collect
					</h2>
					<p className="max-w-[70ch] text-pretty text-muted-foreground text-sm leading-relaxed sm:text-base">
						We categorize the information we collect to help you understand what
						data is gathered during your visit.
					</p>
				</div>
				<div className="grid gap-4 sm:grid-cols-2">
					{[
						{
							category: "Information you provide",
							detail:
								"Contact details you submit through forms, email, or chat — such as your name, email address, and message content.",
						},
						{
							category: "Usage data",
							detail:
								"Basic analytics such as page views, browser type, device information, and referral source.",
						},
						{
							category: "Technical logs",
							detail:
								"Server logs that help us keep the site secure, diagnose issues, and maintain performance.",
						},
						{
							category: "Cookies",
							detail:
								"Cookies and similar tools used for essential site functionality, preferences, and analytics.",
						},
					].map(({ category, detail }) => (
						<div
							key={category}
							className="flex flex-col gap-3 rounded-none border border-border bg-card p-5 transition-all duration-200 hover:border-foreground/10 hover:shadow-[0_4px_12px_rgba(0,0,0,0.02)]"
						>
							<Badge
								variant="secondary"
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

			<section id="how-we-use-data" className="flex flex-col gap-5">
				<h2 className="text-balance font-serif text-2xl text-foreground tracking-[-0.01em] sm:text-3xl">
					How we use data
				</h2>
				<p className="max-w-[70ch] text-pretty text-muted-foreground text-sm leading-relaxed sm:text-base">
					We use the information we collect to reply to requests, improve site
					performance, protect against abuse, and understand what content people
					find useful. We do not sell personal data.
				</p>
				<ul className="flex flex-col gap-3 pt-1">
					{[
						"Respond to your inquiries and provide requested information",
						"Improve website performance, content, and user experience",
						"Protect against abuse, spam, and security threats",
						"Understand how visitors interact with our content",
						"Comply with legal obligations where applicable",
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

			<section id="sharing" className="flex flex-col gap-4">
				<h2 className="text-balance font-serif text-2xl text-foreground tracking-[-0.01em] sm:text-3xl">
					Sharing
				</h2>
				<p className="max-w-[70ch] text-pretty text-muted-foreground text-sm leading-relaxed sm:text-base">
					We only share data with trusted service providers when needed to run
					the site, deliver email, or maintain security. We do not sell, rent,
					or trade personal information to third parties for marketing purposes.
				</p>
			</section>

			<section id="retention" className="flex flex-col gap-4">
				<h2 className="text-balance font-serif text-2xl text-foreground tracking-[-0.01em] sm:text-3xl">
					Retention
				</h2>
				<p className="max-w-[70ch] text-pretty text-muted-foreground text-sm leading-relaxed sm:text-base">
					We keep data only as long as it is needed for the purposes described
					in this policy, or as required by law. When data is no longer needed,
					we securely delete or anonymize it.
				</p>
			</section>

			<Separator />

			<section id="your-rights" className="flex flex-col gap-4">
				<h2 className="text-balance font-serif text-2xl text-foreground tracking-[-0.01em] sm:text-3xl">
					Your rights
				</h2>
				<p className="max-w-[70ch] text-pretty text-muted-foreground text-sm leading-relaxed sm:text-base">
					You can request access to, correction of, or deletion of your personal
					information by contacting us. We will respond to verified requests
					within a reasonable timeframe.
				</p>
			</section>

			<section id="cookies" className="flex flex-col gap-4">
				<h2 className="text-balance font-serif text-2xl text-foreground tracking-[-0.01em] sm:text-3xl">
					Cookies
				</h2>
				<p className="max-w-[70ch] text-pretty text-muted-foreground text-sm leading-relaxed sm:text-base">
					We use cookies for essential site functionality and optional
					analytics. You can adjust your browser settings to limit cookies,
					though some site features may not function properly as a result.
				</p>
			</section>

			<Separator />

			<section id="security" className="flex flex-col gap-4">
				<h2 className="text-balance font-serif text-2xl text-foreground tracking-[-0.01em] sm:text-3xl">
					Security
				</h2>
				<p className="max-w-[70ch] text-pretty text-muted-foreground text-sm leading-relaxed sm:text-base">
					We use reasonable technical and organizational measures to protect
					personal data. No method of transmission or storage is completely
					secure, but we work to protect information using industry-standard
					practices.
				</p>
			</section>

			<section id="changes" className="flex flex-col gap-4">
				<h2 className="text-balance font-serif text-2xl text-foreground tracking-[-0.01em] sm:text-3xl">
					Changes to this policy
				</h2>
				<p className="max-w-[70ch] text-pretty text-muted-foreground text-sm leading-relaxed sm:text-base">
					We may update this policy from time to time. When we do, we will
					revise the &ldquo;last updated&rdquo; date at the top of this page.
					Continued use of the site after changes are posted means you accept
					the updated policy.
				</p>
			</section>

			<Separator />

			<section id="contact" className="flex flex-col gap-4">
				<h2 className="text-balance font-serif text-2xl text-foreground tracking-[-0.01em] sm:text-3xl">
					Contact us
				</h2>
				<p className="max-w-[70ch] text-pretty text-muted-foreground text-sm leading-relaxed sm:text-base">
					For questions about this privacy policy or our data practices, contact
					us at{" "}
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

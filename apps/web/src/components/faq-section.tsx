import { ChevronDown } from "lucide-react";

const faqs = [
	{
		question: "What does your SOC monitor?",
		answer:
			"We monitor endpoints, identities, cloud workloads, network activity, and suspicious user behavior so your team gets visibility across the attack surface.",
	},
	{
		question: "How quickly do you respond to incidents?",
		answer:
			"Our team operates 24/7 with triage and escalation workflows designed to move from alert to action in minutes, not hours.",
	},
	{
		question: "Do you support compliance requirements?",
		answer:
			"Yes. We help organizations align monitoring, reporting, and security controls with frameworks such as ISO 27001, SOC 2, and sector-specific requirements.",
	},
	{
		question: "Can Selim work alongside our internal IT team?",
		answer:
			"Yes. We usually operate as an extension of the in-house team, sharing findings, response guidance, and prioritized remediation steps.",
	},
] as const;

export default function FAQSection() {
	return (
		<section className="border-border/40 border-t bg-background py-16 sm:py-24">
			<div className="mx-auto grid max-w-7xl gap-10 px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16 lg:px-10">
				<div>
					<p className="font-bold font-mono text-[10px] text-primary uppercase tracking-[0.25em]">
						FAQ
					</p>
					<h2 className="mt-4 text-balance font-serif text-4xl text-foreground leading-[1.05] tracking-tight sm:text-5xl">
						Questions security teams ask before they onboard
					</h2>
					<p className="mt-4 max-w-md text-pretty text-muted-foreground text-sm leading-relaxed sm:text-base">
						A few direct answers on monitoring, incident response, and how we
						fit into your existing operations.
					</p>
				</div>

				<div className="space-y-3">
					{faqs.map((faq) => (
						<details
							key={faq.question}
							className="group rounded-2xl border border-border bg-card/60 p-5 transition-colors open:border-[#405cfe]/30 open:bg-[#405cfe]/[0.04]"
						>
							<summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium text-foreground text-sm sm:text-base">
								<span>{faq.question}</span>
								<span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border bg-background text-muted-foreground transition-transform duration-200 group-open:rotate-180 group-open:text-[#405cfe]">
									<ChevronDown className="h-4 w-4" />
								</span>
							</summary>
							<p className="text-pretty pt-4 pr-12 text-muted-foreground text-sm leading-relaxed sm:text-base">
								{faq.answer}
							</p>
						</details>
					))}
				</div>
			</div>
		</section>
	);
}

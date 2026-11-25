import { Button } from "@selimsolutions/ui/components/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@selimsolutions/ui/components/card";
import { Checkbox } from "@selimsolutions/ui/components/checkbox";
import { Input } from "@selimsolutions/ui/components/input";
import { Label } from "@selimsolutions/ui/components/label";
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@selimsolutions/ui/components/tabs";
import { Plus, Trash2 } from "lucide-react";

import type { CmsPageContentJson } from "@/lib/cms-types";

interface PageStructuredEditorProps {
	template: "LANDING" | "STANDARD" | "SERVICE" | "SOLUTION" | "LEGAL";
	value: CmsPageContentJson;
	onChange: (next: CmsPageContentJson) => void;
}

export function PageStructuredEditor({
	template,
	value,
	onChange,
}: PageStructuredEditorProps) {
	const hero = value.hero ?? {};
	const stats = value.stats ?? [];
	const useCases = value.useCases ?? [];
	const steps = value.steps ?? [];
	const testimonial = value.testimonial ?? {};
	const faqs = value.faqs ?? [];
	const legalMeta = value.legalMeta ?? {};

	const isServiceOrSolution = template === "SERVICE" || template === "SOLUTION";
	const isLegal = template === "LEGAL";

	if (isLegal) {
		return (
			<Card className="rounded-xl border-border/80">
				<CardHeader className="pb-3">
					<CardTitle className="text-sm">Legal Document Header</CardTitle>
					<CardDescription className="text-xs">
						Customize the legal header and toggle whether the TipTap body
						replaces the default sections on the live page.
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-3">
					<div className="grid gap-3 sm:grid-cols-2">
						<div className="space-y-1.5">
							<Label className="text-xs">Eyebrow</Label>
							<Input
								value={legalMeta.eyebrow ?? ""}
								onChange={(e) =>
									onChange({
										...value,
										legalMeta: { ...legalMeta, eyebrow: e.target.value },
									})
								}
								placeholder="Privacy Policy"
								className="h-8 rounded-lg text-xs"
							/>
						</div>
						<div className="space-y-1.5">
							<Label className="text-xs">Last Updated</Label>
							<Input
								value={legalMeta.updated ?? ""}
								onChange={(e) =>
									onChange({
										...value,
										legalMeta: { ...legalMeta, updated: e.target.value },
									})
								}
								placeholder="June 29, 2026"
								className="h-8 rounded-lg text-xs"
							/>
						</div>
					</div>
					<div className="space-y-1.5">
						<Label className="text-xs">Intro Summary</Label>
						<textarea
							rows={2}
							value={legalMeta.intro ?? ""}
							onChange={(e) =>
								onChange({
									...value,
									legalMeta: { ...legalMeta, intro: e.target.value },
								})
							}
							className="w-full resize-none rounded-lg border border-input bg-transparent px-3 py-2 text-foreground text-xs focus-visible:border-ring focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring/50"
						/>
					</div>
					<div className="flex items-center gap-2 pt-1">
						<Checkbox
							id="legal-custom-body"
							checked={!!legalMeta.renderCustomBody}
							onCheckedChange={(c) =>
								onChange({
									...value,
									legalMeta: { ...legalMeta, renderCustomBody: !!c },
								})
							}
						/>
						<Label
							htmlFor="legal-custom-body"
							className="cursor-pointer font-normal text-xs"
						>
							Render TipTap Body above as the live Legal document content
						</Label>
					</div>
				</CardContent>
			</Card>
		);
	}

	return (
		<Card className="rounded-xl border-border/80">
			<CardHeader className="pb-3">
				<CardTitle className="text-sm">Page Content Blocks</CardTitle>
				<CardDescription className="text-xs">
					Edit the live hero, scenarios, workflow steps, testimonial, and FAQs.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Tabs defaultValue="hero" className="gap-4">
					<TabsList className="flex-wrap rounded-lg">
						<TabsTrigger value="hero" className="rounded-md px-2.5 text-xs">
							Hero
						</TabsTrigger>
						{isServiceOrSolution ? (
							<>
								<TabsTrigger
									value="useCases"
									className="rounded-md px-2.5 text-xs"
								>
									Scenarios ({useCases.length})
								</TabsTrigger>
								<TabsTrigger
									value="steps"
									className="rounded-md px-2.5 text-xs"
								>
									Steps ({steps.length})
								</TabsTrigger>
								<TabsTrigger
									value="testimonial"
									className="rounded-md px-2.5 text-xs"
								>
									Testimonial
								</TabsTrigger>
								<TabsTrigger value="faqs" className="rounded-md px-2.5 text-xs">
									FAQs ({faqs.length})
								</TabsTrigger>
							</>
						) : (
							<TabsTrigger value="stats" className="rounded-md px-2.5 text-xs">
								Stats ({stats.length})
							</TabsTrigger>
						)}
					</TabsList>

					<TabsContent value="hero" className="space-y-3">
						<div className="grid gap-3 sm:grid-cols-2">
							<div className="space-y-1.5">
								<Label className="text-xs">Eyebrow / Badge</Label>
								<Input
									value={hero.eyebrow ?? ""}
									onChange={(e) =>
										onChange({
											...value,
											hero: { ...hero, eyebrow: e.target.value },
										})
									}
									className="h-8 rounded-lg text-xs"
								/>
							</div>
							<div className="space-y-1.5">
								<Label className="text-xs">Headline</Label>
								<Input
									value={hero.headline ?? ""}
									onChange={(e) =>
										onChange({
											...value,
											hero: { ...hero, headline: e.target.value },
										})
									}
									className="h-8 rounded-lg text-xs"
								/>
							</div>
						</div>

						<div className="space-y-1.5">
							<Label className="text-xs">Subheadline</Label>
							<textarea
								rows={2}
								value={hero.subheadline ?? ""}
								onChange={(e) =>
									onChange({
										...value,
										hero: { ...hero, subheadline: e.target.value },
									})
								}
								className="w-full resize-none rounded-lg border border-input bg-transparent px-3 py-2 text-foreground text-xs focus-visible:border-ring focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring/50"
							/>
						</div>

						<div className="grid gap-3 sm:grid-cols-2">
							<div className="space-y-1.5">
								<Label className="text-xs">Primary CTA Label</Label>
								<Input
									value={hero.ctaLabel ?? ""}
									onChange={(e) =>
										onChange({
											...value,
											hero: { ...hero, ctaLabel: e.target.value },
										})
									}
									className="h-8 rounded-lg text-xs"
								/>
							</div>
							<div className="space-y-1.5">
								<Label className="text-xs">Primary CTA Link</Label>
								<Input
									value={hero.ctaHref ?? ""}
									onChange={(e) =>
										onChange({
											...value,
											hero: { ...hero, ctaHref: e.target.value },
										})
									}
									className="h-8 rounded-lg font-mono text-xs"
								/>
							</div>
						</div>
					</TabsContent>

					{isServiceOrSolution ? (
						<>
							<TabsContent value="useCases" className="space-y-3">
								{useCases.map((uc, idx) => (
									<div
										// biome-ignore lint/suspicious/noArrayIndexKey: ordered form item edited inline
										key={`uc-${idx}`}
										className="space-y-2 rounded-lg border border-border/70 bg-background/50 p-3"
									>
										<div className="flex items-center justify-between gap-2">
											<div className="grid flex-1 gap-2 sm:grid-cols-3">
												<Input
													value={uc.number}
													onChange={(e) => {
														const next = [...useCases];
														next[idx] = { ...uc, number: e.target.value };
														onChange({ ...value, useCases: next });
													}}
													placeholder="01"
													className="h-7 rounded-md font-mono text-xs"
												/>
												<Input
													value={uc.title}
													onChange={(e) => {
														const next = [...useCases];
														next[idx] = { ...uc, title: e.target.value };
														onChange({ ...value, useCases: next });
													}}
													placeholder="Title"
													className="h-7 rounded-md text-xs sm:col-span-2"
												/>
											</div>
											<Button
												type="button"
												variant="ghost"
												size="icon-xs"
												onClick={() =>
													onChange({
														...value,
														useCases: useCases.filter((_, i) => i !== idx),
													})
												}
												className="text-muted-foreground hover:text-destructive"
											>
												<Trash2 className="size-3" />
											</Button>
										</div>
										<div className="grid gap-2 sm:grid-cols-3">
											<Input
												value={uc.metric}
												onChange={(e) => {
													const next = [...useCases];
													next[idx] = { ...uc, metric: e.target.value };
													onChange({ ...value, useCases: next });
												}}
												placeholder="Metric badge"
												className="h-7 rounded-md text-xs"
											/>
											<Input
												value={uc.description}
												onChange={(e) => {
													const next = [...useCases];
													next[idx] = { ...uc, description: e.target.value };
													onChange({ ...value, useCases: next });
												}}
												placeholder="Description"
												className="h-7 rounded-md text-xs sm:col-span-2"
											/>
										</div>
									</div>
								))}
								<Button
									type="button"
									variant="outline"
									size="xs"
									onClick={() =>
										onChange({
											...value,
											useCases: [
												...useCases,
												{
													number: String(useCases.length + 1).padStart(2, "0"),
													title: "",
													description: "",
													metric: "",
												},
											],
										})
									}
									className="rounded-lg active:scale-[0.97]"
								>
									<Plus className="size-3.5" />
									<span>Add Scenario</span>
								</Button>
							</TabsContent>

							<TabsContent value="steps" className="space-y-3">
								{steps.map((st, idx) => (
									<div
										// biome-ignore lint/suspicious/noArrayIndexKey: ordered form item edited inline
										key={`st-${idx}`}
										className="space-y-2 rounded-lg border border-border/70 bg-background/50 p-3"
									>
										<div className="flex items-center justify-between gap-2">
											<div className="grid flex-1 gap-2 sm:grid-cols-3">
												<Input
													value={st.number}
													onChange={(e) => {
														const next = [...steps];
														next[idx] = { ...st, number: e.target.value };
														onChange({ ...value, steps: next });
													}}
													placeholder="01"
													className="h-7 rounded-md font-mono text-xs"
												/>
												<Input
													value={st.title}
													onChange={(e) => {
														const next = [...steps];
														next[idx] = { ...st, title: e.target.value };
														onChange({ ...value, steps: next });
													}}
													placeholder="Step title"
													className="h-7 rounded-md text-xs sm:col-span-2"
												/>
											</div>
											<Button
												type="button"
												variant="ghost"
												size="icon-xs"
												onClick={() =>
													onChange({
														...value,
														steps: steps.filter((_, i) => i !== idx),
													})
												}
												className="text-muted-foreground hover:text-destructive"
											>
												<Trash2 className="size-3" />
											</Button>
										</div>
										<Input
											value={st.subtitle}
											onChange={(e) => {
												const next = [...steps];
												next[idx] = { ...st, subtitle: e.target.value };
												onChange({ ...value, steps: next });
											}}
											placeholder="Step subtitle"
											className="h-7 rounded-md text-xs"
										/>
									</div>
								))}
								<Button
									type="button"
									variant="outline"
									size="xs"
									onClick={() =>
										onChange({
											...value,
											steps: [
												...steps,
												{
													number: String(steps.length + 1).padStart(2, "0"),
													title: "",
													subtitle: "",
												},
											],
										})
									}
									className="rounded-lg active:scale-[0.97]"
								>
									<Plus className="size-3.5" />
									<span>Add Step</span>
								</Button>
							</TabsContent>

							<TabsContent value="testimonial" className="space-y-3">
								<div className="space-y-1.5">
									<Label className="text-xs">Quote</Label>
									<textarea
										rows={3}
										value={testimonial.quote ?? ""}
										onChange={(e) =>
											onChange({
												...value,
												testimonial: { ...testimonial, quote: e.target.value },
											})
										}
										className="w-full resize-none rounded-lg border border-input bg-transparent px-3 py-2 text-foreground text-xs"
									/>
								</div>
								<div className="grid gap-3 sm:grid-cols-2">
									<div className="space-y-1.5">
										<Label className="text-xs">Author Name</Label>
										<Input
											value={testimonial.author ?? ""}
											onChange={(e) =>
												onChange({
													...value,
													testimonial: {
														...testimonial,
														author: e.target.value,
													},
												})
											}
											className="h-8 rounded-lg text-xs"
										/>
									</div>
									<div className="space-y-1.5">
										<Label className="text-xs">Role / Organization</Label>
										<Input
											value={testimonial.role ?? ""}
											onChange={(e) =>
												onChange({
													...value,
													testimonial: { ...testimonial, role: e.target.value },
												})
											}
											className="h-8 rounded-lg text-xs"
										/>
									</div>
								</div>
							</TabsContent>

							<TabsContent value="faqs" className="space-y-3">
								{faqs.map((faq, idx) => (
									<div
										// biome-ignore lint/suspicious/noArrayIndexKey: ordered form item edited inline
										key={`faq-${idx}`}
										className="space-y-2 rounded-lg border border-border/70 bg-background/50 p-3"
									>
										<div className="flex items-center justify-between gap-2">
											<Input
												value={faq.question}
												onChange={(e) => {
													const next = [...faqs];
													next[idx] = { ...faq, question: e.target.value };
													onChange({ ...value, faqs: next });
												}}
												placeholder="Question"
												className="h-7 flex-1 rounded-md text-xs"
											/>
											<Button
												type="button"
												variant="ghost"
												size="icon-xs"
												onClick={() =>
													onChange({
														...value,
														faqs: faqs.filter((_, i) => i !== idx),
													})
												}
												className="text-muted-foreground hover:text-destructive"
											>
												<Trash2 className="size-3" />
											</Button>
										</div>
										<textarea
											rows={2}
											value={faq.answer}
											onChange={(e) => {
												const next = [...faqs];
												next[idx] = { ...faq, answer: e.target.value };
												onChange({ ...value, faqs: next });
											}}
											placeholder="Answer"
											className="w-full resize-none rounded-md border border-input bg-transparent px-2.5 py-1.5 text-foreground text-xs"
										/>
									</div>
								))}
								<Button
									type="button"
									variant="outline"
									size="xs"
									onClick={() =>
										onChange({
											...value,
											faqs: [...faqs, { question: "", answer: "" }],
										})
									}
									className="rounded-lg active:scale-[0.97]"
								>
									<Plus className="size-3.5" />
									<span>Add FAQ</span>
								</Button>
							</TabsContent>
						</>
					) : (
						<TabsContent value="stats" className="space-y-3">
							{stats.map((st, idx) => (
								<div
									// biome-ignore lint/suspicious/noArrayIndexKey: ordered form item edited inline
									key={`stat-${idx}`}
									className="flex items-center gap-2 rounded-lg border border-border/70 bg-background/50 p-2.5"
								>
									<Input
										value={st.value}
										onChange={(e) => {
											const next = [...stats];
											next[idx] = { ...st, value: e.target.value };
											onChange({ ...value, stats: next });
										}}
										placeholder="24/7"
										className="h-7 w-28 rounded-md font-mono text-xs"
									/>
									<Input
										value={st.label}
										onChange={(e) => {
											const next = [...stats];
											next[idx] = { ...st, label: e.target.value };
											onChange({ ...value, stats: next });
										}}
										placeholder="Label"
										className="h-7 flex-1 rounded-md text-xs"
									/>
									<Button
										type="button"
										variant="ghost"
										size="icon-xs"
										onClick={() =>
											onChange({
												...value,
												stats: stats.filter((_, i) => i !== idx),
											})
										}
										className="text-muted-foreground hover:text-destructive"
									>
										<Trash2 className="size-3" />
									</Button>
								</div>
							))}
							<Button
								type="button"
								variant="outline"
								size="xs"
								onClick={() =>
									onChange({
										...value,
										stats: [...stats, { value: "", label: "" }],
									})
								}
								className="rounded-lg active:scale-[0.97]"
							>
								<Plus className="size-3.5" />
								<span>Add Stat</span>
							</Button>
						</TabsContent>
					)}
				</Tabs>
			</CardContent>
		</Card>
	);
}

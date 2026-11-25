import { Button } from "@selimsolutions/ui/components/button";
import { Checkbox } from "@selimsolutions/ui/components/checkbox";
import { Input } from "@selimsolutions/ui/components/input";
import { Label } from "@selimsolutions/ui/components/label";
import { ArrowDown, ArrowUp, Plus, Save, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";

import type { GeneralSettingsPayload } from "./cms-seo-settings";

const ACCENT_PRESETS = [
	{ label: "Brand Blue", value: "#0069eb" },
	{ label: "Royal Indigo", value: "#405cfe" },
	{ label: "Azure", value: "#007aff" },
	{ label: "Slate", value: "#52525b" },
];

export type AppearancePayload = {
	accentColor: string;
	defaultTheme: "dark" | "light" | "system";
	containerWidth: "standard" | "wide";
	showAnnouncementBar: boolean;
	stickyHeader: boolean;
	announcementText: string;
	announcementHref: string;
	footerCtaTitle: string;
	footerCtaSubtitle: string;
	footerCtaLabel: string;
	footerCtaHref: string;
};

interface CmsAppearanceViewProps {
	appearance: AppearancePayload;
	general: GeneralSettingsPayload;
	isSaving: boolean;
	onSave: (
		nextAppearance: AppearancePayload,
		nextGeneral: GeneralSettingsPayload,
	) => Promise<void>;
}

export function CmsAppearanceView({
	appearance,
	general,
	isSaving,
	onSave,
}: CmsAppearanceViewProps) {
	const [draft, setDraft] = useState<AppearancePayload>(appearance);
	const [generalDraft, setGeneralDraft] =
		useState<GeneralSettingsPayload>(general);

	useEffect(() => {
		setDraft(appearance);
	}, [appearance]);

	useEffect(() => {
		setGeneralDraft(general);
	}, [general]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		await onSave(draft, generalDraft);
	};

	return (
		<form onSubmit={handleSubmit} className="grid gap-4 lg:grid-cols-12">
			<div className="space-y-4 rounded-xl border border-border/80 bg-card p-4 lg:col-span-7">
				<div className="space-y-2">
					<Label className="text-xs">Brand Accent</Label>
					<div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
						{ACCENT_PRESETS.map((preset) => (
							<button
								key={preset.value}
								type="button"
								onClick={() =>
									setDraft({ ...draft, accentColor: preset.value })
								}
								className={`flex items-center gap-2 rounded-lg border px-2.5 py-2 font-medium text-xs transition-[border-color,transform] duration-150 active:scale-[0.97] ${
									draft.accentColor === preset.value
										? "border-primary bg-primary/10 text-foreground"
										: "border-border/70 bg-background/50 text-muted-foreground hover:text-foreground"
								}`}
							>
								<span
									style={{ backgroundColor: preset.value }}
									className="size-3.5 shrink-0 rounded-full"
								/>
								<span className="truncate">{preset.label}</span>
							</button>
						))}
					</div>
				</div>

				<div className="grid gap-3 sm:grid-cols-2">
					<div className="space-y-1.5">
						<Label htmlFor="default-theme" className="text-xs">
							Default Theme
						</Label>
						<select
							id="default-theme"
							value={draft.defaultTheme}
							onChange={(e) =>
								setDraft({
									...draft,
									defaultTheme: e.target
										.value as AppearancePayload["defaultTheme"],
								})
							}
							className="h-9 w-full rounded-lg border border-input bg-background px-2.5 text-foreground text-xs"
						>
							<option value="dark">Dark (Default)</option>
							<option value="light">Light</option>
							<option value="system">System</option>
						</select>
					</div>

					<div className="space-y-1.5">
						<Label htmlFor="container-width" className="text-xs">
							Container Width
						</Label>
						<select
							id="container-width"
							value={draft.containerWidth}
							onChange={(e) =>
								setDraft({
									...draft,
									containerWidth: e.target
										.value as AppearancePayload["containerWidth"],
								})
							}
							className="h-9 w-full rounded-lg border border-input bg-background px-2.5 text-foreground text-xs"
						>
							<option value="standard">Standard (max-w-7xl)</option>
							<option value="wide">Wide (Full Bleed)</option>
						</select>
					</div>
				</div>

				<div className="space-y-2.5 border-border/60 border-t pt-3">
					<div className="flex items-center gap-2.5">
						<Checkbox
							id="show-announcement-bar"
							checked={draft.showAnnouncementBar}
							onCheckedChange={(checked) =>
								setDraft({ ...draft, showAnnouncementBar: !!checked })
							}
						/>
						<Label
							htmlFor="show-announcement-bar"
							className="cursor-pointer font-normal text-xs"
						>
							Show top announcement bar
						</Label>
					</div>
					<div className="flex items-center gap-2.5">
						<Checkbox
							id="sticky-header"
							checked={draft.stickyHeader}
							onCheckedChange={(checked) =>
								setDraft({ ...draft, stickyHeader: !!checked })
							}
						/>
						<Label
							htmlFor="sticky-header"
							className="cursor-pointer font-normal text-xs"
						>
							Sticky blurred navigation header
						</Label>
					</div>
				</div>

				{/* Announcement Bar */}
				<div className="space-y-3 border-border/60 border-t pt-3">
					<div className="font-semibold text-[11px] text-muted-foreground uppercase tracking-wider">
						Announcement Bar
					</div>
					<div className="grid gap-3 sm:grid-cols-3">
						<div className="space-y-1.5 sm:col-span-2">
							<Label htmlFor="ann-text" className="text-xs">
								Announcement Text
							</Label>
							<Input
								id="ann-text"
								value={draft.announcementText}
								onChange={(e) =>
									setDraft({ ...draft, announcementText: e.target.value })
								}
								placeholder="24/7 managed security operations, incident response..."
								className="h-8 rounded-lg text-xs"
							/>
						</div>
						<div className="space-y-1.5">
							<Label htmlFor="ann-href" className="text-xs">
								Announcement Link
							</Label>
							<Input
								id="ann-href"
								value={draft.announcementHref}
								onChange={(e) =>
									setDraft({ ...draft, announcementHref: e.target.value })
								}
								placeholder="/free-assessment"
								className="h-8 rounded-lg font-mono text-xs"
							/>
						</div>
					</div>
				</div>

				{/* Footer Content & CTA */}
				<div className="space-y-3 border-border/60 border-t pt-3">
					<div className="font-semibold text-[11px] text-muted-foreground uppercase tracking-wider">
						Footer CTA &amp; Content
					</div>
					<div className="grid gap-3 sm:grid-cols-2">
						<div className="space-y-1.5">
							<Label htmlFor="ft-cta-title" className="text-xs">
								Footer CTA Title
							</Label>
							<Input
								id="ft-cta-title"
								value={draft.footerCtaTitle}
								onChange={(e) =>
									setDraft({ ...draft, footerCtaTitle: e.target.value })
								}
								className="h-8 rounded-lg text-xs"
							/>
						</div>
						<div className="space-y-1.5">
							<Label htmlFor="ft-cta-label" className="text-xs">
								Footer Button Label
							</Label>
							<Input
								id="ft-cta-label"
								value={draft.footerCtaLabel}
								onChange={(e) =>
									setDraft({ ...draft, footerCtaLabel: e.target.value })
								}
								className="h-8 rounded-lg text-xs"
							/>
						</div>
					</div>

					<div className="grid gap-3 sm:grid-cols-2">
						<div className="space-y-1.5">
							<Label htmlFor="ft-cta-sub" className="text-xs">
								Footer CTA Subtitle
							</Label>
							<Input
								id="ft-cta-sub"
								value={draft.footerCtaSubtitle}
								onChange={(e) =>
									setDraft({ ...draft, footerCtaSubtitle: e.target.value })
								}
								className="h-8 rounded-lg text-xs"
							/>
						</div>
						<div className="space-y-1.5">
							<Label htmlFor="ft-cta-href" className="text-xs">
								Footer Button Link
							</Label>
							<Input
								id="ft-cta-href"
								value={draft.footerCtaHref}
								onChange={(e) =>
									setDraft({ ...draft, footerCtaHref: e.target.value })
								}
								placeholder="/free-assessment"
								className="h-8 rounded-lg font-mono text-xs"
							/>
						</div>
					</div>

					<div className="grid gap-3 sm:grid-cols-2">
						<div className="space-y-1.5">
							<Label htmlFor="ft-tagline" className="text-xs">
								Footer Brand Tagline
							</Label>
							<Input
								id="ft-tagline"
								value={generalDraft.tagline}
								onChange={(e) =>
									setGeneralDraft({ ...generalDraft, tagline: e.target.value })
								}
								placeholder="Clarity from the highest ground."
								className="h-8 rounded-lg text-xs"
							/>
						</div>
						<div className="space-y-1.5">
							<Label htmlFor="ft-email" className="text-xs">
								Footer Contact Email
							</Label>
							<Input
								id="ft-email"
								value={generalDraft.contactEmail}
								onChange={(e) =>
									setGeneralDraft({
										...generalDraft,
										contactEmail: e.target.value,
									})
								}
								placeholder="contact@selim.solutions"
								className="h-8 rounded-lg text-xs"
							/>
						</div>
					</div>

					<div className="grid gap-3 sm:grid-cols-2">
						<div className="space-y-1.5">
							<Label htmlFor="ft-iso" className="text-xs">
								Footer ISO Badge Text
							</Label>
							<Input
								id="ft-iso"
								value={generalDraft.isoBadgeText}
								onChange={(e) =>
									setGeneralDraft({
										...generalDraft,
										isoBadgeText: e.target.value,
									})
								}
								placeholder="ISO/IEC 27001:2022 Certified"
								className="h-8 rounded-lg text-xs"
							/>
						</div>
						<div className="space-y-1.5">
							<Label htmlFor="ft-copy" className="text-xs">
								Footer Copyright Text
							</Label>
							<Input
								id="ft-copy"
								value={generalDraft.copyrightText}
								onChange={(e) =>
									setGeneralDraft({
										...generalDraft,
										copyrightText: e.target.value,
									})
								}
								placeholder="Selim Solutions. All rights reserved."
								className="h-8 rounded-lg text-xs"
							/>
						</div>
					</div>
				</div>

				<Button
					type="submit"
					size="sm"
					disabled={isSaving}
					className="rounded-lg active:scale-[0.97]"
				>
					<Save className="size-3.5" />
					<span>Save Appearance</span>
				</Button>
			</div>

			{/* Live Preview */}
			<div className="rounded-xl border border-border/80 bg-card p-4 lg:col-span-5">
				<div className="mb-3 font-semibold text-muted-foreground text-xs uppercase tracking-wider">
					Surface Preview
				</div>
				<div className="overflow-hidden rounded-xl border border-border bg-background p-3">
					{draft.showAnnouncementBar && (
						<div
							style={{ backgroundColor: draft.accentColor }}
							className="mb-2.5 truncate rounded-md px-2.5 py-1 text-center font-medium text-[10px] text-white"
						>
							{draft.announcementText || "ISO 27001 Certified Managed SOC"}
						</div>
					)}
					<div className="flex items-center justify-between border-border/70 border-b pb-2">
						<span className="font-semibold text-foreground text-xs">
							Selim Solutions
						</span>
						<span
							style={{ backgroundColor: draft.accentColor }}
							className="rounded-md px-2 py-0.5 font-medium text-[10px] text-white"
						>
							{draft.footerCtaLabel || "Get Assessment"}
						</span>
					</div>
					<div className="mt-3 space-y-1.5">
						<div className="truncate font-medium text-foreground text-xs">
							{draft.footerCtaTitle}
						</div>
						<div className="line-clamp-2 text-[11px] text-muted-foreground">
							{draft.footerCtaSubtitle}
						</div>
					</div>
				</div>
			</div>
		</form>
	);
}

export type NavLocation =
	| "HEADER_PRIMARY"
	| "MEGA_SERVICES"
	| "MEGA_SOLUTIONS"
	| "MEGA_RESOURCES"
	| "MEGA_COMPLIANCE"
	| "FOOTER_SERVICES"
	| "FOOTER_SOLUTIONS"
	| "FOOTER_COMPANY"
	| "FOOTER_LEGAL"
	| "FOOTER_SOCIALS";

export type ApiNavItem = {
	id: string;
	location: NavLocation;
	label: string;
	href: string;
	description: string | null;
	iconName: string | null;
	target: string;
	sortOrder: number;
	isVisible: boolean;
};

const LOCATION_LABELS: { value: NavLocation; label: string }[] = [
	{ value: "HEADER_PRIMARY", label: "Header Primary" },
	{ value: "MEGA_SERVICES", label: "Megamenu · Services" },
	{ value: "MEGA_SOLUTIONS", label: "Megamenu · Solutions" },
	{ value: "FOOTER_SERVICES", label: "Footer · Services" },
	{ value: "FOOTER_SOLUTIONS", label: "Footer · Solutions" },
	{ value: "FOOTER_COMPANY", label: "Footer · Company" },
	{ value: "FOOTER_LEGAL", label: "Footer · Legal" },
	{ value: "FOOTER_SOCIALS", label: "Footer · Socials" },
];

interface CmsMenusViewProps {
	items: ApiNavItem[];
	onUpsert: (payload: {
		id?: string;
		location: NavLocation;
		label: string;
		href: string;
		target: "_self" | "_blank";
		sortOrder: number;
		isVisible: boolean;
	}) => Promise<void>;
	onReorder: (items: { id: string; sortOrder: number }[]) => Promise<void>;
	onDelete: (id: string) => void;
}

export function CmsMenusView({
	items,
	onUpsert,
	onReorder,
	onDelete,
}: CmsMenusViewProps) {
	const [location, setLocation] = useState<NavLocation>("HEADER_PRIMARY");
	const [label, setLabel] = useState("");
	const [href, setHref] = useState("");
	const [edits, setEdits] = useState<
		Record<string, { label: string; href: string }>
	>({});

	const scoped = items
		.filter((i) => i.location === location)
		.sort((a, b) => a.sortOrder - b.sortOrder);

	const addItem = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!label.trim() || !href.trim()) return;
		await onUpsert({
			location,
			label: label.trim(),
			href: href.trim(),
			target:
				href.startsWith("http") || href.startsWith("mailto:")
					? "_blank"
					: "_self",
			sortOrder: scoped.length,
			isVisible: true,
		});
		setLabel("");
		setHref("");
	};

	const moveItem = async (index: number, direction: -1 | 1) => {
		const targetIndex = index + direction;
		if (targetIndex < 0 || targetIndex >= scoped.length) return;
		const copy = [...scoped];
		const [moved] = copy.splice(index, 1);
		copy.splice(targetIndex, 0, moved);
		await onReorder(copy.map((item, idx) => ({ id: item.id, sortOrder: idx })));
	};

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-wrap items-center justify-between gap-3">
				<select
					value={location}
					onChange={(e) => setLocation(e.target.value as NavLocation)}
					className="h-8 rounded-lg border border-input bg-background px-2.5 font-medium text-foreground text-xs"
				>
					{LOCATION_LABELS.map((loc) => (
						<option key={loc.value} value={loc.value}>
							{loc.label}
						</option>
					))}
				</select>
				<span className="text-muted-foreground text-xs tabular-nums">
					{scoped.length} links
				</span>
			</div>

			<form
				onSubmit={addItem}
				className="flex flex-wrap items-center gap-2 rounded-xl border border-border/80 bg-card p-3"
			>
				<Input
					value={label}
					onChange={(e) => setLabel(e.target.value)}
					placeholder="Link label"
					className="h-8 min-w-40 flex-1 rounded-lg text-xs"
				/>
				<Input
					value={href}
					onChange={(e) => setHref(e.target.value)}
					placeholder="Path (e.g. /services)"
					className="h-8 min-w-44 flex-1 rounded-lg font-mono text-xs"
				/>
				<Button
					type="submit"
					size="sm"
					className="h-8 rounded-lg px-3 active:scale-[0.97]"
				>
					<Plus className="size-3.5" />
					<span>Add Link</span>
				</Button>
			</form>

			<div className="divide-y divide-border/70 rounded-xl border border-border/80 bg-card">
				{scoped.length === 0 ? (
					<div className="py-8 text-center text-muted-foreground text-xs">
						No links in this menu location.
					</div>
				) : (
					scoped.map((item, idx) => {
						const draft = edits[item.id] ?? {
							label: item.label,
							href: item.href,
						};
						const dirty =
							draft.label !== item.label || draft.href !== item.href;

						return (
							<div
								key={item.id}
								className="flex flex-wrap items-center gap-2 px-3 py-2.5"
							>
								<Input
									value={draft.label}
									onChange={(e) =>
										setEdits((prev) => ({
											...prev,
											[item.id]: { ...draft, label: e.target.value },
										}))
									}
									className="h-8 min-w-36 flex-1 rounded-lg text-xs"
								/>
								<Input
									value={draft.href}
									onChange={(e) =>
										setEdits((prev) => ({
											...prev,
											[item.id]: { ...draft, href: e.target.value },
										}))
									}
									className="h-8 min-w-40 flex-1 rounded-lg font-mono text-xs"
								/>
								<div className="flex items-center gap-1">
									{dirty && (
										<Button
											type="button"
											size="xs"
											onClick={async () => {
												await onUpsert({
													id: item.id,
													location: item.location,
													label: draft.label,
													href: draft.href,
													target: item.target === "_blank" ? "_blank" : "_self",
													sortOrder: item.sortOrder,
													isVisible: item.isVisible,
												});
											}}
											className="rounded-md active:scale-[0.97]"
										>
											Save
										</Button>
									)}
									<Button
										type="button"
										variant="ghost"
										size="icon-xs"
										disabled={idx === 0}
										onClick={() => moveItem(idx, -1)}
										title="Move up"
										className="rounded-md active:scale-[0.97]"
									>
										<ArrowUp className="size-3.5" />
									</Button>
									<Button
										type="button"
										variant="ghost"
										size="icon-xs"
										disabled={idx === scoped.length - 1}
										onClick={() => moveItem(idx, 1)}
										title="Move down"
										className="rounded-md active:scale-[0.97]"
									>
										<ArrowDown className="size-3.5" />
									</Button>
									<Button
										type="button"
										variant="ghost"
										size="icon-xs"
										onClick={() => onDelete(item.id)}
										title="Remove"
										className="rounded-md text-muted-foreground hover:text-destructive active:scale-[0.97]"
									>
										<Trash2 className="size-3.5" />
									</Button>
								</div>
							</div>
						);
					})
				)}
			</div>
		</div>
	);
}

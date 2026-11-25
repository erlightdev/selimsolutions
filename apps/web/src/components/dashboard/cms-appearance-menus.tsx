import { Button } from "@selimsolutions/ui/components/button";
import { Checkbox } from "@selimsolutions/ui/components/checkbox";
import { Input } from "@selimsolutions/ui/components/input";
import { Label } from "@selimsolutions/ui/components/label";
import { ArrowDown, ArrowUp, Plus, Save, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import type { CmsAppearance, CmsMenuItem, MenuLocation } from "./cms-data";

const ACCENT_PRESETS = [
	{ label: "Brand Blue", value: "#0069eb" },
	{ label: "Royal Indigo", value: "#405cfe" },
	{ label: "Azure", value: "#007aff" },
	{ label: "Slate", value: "#52525b" },
];

interface CmsAppearanceViewProps {
	appearance: CmsAppearance;
	onSave: (next: CmsAppearance) => void;
}

export function CmsAppearanceView({
	appearance,
	onSave,
}: CmsAppearanceViewProps) {
	const [draft, setDraft] = useState<CmsAppearance>(appearance);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSave(draft);
		toast.success("Appearance settings saved.");
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
									defaultTheme: e.target.value as CmsAppearance["defaultTheme"],
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
										.value as CmsAppearance["containerWidth"],
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

				<Button
					type="submit"
					size="sm"
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
							className="mb-2.5 rounded-md px-2.5 py-1 text-center font-medium text-[10px] text-white"
						>
							ISO 27001 Certified Managed SOC
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
							Get Assessment
						</span>
					</div>
					<div className="mt-3 space-y-2">
						<div className="h-3 w-3/4 rounded bg-muted" />
						<div className="h-2.5 w-1/2 rounded bg-muted/70" />
					</div>
				</div>
			</div>
		</form>
	);
}

interface CmsMenusViewProps {
	menus: Record<MenuLocation, CmsMenuItem[]>;
	onUpdateMenus: (next: Record<MenuLocation, CmsMenuItem[]>) => void;
}

export function CmsMenusView({ menus, onUpdateMenus }: CmsMenusViewProps) {
	const [location, setLocation] = useState<MenuLocation>("header");
	const [label, setLabel] = useState("");
	const [href, setHref] = useState("");

	const items = menus[location];

	const addItem = (e: React.FormEvent) => {
		e.preventDefault();
		if (!label.trim() || !href.trim()) return;
		const nextItem: CmsMenuItem = {
			id: `menu-${Date.now()}`,
			label: label.trim(),
			href: href.trim(),
			target: "_self",
		};
		onUpdateMenus({ ...menus, [location]: [...items, nextItem] });
		setLabel("");
		setHref("");
		toast.success("Menu link added.");
	};

	const moveItem = (index: number, direction: -1 | 1) => {
		const targetIndex = index + direction;
		if (targetIndex < 0 || targetIndex >= items.length) return;
		const copy = [...items];
		const [moved] = copy.splice(index, 1);
		copy.splice(targetIndex, 0, moved);
		onUpdateMenus({ ...menus, [location]: copy });
	};

	const updateField = (id: string, field: "label" | "href", value: string) => {
		onUpdateMenus({
			...menus,
			[location]: items.map((item) =>
				item.id === id ? { ...item, [field]: value } : item,
			),
		});
	};

	const removeItem = (id: string) => {
		onUpdateMenus({
			...menus,
			[location]: items.filter((item) => item.id !== id),
		});
		toast.success("Menu item removed.");
	};

	return (
		<div className="flex flex-col gap-4">
			<div className="flex flex-wrap items-center justify-between gap-3">
				<div className="flex items-center gap-1 rounded-lg border border-border/80 bg-muted/40 p-0.5">
					{(["header", "footer"] as const).map((loc) => (
						<button
							key={loc}
							type="button"
							onClick={() => setLocation(loc)}
							className={`rounded-md px-3 py-1 font-medium text-xs capitalize transition-[background-color,color,transform] duration-150 active:scale-[0.97] ${
								location === loc
									? "bg-background text-foreground shadow-2xs"
									: "text-muted-foreground hover:text-foreground"
							}`}
						>
							{loc} Menu
						</button>
					))}
				</div>
				<span className="text-muted-foreground text-xs tabular-nums">
					{items.length} links
				</span>
			</div>

			<form
				onSubmit={addItem}
				className="flex flex-wrap items-center gap-2 rounded-xl border border-border/80 bg-card p-3"
			>
				<Input
					value={label}
					onChange={(e) => setLabel(e.target.value)}
					placeholder="Link label (e.g. Case Studies)"
					className="h-8 min-w-40 flex-1 rounded-lg text-xs"
				/>
				<Input
					value={href}
					onChange={(e) => setHref(e.target.value)}
					placeholder="Path (e.g. /case-studies)"
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
				{items.map((item, idx) => (
					<div
						key={item.id}
						className="flex flex-wrap items-center gap-2 px-3 py-2.5"
					>
						<Input
							value={item.label}
							onChange={(e) => updateField(item.id, "label", e.target.value)}
							className="h-8 min-w-36 flex-1 rounded-lg text-xs"
						/>
						<Input
							value={item.href}
							onChange={(e) => updateField(item.id, "href", e.target.value)}
							className="h-8 min-w-40 flex-1 rounded-lg font-mono text-xs"
						/>
						<div className="flex items-center gap-1">
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
								disabled={idx === items.length - 1}
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
								onClick={() => removeItem(item.id)}
								title="Remove"
								className="rounded-md text-muted-foreground hover:text-destructive active:scale-[0.97]"
							>
								<Trash2 className="size-3.5" />
							</Button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

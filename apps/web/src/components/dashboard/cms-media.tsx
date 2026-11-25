import { Badge } from "@selimsolutions/ui/components/badge";
import { Button } from "@selimsolutions/ui/components/button";
import { Input } from "@selimsolutions/ui/components/input";
import {
	Copy,
	FileVideo,
	Image as ImageIcon,
	Plus,
	Trash2,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import type { CmsMediaItem } from "./cms-data";

interface CmsMediaProps {
	media: CmsMediaItem[];
	searchQuery: string;
	onAddMedia: (item: CmsMediaItem) => void;
	onDeleteMedia: (id: string) => void;
}

export function CmsMedia({
	media,
	searchQuery,
	onAddMedia,
	onDeleteMedia,
}: CmsMediaProps) {
	const [name, setName] = useState("");
	const [url, setUrl] = useState("");

	const filtered = media.filter((item) => {
		const q = searchQuery.trim().toLowerCase();
		return (
			!q ||
			item.name.toLowerCase().includes(q) ||
			item.url.toLowerCase().includes(q)
		);
	});

	const handleAdd = (e: React.FormEvent) => {
		e.preventDefault();
		if (!name.trim() || !url.trim()) return;
		onAddMedia({
			id: `med-${Date.now()}`,
			name: name.trim(),
			url: url.trim(),
			type: url.endsWith(".mp4") ? "video" : "image",
			size: "120 KB",
			uploadedAt: "Just now",
		});
		setName("");
		setUrl("");
		toast.success("Media asset added.");
	};

	const copyUrl = (assetUrl: string) => {
		navigator.clipboard?.writeText(assetUrl);
		toast.success("Asset URL copied.");
	};

	return (
		<div className="flex flex-col gap-4">
			<form
				onSubmit={handleAdd}
				className="flex flex-wrap items-center gap-2 rounded-xl border border-border/80 bg-card p-3"
			>
				<Input
					value={name}
					onChange={(e) => setName(e.target.value)}
					placeholder="Asset filename (e.g. soc-diagram.svg)"
					className="h-8 min-w-44 flex-1 rounded-lg text-xs"
				/>
				<Input
					value={url}
					onChange={(e) => setUrl(e.target.value)}
					placeholder="URL or path (e.g. /assets/soc-diagram.svg)"
					className="h-8 min-w-52 flex-1 rounded-lg font-mono text-xs"
				/>
				<Button
					type="submit"
					size="sm"
					className="h-8 rounded-lg px-3 active:scale-[0.97]"
				>
					<Plus className="size-3.5" />
					<span>Add Asset</span>
				</Button>
			</form>

			<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
				{filtered.map((item) => (
					<div
						key={item.id}
						className="flex flex-col justify-between rounded-xl border border-border/80 bg-card p-3"
					>
						<div className="flex h-28 items-center justify-center overflow-hidden rounded-lg border border-border/60 bg-muted/40 p-3">
							{item.type === "video" ? (
								<FileVideo className="size-8 text-muted-foreground" />
							) : item.url.endsWith(".svg") ? (
								<img
									src={item.url}
									alt={item.name}
									className="max-h-full max-w-full object-contain"
								/>
							) : (
								<ImageIcon className="size-8 text-muted-foreground" />
							)}
						</div>

						<div className="mt-3">
							<div className="truncate font-medium text-foreground text-xs">
								{item.name}
							</div>
							<div className="mt-0.5 flex items-center justify-between text-[11px] text-muted-foreground">
								<span className="tabular-nums">{item.size}</span>
								<Badge
									variant="outline"
									className="rounded px-1 py-0 text-[10px]"
								>
									{item.type}
								</Badge>
							</div>
						</div>

						<div className="mt-3 flex items-center justify-end gap-1 border-border/60 border-t pt-2">
							<Button
								variant="ghost"
								size="icon-xs"
								onClick={() => copyUrl(item.url)}
								title="Copy URL"
								className="rounded-md active:scale-[0.97]"
							>
								<Copy className="size-3" />
							</Button>
							<Button
								variant="ghost"
								size="icon-xs"
								onClick={() => onDeleteMedia(item.id)}
								title="Delete"
								className="rounded-md text-muted-foreground hover:text-destructive active:scale-[0.97]"
							>
								<Trash2 className="size-3" />
							</Button>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

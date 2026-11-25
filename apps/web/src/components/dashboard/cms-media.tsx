import { env } from "@selimsolutions/env/web";
import { Badge } from "@selimsolutions/ui/components/badge";
import { Button } from "@selimsolutions/ui/components/button";
import { Input } from "@selimsolutions/ui/components/input";
import {
	Check,
	Copy,
	Edit3,
	FileText,
	FileVideo,
	Image as ImageIcon,
	Link2,
	Plus,
	Trash2,
	Upload,
	X,
} from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

export type ApiMediaItem = {
	id: string;
	name: string;
	url: string;
	type: "IMAGE" | "VIDEO" | "DOCUMENT";
	mimeType: string;
	sizeLabel: string;
	altText: string | null;
};

interface CmsMediaProps {
	media: ApiMediaItem[];
	searchQuery: string;
	onUploadComplete: () => void;
	onAddMedia: (payload: {
		name: string;
		url: string;
		type: "IMAGE" | "VIDEO" | "DOCUMENT";
		mimeType: string;
		sizeLabel: string;
	}) => Promise<void>;
	onUpdateMedia: (payload: {
		id: string;
		name: string;
		altText: string | null;
	}) => Promise<void>;
	onDeleteMedia: (id: string) => void;
}

function fileToBase64(file: File): Promise<string> {
	return new Promise((resolve, reject) => {
		const reader = new FileReader();
		reader.onload = () => {
			const result = String(reader.result || "");
			const commaIdx = result.indexOf(",");
			resolve(commaIdx >= 0 ? result.slice(commaIdx + 1) : result);
		};
		reader.onerror = () => reject(reader.error);
		reader.readAsDataURL(file);
	});
}

export function CmsMedia({
	media,
	searchQuery,
	onUploadComplete,
	onAddMedia,
	onUpdateMedia,
	onDeleteMedia,
}: CmsMediaProps) {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [typeFilter, setTypeFilter] = useState<
		"ALL" | "IMAGE" | "VIDEO" | "DOCUMENT"
	>("ALL");
	const [isUploading, setIsUploading] = useState(false);
	const [isDragging, setIsDragging] = useState(false);
	const [showUrlForm, setShowUrlForm] = useState(false);
	const [name, setName] = useState("");
	const [url, setUrl] = useState("");
	const [editingId, setEditingId] = useState<string | null>(null);
	const [editName, setEditName] = useState("");
	const [editAlt, setEditAlt] = useState("");

	const filtered = media.filter((item) => {
		const matchesType = typeFilter === "ALL" || item.type === typeFilter;
		const q = searchQuery.trim().toLowerCase();
		const matchesQuery =
			!q ||
			item.name.toLowerCase().includes(q) ||
			item.url.toLowerCase().includes(q) ||
			(item.altText ?? "").toLowerCase().includes(q);
		return matchesType && matchesQuery;
	});

	const uploadFiles = async (files: FileList | File[]) => {
		const list = Array.from(files);
		if (list.length === 0) return;

		setIsUploading(true);
		try {
			for (const file of list) {
				if (file.size > 10 * 1024 * 1024) {
					toast.error(`${file.name} exceeds 10 MB limit.`);
					continue;
				}
				const dataBase64 = await fileToBase64(file);
				const res = await fetch(`${env.VITE_SERVER_URL}/api/cms/upload`, {
					method: "POST",
					credentials: "include",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify({
						filename: file.name,
						mimeType: file.type || "application/octet-stream",
						dataBase64,
					}),
				});
				if (!res.ok) {
					const err = (await res.json().catch(() => ({}))) as {
						error?: string;
					};
					throw new Error(err.error || `Failed to upload ${file.name}`);
				}
			}
			onUploadComplete();
			toast.success(
				list.length === 1
					? "File uploaded to Media Library."
					: `${list.length} files uploaded.`,
			);
		} catch (error) {
			toast.error(error instanceof Error ? error.message : "Upload failed.");
		} finally {
			setIsUploading(false);
		}
	};

	const handleAddUrl = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!name.trim() || !url.trim()) return;
		const cleanUrl = url.trim();
		const isVideo = /\.(mp4|webm|mov)$/i.test(cleanUrl);
		const isDoc = /\.(pdf|docx?|txt)$/i.test(cleanUrl);
		await onAddMedia({
			name: name.trim(),
			url: cleanUrl,
			type: isVideo ? "VIDEO" : isDoc ? "DOCUMENT" : "IMAGE",
			mimeType: isVideo
				? "video/mp4"
				: isDoc
					? "application/pdf"
					: "image/jpeg",
			sizeLabel: "External",
		});
		setName("");
		setUrl("");
		setShowUrlForm(false);
	};

	const copyUrl = (assetUrl: string) => {
		navigator.clipboard?.writeText(assetUrl);
		toast.success("Asset URL copied.");
	};

	return (
		<div className="flex flex-col gap-4">
			{/* Upload Dropzone & Controls */}
			<section
				aria-label="Media upload dropzone"
				onDragOver={(e) => {
					e.preventDefault();
					setIsDragging(true);
				}}
				onDragLeave={() => setIsDragging(false)}
				onDrop={(e) => {
					e.preventDefault();
					setIsDragging(false);
					if (e.dataTransfer.files.length > 0) {
						void uploadFiles(e.dataTransfer.files);
					}
				}}
				className={`flex flex-wrap items-center justify-between gap-3 rounded-xl border border-dashed p-4 transition-colors duration-150 ${
					isDragging
						? "border-primary bg-primary/5"
						: "border-border/80 bg-card/60"
				}`}
			>
				<div className="flex items-center gap-3">
					<span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
						<Upload className="size-4" />
					</span>
					<div>
						<div className="font-medium text-foreground text-xs">
							{isUploading
								? "Uploading to server..."
								: "Drop files here or browse"}
						</div>
						<div className="text-[11px] text-muted-foreground">
							PNG, JPG, SVG, WebP, MP4, or PDF up to 10 MB
						</div>
					</div>
				</div>

				<div className="flex items-center gap-2">
					<input
						ref={fileInputRef}
						type="file"
						multiple
						accept="image/*,video/mp4,video/webm,.pdf"
						className="hidden"
						onChange={(e) => {
							if (e.target.files) {
								void uploadFiles(e.target.files);
								e.target.value = "";
							}
						}}
					/>
					<Button
						type="button"
						variant="outline"
						size="sm"
						onClick={() => setShowUrlForm((v) => !v)}
						className="h-8 rounded-lg px-2.5 active:scale-[0.97]"
					>
						<Link2 className="size-3.5" />
						<span>Add URL</span>
					</Button>
					<Button
						type="button"
						size="sm"
						disabled={isUploading}
						onClick={() => fileInputRef.current?.click()}
						className="h-8 rounded-lg px-3 active:scale-[0.97]"
					>
						<Upload className="size-3.5" />
						<span>{isUploading ? "Uploading..." : "Upload File"}</span>
					</Button>
				</div>
			</section>

			{showUrlForm && (
				<form
					onSubmit={handleAddUrl}
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
						placeholder="https://... or /assets/..."
						className="h-8 min-w-52 flex-1 rounded-lg font-mono text-xs"
					/>
					<Button
						type="submit"
						size="sm"
						className="h-8 rounded-lg px-3 active:scale-[0.97]"
					>
						<Plus className="size-3.5" />
						<span>Save</span>
					</Button>
				</form>
			)}

			{/* Type Filter */}
			<div className="flex items-center justify-between gap-2">
				<div className="flex items-center gap-1 rounded-lg border border-border/80 bg-muted/40 p-0.5">
					{(["ALL", "IMAGE", "VIDEO", "DOCUMENT"] as const).map((t) => (
						<button
							key={t}
							type="button"
							onClick={() => setTypeFilter(t)}
							className={`rounded-md px-2.5 py-1 font-medium text-xs capitalize transition-[background-color,color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] ${
								typeFilter === t
									? "bg-background text-foreground shadow-2xs"
									: "text-muted-foreground hover:text-foreground"
							}`}
						>
							{t === "ALL" ? "All" : `${t.toLowerCase()}s`}
						</button>
					))}
				</div>
				<span className="text-muted-foreground text-xs tabular-nums">
					{filtered.length} assets
				</span>
			</div>

			{/* Asset Grid */}
			{filtered.length === 0 ? (
				<div className="rounded-xl border border-border/80 bg-card py-12 text-center text-muted-foreground text-xs">
					No media assets found. Upload a file or add an external URL above.
				</div>
			) : (
				<div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
					{filtered.map((item) => {
						const isEditing = editingId === item.id;
						return (
							<div
								key={item.id}
								className="flex flex-col justify-between rounded-xl border border-border/80 bg-card p-3"
							>
								<div className="flex h-32 items-center justify-center overflow-hidden rounded-lg border border-border/60 bg-muted/40 p-2">
									{item.type === "VIDEO" ? (
										<FileVideo className="size-8 text-muted-foreground" />
									) : item.type === "DOCUMENT" ? (
										<FileText className="size-8 text-muted-foreground" />
									) : item.url ? (
										<img
											src={item.url}
											alt={item.altText || item.name}
											className="max-h-full max-w-full rounded object-contain"
										/>
									) : (
										<ImageIcon className="size-8 text-muted-foreground" />
									)}
								</div>

								{isEditing ? (
									<div className="mt-3 space-y-1.5">
										<Input
											value={editName}
											onChange={(e) => setEditName(e.target.value)}
											placeholder="Name"
											className="h-7 rounded-md text-xs"
										/>
										<Input
											value={editAlt}
											onChange={(e) => setEditAlt(e.target.value)}
											placeholder="Alt text"
											className="h-7 rounded-md text-xs"
										/>
										<div className="flex justify-end gap-1 pt-1">
											<Button
												type="button"
												variant="ghost"
												size="icon-xs"
												onClick={() => setEditingId(null)}
												className="rounded-md"
											>
												<X className="size-3" />
											</Button>
											<Button
												type="button"
												size="icon-xs"
												onClick={async () => {
													if (!editName.trim()) return;
													await onUpdateMedia({
														id: item.id,
														name: editName.trim(),
														altText: editAlt.trim() || null,
													});
													setEditingId(null);
												}}
												className="rounded-md"
											>
												<Check className="size-3" />
											</Button>
										</div>
									</div>
								) : (
									<>
										<div className="mt-3">
											<div className="truncate font-medium text-foreground text-xs">
												{item.name}
											</div>
											<div className="mt-0.5 flex items-center justify-between text-[11px] text-muted-foreground">
												<span className="tabular-nums">{item.sizeLabel}</span>
												<Badge
													variant="outline"
													className="rounded px-1 py-0 text-[10px]"
												>
													{item.type.toLowerCase()}
												</Badge>
											</div>
										</div>

										<div className="mt-3 flex items-center justify-end gap-1 border-border/60 border-t pt-2">
											<Button
												variant="ghost"
												size="icon-xs"
												onClick={() => {
													setEditingId(item.id);
													setEditName(item.name);
													setEditAlt(item.altText ?? "");
												}}
												title="Edit details"
												className="rounded-md active:scale-[0.97]"
											>
												<Edit3 className="size-3" />
											</Button>
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
									</>
								)}
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}

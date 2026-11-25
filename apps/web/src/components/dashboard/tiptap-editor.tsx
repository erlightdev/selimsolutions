import { Button } from "@selimsolutions/ui/components/button";
import { Input } from "@selimsolutions/ui/components/input";
import { cn } from "@selimsolutions/ui/lib/utils";
import { CharacterCount } from "@tiptap/extension-character-count";
import { Highlight } from "@tiptap/extension-highlight";
import { Image } from "@tiptap/extension-image";
import { Link } from "@tiptap/extension-link";
import { Placeholder } from "@tiptap/extension-placeholder";
import {
	Table,
	TableCell,
	TableHeader,
	TableRow,
} from "@tiptap/extension-table";
import { TaskItem } from "@tiptap/extension-task-item";
import { TaskList } from "@tiptap/extension-task-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Color, TextStyle } from "@tiptap/extension-text-style";
import { Underline } from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import {
	AlignCenter,
	AlignLeft,
	AlignRight,
	Bold,
	CheckSquare,
	Code,
	Code2,
	Heading1,
	Heading2,
	Heading3,
	Highlighter,
	Image as ImageIcon,
	Italic,
	Link2,
	List,
	ListOrdered,
	Minus,
	Quote,
	Redo2,
	Strikethrough,
	Table as TableIcon,
	Trash2,
	Underline as UnderlineIcon,
	Undo2,
} from "lucide-react";
import { useEffect, useState } from "react";

interface TiptapEditorProps {
	value: string;
	onChange: (html: string) => void;
	placeholder?: string;
}

function ToolbarButton({
	active = false,
	disabled = false,
	onClick,
	title,
	children,
}: {
	active?: boolean;
	disabled?: boolean;
	onClick: () => void;
	title: string;
	children: React.ReactNode;
}) {
	return (
		<button
			type="button"
			disabled={disabled}
			onClick={onClick}
			title={title}
			aria-label={title}
			aria-pressed={active}
			className={cn(
				"inline-flex size-7 items-center justify-center rounded-md text-muted-foreground outline-none",
				"transition-[background-color,color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]",
				"hover:bg-muted hover:text-foreground active:scale-[0.95] disabled:pointer-events-none disabled:opacity-40",
				active &&
					"bg-primary/15 text-primary hover:bg-primary/20 hover:text-primary",
			)}
		>
			{children}
		</button>
	);
}

function ToolbarDivider() {
	return <span className="mx-1 h-4 w-px shrink-0 bg-border/80" />;
}

export function TiptapEditor({
	value,
	onChange,
	placeholder = "Start writing...",
}: TiptapEditorProps) {
	const [linkOpen, setLinkOpen] = useState(false);
	const [linkUrl, setLinkUrl] = useState("");
	const [imageOpen, setImageOpen] = useState(false);
	const [imageUrl, setImageUrl] = useState("");

	const editor = useEditor({
		extensions: [
			StarterKit.configure({
				heading: { levels: [1, 2, 3] },
			}),
			Underline,
			TextStyle,
			Color,
			Highlight.configure({ multicolor: true }),
			Link.configure({
				openOnClick: false,
				autolink: true,
				defaultProtocol: "https",
			}),
			Image.configure({
				HTMLAttributes: {
					class: "rounded-lg max-w-full h-auto border border-border/60 my-3",
				},
			}),
			TextAlign.configure({
				types: ["heading", "paragraph"],
			}),
			TaskList,
			TaskItem.configure({
				nested: true,
			}),
			Table.configure({
				resizable: true,
			}),
			TableRow,
			TableHeader,
			TableCell,
			Placeholder.configure({
				placeholder,
			}),
			CharacterCount,
		],
		content: value,
		onUpdate: ({ editor: instance }) => {
			onChange(instance.getHTML());
		},
		editorProps: {
			attributes: {
				class:
					"tiptap min-h-[260px] w-full px-4 py-3 text-sm leading-relaxed text-foreground outline-none",
			},
		},
	});

	useEffect(() => {
		if (editor && value !== editor.getHTML()) {
			editor.commands.setContent(value, { emitUpdate: false });
		}
	}, [editor, value]);

	if (!editor) {
		return (
			<div className="min-h-[320px] rounded-xl border border-input bg-background/50" />
		);
	}

	const applyLink = () => {
		const url = linkUrl.trim();
		if (!url) {
			editor.chain().focus().extendMarkRange("link").unsetLink().run();
		} else {
			editor
				.chain()
				.focus()
				.extendMarkRange("link")
				.setLink({ href: url })
				.run();
		}
		setLinkUrl("");
		setLinkOpen(false);
	};

	const applyImage = () => {
		const url = imageUrl.trim();
		if (url) {
			editor.chain().focus().setImage({ src: url }).run();
		}
		setImageUrl("");
		setImageOpen(false);
	};

	const words = editor.storage.characterCount?.words?.() ?? 0;
	const characters = editor.storage.characterCount?.characters?.() ?? 0;

	return (
		<div className="overflow-hidden rounded-xl border border-input bg-background/40">
			{/* Toolbar */}
			<div className="flex flex-wrap items-center gap-0.5 border-border/80 border-b bg-muted/30 px-2 py-1.5">
				<ToolbarButton
					title="Undo"
					disabled={!editor.can().undo()}
					onClick={() => editor.chain().focus().undo().run()}
				>
					<Undo2 className="size-3.5" />
				</ToolbarButton>
				<ToolbarButton
					title="Redo"
					disabled={!editor.can().redo()}
					onClick={() => editor.chain().focus().redo().run()}
				>
					<Redo2 className="size-3.5" />
				</ToolbarButton>

				<ToolbarDivider />

				<ToolbarButton
					title="Heading 1"
					active={editor.isActive("heading", { level: 1 })}
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 1 }).run()
					}
				>
					<Heading1 className="size-3.5" />
				</ToolbarButton>
				<ToolbarButton
					title="Heading 2"
					active={editor.isActive("heading", { level: 2 })}
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 2 }).run()
					}
				>
					<Heading2 className="size-3.5" />
				</ToolbarButton>
				<ToolbarButton
					title="Heading 3"
					active={editor.isActive("heading", { level: 3 })}
					onClick={() =>
						editor.chain().focus().toggleHeading({ level: 3 }).run()
					}
				>
					<Heading3 className="size-3.5" />
				</ToolbarButton>

				<ToolbarDivider />

				<ToolbarButton
					title="Bold"
					active={editor.isActive("bold")}
					onClick={() => editor.chain().focus().toggleBold().run()}
				>
					<Bold className="size-3.5" />
				</ToolbarButton>
				<ToolbarButton
					title="Italic"
					active={editor.isActive("italic")}
					onClick={() => editor.chain().focus().toggleItalic().run()}
				>
					<Italic className="size-3.5" />
				</ToolbarButton>
				<ToolbarButton
					title="Underline"
					active={editor.isActive("underline")}
					onClick={() => editor.chain().focus().toggleUnderline().run()}
				>
					<UnderlineIcon className="size-3.5" />
				</ToolbarButton>
				<ToolbarButton
					title="Strikethrough"
					active={editor.isActive("strike")}
					onClick={() => editor.chain().focus().toggleStrike().run()}
				>
					<Strikethrough className="size-3.5" />
				</ToolbarButton>
				<ToolbarButton
					title="Highlight"
					active={editor.isActive("highlight")}
					onClick={() => editor.chain().focus().toggleHighlight().run()}
				>
					<Highlighter className="size-3.5" />
				</ToolbarButton>
				<ToolbarButton
					title="Inline Code"
					active={editor.isActive("code")}
					onClick={() => editor.chain().focus().toggleCode().run()}
				>
					<Code className="size-3.5" />
				</ToolbarButton>

				<ToolbarDivider />

				<ToolbarButton
					title="Align Left"
					active={editor.isActive({ textAlign: "left" })}
					onClick={() => editor.chain().focus().setTextAlign("left").run()}
				>
					<AlignLeft className="size-3.5" />
				</ToolbarButton>
				<ToolbarButton
					title="Align Center"
					active={editor.isActive({ textAlign: "center" })}
					onClick={() => editor.chain().focus().setTextAlign("center").run()}
				>
					<AlignCenter className="size-3.5" />
				</ToolbarButton>
				<ToolbarButton
					title="Align Right"
					active={editor.isActive({ textAlign: "right" })}
					onClick={() => editor.chain().focus().setTextAlign("right").run()}
				>
					<AlignRight className="size-3.5" />
				</ToolbarButton>

				<ToolbarDivider />

				<ToolbarButton
					title="Bullet List"
					active={editor.isActive("bulletList")}
					onClick={() => editor.chain().focus().toggleBulletList().run()}
				>
					<List className="size-3.5" />
				</ToolbarButton>
				<ToolbarButton
					title="Ordered List"
					active={editor.isActive("orderedList")}
					onClick={() => editor.chain().focus().toggleOrderedList().run()}
				>
					<ListOrdered className="size-3.5" />
				</ToolbarButton>
				<ToolbarButton
					title="Task List"
					active={editor.isActive("taskList")}
					onClick={() => editor.chain().focus().toggleTaskList().run()}
				>
					<CheckSquare className="size-3.5" />
				</ToolbarButton>
				<ToolbarButton
					title="Blockquote"
					active={editor.isActive("blockquote")}
					onClick={() => editor.chain().focus().toggleBlockquote().run()}
				>
					<Quote className="size-3.5" />
				</ToolbarButton>
				<ToolbarButton
					title="Code Block"
					active={editor.isActive("codeBlock")}
					onClick={() => editor.chain().focus().toggleCodeBlock().run()}
				>
					<Code2 className="size-3.5" />
				</ToolbarButton>
				<ToolbarButton
					title="Divider"
					onClick={() => editor.chain().focus().setHorizontalRule().run()}
				>
					<Minus className="size-3.5" />
				</ToolbarButton>

				<ToolbarDivider />

				<ToolbarButton
					title="Insert Link"
					active={editor.isActive("link") || linkOpen}
					onClick={() => {
						setImageOpen(false);
						setLinkUrl(editor.getAttributes("link").href || "");
						setLinkOpen((prev) => !prev);
					}}
				>
					<Link2 className="size-3.5" />
				</ToolbarButton>
				<ToolbarButton
					title="Insert Image"
					active={imageOpen}
					onClick={() => {
						setLinkOpen(false);
						setImageOpen((prev) => !prev);
					}}
				>
					<ImageIcon className="size-3.5" />
				</ToolbarButton>
				<ToolbarButton
					title="Insert Table"
					active={editor.isActive("table")}
					onClick={() =>
						editor
							.chain()
							.focus()
							.insertTable({ rows: 3, cols: 3, withHeaderRow: true })
							.run()
					}
				>
					<TableIcon className="size-3.5" />
				</ToolbarButton>
				{editor.isActive("table") && (
					<ToolbarButton
						title="Delete Table"
						onClick={() => editor.chain().focus().deleteTable().run()}
					>
						<Trash2 className="size-3.5 text-destructive" />
					</ToolbarButton>
				)}
			</div>

			{/* Inline Link Bar */}
			{linkOpen && (
				<div className="flex items-center gap-2 border-border/70 border-b bg-muted/20 px-3 py-2">
					<Input
						value={linkUrl}
						onChange={(e) => setLinkUrl(e.target.value)}
						placeholder="https://selim.solutions/..."
						className="h-7 flex-1 rounded-md text-xs"
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								e.preventDefault();
								applyLink();
							}
						}}
					/>
					<Button
						type="button"
						size="xs"
						onClick={applyLink}
						className="rounded-md active:scale-[0.97]"
					>
						Apply
					</Button>
				</div>
			)}

			{/* Inline Image Bar */}
			{imageOpen && (
				<div className="flex items-center gap-2 border-border/70 border-b bg-muted/20 px-3 py-2">
					<Input
						value={imageUrl}
						onChange={(e) => setImageUrl(e.target.value)}
						placeholder="Image URL (e.g. /selim-logo-white.svg)"
						className="h-7 flex-1 rounded-md text-xs"
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								e.preventDefault();
								applyImage();
							}
						}}
					/>
					<Button
						type="button"
						size="xs"
						onClick={applyImage}
						className="rounded-md active:scale-[0.97]"
					>
						Insert
					</Button>
				</div>
			)}

			{/* Editor Canvas */}
			<EditorContent editor={editor} />

			{/* Footer Status */}
			<div className="flex items-center justify-between border-border/70 border-t bg-muted/20 px-3 py-1.5 text-[11px] text-muted-foreground tabular-nums">
				<span>TipTap Rich Text</span>
				<span>
					{words} words · {characters} chars
				</span>
			</div>
		</div>
	);
}

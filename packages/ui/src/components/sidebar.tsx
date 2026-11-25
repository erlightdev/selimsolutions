"use client";

import { Button } from "@selimsolutions/ui/components/button";
import { Separator } from "@selimsolutions/ui/components/separator";
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from "@selimsolutions/ui/components/tooltip";
import { useIsMobile } from "@selimsolutions/ui/hooks/use-mobile";
import { cn } from "@selimsolutions/ui/lib/utils";
import { PanelLeftIcon, XIcon } from "lucide-react";
import * as React from "react";

const SIDEBAR_COOKIE_NAME = "sidebar_state";
const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
const SIDEBAR_WIDTH = "15.5rem";
const SIDEBAR_WIDTH_MOBILE = "17rem";
const SIDEBAR_WIDTH_ICON = "3.25rem";
const SIDEBAR_KEYBOARD_SHORTCUT = "b";

type SidebarContextProps = {
	state: "expanded" | "collapsed";
	open: boolean;
	setOpen: (open: boolean | ((value: boolean) => boolean)) => void;
	openMobile: boolean;
	setOpenMobile: (open: boolean | ((value: boolean) => boolean)) => void;
	isMobile: boolean;
	toggleSidebar: () => void;
};

const SidebarContext = React.createContext<SidebarContextProps | null>(null);

function useSidebar() {
	const context = React.useContext(SidebarContext);
	if (!context) {
		throw new Error("useSidebar must be used within a SidebarProvider.");
	}
	return context;
}

function SidebarProvider({
	defaultOpen = true,
	open: openProp,
	onOpenChange: setOpenProp,
	className,
	style,
	children,
	...props
}: React.ComponentProps<"div"> & {
	defaultOpen?: boolean;
	open?: boolean;
	onOpenChange?: (open: boolean) => void;
}) {
	const isMobile = useIsMobile();
	const [openMobile, setOpenMobile] = React.useState(false);
	const [_open, _setOpen] = React.useState(defaultOpen);
	const open = openProp ?? _open;

	const setOpen = React.useCallback(
		(value: boolean | ((value: boolean) => boolean)) => {
			const openState = typeof value === "function" ? value(open) : value;
			if (setOpenProp) {
				setOpenProp(openState);
			} else {
				_setOpen(openState);
			}
			document.cookie = `${SIDEBAR_COOKIE_NAME}=${openState}; path=/; max-age=${SIDEBAR_COOKIE_MAX_AGE}`;
		},
		[setOpenProp, open],
	);

	const toggleSidebar = React.useCallback(() => {
		return isMobile ? setOpenMobile((prev) => !prev) : setOpen((prev) => !prev);
	}, [isMobile, setOpen]);

	React.useEffect(() => {
		const handleKeyDown = (event: KeyboardEvent) => {
			if (
				event.key === SIDEBAR_KEYBOARD_SHORTCUT &&
				(event.metaKey || event.ctrlKey)
			) {
				event.preventDefault();
				toggleSidebar();
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [toggleSidebar]);

	const state = open ? "expanded" : "collapsed";

	const contextValue = React.useMemo<SidebarContextProps>(
		() => ({
			state,
			open,
			setOpen,
			isMobile,
			openMobile,
			setOpenMobile,
			toggleSidebar,
		}),
		[state, open, setOpen, isMobile, openMobile, toggleSidebar],
	);

	return (
		<SidebarContext.Provider value={contextValue}>
			<TooltipProvider delay={300}>
				<div
					data-slot="sidebar-wrapper"
					style={
						{
							"--sidebar-width": SIDEBAR_WIDTH,
							"--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
							...style,
						} as React.CSSProperties
					}
					className={cn(
						"group/sidebar-wrapper flex min-h-svh w-full has-data-[variant=inset]:bg-sidebar",
						className,
					)}
					{...props}
				>
					{children}
				</div>
			</TooltipProvider>
		</SidebarContext.Provider>
	);
}

function Sidebar({
	side = "left",
	variant = "inset",
	collapsible = "icon",
	className,
	children,
	...props
}: React.ComponentProps<"div"> & {
	side?: "left" | "right";
	variant?: "sidebar" | "floating" | "inset";
	collapsible?: "offcanvas" | "icon" | "none";
}) {
	const { isMobile, state, openMobile, setOpenMobile } = useSidebar();

	if (collapsible === "none") {
		return (
			<div
				data-slot="sidebar"
				className={cn(
					"flex h-full w-(--sidebar-width) flex-col bg-sidebar text-sidebar-foreground",
					className,
				)}
				{...props}
			>
				{children}
			</div>
		);
	}

	if (isMobile) {
		return (
			<>
				{openMobile && (
					<div
						className="fixed inset-0 z-50 bg-black/60 backdrop-blur-[2px] transition-opacity duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]"
						onClick={() => setOpenMobile(false)}
						aria-hidden="true"
					/>
				)}
				<aside
					data-slot="sidebar"
					data-mobile="true"
					aria-hidden={!openMobile}
					style={
						{
							"--sidebar-width": SIDEBAR_WIDTH_MOBILE,
						} as React.CSSProperties
					}
					className={cn(
						"fixed inset-y-0 left-0 z-50 flex h-svh w-(--sidebar-width) flex-col border-sidebar-border border-r bg-sidebar text-sidebar-foreground shadow-2xl",
						"transition-transform duration-250 ease-[cubic-bezier(0.32,0.72,0,1)]",
						openMobile
							? "translate-x-0"
							: "pointer-events-none -translate-x-full",
						className,
					)}
					{...props}
				>
					<Button
						type="button"
						variant="ghost"
						size="icon-sm"
						onClick={() => setOpenMobile(false)}
						className="absolute top-3 right-3 z-10 rounded-lg text-muted-foreground hover:text-foreground active:scale-[0.97]"
						aria-label="Close sidebar"
					>
						<XIcon className="size-4" />
					</Button>
					{children}
				</aside>
			</>
		);
	}

	return (
		<div
			className="group peer hidden text-sidebar-foreground md:block"
			data-state={state}
			data-collapsible={state === "collapsed" ? collapsible : ""}
			data-variant={variant}
			data-side={side}
			data-slot="sidebar"
		>
			{/* Spacer that reserves layout width smoothly */}
			<div
				data-slot="sidebar-gap"
				className={cn(
					"relative w-(--sidebar-width) bg-transparent transition-[width] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]",
					"group-data-[collapsible=offcanvas]:w-0",
					variant === "floating" || variant === "inset"
						? "group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+1rem)]"
						: "group-data-[collapsible=icon]:w-(--sidebar-width-icon)",
				)}
			/>
			<div
				data-slot="sidebar-container"
				className={cn(
					"fixed inset-y-0 z-20 hidden h-svh w-(--sidebar-width) transition-[left,right,width] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] md:flex",
					side === "left"
						? "left-0 group-data-[collapsible=offcanvas]:left-[calc(var(--sidebar-width)*-1)]"
						: "right-0 group-data-[collapsible=offcanvas]:right-[calc(var(--sidebar-width)*-1)]",
					variant === "floating" || variant === "inset"
						? "p-2 group-data-[collapsible=icon]:w-[calc(var(--sidebar-width-icon)+1rem)]"
						: "group-data-[collapsible=icon]:w-(--sidebar-width-icon) group-data-[side=left]:border-r group-data-[side=right]:border-l",
					className,
				)}
				{...props}
			>
				<div
					data-sidebar="sidebar"
					data-slot="sidebar-inner"
					className="flex h-full w-full flex-col bg-sidebar group-data-[variant=floating]:rounded-xl group-data-[variant=floating]:border group-data-[variant=floating]:border-sidebar-border group-data-[variant=floating]:shadow-sm"
				>
					{children}
				</div>
			</div>
		</div>
	);
}

function SidebarTrigger({
	className,
	onClick,
	...props
}: React.ComponentProps<typeof Button>) {
	const { toggleSidebar } = useSidebar();

	return (
		<Button
			data-sidebar="trigger"
			data-slot="sidebar-trigger"
			variant="ghost"
			size="icon-sm"
			className={cn(
				"size-8 rounded-lg text-muted-foreground transition-[background-color,color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-muted hover:text-foreground active:scale-[0.97]",
				className,
			)}
			onClick={(event) => {
				onClick?.(event);
				toggleSidebar();
			}}
			{...props}
		>
			<PanelLeftIcon className="size-4" />
			<span className="sr-only">Toggle Sidebar</span>
		</Button>
	);
}

function SidebarRail({ className, ...props }: React.ComponentProps<"button">) {
	const { toggleSidebar } = useSidebar();

	return (
		<button
			type="button"
			data-sidebar="rail"
			data-slot="sidebar-rail"
			aria-label="Toggle Sidebar"
			tabIndex={-1}
			onClick={toggleSidebar}
			title="Toggle Sidebar (⌘B)"
			className={cn(
				"absolute inset-y-2 -right-1 z-20 hidden w-2 cursor-ew-resize transition-colors duration-150 after:absolute after:inset-y-4 after:left-1/2 after:w-[2px] after:-translate-x-1/2 after:rounded-full after:bg-transparent hover:after:bg-primary/40 sm:flex",
				className,
			)}
			{...props}
		/>
	);
}

function SidebarInset({ className, ...props }: React.ComponentProps<"main">) {
	return (
		<main
			data-slot="sidebar-inset"
			className={cn(
				"relative flex min-w-0 flex-1 flex-col bg-background",
				"md:peer-data-[variant=inset]:m-2 md:peer-data-[variant=inset]:ml-0 md:peer-data-[variant=inset]:rounded-2xl md:peer-data-[variant=inset]:border md:peer-data-[variant=inset]:border-border/80 md:peer-data-[variant=inset]:shadow-xs",
				className,
			)}
			{...props}
		/>
	);
}

function SidebarHeader({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sidebar-header"
			data-sidebar="header"
			className={cn("flex flex-col gap-1.5 px-2 pt-2 pb-1", className)}
			{...props}
		/>
	);
}

function SidebarFooter({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sidebar-footer"
			data-sidebar="footer"
			className={cn("flex flex-col gap-2 p-2", className)}
			{...props}
		/>
	);
}

function SidebarSeparator({
	className,
	...props
}: React.ComponentProps<typeof Separator>) {
	return (
		<Separator
			data-slot="sidebar-separator"
			data-sidebar="separator"
			className={cn("mx-2 w-auto bg-sidebar-border", className)}
			{...props}
		/>
	);
}

function SidebarContent({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sidebar-content"
			data-sidebar="content"
			className={cn(
				"flex min-h-0 flex-1 flex-col gap-0.5 overflow-y-auto overflow-x-hidden group-data-[collapsible=icon]:overflow-hidden",
				className,
			)}
			{...props}
		/>
	);
}

function SidebarGroup({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sidebar-group"
			data-sidebar="group"
			className={cn(
				"relative flex w-full min-w-0 flex-col px-2 py-1",
				className,
			)}
			{...props}
		/>
	);
}

function SidebarGroupLabel({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sidebar-group-label"
			data-sidebar="group-label"
			className={cn(
				"flex h-6 shrink-0 items-center rounded-md px-2 font-medium text-[10px] text-muted-foreground/75 uppercase tracking-wider",
				"transition-[margin,opacity] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]",
				"group-data-[collapsible=icon]:pointer-events-none group-data-[collapsible=icon]:-mt-6 group-data-[collapsible=icon]:opacity-0",
				className,
			)}
			{...props}
		/>
	);
}

function SidebarGroupContent({
	className,
	...props
}: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="sidebar-group-content"
			data-sidebar="group-content"
			className={cn("w-full text-sm", className)}
			{...props}
		/>
	);
}

function SidebarMenu({ className, ...props }: React.ComponentProps<"ul">) {
	return (
		<ul
			data-slot="sidebar-menu"
			data-sidebar="menu"
			className={cn("flex w-full min-w-0 flex-col gap-0.5", className)}
			{...props}
		/>
	);
}

function SidebarMenuItem({ className, ...props }: React.ComponentProps<"li">) {
	return (
		<li
			data-slot="sidebar-menu-item"
			data-sidebar="menu-item"
			className={cn("group/menu-item relative", className)}
			{...props}
		/>
	);
}

function SidebarMenuButton({
	isActive = false,
	tooltip,
	className,
	children,
	...props
}: React.ComponentProps<"button"> & {
	isActive?: boolean;
	tooltip?: string;
}) {
	const { isMobile, state } = useSidebar();

	const button = (
		<button
			type="button"
			data-slot="sidebar-menu-button"
			data-sidebar="menu-button"
			data-active={isActive}
			className={cn(
				"peer/menu-button flex h-8 w-full items-center gap-2.5 overflow-hidden rounded-lg px-2.5 text-left font-medium text-[13px] outline-none",
				"transition-[background-color,color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)]",
				"focus-visible:ring-2 focus-visible:ring-sidebar-ring active:scale-[0.97]",
				"text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
				"data-[active=true]:bg-primary/12 data-[active=true]:text-primary dark:data-[active=true]:bg-primary/15 dark:data-[active=true]:text-white",
				"group-data-[collapsible=icon]:size-8 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0",
				"[&>svg]:size-4 [&>svg]:shrink-0",
				className,
			)}
			{...props}
		>
			{children}
		</button>
	);

	if (!tooltip) {
		return button;
	}

	return (
		<Tooltip>
			<TooltipTrigger render={button} />
			<TooltipContent
				side="right"
				align="center"
				hidden={state !== "collapsed" || isMobile}
			>
				{tooltip}
			</TooltipContent>
		</Tooltip>
	);
}

function SidebarMenuBadge({
	className,
	...props
}: React.ComponentProps<"span">) {
	return (
		<span
			data-slot="sidebar-menu-badge"
			data-sidebar="menu-badge"
			className={cn(
				"ml-auto inline-flex h-5 min-w-5 items-center justify-center rounded-md px-1.5 font-medium text-[11px] tabular-nums",
				"group-data-[collapsible=icon]:hidden",
				className,
			)}
			{...props}
		/>
	);
}

export {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarInset,
	SidebarMenu,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarProvider,
	SidebarRail,
	SidebarSeparator,
	SidebarTrigger,
	useSidebar,
};

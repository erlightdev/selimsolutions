import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@selimsolutions/ui/components/dropdown-menu";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuBadge,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
	SidebarSeparator,
	useSidebar,
} from "@selimsolutions/ui/components/sidebar";
import {
	ChevronsUpDown,
	ExternalLink,
	FileText,
	Image,
	Layers,
	LayoutDashboard,
	ListTree,
	LogOut,
	Newspaper,
	Palette,
	Scale,
	Settings,
	Shield,
} from "lucide-react";

import type { CmsView } from "./cms-data";

interface AppSidebarProps {
	activeView: CmsView;
	onSelectView: (view: CmsView) => void;
	counts: {
		pages: number;
		services: number;
		solutions: number;
		legal: number;
		posts: number;
		media: number;
		seoIssues: number;
	};
	user: {
		name?: string | null;
		email?: string | null;
	};
	onSignOut: () => void;
}

export function AppSidebar({
	activeView,
	onSelectView,
	counts,
	user,
	onSignOut,
}: AppSidebarProps) {
	const { setOpenMobile, isMobile } = useSidebar();

	const handleNavigate = (view: CmsView) => {
		onSelectView(view);
		if (isMobile) {
			setOpenMobile(false);
		}
	};

	const initials = (user.name || user.email || "SS")
		.split(" ")
		.map((part) => part[0])
		.join("")
		.slice(0, 2)
		.toUpperCase();

	return (
		<Sidebar variant="inset" collapsible="icon">
			<SidebarHeader className="gap-1.5 pt-2">
				<div className="flex items-center px-1.5 py-0.5 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-0">
					<a
						href="/"
						className="flex items-center gap-2.5 rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
						title="Selim Solutions"
					>
						<img
							src="/selim-favicon.svg"
							alt="Selim Solutions"
							className="size-7 shrink-0 rounded-md"
						/>
						<div className="flex min-w-0 flex-col group-data-[collapsible=icon]:hidden">
							<span className="truncate font-semibold text-foreground text-sm tracking-tight">
								Selim CMS
							</span>
							<span className="truncate font-medium text-[10px] text-primary uppercase tracking-wider">
								Content Studio
							</span>
						</div>
					</a>
				</div>
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<SidebarGroupLabel>Overview</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton
									isActive={activeView === "overview"}
									tooltip="Dashboard"
									onClick={() => handleNavigate("overview")}
								>
									<LayoutDashboard />
									<span>Dashboard</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				<SidebarSeparator />

				<SidebarGroup>
					<SidebarGroupLabel>Content</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton
									isActive={activeView === "pages"}
									tooltip="Pages"
									onClick={() => handleNavigate("pages")}
								>
									<FileText />
									<span>Pages</span>
									<SidebarMenuBadge className="bg-muted text-muted-foreground">
										{counts.pages}
									</SidebarMenuBadge>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton
									isActive={activeView === "services"}
									tooltip="Services"
									onClick={() => handleNavigate("services")}
								>
									<Shield />
									<span>Services</span>
									<SidebarMenuBadge className="bg-muted text-muted-foreground">
										{counts.services}
									</SidebarMenuBadge>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton
									isActive={activeView === "solutions"}
									tooltip="Solutions"
									onClick={() => handleNavigate("solutions")}
								>
									<Layers />
									<span>Solutions</span>
									<SidebarMenuBadge className="bg-muted text-muted-foreground">
										{counts.solutions}
									</SidebarMenuBadge>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton
									isActive={activeView === "legal"}
									tooltip="Legal"
									onClick={() => handleNavigate("legal")}
								>
									<Scale />
									<span>Legal</span>
									<SidebarMenuBadge className="bg-muted text-muted-foreground">
										{counts.legal}
									</SidebarMenuBadge>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton
									isActive={activeView === "posts"}
									tooltip="Posts"
									onClick={() => handleNavigate("posts")}
								>
									<Newspaper />
									<span>Posts</span>
									<SidebarMenuBadge className="bg-muted text-muted-foreground">
										{counts.posts}
									</SidebarMenuBadge>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton
									isActive={activeView === "media"}
									tooltip="Media"
									onClick={() => handleNavigate("media")}
								>
									<Image />
									<span>Media</span>
									<SidebarMenuBadge className="bg-muted text-muted-foreground">
										{counts.media}
									</SidebarMenuBadge>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				<SidebarSeparator />

				<SidebarGroup>
					<SidebarGroupLabel>Design</SidebarGroupLabel>
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton
									isActive={activeView === "appearance"}
									tooltip="Appearance"
									onClick={() => handleNavigate("appearance")}
								>
									<Palette />
									<span>Appearance</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<SidebarMenuButton
									isActive={activeView === "menus"}
									tooltip="Menus"
									onClick={() => handleNavigate("menus")}
								>
									<ListTree />
									<span>Menus</span>
								</SidebarMenuButton>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>

				<SidebarGroup className="mt-auto">
					<SidebarGroupContent>
						<SidebarMenu>
							<SidebarMenuItem>
								<SidebarMenuButton
									isActive={activeView === "settings"}
									tooltip="Settings & SEO"
									onClick={() => handleNavigate("settings")}
								>
									<Settings />
									<span>Settings</span>
									{counts.seoIssues > 0 && (
										<SidebarMenuBadge className="bg-amber-500/15 text-amber-500">
											{counts.seoIssues}
										</SidebarMenuBadge>
									)}
								</SidebarMenuButton>
							</SidebarMenuItem>
							<SidebarMenuItem>
								<a href="/" className="block">
									<SidebarMenuButton tooltip="View Live Site">
										<ExternalLink />
										<span>View Site</span>
									</SidebarMenuButton>
								</a>
							</SidebarMenuItem>
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter className="border-sidebar-border/60 border-t pt-2">
				<DropdownMenu>
					<DropdownMenuTrigger
						render={
							<button
								type="button"
								className="flex w-full items-center gap-2.5 rounded-xl p-1.5 text-left transition-[background-color,transform] duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-sidebar-accent active:scale-[0.98] group-data-[collapsible=icon]:justify-center"
							/>
						}
					>
						<span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary font-semibold text-primary-foreground text-xs">
							{initials}
						</span>
						<div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
							<div className="truncate font-medium text-foreground text-xs">
								{user.name || "CMS Editor"}
							</div>
							<div className="truncate text-[11px] text-muted-foreground">
								{user.email || "admin@selimsolutions.com"}
							</div>
						</div>
						<ChevronsUpDown className="size-3.5 shrink-0 text-muted-foreground group-data-[collapsible=icon]:hidden" />
					</DropdownMenuTrigger>
					<DropdownMenuContent
						align="end"
						side="top"
						sideOffset={8}
						className="w-56 rounded-xl p-1"
					>
						<DropdownMenuGroup>
							<DropdownMenuLabel className="font-normal">
								<div className="font-medium text-foreground text-xs">
									{user.name || "CMS Editor"}
								</div>
								<div className="truncate text-[11px] text-muted-foreground">
									{user.email}
								</div>
							</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem
								onClick={() => handleNavigate("settings")}
								className="rounded-lg"
							>
								<Settings className="size-3.5" />
								<span>Settings</span>
							</DropdownMenuItem>
							<DropdownMenuItem
								variant="destructive"
								onClick={onSignOut}
								className="rounded-lg"
							>
								<LogOut className="size-3.5" />
								<span>Sign Out</span>
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</SidebarFooter>

			<SidebarRail />
		</Sidebar>
	);
}

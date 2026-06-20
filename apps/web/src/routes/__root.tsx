import { createORPCClient } from "@orpc/client";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import type { AppRouterClient } from "@selimsolutions/api/routers/index";
import { Toaster } from "@selimsolutions/ui/components/sonner";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
	createRootRouteWithContext,
	HeadContent,
	Outlet,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { useState } from "react";

import { ThemeProvider } from "@/components/theme-provider";
import Footer from "@/layouts/footer";
import Navbar from "@/layouts/navbar";
import { link, type orpc } from "@/utils/orpc";

import "../index.css";

export interface RouterAppContext {
	orpc: typeof orpc;
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RouterAppContext>()({
	component: RootComponent,
	head: () => ({
		meta: [
			{
				title: "selimsolutions",
			},
			{
				name: "description",
				content: "selimsolutions is a web application",
			},
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/selim-favicon.svg",
			},
		],
	}),
});

function RootComponent() {
	const [client] = useState<AppRouterClient>(() => createORPCClient(link));
	const [orpcUtils] = useState(() => createTanstackQueryUtils(client));

	return (
		<>
			<HeadContent />
			<ThemeProvider
				attribute="class"
				defaultTheme="dark"
				disableTransitionOnChange
				storageKey="vite-ui-theme"
			>
				<div className="grid min-h-svh grid-rows-[1fr_auto] overflow-x-clip">
					<Navbar />
					{/* pt clears the fixed navbar (announcement bar + header) */}
					<main className="min-w-0 pt-23">
						<Outlet />
					</main>
					<Footer />
				</div>
				<Toaster richColors />
			</ThemeProvider>
			<TanStackRouterDevtools position="bottom-left" />
			<ReactQueryDevtools position="bottom" buttonPosition="bottom-right" />
		</>
	);
}

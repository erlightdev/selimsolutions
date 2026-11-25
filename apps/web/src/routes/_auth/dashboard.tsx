import { Button } from "@selimsolutions/ui/components/button";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import { orpc } from "@/utils/orpc";

export const Route = createFileRoute("/_auth/dashboard")({
	component: RouteComponent,
});

function RouteComponent() {
	const { session } = Route.useRouteContext();
	const navigate = useNavigate();

	const privateData = useQuery(orpc.privateData.queryOptions());

	return (
		<div>
			<h1>Dashboard</h1>
			<p>Welcome {session.data?.user.name}</p>
			<p>API: {privateData.data?.message}</p>
			<Button
				onClick={() =>
					authClient.signOut({
						fetchOptions: {
							onSuccess: () => navigate({ to: "/login" }),
							onError: () => {
								toast.error("Could not sign out. Please try again.");
							},
						},
					})
				}
			>
				Log out
			</Button>
		</div>
	);
}

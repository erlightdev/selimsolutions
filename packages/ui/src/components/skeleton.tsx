import { cn } from "@selimsolutions/ui/lib/utils";

function Skeleton({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			data-slot="skeleton"
			className={cn("animate-pulse rounded-none bg-muted", className)}
			{...props}
		/>
	);
}

export { Skeleton };

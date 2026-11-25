"use client";

import { Tooltip as TooltipPrimitive } from "@base-ui/react/tooltip";
import { cn } from "@selimsolutions/ui/lib/utils";

function TooltipProvider({
	delay = 350,
	...props
}: TooltipPrimitive.Provider.Props) {
	return (
		<TooltipPrimitive.Provider
			data-slot="tooltip-provider"
			delay={delay}
			{...props}
		/>
	);
}

function Tooltip({ ...props }: TooltipPrimitive.Root.Props) {
	return <TooltipPrimitive.Root data-slot="tooltip" {...props} />;
}

function TooltipTrigger({ ...props }: TooltipPrimitive.Trigger.Props) {
	return <TooltipPrimitive.Trigger data-slot="tooltip-trigger" {...props} />;
}

function TooltipContent({
	className,
	sideOffset = 6,
	side = "right",
	align = "center",
	children,
	...props
}: TooltipPrimitive.Popup.Props &
	Pick<TooltipPrimitive.Positioner.Props, "side" | "sideOffset" | "align">) {
	return (
		<TooltipPrimitive.Portal>
			<TooltipPrimitive.Positioner
				side={side}
				sideOffset={sideOffset}
				align={align}
				className="z-50 outline-none"
			>
				<TooltipPrimitive.Popup
					data-slot="tooltip-content"
					className={cn(
						"z-50 origin-(--transform-origin) rounded-md border border-border bg-popover px-2.5 py-1 font-medium text-popover-foreground text-xs shadow-md",
						"transition-[transform,opacity] duration-125 ease-[cubic-bezier(0.23,1,0.32,1)]",
						"data-starting-style:scale-[0.97] data-starting-style:opacity-0",
						"data-ending-style:scale-[0.97] data-ending-style:opacity-0",
						"data-instant:duration-0",
						className,
					)}
					{...props}
				>
					{children}
				</TooltipPrimitive.Popup>
			</TooltipPrimitive.Positioner>
		</TooltipPrimitive.Portal>
	);
}

export { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger };

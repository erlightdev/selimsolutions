import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@selimsolutions/ui/components/alert-dialog";

export interface DeleteTarget {
	label: string;
	kind: string;
	onConfirm: () => void | Promise<void>;
}

interface ConfirmDeleteDialogProps {
	target: DeleteTarget | null;
	onClose: () => void;
	isDeleting?: boolean;
}

export function ConfirmDeleteDialog({
	target,
	onClose,
	isDeleting = false,
}: ConfirmDeleteDialogProps) {
	return (
		<AlertDialog
			open={!!target}
			onOpenChange={(open) => {
				if (!open) onClose();
			}}
		>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete {target?.kind}?</AlertDialogTitle>
					<AlertDialogDescription>
						This will permanently delete{" "}
						<span className="font-medium text-foreground">{target?.label}</span>
						. This action cannot be undone.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel disabled={isDeleting}>Cancel</AlertDialogCancel>
					<AlertDialogAction
						disabled={isDeleting}
						onClick={async () => {
							if (!target) return;
							await target.onConfirm();
							onClose();
						}}
					>
						{isDeleting ? "Deleting..." : "Delete"}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

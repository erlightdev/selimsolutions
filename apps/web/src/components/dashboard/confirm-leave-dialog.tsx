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

interface ConfirmLeaveDialogProps {
	open: boolean;
	onStay: () => void;
	onLeave: () => void;
}

export function ConfirmLeaveDialog({
	open,
	onStay,
	onLeave,
}: ConfirmLeaveDialogProps) {
	return (
		<AlertDialog
			open={open}
			onOpenChange={(nextOpen) => {
				if (!nextOpen) onStay();
			}}
		>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Unsaved changes</AlertDialogTitle>
					<AlertDialogDescription>
						You have unsaved edits in the editor. If you leave now, your changes
						will be discarded.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel onClick={onStay}>Keep Editing</AlertDialogCancel>
					<AlertDialogAction onClick={onLeave}>
						Discard &amp; Leave
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

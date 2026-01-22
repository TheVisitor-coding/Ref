import SecondaryButton from "@/components/atoms/buttons/SecondaryButton";
import { Trash } from "lucide-react";

interface SessionCardActionsProps {
    onEdit?: () => void;
    onDelete?: () => void;
}

function SessionCardActions({ onEdit, onDelete }: SessionCardActionsProps) {
    return (
        <div className="flex gap-2 items-center justify-end w-full">
            <SecondaryButton onClick={onEdit} label="Modifier" />
            <SecondaryButton className="px-3 py-2" onClick={onDelete} label={<Trash className="size-5" />} />
        </div>
    );
}

export default SessionCardActions;

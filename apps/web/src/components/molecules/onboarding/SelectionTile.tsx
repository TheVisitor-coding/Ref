import Image from 'next/image';

interface SelectionTileProps {
    icon: string;
    label: string;
    selected: boolean;
    onClick: () => void;
}

export default function SelectionTile({ icon, label, selected, onClick }: SelectionTileProps) {
    return (
        <button
            type="button"
            onClick={onClick}
            className={`flex items-center w-full gap-3 p-4 rounded-xl border transition-colors ${selected
                    ? 'border-primary-blue bg-primary-blue-light'
                    : 'border-grey-button hover:border-secondary'
                }`}
        >
            <Image src={icon} alt="" width={24} height={24} />
            <span className="text-base text-primary">{label}</span>
        </button>
    );
}

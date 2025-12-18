import Image from 'next/image';

interface FeatureTileProps {
    icon: string;
    label: string;
    selected: boolean;
    onToggle: () => void;
}

export default function FeatureTile({ icon, label, selected, onToggle }: FeatureTileProps) {
    return (
        <button
            type="button"
            onClick={onToggle}
            className={`flex items-center flex-1 gap-3 p-4 rounded-xl border transition-colors ${selected
                    ? 'border-primary-blue bg-primary-blue-light'
                    : 'border-grey-button hover:border-secondary'
                }`}
        >
            <Image src={icon} alt="" width={24} height={24} />
            <span className="text-base text-primary whitespace-nowrap">{label}</span>
        </button>
    );
}

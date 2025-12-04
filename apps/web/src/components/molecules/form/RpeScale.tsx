import { Smile } from 'lucide-react';

interface RpeScaleProps {
    value?: number;
    onChange?: (value: number) => void;
    disabled?: boolean;
}

export default function RpeScale({ value, onChange, disabled }: RpeScaleProps) {
    return (
        <div className="flex items-center gap-2 w-full">
            <label className='flex items-center gap-2 text-secondary w-[200px]'>
                <Smile className="size-4 " />
                RPE
            </label>

            <div className="flex gap-1">
                {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
                    <button
                        key={num}
                        onClick={() => !disabled && onChange?.(num)}
                        disabled={disabled}
                        className={`rounded-lg cursor-pointer py-1 px-2 flex border-[1px] items-center justify-center text-base transition-colors ${value === num
                            ? 'bg-primary-blue-light text-primary-blue border-primary-blue'
                            : 'bg-[#F5F5F5] text-secondary hover:bg-grey-button border-transparent'
                            } disabled:opacity-50 disabled:cursor-not-allowed`}
                    >
                        {num}
                    </button>
                ))}
            </div>
        </div>
    );
}

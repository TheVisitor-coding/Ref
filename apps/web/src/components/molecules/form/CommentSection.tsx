import { forwardRef, InputHTMLAttributes } from 'react';
import { MessageCircle, Mic } from 'lucide-react';
import LayoutCard from '../card/LayoutCard';

type CommentSectionProps = InputHTMLAttributes<HTMLInputElement>;

const CommentSection = forwardRef<HTMLInputElement, CommentSectionProps>(
    ({ ...inputProps }, ref) => {
        return (
            <LayoutCard title="Commentaire">
                <div className="flex p-4 items-center gap-2">
                    <MessageCircle className="size-4 text-secondary" />
                    <input
                        ref={ref}
                        {...inputProps}
                        className="flex-1 h-fit px-2 py-1 text-base text-primary placeholder:text-disabled bg-transparent border-none outline-none resize-none"
                    />
                    <button
                        type="button"
                        disabled
                        className="p-2 rounded-lg hover:bg-[#F5F5F5] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Mic className="w-5 h-5 text-secondary" />
                    </button>
                </div>
            </LayoutCard>
        );
    }
);

CommentSection.displayName = 'CommentSection';

export default CommentSection;

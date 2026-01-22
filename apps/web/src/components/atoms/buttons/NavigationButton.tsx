interface NavigationButtonProps {
    direction: 'left' | 'right';
    onClick?: () => void;
}

function NavigationButton({ direction, onClick }: NavigationButtonProps) {
    return (
        <button
            onClick={onClick}
            className="
                w-[34px] h-[34px]
                flex items-center justify-center
                bg-white border border-grey-button border-b-2
                rounded-lg
                transition-all hover:bg-background-light
                cursor-pointer
            "
        >
            <div className="w-5 h-5 flex items-center justify-center">
                {direction === 'left' ? (
                    <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M6.5 11L1.5 6L6.5 1" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                ) : (
                    <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1.5 1L6.5 6L1.5 11" stroke="#333333" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                )}
            </div>
        </button>
    );
}

export default NavigationButton;

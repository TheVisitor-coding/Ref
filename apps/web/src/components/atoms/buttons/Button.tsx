function Button({ onClick, label }: { onClick: () => void, label?: string }) {
    return (
        <button
            onClick={onClick}
            className="cursor-pointer px-3 py-1 rounded-lg border-b-2 border-[1px] border-grey-button transition-all hover:-translate-y-0.5"
        >
            {label || 'Fermer'}
        </button>
    );
}

export default Button;
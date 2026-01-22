import Image from "next/image";

function ToggleSidebarBtn({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (isOpen: boolean) => void; }) {
    return (
        <button onClick={() => setIsOpen(!isOpen)} className="w-fit px-3 py-2 cursor-pointer">
            <Image src='/icons/Panel.svg' alt="Panel Icon" width={18} height={18} />
        </button>
    );
}

export default ToggleSidebarBtn;
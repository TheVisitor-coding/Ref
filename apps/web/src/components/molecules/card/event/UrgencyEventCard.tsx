import Image from "next/image";

function UrgencyEventCard() {
    return (
        <div className="w-full flex gap-4 pb-6 border-b-[1px] border-grey-button last:border-b-0 last:pb-0">
            <Image height={48} width={48}
                className="min-w-12 min-h-12 h-auto object-cover rounded-lg"
                src={'/users/profilePic.png'}
                alt="Profil Pic User"
            />

            <div className="flex flex-col gap-1">
                <h3 className="text-primary text-sm font-medium">Paul a annulé son rendez-vous</h3>
                <span className="flex gap-3 items-center">
                    <Image src={'/icons/Calendar.svg'} alt='calendar icon' width={20} height={20} />
                    <p className="text-disabled text-sm">Aujourd’hui 11h</p>
                </span>
            </div>

            <Image height={20} width={20}
                className="ml-auto"
                src={'/icons/chevron-right.svg'}
                alt="Chevron Right Icon"
            />
        </div>
    );
}

export default UrgencyEventCard;
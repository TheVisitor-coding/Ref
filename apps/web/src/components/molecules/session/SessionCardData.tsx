interface SessionCardDataProps {
    duration: number;
    distance: number;
    heartRate: number;
    comment: string;
}

function SessionCardData({ duration, distance, heartRate, comment }: SessionCardDataProps) {
    return (
        <div className="flex flex-col gap-6 w-full">
            <div className="flex gap-6 items-start w-full">
                <div className="flex-1 flex flex-col gap-1 items-start">
                    <span className="text-sm font-normal leading-[1.25] text-secondary">
                        Durée
                    </span>
                    <div className="flex gap-0.5 items-baseline text-base font-normal leading-[1.25]">
                        <span className="text-primary">{duration}</span>
                        <span className="text-[#999999]">min</span>
                    </div>
                </div>

                <div className="h-4 w-px bg-grey-button self-center" />

                <div className="flex-1 flex flex-col gap-1 items-start">
                    <span className="text-sm font-normal leading-[1.25] text-secondary">
                        Distance
                    </span>
                    <div className="flex gap-0.5 items-baseline text-base font-normal leading-[1.25]">
                        <span className="text-primary">{distance}</span>
                        <span className="text-[#999999]">km</span>
                    </div>
                </div>

                <div className="h-4 w-px bg-grey-button self-center" />

                <div className="flex-1 flex flex-col gap-1 items-start">
                    <span className="text-sm font-normal leading-[1.25] text-secondary">
                        Fréquence cardiaque
                    </span>
                    <div className="flex gap-0.5 items-baseline text-base font-normal leading-[1.25]">
                        <span className="text-primary">{heartRate}</span>
                        <span className="text-[#999999]">bpm</span>
                    </div>
                </div>
            </div>

            <div className="h-px w-full bg-grey-button" />

            <p className="text-base font-normal leading-[1.25] text-primary whitespace-pre-wrap">
                {comment}
            </p>
        </div>
    );
}

export default SessionCardData;

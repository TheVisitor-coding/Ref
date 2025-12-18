interface ProgressBarProps {
    currentStep: number;
    totalSteps?: number;
}

export default function OnboardingProgressBar({ currentStep, totalSteps = 4 }: ProgressBarProps) {
    return (
        <div className="flex items-center gap-2 w-[300px]">
            {Array.from({ length: totalSteps }, (_, index) => (
                <div
                    key={index}
                    className={`flex-1 h-2 rounded-full transition-colors ${index < currentStep ? 'bg-primary-blue' : 'bg-primary-blue-light'
                        }`}
                />
            ))}
        </div>
    );
}

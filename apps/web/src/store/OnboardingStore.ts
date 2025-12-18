import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { SportType } from '@/data/sports/sportsList';
import type { FeatureId } from '@/data/featuresList';

export type AthletesCountOption = 'less-than-5' | '5-to-20' | '20-to-50' | 'more-than-50';

// Re-export FeatureId for backward compatibility
export type { FeatureId } from '@/data/featuresList';

export type OnboardingStep = 1 | 2 | 3 | 4;

export interface OnboardingData {
    firstName: string;
    selectedSports: SportType[];
    athletesCount: AthletesCountOption | null;
    selectedFeatures: FeatureId[];
}

interface OnboardingState extends OnboardingData {
    completedSteps: OnboardingStep[];
}

interface OnboardingActions {
    setFirstName: (name: string) => void;
    setSelectedSports: (sports: SportType[]) => void;
    toggleSport: (sportId: SportType) => void;
    setAthletesCount: (count: AthletesCountOption) => void;
    setSelectedFeatures: (features: FeatureId[]) => void;
    toggleFeature: (featureId: FeatureId) => void;
    completeStep: (step: OnboardingStep) => void;
    canAccessStep: (step: OnboardingStep) => boolean;
    isStepCompleted: (step: OnboardingStep) => boolean;
    isOnboardingComplete: () => boolean;
    reset: () => void;
    getOnboardingData: () => OnboardingData;
}

const initialState: OnboardingState = {
    firstName: '',
    selectedSports: [],
    athletesCount: null,
    selectedFeatures: [],
    completedSteps: [],
};

const useOnboardingStore = create<OnboardingState & OnboardingActions>()(
    persist(
        (set, get) => ({
            ...initialState,

            setFirstName: (name) => set({ firstName: name }),

            setSelectedSports: (sports) => set({ selectedSports: sports }),

            toggleSport: (sportId) =>
                set((state) => ({
                    selectedSports: state.selectedSports.includes(sportId)
                        ? state.selectedSports.filter((id) => id !== sportId)
                        : [...state.selectedSports, sportId],
                })),

            setAthletesCount: (count) => set({ athletesCount: count }),

            setSelectedFeatures: (features) => set({ selectedFeatures: features }),

            toggleFeature: (featureId) =>
                set((state) => ({
                    selectedFeatures: state.selectedFeatures.includes(featureId)
                        ? state.selectedFeatures.filter((id) => id !== featureId)
                        : [...state.selectedFeatures, featureId],
                })),

            completeStep: (step) =>
                set((state) => ({
                    completedSteps: state.completedSteps.includes(step)
                        ? state.completedSteps
                        : [...state.completedSteps, step].sort((a, b) => a - b),
                })),

            canAccessStep: (step) => {
                const { completedSteps } = get();
                if (step === 1) return true;
                return completedSteps.includes((step - 1) as OnboardingStep);
            },

            isStepCompleted: (step) => get().completedSteps.includes(step),

            isOnboardingComplete: () => {
                const { completedSteps } = get();
                return [1, 2, 3, 4].every((step) => completedSteps.includes(step as OnboardingStep));
            },

            reset: async () => set(initialState),

            getOnboardingData: () => {
                const { firstName, selectedSports, athletesCount, selectedFeatures } = get();
                return { firstName, selectedSports, athletesCount, selectedFeatures };
            },
        }),
        {
            name: 'onboarding-storage',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
);

export default useOnboardingStore;

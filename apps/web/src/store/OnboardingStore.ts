import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { SportType } from '@/data/sports/sportsList';

export type AthletesCountOption = 'less-than-5' | '5-to-20' | '20-to-50' | 'more-than-50';
export type FeatureId = 'athletes-tracking' | 'session-analysis' | 'calendar' | 'messaging' | 'payments' | 'tasks';

interface OnboardingState {
    firstName: string;
    selectedSports: SportType[];
    athletesCount: AthletesCountOption | null;
    selectedFeatures: FeatureId[];
}

interface OnboardingActions {
    setFirstName: (name: string) => void;
    setSelectedSports: (sports: SportType[]) => void;
    toggleSport: (sportId: SportType) => void;
    setAthletesCount: (count: AthletesCountOption) => void;
    setSelectedFeatures: (features: FeatureId[]) => void;
    toggleFeature: (featureId: FeatureId) => void;
    reset: () => void;
    getOnboardingData: () => OnboardingState;
}

const initialState: OnboardingState = {
    firstName: '',
    selectedSports: [],
    athletesCount: null,
    selectedFeatures: [],
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

            reset: () => set(initialState),

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

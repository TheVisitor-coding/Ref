import { AthleteLevel } from "@/types/User";

export const personalFields = [
    { name: 'first_name', label: 'Prénom', required: true, placeholder: "Entrez le prénom" },
    { name: 'last_name', label: 'Nom', required: true, placeholder: "Entrez le nom" },
    { name: 'email', label: 'Email', required: true, placeholder: "ex: jean@exemple.com" },
    { name: 'phone', label: 'Téléphone', placeholder: "ex: +33 6 12 34 56 78" },
    { name: 'height', label: 'Taille (cm)', placeholder: "ex: 180", type: 'number' },
    { name: 'weight', label: 'Poids (kg)', placeholder: "ex: 75", type: 'number' },
    { name: 'birth_date', label: 'Date de naissance', type: 'date', placeholder: "YYYY-MM-DD" },
    { name: 'tag', label: 'Tag', placeholder: "Marathon, Triathlon, ..." },
];

const levelOptions: { value: AthleteLevel; label: string }[] = [
    { value: 'beginner', label: 'Débutant' },
    { value: 'intermediate', label: 'Intermédiaire' },
    { value: 'expert', label: 'Expert' },
    { value: 'professional', label: 'Professionnel' },
];
const disciplineOptions = [
    { value: 'running', label: 'Course à pied' },
    { value: 'cycling', label: 'Cyclisme' },
    { value: 'triathlon', label: 'Triathlon' },
    { value: 'fitness', label: 'Fitness' },
];

export const objectiveFields = [
    { name: 'mainObjective', label: 'Objectif principal', placeholder: "Semi-marathon" },
    { name: 'secondaryObjective', label: 'Objectif secondaire', placeholder: "Course à pied" },
    { name: 'level', label: 'Niveau', placeholder: "Débutant, Intermédiaire, Expert, Professionnel", options: levelOptions },
    { name: 'discipline', label: 'Discipline', placeholder: "Choisissez une discipline", options: disciplineOptions },
];
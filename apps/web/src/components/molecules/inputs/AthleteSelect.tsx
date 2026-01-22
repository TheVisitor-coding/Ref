'use client';

import { useEffect, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Athlete } from '@/types/User';

interface AthleteSelectProps {
    value: number | undefined;
    onChange: (athleteId: number) => void;
    required?: boolean;
    className?: string;
}

export default function AthleteSelect({ value, onChange, required = false, className = '' }: AthleteSelectProps) {
    const [athletes, setAthletes] = useState<Athlete[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAthletes = async () => {
            try {
                const response = await fetch('/api/athletes');
                const result = await response.json();
                setAthletes(result.data || []);
            } catch (error) {
                console.error('Error fetching athletes:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchAthletes();
    }, []);

    return (
        <div className={`flex flex-col gap-2 ${className}`}>
            <label className="text-base text-primary font-normal leading-[1.25]">
                Athlète
                {required && <span className="text-accent ml-0.5">*</span>}
            </label>
            <Select
                value={value?.toString()}
                onValueChange={(val) => onChange(parseInt(val))}
                disabled={isLoading}
            >
                <SelectTrigger className="bg-white border-grey-button rounded-lg h-12 px-4">
                    <SelectValue placeholder={isLoading ? 'Chargement...' : 'Sélectionner un athlète'} />
                </SelectTrigger>
                <SelectContent className="bg-white">
                    {athletes.map((athlete) => (
                        <SelectItem key={athlete.id} value={athlete.id.toString()}>
                            {`${athlete.first_name || ''} ${athlete.last_name || ''}`.trim() || athlete.username || `Athlète #${athlete.id}`}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}

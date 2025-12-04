'use client';

import SessionCardHeader from "@/components/molecules/session/SessionCardHeader";
import SessionCardData from "@/components/molecules/session/SessionCardData";
import SecondaryButton from "@/components/atoms/buttons/SecondaryButton";
import SessionCardActions from "@/components/molecules/session/SessionCardActions";
import { sportConfig } from "@/data/sports/sportsList";
import { SessionDisplay } from "@/types/Session";
import { formatDate } from "@/utils/date";

interface SessionContentProps {
    session: SessionDisplay | null;
    isLoading?: boolean;
    onEdit?: () => void;
    onDelete?: () => void;
    onAdd?: () => void;
}

function SessionContent({ session, isLoading, onEdit, onDelete, onAdd }: SessionContentProps) {
    const config = session ? sportConfig[session.sportType] : sportConfig.running;

    if (isLoading) {
        return (
            <div className="relative flex-1 flex flex-col gap-10 items-center w-full overflow-hidden pt-2">
                <div className="relative z-10 flex flex-col gap-10 items-center w-full px-6">
                    <div className="bg-white outline-8 outline-white/30 rounded-2xl max-w-[600px] w-full animate-pulse">
                        <div className="p-1 rounded-[inherit]">
                            <div className="h-24 bg-gray-200 rounded-t-xl" />
                            <div className="flex flex-col gap-4 p-6">
                                <div className="h-4 bg-gray-200 rounded w-3/4" />
                                <div className="h-4 bg-gray-200 rounded w-1/2" />
                                <div className="h-20 bg-gray-200 rounded" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="relative flex-1 flex flex-col gap-10 items-center w-full overflow-hidden pt-2">
            <div className="relative z-10 flex flex-col gap-10 items-center w-full px-6">
                {session ? (
                    <>
                        <div className="bg-white outline-8 outline-white/30 rounded-2xl max-w-[600px] w-full">
                            <div className="p-1 rounded-[inherit]">
                                <SessionCardHeader
                                    date={formatDate(session.date)}
                                    title={session.title}
                                    sportType={session.sportType}
                                    headerBg={config.bgColor}
                                    headerText={config.textColor}
                                />

                                <div className="flex flex-col gap-10 p-6">
                                    <SessionCardData
                                        duration={session.duration ?? 0}
                                        distance={session.distance ?? 0}
                                        heartRate={session.heartRate ?? 0}
                                        comment={session.comment ?? ''}
                                    />

                                    <SessionCardActions
                                        onEdit={onEdit}
                                        onDelete={onDelete}
                                    />
                                </div>
                            </div>
                        </div>

                        <SecondaryButton className="bg-white" onClick={onAdd} label="Ajouter une séance" />
                    </>
                ) : (
                    <div className="flex flex-col items-center">
                        <img
                            className="rounded-2xl"
                            src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbm0yb3lrNmJqZ2Jsd3MwdmI2aGRrdGc3ZHVhenVxcjJseGF1aW02ZCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/evVKsrjZEqVVWvE2VR/giphy.gif"
                            alt="No sessions"
                        />
                        <h1 className="text-primary pt-10 pb-4">Aucune séance programmée</h1>
                        <SecondaryButton className="bg-white" onClick={onAdd} label="Ajouter une séance" />
                    </div>
                )}
            </div>
        </div>
    );
}

export default SessionContent;

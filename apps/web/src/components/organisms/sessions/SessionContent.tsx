'use client';

import SessionCardHeader from "@/components/molecules/session/SessionCardHeader";
import SessionCardData from "@/components/molecules/session/SessionCardData";
import SecondaryButton from "@/components/atoms/buttons/SecondaryButton";
import SessionCardActions from "@/components/molecules/session/SessionCardActions";
import { sportConfig as sport } from "@/data/sports/sportsList";
import Image from "next/image";
import SessionModal from "@/components/molecules/modal/sessionModal";

export interface SessionData {
    id?: number;
    date: string;
    title: string;
    duration: number;
    distance: number;
    heartRate: number;
    comment: string;
    sportType: keyof typeof sport;
}

interface SessionContentProps {
    session?: SessionData;
    onEdit?: () => void;
    onDelete?: () => void;
    onAdd?: () => void;
}

function SessionContent({ session, onEdit, onDelete, onAdd }: SessionContentProps) {
    const sportConfig = session ? sport[session.sportType] : sport.running;

    return (
        <div className="relative flex-1 flex flex-col gap-10 items-center w-full overflow-hidden pt-2">
            <div className="relative z-10 flex flex-col gap-10 items-center w-full px-6">
                {session ? (
                    <>
                        <div className="bg-white outline-8 outline-white/30 rounded-2xl max-w-[600px] w-full">
                            <div className="p-1 rounded-[inherit]">
                                <SessionCardHeader
                                    date={session.date}
                                    title={session.title}
                                    sportType={session.sportType}
                                    headerBg={sportConfig.bgColor}
                                    headerText={sportConfig.textColor}
                                />

                                <div className="flex flex-col gap-10 p-6">
                                    <SessionCardData
                                        duration={session.duration}
                                        distance={session.distance}
                                        heartRate={session.heartRate}
                                        comment={session.comment}
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
                        <img className="rounded-2xl" src={'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbm0yb3lrNmJqZ2Jsd3MwdmI2aGRrdGc3ZHVhenVxcjJseGF1aW02ZCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/evVKsrjZEqVVWvE2VR/giphy.gif'} alt="No sessions" />
                        <h1 className="text-primary pt-10 pb-4">Aucune séance Programmée</h1>
                        <SecondaryButton className="bg-white" onClick={onAdd} label="Ajouter une séance" />
                    </div>
                )}
            </div>
        </div>
    );
}

export default SessionContent;

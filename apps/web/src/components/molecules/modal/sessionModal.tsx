'use client';

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import SecondaryButton from "@/components/atoms/buttons/SecondaryButton";
import ProgramField from "@/components/atoms/form/ProgramField";
import SessionFormSection from "@/components/molecules/form/SessionFormSection";
import CommentSection from "@/components/molecules/form/CommentSection";
import { DialogTitle } from "@radix-ui/react-dialog";
import PrimaryButton from "@/components/atoms/buttons/PrimaryButton";

interface SessionModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    mode?: 'create' | 'edit' | 'view';
    sessionData?: any;
}

function SessionModal({ open, onOpenChange, mode = 'create', sessionData: initialSessionData }: SessionModalProps) {
    const [sessionData, setSessionData] = useState({
        title: initialSessionData?.title || '',
        athlete: initialSessionData?.athlete || '',
        sport: initialSessionData?.sport || '',
        date: initialSessionData?.date || '',
        tags: initialSessionData?.tags || '',
        presenceRequired: initialSessionData?.presenceRequired || false,
        comment: initialSessionData?.comment || ''
    })

    const modalTitle = mode === 'create' ? 'Ajouter une séance' : mode === 'edit' ? 'Modifier une séance' : 'Séance';
    const isReadOnly = mode === 'view';

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-[1200px] p-0 bg-white">
                <div className="flex flex-col gap-2 border-b border-grey-button mx-10 pt-10 pb-4">
                    <DialogTitle className="text-sm font-semibold text-primary">{modalTitle}</DialogTitle>
                    <div className="relative">
                        <input
                            type="text"
                            value={sessionData.title}
                            onChange={(e) => setSessionData({ ...sessionData, title: e.target.value })}
                            placeholder="Nom de la séance"
                            disabled={isReadOnly}
                            className="w-full text-[40px] font-poppins font-semibold leading-normal text-primary placeholder:text-disabled border-none outline-none bg-transparent"
                        />
                    </div>
                </div>

                <div className="flex flex-col gap-10 px-10 py-10 overflow-y-auto max-h-[calc(90vh-280px)]">
                    <div className="flex flex-col gap-4">
                        <h3 className="text-sm font-semibold text-primary">Contexte</h3>
                        <div className="flex gap-6 items-center">
                            <ProgramField
                                icon="user"
                                value={sessionData.athlete}
                                onChange={(value) => setSessionData({ ...sessionData, athlete: value })}
                                placeholder="Alex Sanchez"
                                disabled={isReadOnly}
                            />
                            <ProgramField
                                icon="sport"
                                value={sessionData.sport}
                                onChange={(value) => setSessionData({ ...sessionData, sport: value })}
                                placeholder="Course à pied"
                                disabled={isReadOnly}
                            />
                            <ProgramField
                                icon="calendar"
                                value={sessionData.date}
                                onChange={(value) => setSessionData({ ...sessionData, date: value })}
                                placeholder="14 mai 2026"
                                disabled={isReadOnly}
                            />
                            <ProgramField
                                icon="tag"
                                value={sessionData.tags}
                                onChange={(value) => setSessionData({ ...sessionData, tags: value })}
                                placeholder="Vide"
                                disabled={isReadOnly}
                            />
                            <div className="flex-1 flex items-center justify-end gap-2 min-w-[200px]">
                                <input
                                    type="checkbox"
                                    id="presenceRequired"
                                    checked={sessionData.presenceRequired}
                                    onChange={(e) => setSessionData({ ...sessionData, presenceRequired: e.target.checked })}
                                    disabled={isReadOnly}
                                    className="w-4 h-4 border border-border-input rounded cursor-pointer"
                                />
                                <label htmlFor="presenceRequired" className="text-base text-primary cursor-pointer">
                                    Ma présence est nécessaire
                                </label>
                            </div>
                        </div>
                    </div>

                    <SessionFormSection disabled={isReadOnly} />

                    <CommentSection
                        value={sessionData.comment}
                        onChange={(value) => setSessionData({ ...sessionData, comment: value })}
                        disabled={isReadOnly}
                    />
                </div>

                <div className="flex items-center justify-between gap-6 px-10 py-6 border-t border-grey-button bg-white">
                    <SecondaryButton label="Sauvegarder le brouillon" />
                    <PrimaryButton label="Ajouter au planning" disabled className="py-3 px-6" />
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default SessionModal;
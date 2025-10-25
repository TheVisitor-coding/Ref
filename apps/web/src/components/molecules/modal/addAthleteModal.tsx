'use client'

import PrimaryButton from "@/components/atoms/buttons/PrimaryButton";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import FormField from "../form/FormField";
import { useState } from "react";
import Message from "@/components/atoms/notification/Message";
import { AlertTriangle } from "lucide-react";
import SecondaryButton from "@/components/atoms/buttons/SecondaryButton";

function AddAthleteModal() {
    const [email, setEmail] = useState("");

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <PrimaryButton label="Inviter un sportif" icon="/icons/Sportifs/user-plus.svg" alt="Plus Icon" />
            </DialogTrigger>
            <DialogContent className="max-w-[800px]">
                <DialogHeader className="gap-4 text-primary">
                    <DialogTitle className="text-[32px] font-medium">Ajouter un sportif dans ma base</DialogTitle>
                    <DialogDescription className="text-lg">
                        Un email d'accès lui sera envoyé pour qu'il rejoigne votre organisation en un clic.
                    </DialogDescription>
                </DialogHeader>

                <FormField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="Entrez l'email du sportif"
                    required={true}
                />

                <Message type="info">
                    <div className="flex gap-3">
                        <AlertTriangle className="w-7 h-7" />
                        <div className="flex flex-col gap-2">
                            <h4 className="font-semibold">Information</h4>
                            <p>Le sportif complètera son profil (poids, objectif, etc.)
                                dès sa première connexion grâce au formulaire qu’il lui sera adressé.</p>
                        </div>
                    </div>
                </Message>

                <DialogFooter className="flex sm:justify-between">
                    <DialogClose asChild>
                        <SecondaryButton label="Annuler" />
                    </DialogClose>
                    <PrimaryButton label="Envoyer l'invitation" onClick={() => { }} />
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default AddAthleteModal;
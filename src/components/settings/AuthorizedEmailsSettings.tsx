"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Trash2, Mail } from "lucide-react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter,
    DialogDescription
} from "@/components/ui/dialog";

import { AuthorizedEmails } from "@/generated/prisma";
import { addAuthorizedEmail } from "@/app/actions/addAuthorizedEmail";
import { deleteAuthorizedEmail } from "@/app/actions/deleteAuthorizedEmail";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { useSession } from "@/lib/auth-client";

export default function AuthorizedEmailsSettings({ initialEmails }: { initialEmails: AuthorizedEmails[] }) {

    const { data, error, isPending } = useSession();


    

    return (
        <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-sm space-y-4">
             <div className="   flex justify-between items-center">
                        <div className="flex items-center gap-2 md:gap-3">
                            <div className="bg-primary/10 text-primary p-1.5 md:p-2 rounded-lg flex-shrink-0">
                                <Mail size={20} className="md:w-6 md:h-6" />
                            </div>
                            <div className="min-w-0">
                                <h2 className="text-lg md:text-2xl font-bold">Authorized Emails</h2>
                                <p className="text-xs md:text-sm text-muted-foreground">Manage who can sign up</p>
                            </div>
                        </div>
                        {/* Add Email Dialog */}
            <Dialog>
                <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                        <Plus size={18} />
                        Add Authorized Email
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Add Authorized Email</DialogTitle>
                        <DialogDescription>
                            Add an email address that will be allowed to sign up for the platform.
                        </DialogDescription>
                    </DialogHeader>
                    <form action={addAuthorizedEmail} className="flex flex-col gap-4">
                        <Input
                            type="email"
                            placeholder="email@example.com"
                            name="email"
                        />
                        <DialogFooter>
                            <Button type="submit" >
                                Add Email
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
                        </div>
        <div className="space-y-4">
            

            {/* Emails List */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
                {initialEmails.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                        <Mail size={48} className="mx-auto mb-2 opacity-50" />
                        <p>No authorized emails yet</p>
                    </div>
                ) : (
                    initialEmails.map((email) => (
                        <div
                            key={email.id}
                            className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors group"
                        >
                            <div className="flex items-center gap-3">
                                <Mail size={18} className="text-muted-foreground" />
                                <span className="font-medium">{email.email}</span>
                            </div>
                            {data?.user.email !== email.email ? 
                            
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteAuthorizedEmail(email.email)}
                                className="text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                                <Trash2 size={18} />
                            </Button>:
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-gray-400 cursor-not-allowed"
                            >
                                <Trash2 size={18} />
                            </Button>
}
                            
                        </div>
                    ))
                )}
            </div>

            <p className="text-sm text-muted-foreground">
                Total: {initialEmails.length} authorized {initialEmails.length === 1 ? 'email' : 'emails'}
            </p>
        </div>
        </div>
    );
}


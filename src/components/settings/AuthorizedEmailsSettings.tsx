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

interface AuthorizedEmail {
    id: number;
    email: string;
}

export default function AuthorizedEmailsSettings({ initialEmails }: { initialEmails: AuthorizedEmail[] }) {
    const [emails, setEmails] = useState<AuthorizedEmail[]>(initialEmails);
    const [newEmail, setNewEmail] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const addEmail = async () => {
        if (!newEmail.trim() || !newEmail.includes('@')) return;
        
        setIsLoading(true);
        try {
            // Here you would call an API to add the email
            // For now, we'll just add it to state
            const mockId = Math.max(...emails.map(e => e.id), 0) + 1;
            setEmails([{ id: mockId, email: newEmail }, ...emails]);
            setNewEmail("");
        } catch (error) {
            console.error("Failed to add email:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const deleteEmail = async (id: number) => {
        setIsLoading(true);
        try {
            // Here you would call an API to delete the email
            setEmails(emails.filter(e => e.id !== id));
        } catch (error) {
            console.error("Failed to delete email:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="space-y-4">
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
                    <div className="flex flex-col gap-4">
                        <Input
                            type="email"
                            placeholder="email@example.com"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && addEmail()}
                        />
                        <DialogFooter>
                            <Button onClick={addEmail} disabled={isLoading || !newEmail.trim()}>
                                Add Email
                            </Button>
                        </DialogFooter>
                    </div>
                </DialogContent>
            </Dialog>

            {/* Emails List */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
                {emails.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                        <Mail size={48} className="mx-auto mb-2 opacity-50" />
                        <p>No authorized emails yet</p>
                    </div>
                ) : (
                    emails.map((email) => (
                        <div
                            key={email.id}
                            className="flex items-center justify-between p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors group"
                        >
                            <div className="flex items-center gap-3">
                                <Mail size={18} className="text-muted-foreground" />
                                <span className="font-medium">{email.email}</span>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => deleteEmail(email.id)}
                                disabled={isLoading}
                                className="opacity-0 group-hover:opacity-100 transition-opacity text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                                <Trash2 size={18} />
                            </Button>
                        </div>
                    ))
                )}
            </div>

            <p className="text-sm text-muted-foreground">
                Total: {emails.length} authorized {emails.length === 1 ? 'email' : 'emails'}
            </p>
        </div>
    );
}


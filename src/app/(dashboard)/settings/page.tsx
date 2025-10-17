import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/database";
import { AuthorizedEmails, Roles, } from "@/generated/prisma";
import ProfileSettings from "@/components/settings/ProfileSettings";
import AuthorizedEmailsSettings from "@/components/settings/AuthorizedEmailsSettings";
import { User, Mail, Shield, Bell, Trash2 } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import UserManagement from "@/components/settings/UserManagement";

interface RequireUserFields {
    id: string;
    name: string;
    email: string;
    role: string;
}

export default async function SettingsPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return <div>Please sign in to access settings</div>;
    }

    const isAdmin = session.user.role === Roles.admin;


    let authorizedEmails: AuthorizedEmails[] = [];
    let users: RequireUserFields[] = [];

    if (isAdmin) {
        try {
            authorizedEmails = await prisma.authorizedEmails.findMany({
                orderBy: { id: 'desc' }
            });
        } catch (e) {
            console.error(e);
            return (<div>Server Error</div>)

        }
    }


    try {
        users = await prisma.user.findMany({
            select: {
                id: true,
                name: true,
                email: true,
                role: true
            }
        })
    } catch (e) {
        console.error(e);
        return (<div>Server Error</div>)
    }


    return (
        <div className="max-w-4xl mx-auto space-y-4 md:space-y-6 lg:space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2">Settings</h1>
                <p className="text-sm md:text-base text-muted-foreground">Manage your account and application preferences</p>
            </div>

            {/* Settings Sections */}
            <div className="space-y-4 md:space-y-6">
                {/* Profile Settings */}
                <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-sm">
                    <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                        <div className="bg-primary/10 text-primary p-1.5 md:p-2 rounded-lg flex-shrink-0">
                            <User size={20} className="md:w-6 md:h-6" />
                        </div>
                        <div className="min-w-0">
                            <h2 className="text-lg md:text-2xl font-bold">Profile Settings</h2>
                            <p className="text-xs md:text-sm text-muted-foreground">Manage your personal information</p>
                        </div>
                    </div>
                    <ProfileSettings user={session.user} />
                </div>

                {/* Role Badge */}
                <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-sm">
                    <div className="flex items-center gap-2 md:gap-3 mb-3 md:mb-4">
                        <div className="bg-primary/10 text-primary p-1.5 md:p-2 rounded-lg flex-shrink-0">
                            <Shield size={20} className="md:w-6 md:h-6" />
                        </div>
                        <div className="min-w-0">
                            <h2 className="text-lg md:text-2xl font-bold">Account Role</h2>
                            <p className="text-xs md:text-sm text-muted-foreground">Your current access level</p>
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                        <span className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full font-semibold text-sm md:text-base whitespace-nowrap ${isAdmin
                            ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'
                            : 'bg-blue-500/10 text-blue-500 border border-blue-500/20'
                            }`}>
                            {isAdmin ? 'Admin' : 'Member'}
                        </span>
                        <p className="text-xs md:text-sm text-muted-foreground">
                            {isAdmin
                                ? 'You have full access to all features including financial data and user management.'
                                : 'You have access to basic features. Contact an admin for elevated permissions.'}
                        </p>
                    </div>
                </div>

                {isAdmin && (
                    <UserManagement users={users} />
                )}

                {isAdmin && (

                    <AuthorizedEmailsSettings initialEmails={authorizedEmails} />

                )}


            </div>
        </div>
    );
}


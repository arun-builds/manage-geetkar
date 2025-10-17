import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { prisma } from "@/lib/database";
import { Roles } from "@/generated/prisma";
import ProfileSettings from "@/components/settings/ProfileSettings";
import AuthorizedEmailsSettings from "@/components/settings/AuthorizedEmailsSettings";
import { User, Mail, Shield, Bell } from "lucide-react";

export default async function SettingsPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) {
        return <div>Please sign in to access settings</div>;
    }

    const isAdmin = session.user.role === Roles.admin;

    // Get authorized emails if admin
    let authorizedEmails: any[] = [];
    if (isAdmin) {
        authorizedEmails = await prisma.authorizedEmails.findMany({
            orderBy: { id: 'desc' }
        });
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
                        <span className={`px-3 md:px-4 py-1.5 md:py-2 rounded-full font-semibold text-sm md:text-base whitespace-nowrap ${
                            isAdmin 
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

                {/* Authorized Emails Management - Admin Only */}
                {isAdmin && (
                    <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-sm">
                        <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                            <div className="bg-primary/10 text-primary p-1.5 md:p-2 rounded-lg flex-shrink-0">
                                <Mail size={20} className="md:w-6 md:h-6" />
                            </div>
                            <div className="min-w-0">
                                <h2 className="text-lg md:text-2xl font-bold">Authorized Emails</h2>
                                <p className="text-xs md:text-sm text-muted-foreground">Manage who can sign up</p>
                            </div>
                        </div>
                        <AuthorizedEmailsSettings initialEmails={authorizedEmails} />
                    </div>
                )}

                {/* Notifications Settings */}
                <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-sm">
                    <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-6">
                        <div className="bg-primary/10 text-primary p-1.5 md:p-2 rounded-lg flex-shrink-0">
                            <Bell size={20} className="md:w-6 md:h-6" />
                        </div>
                        <div className="min-w-0">
                            <h2 className="text-lg md:text-2xl font-bold">Notifications</h2>
                            <p className="text-xs md:text-sm text-muted-foreground">Configure your notification preferences</p>
                        </div>
                    </div>
                    <div className="space-y-3 md:space-y-4">
                        <div className="flex items-center justify-between gap-4 p-3 md:p-4 rounded-lg border border-border">
                            <div className="min-w-0 flex-1">
                                <p className="font-medium text-sm md:text-base">Email Notifications</p>
                                <p className="text-xs md:text-sm text-muted-foreground">Receive updates via email</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary touch-manipulation"></div>
                            </label>
                        </div>
                        <div className="flex items-center justify-between gap-4 p-3 md:p-4 rounded-lg border border-border">
                            <div className="min-w-0 flex-1">
                                <p className="font-medium text-sm md:text-base">Transaction Alerts</p>
                                <p className="text-xs md:text-sm text-muted-foreground">Get notified about new transactions</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                <div className="w-11 h-6 bg-muted peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary touch-manipulation"></div>
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}


"use client"
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function ProfileSettings({ user }: { user: any }) {
    const router = useRouter();

    const handleSignOut = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push("/signin");
                },
            },
        });
    };

    return (
        <div className="space-y-6">
            {/* User Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="text-sm text-muted-foreground">Name</label>
                    <p className="text-lg font-medium">{user.name}</p>
                </div>
                <div>
                    <label className="text-sm text-muted-foreground">Email</label>
                    <p className="text-lg font-medium">{user.email}</p>
                </div>
            </div>

            {/* Actions */}
            <div className="pt-4 border-t border-border">
                <Button 
                    onClick={handleSignOut}
                    variant="destructive"
                    className="flex items-center gap-2"
                >
                    <LogOut size={18} />
                    Sign Out
                </Button>
            </div>
        </div>
    );
}


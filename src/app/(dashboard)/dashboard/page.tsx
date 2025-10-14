"use client"

import { Button } from "@/components/ui/button"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation";

export default function Dashboard() {
    	const router = useRouter();
        const{data:session} = authClient.useSession();
        console.log(session?.user);
        
    return (
        <div>
            Dashboard
            <div>
                {session?.user.name}
            </div>
            <Button onClick={
                async () => {
                    await authClient.signOut({
                        fetchOptions: {
                            onSuccess: () => {
                                router.push("/signin"); // redirect to login page
                            },
                        },
                    });
                }
            }> SignOut</Button>
        </div>
    )
}
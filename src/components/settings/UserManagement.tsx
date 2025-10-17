"use client"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { User, Trash2 } from "lucide-react";
import {  useSession } from "@/lib/auth-client";
import { Roles } from "@/generated/prisma";
import { deleteUser } from "@/actions/deleteUser";

interface RequireUserFields {
    id: string;
    name: string;
    email: string;
    role: string;
}



export default function UserManagement({users}: {users: RequireUserFields[]}){

    const { data } = useSession()


    
    return(
        <div className="bg-card border border-border rounded-lg p-4 md:p-6 shadow-sm space-y-4">
                        {users.map((user) => (
                            <div key={user.id} className="flex justify-between items-center">
                                
                                <span className="w-1/3 flex items-center gap-2"><User />{user.name}</span>
                                <span className="w-1/3 flex items-center gap-2">{user.email}</span>
                                <Select name="role" >
                                    <SelectTrigger className="w-1/6">
                                        <SelectValue placeholder={user.role} />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value={user.role === Roles.admin?"member":"admin"}>{user.role === Roles.admin?"Member":"Admin"}</SelectItem>
                                    </SelectContent>
                                </Select>
                                
                                    {data?.user.id !== user.id ? 
                                         <Trash2  size={18} className={` text-red-400 cursor-pointer`} onClick={() => deleteUser(user.id)}/>:
                                         <Trash2 size={18} className="text-gray-400 cursor-not-allowed" />
                                    }
                                
                               
                            </div>
                        ))}
                    </div>
    )
}
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

import {  prisma } from "@/lib/database";
import { createAuthMiddleware, APIError } from 'better-auth/api';

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql", // or "mysql", "postgresql", ...etc
    }),
    emailAndPassword: {
        enabled: true,
    },
    hooks: {
        before: createAuthMiddleware(async (ctx) => {
            if (ctx.path == "/sign-up/email") {
                const isEmailAuthorized = await checkEmail(ctx.body.email);
                if (!isEmailAuthorized) {
                    console.log("before hook inside authorization check");
                    throw new APIError("UNAUTHORIZED", {
                        message: "Email is not authorized",
                    });

                }
            }
        }),
    },
    user: {
        additionalFields: {
            role: {
                type: "string",
                required: false
            }
        }
    }
});

async function checkEmail(email: string) {
    if (!email) return false;
    try {
       
        const authorizedEmail = await prisma.authorizedEmails.findFirst({
            where: {
                email,
            }
        });
        return !!authorizedEmail;
    } catch (e) {
        console.error("Database error while checking authorized email:", e);
        return false;
    }
}
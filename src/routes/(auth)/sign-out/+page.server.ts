import { redirect, type RequestEvent } from "@sveltejs/kit";
import { signOut } from "$lib/server/auth";

export const load = async ({ locals, cookies }: RequestEvent) => {
    if (!locals.user) {
        redirect(302, "/");
    }
    await signOut(locals, cookies);
    return {
        status: "success"
    }
};

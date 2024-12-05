import { redirect } from "@sveltejs/kit";
import { signOut } from "$lib/server/auth";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, cookies }) => {
    if (!locals.user) {
        redirect(302, "/");
    }
    await signOut(locals, cookies);
    return {
        status: "success"
    };
};

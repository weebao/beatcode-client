import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals, cookies }) => {
    if (locals.user) {
        redirect(302, "/home");
    }

    const tempEmail = cookies.get("temp-email");
    if (!tempEmail) {
        redirect(302, "/register");
    }

    return {
        email: tempEmail
    };
};

import type { PageServerLoad } from "./$types";
import { forgotPassword } from "$lib/server/auth";
import { redirect } from "@sveltejs/kit";

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.user) {
        redirect(302, "/login");
    }

    try {
        const response = await forgotPassword(locals.user.email);
        if (response.status >= 400) {
            return { status: "error", message: response.error.detail };
        }
        return { status: "success" };
    } catch (e: unknown) {
        if (e instanceof Error) {
            return { status: "error", message: e.message };
        }
        return { status: "error", message: "Unknown error" };
    }
};

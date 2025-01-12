import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";
import { getGoogleUrl } from "$lib/server/auth";

export const load: PageServerLoad = async ({ locals }) => {
    if (locals.user) {
        redirect(302, "/home");
    }

    try {
        const response = await getGoogleUrl();
        if (response.status >= 400) {
            throw new Error(response.error.detail);
        }
        return { status: "success", url: response.url };
    } catch (e: unknown) {
        if (e instanceof Error) {
            return { status: "error", message: e.message };
        }
        return { status: "error", message: "Something went wrong" };
    }
};

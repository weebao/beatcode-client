import type { PageServerLoad } from "./$types";
import { verifyEmail, login } from "$lib/server/auth";
import { redirect, fail } from "@sveltejs/kit";
import { setTokenCookie } from "$lib/server/utils";

export const load: PageServerLoad = async ({ url }) => {
    const token = url.searchParams.get("token");
    if (!token) {
        redirect(302, "/login");
    }

    try {
        const response = await verifyEmail(token);
        if (response.status >= 400) {
            return { status: "error", message: response.error.detail };
        }
        return { status: "success" };
    } catch (error: any) {
        return { status: "error", message: error.message };
    }
};

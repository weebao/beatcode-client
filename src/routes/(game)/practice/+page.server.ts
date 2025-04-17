import type { Actions, PageServerLoad } from "./$types";
import { fail } from "@sveltejs/kit";
import { WEBSOCKET_URL } from "$env/static/private";
import { loginAsGuest } from "$lib/server/auth";

export const load: PageServerLoad = async ({ cookies }) => {
    return {
        websocketUrl: WEBSOCKET_URL,
        token: cookies.get("access_token")
    };
};

export const actions = {
    playAsGuest: async ({ cookies }) => {
        try {
            await loginAsGuest(cookies);
        } catch (e: unknown) {
            if (e instanceof Error) {
                return fail(500, { message: e.message });
            }
            return fail(500, { message: "Unknown error" });
        }
    }
} satisfies Actions;

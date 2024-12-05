// Check if event locals has name yet, if not generate a dialog before entering the game :)
import type { Actions, PageServerLoad } from "./$types";
import { WEBSOCKET_URL } from "$env/static/private";
import { fail, redirect } from "@sveltejs/kit";
import { loginAsGuest, getMe } from "$lib/server/auth";

export const load: PageServerLoad = async ({ locals, cookies, params }) => {
    return {
        roomCode: params.code,
        websocketUrl: WEBSOCKET_URL,
        token: cookies.get("access_token")
    };
};

export const actions = {
    joinRoomAsGuest: async ({ request, locals, cookies }) => {
        try {
            await loginAsGuest(cookies);
        } catch (e: any) {
            return fail(500, { message: e.message });
        }
    }
} satisfies Actions;

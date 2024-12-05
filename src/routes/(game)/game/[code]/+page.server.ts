import type { Actions, PageServerLoad } from "./$types";
import { WEBSOCKET_URL } from "$env/static/private";
import { fail, redirect } from "@sveltejs/kit";
import { loginAsGuest } from "$lib/server/auth";
import { getCurrentGame } from "$lib/server/game";

export const load: PageServerLoad = async ({ locals, cookies, params }) => {
    if (!locals.user) {
        redirect(302, "/login");
    }
    // try {
    //     const data = await getCurrentGame(cookies);
    //     if (data.match_id !== params.id) {
    //         redirect(302, "/");
    //     }
    // } catch (e) {
    //     console.error(e);
    //     redirect(302, "/");
    // }

    return {
        gameId: params.code,
        websocketUrl: WEBSOCKET_URL,
        token: cookies.get("access_token")
    };
};

export const actions = {
    joinGameAsGuest: async ({ request, locals, cookies }) => {
        try {
            await loginAsGuest(cookies);
        } catch (e: any) {
            return fail(500, { message: e.message });
        }
    }
} satisfies Actions;

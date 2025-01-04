import type { PageServerLoad } from "./$types";
import { WEBSOCKET_URL } from "$env/static/private";
import { redirect } from "@sveltejs/kit";
import { getCurrentGame } from "$lib/server/game";

export const load: PageServerLoad = async ({ locals, cookies, params }) => {
    if (!locals.user) {
        redirect(302, "/login");
    }
    try {
        const data = await getCurrentGame(cookies);
        if (data.match_id !== params.code) {
            redirect(302, "/home");
        }
    } catch (e) {
        console.error(e);
        redirect(302, "/home");
    }

    return {
        gameId: params.code,
        websocketUrl: WEBSOCKET_URL,
        token: cookies.get("access_token")
    };
};

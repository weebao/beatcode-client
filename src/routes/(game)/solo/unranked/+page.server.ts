import type { Actions, PageServerLoad } from "./$types";
import { WEBSOCKET_URL } from "$env/static/private";

export const load: PageServerLoad = async ({ cookies }) => {
    return {
        webSocketUrl: WEBSOCKET_URL,
        token: cookies.get("access_token")
    };
};

export const actions = {} satisfies Actions;

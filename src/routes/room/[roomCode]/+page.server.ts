// Check if event locals has name yet, if not generate a dialog before entering the game :)
import type { Actions, PageServerLoad } from "./$types";
import { }
import { fail, redirect } from "@sveltejs/kit";
import { loginAsGuest, getMe } from "$lib/server/auth";

export const load: PageServerLoad = async ({ locals, params }) => {
    return {
        name: locals.user?.displayName,
        roomCode: params.roomCode,
        websocketUrl
    };
};

export const actions = {
    joinRoomAsGuest: async ({ request, locals, cookies }) => {
        try {
            await loginAsGuest(cookies);
            const user = await getMe();
            locals.user = user;
            return { user };
        } catch (err: any) {
            return fail(500, { message: err.message });
        }
    }
} satisfies Actions;

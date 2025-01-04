// Check if event locals has name yet, if not generate a dialog before entering the game :)
import type { Actions, PageServerLoad } from "./$types";
import { WEBSOCKET_URL, FRONTEND_URL } from "$env/static/private";
import { fail } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { RoomSettingsSchema } from "$models/room";
import { loginAsGuest } from "$lib/server/auth";
import { updateRoomSettings } from "$lib/server/room";

export const load: PageServerLoad = async ({ cookies, params }) => {
    return {
        roomCode: params.code,
        websocketUrl: WEBSOCKET_URL,
        websiteUrl: FRONTEND_URL,
        token: cookies.get("access_token"),
        updateRoomSettingsForm: await superValidate(zod(RoomSettingsSchema))
    };
};

export const actions = {
    joinRoomAsGuest: async ({ cookies }) => {
        try {
            await loginAsGuest(cookies);
        } catch (e: unknown) {
            if (e instanceof Error) {
                return fail(500, { message: e.message });
            }
            return fail(500, { message: "Unknown error" });
        }
    },
    updateSettings: async ({ request, cookies, params }) => {
        const roomCode = params.code;
        const updateRoomSettingsForm = await superValidate(request, zod(RoomSettingsSchema));

        if (!updateRoomSettingsForm.valid) {
            return fail(400, { updateRoomSettingsForm });
        }

        try {
            const data = await updateRoomSettings(roomCode, updateRoomSettingsForm.data, cookies);
            if (data.status >= 400) {
                return fail(data.status, { error: data.error });
            }
        } catch (e: unknown) {
            if (e instanceof Error) {
                return fail(500, { message: e.message });
            }
            return fail(500, { message: "Unknown error" });
        }
    }
} satisfies Actions;

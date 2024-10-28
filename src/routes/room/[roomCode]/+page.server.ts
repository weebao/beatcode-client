// Check if event locals has name yet, if not generate a dialog before entering the game :)
import type { Actions, PageServerLoad } from "./$types";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { z } from "zod";
import { fail, redirect } from "@sveltejs/kit";
import { JoinRoomSchema } from "$lib/zod-schemas";
import * as api from "$lib/api";

export const load: PageServerLoad = async ({ locals, params }) => {
    return {
        name: locals.user?.name,
        token: locals.user?.token,
        roomCode: params.roomCode,
        joinRoomForm: await superValidate(zod(JoinRoomSchema)),
    };
};

export const actions = {
    joinRoom: async ({ request, locals, cookies }) => {
        const joinRoomForm = await superValidate(request, zod(JoinRoomSchema));
        const name = joinRoomForm.data.name || locals.user?.name;

        if (!joinRoomForm.valid && !name) {
            return fail(400, { joinRoomForm });
        }

        const data = await api.post(`/join-room/${joinRoomForm.data.roomCode}`, {
            player_name: name
        });

        if (!data.error) {
            const { player_id } = data;
            cookies.set("jwt", JSON.stringify({ name, token: player_id }), { path: "/" });
            return { joinRoomForm, token: player_id };
        } else {
            return fail(500, { joinRoomForm });
        }
    },

    joinRoomThroughLink: async ({ request, locals, params, cookies }) => {
        const name = locals.user?.name;
        const roomCode = params.roomCode;

        if (!name || !roomCode) {
            return fail(400, { error: "Missing name or roomCode" });
        }

        const data = await api.post(`/join-room/${roomCode}`, {
            player_name: name
        });

        if (!data.error) {
            const { player_id } = data;
            cookies.set("jwt", JSON.stringify({ name, token: player_id }), { path: "/" });
            return { success: true, token: player_id };
        } else {
            return fail(500, {
                error: `
                    Failed to join room ${roomCode} with name ${name}.
                    Reason: ${data.error.detail}
                `
            });
        }
    },

    startGame: async ({ locals, params }) => {
        locals.roomCode = params.roomCode;
        throw redirect(303, `/game`);
    }
} satisfies Actions;

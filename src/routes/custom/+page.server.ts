import type { Actions, PageServerLoad } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import * as api from "$lib/api";
import { CreateRoomSchema, JoinRoomSchema } from "$lib/zod-schemas";

export const load: PageServerLoad = async () => {
    return {
        createRoomForm: await superValidate(zod(CreateRoomSchema)),
        joinRoomForm: await superValidate(zod(JoinRoomSchema))
    };
};

export const actions = {
    createRoom: async ({ request }) => {
        const createRoomForm = await superValidate(request, zod(CreateRoomSchema));

        if (!createRoomForm.valid) {
            return fail(400, { createRoomForm });
        }
        try {
            const response: any = { ok: true, json: async () => ({ id: "123ABC" }) };
            // const response = await api.post("/create-room", {
            //     player_name: createRoomForm.data.name
            // });
            if (response.ok) {
                const room = await response.json();
                return redirect(204, `/game/${room.id}`);
            } else {
                return fail(response.status, { createRoomForm });
            }
        } catch (error) {
            return fail(500, { createRoomForm });
        }
    },

    joinRoom: async ({ request }) => {
        const joinRoomForm = await superValidate(request, zod(JoinRoomSchema));

        if (!joinRoomForm.valid) {
            return fail(400, { joinRoomForm });
        }

        try {
            const response = await api.post(`/join-room/${joinRoomForm.data.roomCode}`, {
                player_name: joinRoomForm.data.name
            });
            if (response.ok) {
                const room = await response.json();
                // return redirect(204, `/game/${room.id}`);
            } else {
                return fail(response.status, { joinRoomForm });
            }
        } catch (error) {
            return fail(500, { joinRoomForm });
        }
    }
} satisfies Actions;

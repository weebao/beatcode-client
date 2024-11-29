import type { Actions, PageServerLoad } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import * as api from "$lib/server/api";
import { CreateRoomSchema, JoinRoomSchema } from "$models/room";

export const load: PageServerLoad = async ({ locals }) => {
    return {
        name: locals.user?.displayName ?? "",
        createRoomForm: await superValidate(zod(CreateRoomSchema)),
        joinRoomForm: await superValidate(zod(JoinRoomSchema))
    };
};

export const actions = {
    createRoom: async ({ request, locals, cookies }) => {
        const createRoomForm = await superValidate(request, zod(CreateRoomSchema));

        if (!createRoomForm.valid) {
            return fail(400, { createRoomForm });
        }
        if (!locals.user) {
            redirect(303, "/login");
        }

        const { settings } = createRoomForm.data;
        const data = await api.post("/rooms/create", settings, cookies);

        if (!data.error) {
            const { room_code } = data;
            redirect(303, `/room/${room_code}`);
        } else {
            return fail(500, { createRoomForm });
        }
    },

    joinRoom: async ({ request, locals, cookies }) => {
        const joinRoomForm = await superValidate(request, zod(JoinRoomSchema));

        if (!joinRoomForm.valid) {
            return fail(400, { joinRoomForm });
        }

        redirect(303, `/room/${joinRoomForm.data.room_code}`);
    }
} satisfies Actions;

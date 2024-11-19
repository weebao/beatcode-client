import type { Actions, PageServerLoad } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import * as api from "$lib/api";
import { CreateRoomSchema, JoinRoomSchema } from "$lib/zod-schemas";

export const load: PageServerLoad = async ({ locals }) => {
    return {
        name: locals.user?.name ?? "",
        createRoomForm: await superValidate(zod(CreateRoomSchema)),
        joinRoomForm: await superValidate(zod(JoinRoomSchema))
    };
};

export const actions = {
    createRoom: async ({ request, locals }) => {
        const createRoomForm = await superValidate(request, zod(CreateRoomSchema));
        const name = createRoomForm.data.name || locals.user?.name;

        if (!createRoomForm.valid) {
            return fail(400, { createRoomForm });
        }
        if (!locals.user) {
            redirect(303, "/login");
        }

        const data = await api.post("/rooms/create", {
            player_name: name
        });

        if (!data.error) {
            const { room_code } = data;
            redirect(303, `/room/${room_code}`);
        } else {
            return fail(500, { createRoomForm });
        }
    },

    joinRoom: async ({ request, locals }) => {
        const joinRoomForm = await superValidate(request, zod(JoinRoomSchema));

        const name = joinRoomForm.data.name || locals.user?.name;
        if (!joinRoomForm.valid) {
            return fail(400, { joinRoomForm });
        }
        if (!locals.user) {
            redirect(303, "/login");
        }

        const data = await api.post(`/join-room/${joinRoomForm.data.roomCode}`, {
            player_name: name
        });

        if (!data.error) {
            redirect(303, `/room/${joinRoomForm.data.roomCode}`);
        } else {
            if (name && name.length > 0) {
                joinRoomForm.errors.name = undefined;
                joinRoomForm.data.name = name;
            }
            joinRoomForm.errors.roomCode = [data.error.detail];
            return fail(500, { joinRoomForm });
        }
    }
} satisfies Actions;

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
    createRoom: async ({ request, locals, cookies }) => {
        const createRoomForm = await superValidate(request, zod(CreateRoomSchema));
        const name = createRoomForm.data.name || locals.user?.name;

        if (!createRoomForm.valid && !name) {
            return fail(400, { createRoomForm });
        }
        const data = await api.post("/create-room", {
            player_name: name
        });

        if (!data.error) {
            const { room_code, player_id } = data;
            console.log("redirect")
            cookies.set("jwt", JSON.stringify({ name, token: player_id }), { path: "/" });
            redirect(303, `/room/${room_code}`);
        } else {
            return fail(500, { createRoomForm });
        }
    },

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

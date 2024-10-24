import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import * as api from '$lib/api';
import { createRoomSchema, joinRoomSchema } from '$lib/zod-schemas';

export const actions: Actions = {
    createRoom: async ({ request }) => {
        const data = await request.formData();
        const name = data.get("name");
        const parseResult = createRoomSchema.safeParse({ name });

        if (!parseResult.success) {
            return fail(400, { errors: parseResult.error.flatten() });
        }

        try {
            const response = await api.post('/create-room', { player_name: parseResult.data.name });
            if (response.ok) {
                const room = await response.json();
                throw redirect(303, `/game/${room.id}`);
            } else {
                return fail(response.status, { name, error: response.statusText });
            }
        } catch (error) {
            return fail(500, { name, error: 'Server error' });
        }
    },

    joinRoom: async ({ request }) => {
        const data = await request.formData();
        const name = data.get("name");
        const roomCode = data.get("roomCode");

        const parseResult = joinRoomSchema.safeParse({ roomCode, name });

        if (!parseResult.success) {
            return fail(400, { errors: parseResult.error.flatten() });
        }

        try {
            const response = await api.post(`/join-room/${parseResult.data.roomCode}`, {
                player_name: parseResult.data.name
            });
            if (response.ok) {
                throw redirect(303, `/game/${parseResult.data.roomCode}`);
            } else {
                return fail(response.status, { roomCode, name, error: response.statusText });
            }
        } catch (error) {
            return fail(500, { roomCode, name, error: 'Server error' });
        }
    }
};

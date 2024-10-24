import { z } from 'zod';

export const createRoomSchema = z.object({
    name: z.string().min(1, 'Name is required')
});

export const joinRoomSchema = z.object({
    roomCode: z.string().min(1, 'Room code is required'),
    name: z.string().min(1, 'Name is required')
});

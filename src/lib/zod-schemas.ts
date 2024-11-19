import { z } from "zod";

export const CreateRoomSchema = z.object({
    name: z.string().min(1, "Name is required")
});

export const JoinRoomSchema = z.object({
    roomCode: z
        .string()
        .length(6, "Invalid room code (Length has to be 6)")
        .transform((val) => val.trim().toUpperCase()),
});

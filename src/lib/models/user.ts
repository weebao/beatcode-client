import { z } from "zod";
import type { HttpJSONPayload } from "./request";

export interface User extends HttpJSONPayload {
    username: string;
    email: string;
    display_name: string;
    avatar_url?: string;
    rating: number;
    is_verified?: boolean;
    is_guest?: boolean;
    created_at: number;
    updated_at: number;
    room?: string;
}

export const ProfileSchema = z.object({
    username: z.string().min(1, "Username is required"),
    display_name: z.string().max(50, "Display name must be at most 50 characters"),
    email: z.string().email("Please enter a valid email address")
});

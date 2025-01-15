import { z } from "zod";
import type { HttpJSONPayload } from "./request";

export interface JwtPayload {
    exp: number;
    secret: string | null;
    [key: string]: any; // To allow additional properties
}
export interface Tokens {
    access_token: string;
    refresh_token: string;
}
export interface LoginResponse {
    tokens: Tokens;
    error?: string;
}
export interface LoginFormResult {
    type: "success" | "failure";
    data?: LoginResponse;
    error?: string;
}
export interface LoginData extends HttpJSONPayload {
    username: string;
    password: string;
}

export interface RegisterData extends HttpJSONPayload {
    username: string;
    display_name: string;
    email: string;
    password: string;
    confirm_password: string;
}

export interface RegisterWithGoogleData extends HttpJSONPayload {
    username: string;
    display_name: string;
    email: string;
    google_id: string;
    avatar_url?: string;
}

export interface ResetPasswordData extends HttpJSONPayload {
    token: string;
    password: string;
    confirm_password: string;
}

export const LoginSchema = z.object({
    username: z.string().min(1, "Email or Username is required"),
    password: z.string().min(1, "Password is required")
});

export const RegisterSchema = z
    .object({
        username: z
            .string()
            .min(1, "Username cannot be empty")
            .max(20, "Username must be at most 20 characters")
            .regex(
                /^[a-zA-Z0-9_-]+$/,
                "Username can only contain letters, numbers, underscores, and hyphens"
            ),
        display_name: z.string().max(50, "Display name must be at most 50 characters"),
        email: z.string().email("Please enter a valid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirm_password: z.string()
    })
    .refine((data) => data.password === data.confirm_password, {
        message: "Passwords do not match",
        path: ["confirm_password"]
    });

export const RegisterWithGoogleSchema = z.object({
    username: z
        .string()
        .min(1, "Username cannot be empty")
        .max(20, "Username must be at most 20 characters")
        .regex(
            /^[a-zA-Z0-9_-]+$/,
            "Username can only contain letters, numbers, underscores, and hyphens"
        ),
    display_name: z.string().max(50, "Display name must be at most 50 characters"),
    email: z.string(),
    google_id: z.string(),
    avatar_url: z.string().optional()
});

export const ResetPasswordSchema = z
    .object({
        token: z.string(),
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirm_password: z.string()
    })
    .refine((data) => data.password === data.confirm_password, {
        message: "Passwords do not match",
        path: ["confirm_password"]
    });

import { z } from "zod";

export type JwtPayload = {
    exp: number;
    secret: string | null;
    [key: string]: any; // To allow additional properties
};
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
export interface LoginData {
    email: string;
    password: string;
}

export const LoginSchema = z.object({
    email: z.string().min(1, "Email or Username is required"),
    password: z.string().min(1, "Password is required")
});

export const SignUpSchema = z
    .object({
        username: z
            .string()
            .min(3, "Username must be at least 3 characters")
            .max(20, "Username must be at most 20 characters")
            .regex(
                /^[a-zA-Z0-9_-]+$/,
                "Username can only contain letters, numbers, underscores, and hyphens"
            ),
        email: z.string().email("Please enter a valid email address"),
        password: z.string().min(8, "Password must be at least 8 characters"),
        confirm_password: z.string()
    })
    .refine((data) => data.password === data.confirm_password, {
        message: "Passwords do not match",
        path: ["confirm_password"]
    });
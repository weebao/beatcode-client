import type { Cookies } from "@sveltejs/kit";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "$lib/models/auth";

export const setTokenCookie = (cookies: Cookies, token: string, key: string) => {
    cookies.set(key, atob(token), {
        httpOnly: true,
        path: "/",
        secure: true,
        sameSite: "strict",
    });
}

export const clearUser = (locals: App.Locals, cookies: Cookies) => {
    cookies.delete("accessToken", { path: "/" });
    cookies.delete("refreshToken", { path: "/" });
    locals.user = undefined;
};
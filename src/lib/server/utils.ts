import type { Cookies } from "@sveltejs/kit";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "$lib/models/auth";

export const setTokenCookie = (cookies: Cookies, token: string, key: string) => {
    cookies.set(key, token, {
        httpOnly: true,
        path: "/",
        secure: true,
        sameSite: "strict"
    });
};

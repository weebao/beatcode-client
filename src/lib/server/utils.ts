import type { Cookies } from "@sveltejs/kit";

export const setTokenCookie = (cookies: Cookies, token: string, key: string) => {
    cookies.set(key, token, {
        httpOnly: true,
        path: "/",
        secure: true,
        sameSite: "lax"
    });
};

export const setCookie = (cookies: Cookies, key: string, value: string) => {
    cookies.set(key, value, {
        path: "/",
        secure: true
    });
};

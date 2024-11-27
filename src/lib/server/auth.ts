import type { Cookies } from "@sveltejs/kit";
import * as api from "./api";
import { setTokenCookie } from "./utils";

export const loginAsGuest = async (cookies: Cookies) => {
    const data = await api.post("/users/guest");
    const { access_token, refresh_token } = data;
    setTokenCookie(cookies, access_token, "accessToken");
    setTokenCookie(cookies, refresh_token, "refreshToken");
};

export const getMe = async () => {
    return api.get("/users/me");
}

export const refreshAccessToken = async (cookies: Cookies) => {
    const refreshToken = cookies.get("refresh_token");
    if (!refreshToken) {
        throw new Error("No refresh token found");
    }

    const data = await api.post("/users/refresh", { refresh_token: refreshToken });
    if (data.error) {
        throw new Error(data.error.detail);
    }

    const { access_token, refresh_token } = data;
    setTokenCookie(cookies, access_token, "access_token");
    setTokenCookie(cookies, refresh_token, "refresh_token");
}

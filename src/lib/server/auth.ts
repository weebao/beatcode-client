import { error, type Cookies } from "@sveltejs/kit";
import * as api from "./api";
import { setTokenCookie } from "./utils";
import type { LoginData, RegisterData } from "$lib/models/auth";
import type { User } from "$lib/models/user";

export const login = async (data: LoginData, cookies: Cookies) => {
    const response = await api.post("/users/login", data);
    const { access_token, refresh_token } = response;
    setTokenCookie(cookies, access_token, "accessToken");
    setTokenCookie(cookies, refresh_token, "refreshToken");
}

export const loginAsGuest = async (cookies: Cookies) => {
    const data = await api.post("/users/guest");
    const { access_token, refresh_token } = data;
    setTokenCookie(cookies, access_token, "accessToken");
    setTokenCookie(cookies, refresh_token, "refreshToken");
};

export const register = async (data: RegisterData, cookies: Cookies): Promise<User> => {
    const response = await api.post("/users/register", data);
    return response;
}

export const getMe = async () => {
    return api.get("/users/me");
};

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
};

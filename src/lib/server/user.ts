import { type Cookies } from "@sveltejs/kit";
import * as api from "./api";

export const getMe = async (cookies: Cookies) => {
    return api.get("/users/me", true, cookies);
};

export const updateMe = async (data: any, cookies: Cookies) => {
    return api.patch("/users/me", data, true, cookies);
};

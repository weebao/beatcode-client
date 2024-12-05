import type { RoomSettings } from "$lib/models/room";
import type { Cookies } from "@sveltejs/kit";
import * as api from "./api";

export const createRoom = async (settings: RoomSettings, cookies: Cookies) => {
    const data = await api.post("/rooms/create", settings, true, cookies);
    return data;
};

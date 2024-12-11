import type { RoomSettings } from "$lib/models/room";
import type { Cookies } from "@sveltejs/kit";
import * as api from "./api";

export const createRoom = async (isPublic: boolean, settings: RoomSettings, cookies: Cookies) => {
    console.log(settings)
    const data = await api.post("/rooms/create", {
        is_public: isPublic,
        ...settings
    }, true, cookies);
    return data;
};

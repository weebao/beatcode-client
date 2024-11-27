import type { RoomSettings } from "$lib/models/room";
import * as api from "./api";

export const createRoom = async (settings: RoomSettings) => {
    const data = await api.post("/rooms/create", settings);
    const { access_token, refresh_token } = data;
};

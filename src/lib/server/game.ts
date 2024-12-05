import type { Cookies } from "@sveltejs/kit";
import * as api from "./api";
import type { GameState } from "$lib/models/game";

export const getCurrentGame = (cookies: Cookies) => {
    return api.get("/game/current-game", false, cookies);
};

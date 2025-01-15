import type { Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { getMe } from "$lib/server/user";
import { getCurrentGame } from "$lib/server/game";
import { log } from "$lib/utils";

const preloadFont: Handle = async ({ event, resolve }) => {
    return await resolve(event, {
        preload: ({ type }) => type === "font"
    });
};

const protectedRoutes: string[] = [
    "/home",
    "/settings",
    "/solo",
    "/team",
    "/custom",
    "/custom/lobby"
];

// custom redirect from joy of code `https://github.com/JoysOfCode/sveltekit-auth-cookies/blob/migration/src/hooks.ts`
function redirect(location: string, body?: string) {
    return new Response(body, {
        status: 302,
        headers: { location }
    });
}

const checkAuth: Handle = async ({ event, resolve }) => {
    const accessToken = event.cookies.get("access_token");
    const isProtected = protectedRoutes.includes(event.url.pathname);
    if (!accessToken && isProtected) {
        return redirect("/login", "User is unauthorized");
    }
    try {
        if (!event.locals.user) {
            const user = await getMe(event.cookies);
            log("[Fetch user's latest info]:", user);
            if (!user && isProtected) {
                return redirect("/login", "User is unauthorized");
            }
            event.locals.user = user;
        }
    } catch {
        if (isProtected) {
            return redirect("/login", "User is unauthorized");
        }
    }
    return resolve(event);
};

const gameExceptRoutes = ["/sign-out"];

const checkIfInGame: Handle = async ({ event, resolve }) => {
    if (
        event.locals.user &&
        !event.url.pathname.startsWith("/room") &&
        !event.url.pathname.startsWith("/game") &&
        !gameExceptRoutes.includes(event.url.pathname)
    ) {
        try {
            const data = await getCurrentGame(event.cookies);
            log("[Check if user is in game]:", data);
            if (data) {
                return redirect(`/game/${data.match_id}`, "User is currently in game");
            }
        } catch (e) {
            log("Game check error:", e);
        }
    }
    return resolve(event);
};

export const handle = sequence(preloadFont, checkAuth, checkIfInGame);

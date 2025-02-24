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

const protectedRoutes: string[] = ["/home", "/settings", "/solo", "/custom", "/abilities"];

const getIsProtected = (pathname: string) => {
    for (const route of protectedRoutes) {
        if (pathname.startsWith(route)) {
            return true;
        }
    }
};

// custom redirect from joy of code `https://github.com/JoysOfCode/sveltekit-auth-cookies/blob/migration/src/hooks.ts`
function redirect(location: string, body?: string) {
    return new Response(body, {
        status: 302,
        headers: { location }
    });
}

const checkAuth: Handle = async ({ event, resolve }) => {
    const accessToken = event.cookies.get("access_token");
    const isProtected = getIsProtected(event.url.pathname);
    if (!accessToken && isProtected) {
        return redirect("/login", "User is unauthorized");
    }
    try {
        if (accessToken) {
            const user = await getMe(event.cookies);
            log("[Fetch user's info]:", user);
            if (!user) {
                return redirect("/login", "User is unauthorized");
            }
            event.locals.user = user;
        } else {
            if (!isProtected) return resolve(event);
            return redirect("/login", "User is unauthorized");
        }
    } catch {
        if (isProtected) {
            return redirect("/login", "User is unauthorized");
        }
    }
    return resolve(event);
};

const gameExceptRoutes = ["/login", "/register", "/sign-out"];

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
            if (data?.error) {
                if (data.status === 401) {
                    return redirect("/login", "User is unauthorized");
                } else {
                    return redirect("/home", "User is not currently in game");
                }
            }
            if (data?.match_id) {
                return redirect(`/game/${data.match_id}`, "User is currently in game");
            }
        } catch (e) {
            log("Game check error:", e);
        }
    }
    return resolve(event);
};

export const handle = sequence(preloadFont, checkAuth, checkIfInGame);

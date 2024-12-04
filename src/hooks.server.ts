import type { Cookies, Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";
import { getMe } from "$lib/server/auth";

const preloadFont: Handle = async ({ event, resolve }) => {
    return await resolve(event, {
        preload: ({ type }) => type === "font"
    });
};

const protectedRoutes: string[] = ["/home", "/settings"];

// custom redirect from joy of code `https://github.com/JoysOfCode/sveltekit-auth-cookies/blob/migration/src/hooks.ts`
function redirect(location: string, body?: string) {
    return new Response(body, {
        status: 303,
        headers: { location }
    });
}

const checkAuth: Handle = async ({ event, resolve }) => {
    event.locals.user = undefined;
    const accessToken = event.cookies.get("access_token");
    const isProtected = protectedRoutes.includes(event.url.pathname);
    if (!accessToken && isProtected) {
        return redirect("/login", "User is unauthorized");
    }
    try {
        const user = await getMe(event.cookies);
        if (user && user.username) {
            event.locals.user = user;
        } else if (isProtected) {
            return redirect("/login", "User is unauthorized");
        }
    } catch (e: unknown) {
        if (isProtected) {
            return redirect("/login", "User is unauthorized");
        }
    }
    return resolve(event);
};

export const handle = sequence(preloadFont, checkAuth);

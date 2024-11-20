import type { Cookies, Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

export const handle: Handle = async ({ event, resolve }) => {
    const jwt = event.cookies.get("jwt");
    event.locals.user = jwt ? JSON.parse(atob(jwt)) : null;

    const response = await resolve(event, {
        preload: ({ type }) => type === "font"
    });
    return response;
};

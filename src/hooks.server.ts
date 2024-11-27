import type { Cookies, Handle } from "@sveltejs/kit";
import { sequence } from "@sveltejs/kit/hooks";

const preloadFont: Handle = async ({ event, resolve }) => {
    return await resolve(event, {
        preload: ({ type }) => type === "font"
    });
};

export const handle = sequence(preloadFont);

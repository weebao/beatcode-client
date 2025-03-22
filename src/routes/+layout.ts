import posthog from "posthog-js";
import { browser } from "$app/environment";
import type { LayoutLoad } from "./$types";

export const load: LayoutLoad = async () => {
    if (browser) {
        posthog.init("phc_YBl4Zpll1oNoZnGJhrOft6ZbLegGLFXFHQr1EPZFr9m", {
            api_host: "https://us.i.posthog.com",
            capture_pageview: false,
            capture_pageleave: false
        });
    }
    return;
};

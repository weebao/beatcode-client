import posthog from "posthog-js";
import { browser } from "$app/environment";
import { onMount } from "svelte";

onMount(() => {
    if (browser) {
        posthog.init("phc_YBl4Zpll1oNoZnGJhrOft6ZbLegGLFXFHQr1EPZFr9m", {
            api_host: "https://us.i.posthog.com",
            person_profiles: "identified_only"
        });
    }
});

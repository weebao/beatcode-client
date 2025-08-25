import type { PageServerLoad } from "./$types";
import { loginWithGoogle } from "$lib/server/auth";
import { fail, redirect, isRedirect, isHttpError } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { RegisterWithGoogleSchema } from "$models/auth";
import { registerWithGoogle } from "$lib/server/auth";

export const load: PageServerLoad = async ({ url, cookies }) => {
    const params = new URLSearchParams(url.search);
    try {
        const response = await loginWithGoogle(params, cookies);
        if (response.status >= 400) {
            return { status: "error", message: response.error.detail };
        }
        if (response.status === 201) {
            const defaults = {
                username: response.data.name.toLowerCase().replace(/ /g, "_"),
                display_name: response.data.name,
                email: response.data.email,
                google_id: response.data.google_id,
                avatar_url: response.data.avatar_url
            };
            return {
                status: "success",
                info: response.data,
                form: await superValidate(defaults, zod(RegisterWithGoogleSchema))
            };
        }
        redirect(302, "/home");
    } catch (e: unknown) {
        if (isRedirect(e)) throw e;
        if (isHttpError(e)) {
            return { status: "error", message: JSON.stringify(e.body) };
        }
        return { status: "error", message: "An unexpected error occurred" };
    }
};

export const actions = {
    default: async ({ request, cookies }) => {
        const form = await superValidate(request, zod(RegisterWithGoogleSchema));

        if (!form.valid) {
            return fail(400, { form });
        }

        try {
            const response = await registerWithGoogle(form.data, cookies);
            if (response.status === 400) {
                const message: string = response.error.detail;
                if (message.toLowerCase().includes("username")) {
                    form.errors.username = [message];
                } else if (message.toLowerCase().includes("email")) {
                    form.errors.email = [message];
                }
                return fail(400, { form, message });
            }
            if (response.status >= 400) {
                return fail(response.status, { form, message: response.error.detail });
            }
            redirect(302, "/");
        } catch (e: unknown) {
            if (isRedirect(e)) throw e;
            if (isHttpError(e)) {
                return fail(e.status, { form, message: "Something went wrong in the server" });
            }
            return fail(500, { form, message: "An unexpected error occurred" });
        }
    }
};

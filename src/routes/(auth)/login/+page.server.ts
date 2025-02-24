import { LoginSchema } from "$lib/models/auth";
import type { Actions, PageServerLoad } from "./$types";
import { fail, isHttpError, isRedirect, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { login, loginAsGuest } from "$lib/server/auth";

export const load: PageServerLoad = async ({ locals }) => {
    if (locals.user) {
        redirect(302, "/home");
    }

    return {
        form: await superValidate(zod(LoginSchema))
    };
};

export const actions = {
    account: async ({ request, cookies }) => {
        const form = await superValidate(request, zod(LoginSchema));
        const url = new URL(request.headers.get("referer") || "");
        const joiningId = url.searchParams.get("joining");

        if (!form.valid) {
            return fail(400, { form });
        }

        try {
            const response = await login(
                {
                    username: form.data.username,
                    password: form.data.password
                },
                cookies
            );
            if (response.status >= 400) {
                form.errors.password = [response.error.detail];
                return fail(response.status, { form, message: response.error.detail });
            }
            if (joiningId) {
                redirect(302, `/room/${joiningId}`);
            }
            redirect(302, "/home");
        } catch (e: unknown) {
            if (isRedirect(e)) throw e;
            if (isHttpError(e)) {
                console.error(e.body);
                return fail(e.status, { form, message: "Something went wrong in the server" });
            }
            return fail(500, { form, message: "An unexpected error occurred" });
        }
    },
    guest: async ({ request, cookies }) => {
        try {
            const url = new URL(request.headers.get("referer") || "");
            const joiningId = url.searchParams.get("joining");

            const response = await loginAsGuest(cookies);
            if (response.status >= 400) {
                return fail(response.status, { message: response.error.detail });
            }
            if (joiningId) {
                redirect(302, `/room/${joiningId}`);
            }
            redirect(302, "/home");
        } catch (e: unknown) {
            if (isRedirect(e)) throw e;
            if (isHttpError(e)) {
                console.error(e.body);
                return fail(e.status, { message: "Something went wrong in the server" });
            }
            return fail(500, { message: "An unexpected error occurred" });
        }
    }
} satisfies Actions;

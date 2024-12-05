import { LoginSchema } from "$lib/models/auth";
import type { Actions, PageServerLoad } from "./$types";
import { fail, isHttpError, isRedirect, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { login } from "$lib/server/auth";

export const load: PageServerLoad = async ({ locals }) => {
    if (locals.user) {
        redirect(302, "/home");
    }

    return {
        form: await superValidate(zod(LoginSchema))
    };
};

export const actions = {
    default: async ({ request, cookies }) => {
        const form = await superValidate(request, zod(LoginSchema));
        const url = new URL(request.url);
        const roomId = url.searchParams.get("joining");

        if (!form.valid) {
            return fail(400, { form });
        }

        try {
            const response = await login(form.data, cookies);
            console.log(response);
            if (response.status >= 400) {
                form.errors.password = [response.error.detail];
                return fail(response.status, { form, message: response.error.detail });
            }
            if (roomId) {
                redirect(302, `/room/${roomId}`);
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
    }
} satisfies Actions;

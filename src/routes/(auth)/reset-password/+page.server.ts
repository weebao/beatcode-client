import type { Actions, PageServerLoad } from "./$types";
import { fail, isHttpError, isRedirect, redirect } from "@sveltejs/kit";
import { ResetPasswordSchema } from "$lib/models/auth";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { resetPassword } from "$lib/server/auth";

export const load: PageServerLoad = async ({ url }) => {
    const token = url.searchParams.get("token");
    if (!token) {
        redirect(302, "/home");
    }

    return {
        form: await superValidate({ token }, zod(ResetPasswordSchema), {
            errors: false
        })
    };
};

export const actions = {
    default: async ({ request }) => {
        const form = await superValidate(request, zod(ResetPasswordSchema));
        if (!form.valid) {
            return fail(400, { form, message: "Invalid input" });
        }

        try {
            const response = await resetPassword(form.data);
            if (response.status === 400) {
                const message: string = response.error.detail;
                return fail(400, { form, message });
            }
            if (response.status >= 400) {
                return fail(response.status, { form, message: response.error.detail });
            }
            redirect(302, "/login");
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

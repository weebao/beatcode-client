import { LoginSchema } from "$lib/models/auth";
import type { Actions, PageServerLoad } from "./$types";
import { fail, redirect } from "@sveltejs/kit";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { login } from "$lib/server/auth";
import { API_PREFIX } from "$lib/config";

export const load: PageServerLoad = async ({ locals }) => {
    if (locals.user) {
        redirect(302, "/home");
    }

    return {
        form: await superValidate(zod(LoginSchema))
    }
}

export const actions = {
    default: async ({ request, cookies }) => {
        const loginForm = await superValidate(request, zod(LoginSchema));

        if (!loginForm.valid) {
            return fail(400, { loginForm });
        }

        try {
            await login({ username: "", password: "" }, cookies);
            redirect(302, "/home");
        } catch (error: any) {
            return fail(500, {
                loginForm,
                error
            });
        }
    }
} satisfies Actions;

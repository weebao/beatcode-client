import { fail, isHttpError, isRedirect, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { RegisterSchema } from "$lib/models/auth";
import { register } from "$lib/server/auth";

export const load: PageServerLoad = async ({ locals }) => {
    if (locals.user) {
        redirect(302, "/home");
    }

    return {
        form: await superValidate(zod(RegisterSchema))
    };
};

export const actions = {
    default: async ({ request, cookies }) => {
        // console.log("[Server Action] Starting registration process");
        const form = await superValidate(request, zod(RegisterSchema));
        if (!form.valid) {
            return fail(400, { form, message: "Invalid input" });
        }

        cookies.set("temp-email", form.data.email, { path: "/register/success" });
        // console.log("[Server Action] Sending request to API");

        try {
            const response = await register(form.data);
            console.log(response);
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
            // console.log("[Server Action] Registration successful");
            redirect(302, "/register/success");
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

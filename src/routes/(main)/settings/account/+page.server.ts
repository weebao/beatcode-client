import { fail, isHttpError, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { ProfileSchema } from "$models/user";
import { updateMe } from "$lib/server/user";

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.user) {
        redirect(302, "/login");
    }

    return {
        form: await superValidate(locals.user, zod(ProfileSchema))
    };
};

export const actions: Actions = {
    updateProfile: async ({ request, cookies }) => {
        const form = await superValidate(request, zod(ProfileSchema));

        if (!form.valid) {
            return fail(400, { form });
        }

        try {
            const data = await updateMe(form.data, cookies);
            if (data.status >= 400) {
                return fail(data.status, { form, error: data.error });
            }
        } catch (e: unknown) {
            if (isHttpError(e)) {
                console.error(e.body);
                return fail(e.status, { form, message: "Something went wrong in the server" });
            }
            return fail(500, { form, message: "An unexpected error occurred" });
        }
    }
};

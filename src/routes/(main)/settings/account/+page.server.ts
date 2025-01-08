import { fail, redirect } from "@sveltejs/kit";
import type { Actions, PageServerLoad } from "./$types";
import { superValidate } from "sveltekit-superforms";
import { zod } from "sveltekit-superforms/adapters";
import { ProfileSchema } from "$models/user";

export const load: PageServerLoad = async ({ locals }) => {
    if (!locals.user) {
        throw redirect(302, "/login");
    }

    const form = await superValidate(zod(ProfileSchema), {
        values: {
            username: locals.user.username,
            display_name: locals.user.display_name,
            email: locals.user.email
        }
    });

    return { form };
};

export const actions: Actions = {
    default: async ({ request, locals }) => {
        const form = await superValidate(request, zod(ProfileSchema));

        if (!form.valid) {
            return fail(400, { form });
        }

        // Update user profile logic here
        // Example: await updateUserProfile(locals.user.id, form.data);

        return { form };
    }
};
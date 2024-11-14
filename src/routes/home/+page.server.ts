import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals }) => {
    return {
        name: locals.user?.name ?? "",
    };
};
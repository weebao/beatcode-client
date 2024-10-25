// Check if event locals has name yet, if not generate a dialog before entering the game :)
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ locals, params }) => {
    return {
        name: locals.user?.name,
        roomId: params.roomId
    };
};

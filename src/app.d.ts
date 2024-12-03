// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
    interface Locals {
        user?: {
            username: string;
            email: string;
            display_name: string;
            rating: number;
            is_verified?: boolean;
            is_guest?: boolean;
            created_at: number;
            updated_at: number;
            room?: string;
        };
    }
    // interface PageData {}
    // interface Error {}
    // interface Platform {}
}

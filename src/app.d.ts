// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
    interface Locals {
        user?: {
            name?: string;
            token?: string;
            // will add more when auth is done
        };
        roomCode: string;
    }
    // interface PageData {}
    // interface Error {}
    // interface Platform {}
}

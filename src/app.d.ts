// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
// and what to do when importing types
declare namespace App {
    interface Locals {
        user?: {
            username: string;
            email: string;
            displayName: string;
            rating: number;
            isVerified?: boolean;
            isGuest?: boolean;
            createdAt: number;
            updatedAt: number;
            room?: string;
        };
    }
    // interface PageData {}
    // interface Error {}
    // interface Platform {}
}

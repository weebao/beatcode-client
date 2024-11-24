import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { API_URL, API_PREFIX } from '$lib/config';

export const actions = {
    default: async ({ request }) => {
        console.log("[Server Action] Starting registration process");
        const formData = await request.formData();

        const userData = {
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password'),
            display_name: formData.get('displayName') || formData.get('username')
        };

        console.log("[Server Action] Sending request to API");

        try {
            const response = await fetch('http://localhost:8000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });

            console.log("[Server Action] Received response:", {
                status: response.status,
                statusText: response.statusText,
                headers: Object.fromEntries(response.headers.entries())
            });

            const responseText = await response.text();
            console.log("[Server Action] Response body:", responseText);

            let data;
            try {
                data = JSON.parse(responseText);
            } catch (e) {
                console.error("[Server Action] Failed to parse response:", e);
                return fail(500, {
                    error: `Server error: ${responseText}`,
                    values: { username: userData.username, email: userData.email }
                });
            }

            if (!response.ok) {
                console.log("[Server Action] Request failed:", data);
                return fail(response.status, {
                    error: data.detail || 'Registration failed',
                    values: { username: userData.username, email: userData.email }
                });
            }

            console.log("[Server Action] Registration successful");
            return { success: true };
        } catch (error) {
            console.error("[Server Action] Error during registration:", error);
            return fail(500, {
                error: 'Server error during registration',
                values: { username: userData.username, email: userData.email }
            });
        }
    }
} satisfies Actions;
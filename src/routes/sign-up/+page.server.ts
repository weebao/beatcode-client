import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import { API_URL, API_PREFIX } from '$lib/config';
export const actions = {
    default: async ({ request }) => {
        console.log("Form submission started");
        const formData = await request.formData();

        const userData = {
            username: formData.get('username'),
            email: formData.get('email'),
            password: formData.get('password'),
            display_name: formData.get('displayName') || formData.get('username')
        };

        console.log("Sending data:", userData);

        try {
            const response = await fetch('http://localhost:8000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData)
            });

            const responseText = await response.text();
            console.log("Raw response:", responseText);

            let data;
            try {
                data = JSON.parse(responseText);
            } catch (e) {
                console.error("Failed to parse response:", responseText);
                return fail(500, {
                    error: `Server error: ${responseText}`,
                    values: { username: userData.username, email: userData.email }
                });
            }

            if (!response.ok) {
                return fail(response.status, {
                    error: data.detail || 'Registration failed',
                    values: { username: userData.username, email: userData.email }
                });
            }

            return { success: true };
        } catch (error) {
            console.error("Error:", error);
            return fail(500, {
                error: 'Server error during registration',
                values: { username: userData.username, email: userData.email }
            });
        }
    }
};
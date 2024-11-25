import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';
import {fetchUserData} from "$models/user";
export const actions = {
    default: async ({ request }) => {
        const formData = await request.formData();

        const params = new URLSearchParams();
        params.append('username', formData.get('email')?.toString() || '');
        params.append('password', formData.get('password')?.toString() || '');

        try {
            const response = await fetch('http://localhost:8000/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: params
            });

            // Log the raw response for debugging
            const responseText = await response.text();
            console.log("Raw response:", responseText);

            let data;
            try {
                data = JSON.parse(responseText);
            } catch (e) {
                console.error("Failed to parse response:", responseText);
                return fail(500, {
                    error: 'Invalid server response',
                    details: responseText
                });
            }

            if (!response.ok) {
                return fail(response.status, {
                    error: data?.detail || 'Login failed',
                    email: formData.get('email')
                });
            }

            return {
                success: true,
                tokens: data
            };
        } catch (error) {
            console.error("Login error:", error);
            return fail(500, {
                error: 'Server error during login',
                email: formData.get('email')
            });
        }
    }
};
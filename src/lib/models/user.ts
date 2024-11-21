import { writable } from 'svelte/store';

export interface User {
    username: string;
    email: string;
    display_name: string;
    rating: number;
    is_verified: boolean;
    created_at: number;
    updated_at?: number;
}

export interface LoginResponse {
    access_token: string;
    refresh_token: string;
}

export const user = writable<User | null>(null);

export async function fetchUserData(token: string): Promise<User | null> {
    try {
        const response = await fetch('http://localhost:8000/api/users/me', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response.ok) {
            const userData = await response.json();
            console.log("User Data:", userData)
            user.set(userData);
            return userData;
        }
        return null;
    } catch (error) {
        console.error('Error fetching user:', error);
        return null;
    }
}

export async function handleLoginResponse(data: LoginResponse) {
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
    return await fetchUserData(data.access_token);
}
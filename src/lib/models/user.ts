export interface User {
    username: string;
    email: string;
    displayName: string;
    rating: number;
    isVerified?: boolean;
    isGuest?: boolean;
    createdAt: number;
    updatedAt: number;
    room?: string;
}

export interface LoginResponse {
    access_token: string;
    refresh_token: string;
}

export interface User {
    username: string;
    email: string;
    display_name: string;
    rating: number;
    is_verified?: boolean;
    is_guest?: boolean;
    created_at: number;
    updated_at: number;
    room?: string;
}

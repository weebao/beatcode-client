export type JwtPayload = {
  exp: number;
  secret: string | null;
  [key: string]: any; // To allow additional properties
}
export interface Tokens {
  access_token: string;
  refresh_token: string;
}
export interface LoginResponse {
  tokens: Tokens;
  error?: string;
}
export interface LoginFormResult {
  type: 'success' | 'failure';
  data?: LoginResponse;
  error?: string;
}
export interface LoginData {
  email: string;
  password: string;
}
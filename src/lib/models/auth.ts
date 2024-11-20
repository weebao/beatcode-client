export type JwtPayload = {
  exp: number;
  secret: string | null;
  [key: string]: any; // To allow additional properties
}
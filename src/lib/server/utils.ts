import type { Cookies } from "@sveltejs/kit";
import jwt from "jsonwebtoken";

export const setAccessTokenCookie = (cookies: Cookies, accessToken: string) => {
  const { exp } = jwt
  cookies.set("accessToken", atob(accessToken), {
    httpOnly: true,
    path: "/",
    secure: true,
    sameSite: "strict"
  });
}

export const setRefreshTokenCookie = (cookies: Cookies, refreshToken: string) => {
  cookies.set("refreshToken", atob(refreshToken), {
    httpOnly: true,
    path: "/",
    secure: true,
    sameSite: "strict"
  });
}
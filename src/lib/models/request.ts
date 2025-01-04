// Referenced from @algebra2boy - Yongye Tan

import type { Cookies } from "@sveltejs/kit";

/**
 * Represents the JSON payload for an HTTP request.
 *
 * @type HttpPayload
 * @property {string | number | boolean | null | undefined} [key] - A key-value pair where the key is a string and the value can be a string, number, boolean, null, or undefined.
 */
export interface HttpJSONPayload {
    [key: string]: string | number | boolean | null | HttpJSONPayload | undefined;
}

export type HttpPayload = HttpJSONPayload | FormData | URLSearchParams;

/**
 * Represents an HTTP request configuration for fetching data.
 *
 * @property {'GET' | 'POST' | 'DELETE' | 'PUT'} method
 * The HTTP method to be used for the request. Common methods include GET, POST, DELETE, and PUT.
 *
 * @property {string} path
 * The path name of the endpoint (e.g., /auth/login).
 *
 * @property {HttpPayload} [data]
 * The data to be sent to the server in JSON format. This is optional and can be used for POST and PUT requests since not every endpoint requires a request body.
 *
 * @property {Cookies} [cookies]
 * The cookies to be sent to the server. This is optional and can be used to authenticate the user.
 *
 * @property {boolean} [refresh]
 * Whether to refresh the access token if the request is unauthorized. This is optional and can be used to refresh the access token if it has expired.
 */
export interface HttpRequestFetch {
    method: "GET" | "POST" | "DELETE" | "PUT" | "PATCH";
    path: string;
    data?: HttpPayload;
    cookies?: Cookies;
    refresh?: boolean;
}

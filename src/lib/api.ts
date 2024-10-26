// Referenced from @algebra2boy - Yongye Tan

import { error, type NumericRange } from "@sveltejs/kit";
import type { HttpRequestFetch, HttpPayload } from "$lib/types/request";

/* The base URL of the backend API */
const baseURL = "http://127.0.0.1:8000/api";

/**
 * Sends an HTTP request to the specified path with the given method, data, and token.
 *
 * @param {HttpRequestFetch} params - The parameters for the HTTP request.
 * @param {string} params.method - The HTTP method to use (e.g., 'GET', 'POST').
 * @param {string} params.path - The path to send the request to.
 * @param {any} [params.data] - The data to send with the request, if any.
 * @param {string} [params.token] - The authorization token to include in the request headers, if any.
 * @returns {Promise<any>} A promise that resolves to the response data or an error object with the status code.
 * @throws Will throw an error if the request fails with a server error (status code 500-599).
 */
async function send({ method, path, data, token }: HttpRequestFetch): Promise<any> {
    const options: RequestInit = {};

    // Specifying the HTTP request options and method
    options.method = method;
    options.headers = {};

    // Check if there is data, transform it to JSON and add to the body
    if (data) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(data);
    }

    // Check if there is a web token, add that to authorization header
    // if (token) {
    //     options.headers["Authorization"] = `Bearer ${token}`;
    // }
    console.log(`${method}: ${baseURL}${path}`);

    // Start fetching the endpoint and convert the response body to json
    let responseStatus = 500;
    try {
        const response = await fetch(`${baseURL}${path}`, options);
        const json = await response.json();

        responseStatus = response.status;

        // Successful response status
        if (response.ok || response.status === 201) {
            return json;
        }

        // Client errors ranging from 400 to 499
        if (response.status >= 400 || response.status <= 499) {
            return { error: json, status: response.status };
        }
    } catch (e) {
        // Unexpected server errors ranging from 500 to 599
        error(responseStatus as NumericRange<500, 599>);
    }
}

/**
 * Sends a GET request to the specified path.
 *
 * @param path - The endpoint path to send the GET request to.
 * @param token - Optional. The authorization token to include in the request headers.
 * @returns A promise that resolves with the response of the GET request.
 */
export function get(path: string, token?: string) {
    return send({ method: "GET", path, token });
}

/**
 * Sends a POST request to the specified path with the given data and token.
 *
 * @param path - The endpoint path to which the POST request is sent.
 * @param data - Optional payload to be sent with the POST request.
 * @param token - Optional authentication token to be included in the request headers.
 * @returns A promise that resolves with the response of the POST request.
 */
export function post(path: string, data?: HttpPayload, token?: string) {
    return send({ method: "POST", path, data, token });
}

/**
 * Sends a DELETE request to the specified path.
 *
 * @param path - The endpoint path to send the DELETE request to.
 * @param token - Optional. The authentication token to include in the request headers.
 * @returns A promise that resolves with the response of the DELETE request.
 */
export function del(path: string, token?: string) {
    return send({ method: "DELETE", path, token });
}

/**
 * Sends a PUT request to the specified path with the provided data and token.
 *
 * @param path - The endpoint path to send the PUT request to.
 * @param data - Optional payload to include in the PUT request.
 * @param token - Optional authentication token to include in the request headers.
 * @returns A promise that resolves with the response of the PUT request.
 */
export function put(path: string, data?: HttpPayload, token?: string) {
    return send({ method: "PUT", path, data, token });
}

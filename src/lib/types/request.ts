// Referenced from @algebra2boy - Yongye Tan

/**
 * Represents the payload for an HTTP request.
 * 
 * @type HttpPayload
 * @property {string | number | boolean | null | undefined} [key] - A key-value pair where the key is a string and the value can be a string, number, boolean, null, or undefined.
 */
export type HttpPayload = {
  [key: string]: string | number | boolean | null | undefined;
};

/**
 * Represents an HTTP request configuration for fetching data.
 * 
 * @type HttpRequestFetch
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
 * @property {string} [token]
 * The JSON Web Token to be sent to the server to verify the user's identity. This is optional.
 */
export type HttpRequestFetch = {
  method: 'GET' | 'POST' | 'DELETE' | 'PUT';
  path: string;
  data?: HttpPayload;
  token?: string;
};

import api from "./api";
import { io, Socket } from "socket.io-client";
import type { RoomResponse } from "$lib/types/response";


/**
 * Creates a new game room with the specified player name.
 *
 * @param player_name - The name of the player creating the room.
 * @returns A promise that resolves to the response data containing the room details.
 */
export async function createRoom(player_name: string): Promise<RoomResponse> {
  const response = await api.post('/create-room', { player_name });
  return response.data;
}

/**
 * Joins a room with the given room code and player name.
 *
 * @param room_code - The code of the room to join.
 * @param player_name - The name of the player joining the room.
 * @returns A promise that resolves to a RoomResponse object.
 */
export async function joinRoom(room_code: string, player_name: string): Promise<RoomResponse> {
  const response = await api.post(`/join-room/${room_code}`, { player_name });
  return response.data;
}

/**
 * Establishes a connection to a game room using the provided room code and player ID.
 *
 * @param room_code - The unique code identifying the game room.
 * @param player_id - The unique identifier for the player.
 */
export function connectToRoom(room_code: string, player_id: string): Socket {
  const socket = io(`/ws/${room_code}/${player_id}`);
  return socket;
}
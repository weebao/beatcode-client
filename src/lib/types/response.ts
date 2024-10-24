/**
 * Represents the response received when interacting with a room.
 * 
 * @typedef {Object} RoomResponse
 * @property {string} room_code - The unique code identifying the room.
 * @property {string} player_id - The unique identifier of the player.
 */
export type RoomResponse = {
  room_code: string;
  player_id: string;
}
import { z } from "zod";
import { RoomSettingsSchema } from "./models/room";

export const CreateRoomSchema = z.object({
    settings: RoomSettingsSchema
});

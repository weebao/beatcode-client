import { z } from "zod";
import type { HttpJSONPayload } from "./request";
import { DefaultRoomSettings } from "$assets/config/room";

export interface RoomSettings extends HttpJSONPayload {
    problem_count: number;
    starting_hp: number;
    base_hp_deduction: number;
    hp_multiplier_easy: number;
    hp_multiplier_medium: number;
    hp_multiplier_hard: number;
    distribution_mode: "auto" | "fixed";
    prob_easy: number;
    prob_medium: number;
    prob_hard: number;
    starting_sp: number;
    starting_mp: number;
    mana_recharge: number;
}

export const RoomSettingsSchema = z
    .object({
        problem_count: z.number().int().min(1).max(100).default(DefaultRoomSettings.problem_count),
        starting_hp: z.number().int().min(1).max(1000).default(DefaultRoomSettings.starting_hp),
        base_hp_deduction: z
            .number()
            .int()
            .min(1)
            .max(100)
            .default(DefaultRoomSettings.base_hp_deduction),
        hp_multiplier_easy: z.number().min(1).default(DefaultRoomSettings.hp_multiplier_easy),
        hp_multiplier_medium: z.number().min(1).default(DefaultRoomSettings.hp_multiplier_medium),
        hp_multiplier_hard: z.number().int().min(1).default(DefaultRoomSettings.hp_multiplier_hard),
        distribution_mode: z.enum(["auto", "fixed"]).default(DefaultRoomSettings.distribution_mode),
        prob_easy: z.number().min(0).max(1).default(DefaultRoomSettings.prob_easy),
        prob_medium: z.number().min(0).max(1).default(DefaultRoomSettings.prob_medium),
        prob_hard: z.number().min(0).max(1).default(DefaultRoomSettings.prob_hard),
        starting_sp: z.number().int().min(1).max(1000).default(DefaultRoomSettings.starting_sp),
        starting_mp: z.number().int().min(1).max(1000).default(DefaultRoomSettings.starting_mp),
        mana_recharge: z.number().int().min(1).max(1000).default(DefaultRoomSettings.mana_recharge)
    })
    .refine((data) => data.prob_easy + data.prob_medium + data.prob_hard === 1, {
        message: "Probabilities must add up to 1",
        path: ["prob_easy", "prob_medium", "prob_hard"]
    });

export const JoinRoomSchema = z.object({
    room_code: z.string().length(6, "Room code must be exactly 6 characters")
});

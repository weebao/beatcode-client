import { z } from "zod";

export type RoomSettings = {
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
};

export const RoomSettingsSchema = z.object({
    problem_count: z.number().int().min(1).max(100),
    starting_hp: z.number().int().min(1).max(1000),
    base_hp_deduction: z.number().int().min(1).max(100),
    hp_multiplier_easy: z.number().int().min(1).max(100),
    hp_multiplier_medium: z.number().int().min(1).max(100),
    hp_multiplier_hard: z.number().int().min(1).max(100),
    distribution_mode: z.enum(["auto", "fixed"]),
    prob_easy: z.number().int().min(0).max(100),
    prob_medium: z.number().int().min(0).max(100),
    prob_hard: z.number().int().min(0).max(100),
    starting_sp: z.number().int().min(1).max(1000),
    starting_mp: z.number().int().min(1).max(1000),
    mana_recharge: z.number().int().min(1).max(1000)
});

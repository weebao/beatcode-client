import type { RoomSettings } from "$models/room";

export const DefaultRoomSettings: RoomSettings = {
    problem_count: 3,
    starting_hp: 100,
    base_hp_deduction: 4,
    hp_multiplier_easy: 1.0,
    hp_multiplier_medium: 1.5,
    hp_multiplier_hard: 2.0,
    distribution_mode: "auto",
    prob_easy: 1,
    prob_medium: 1,
    prob_hard: 1,
    starting_sp: 100,
    starting_mp: 100,
    mana_recharge: 50
};

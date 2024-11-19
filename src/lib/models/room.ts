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

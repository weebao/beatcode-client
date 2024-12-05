export interface GameState {
    match_id: string;
    opponent_name: string;
    opponent_display_name: string;
    current_problem_index: number;
    problems_solved: number;
    opponent_problems_solved: number;
    your_hp: number;
    opponent_hp: number;
    match_type: string;
    start_time: number;
    status: string;
    winner: string;
    rating_change: number;
    skill_points: number;
    mana_points: number;
    abilities: string[];
}

export interface ProblemDetails {
    title: string;
    description: string; // HTML btw
    difficulty: "easy" | "medium" | "hard";
    sample_test_cases: string[];
    sample_test_results: string[];
    boilerplate: string; // code
}

export interface SubmissionResults {
    success: boolean;
    message: string | null;
    test_results: {
        expected: string;
        output: string;
        passed: boolean;
        error: string | null;
    }[];
    summary: {
        total_tests: number;
        passed_tests: number;
    };
    deducted_hp: number;
    problem_solved: boolean;
}

export interface Chat {
    message: string;
    sender: string;
    timestamp: number;
}

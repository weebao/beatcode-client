export interface PlayerInfo {
    hp: number;
    name: string;
    current_challenge: number;
    solved_test_cases: number;
}

export interface ChallengeInfo {
    title: string;
    description: string;
    signature: string;
}

export interface ExecutionResults {
    passed: number;
    totalTestCases: number;
}

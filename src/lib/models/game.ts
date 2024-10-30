export type PlayerInfo = {
    hp: number;
    name: string;
    current_challenge: number;
    solved_test_cases: number;
};

export type ChallengeInfo = {
    title: string;
    description: string;
    signature: string;
};

export type ExecutionResults = {
    passed: number;
    totalTestCases: number;
};

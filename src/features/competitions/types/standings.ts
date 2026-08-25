export interface TeamPosition {
    teamId: number;
    emblem: string;
    teamShortName: string;
    position: number;
    playedGames: number;
    form: string;
    won: number;
    draw: number;
    lost: number;
    points: number;
    goalsFor: number;
    goalsAgainst: number;
    goalDifference: number;
}
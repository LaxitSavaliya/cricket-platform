export type MatchStatus = "live" | "upcoming" | "completed";

export type MatchStage =
  "Group Stage" | "Quarter Final" | "Semi Final" | "Final";

export interface TournamentPlayer {
  id: string;
  name: string;
  role: "Batsman" | "Bowler" | "All-Rounder" | "Wicketkeeper";
  isCaptain?: boolean;
  isViceCaptain?: boolean;
  avatarUrl?: string;
  jerseyNumber?: number;
  battingStyle?: string;
  bowlingStyle?: string;
}

export interface TournamentTeam {
  id: string;
  name: string;
  shortCode: string;
  logoUrl?: string;
  group: "Group A" | "Group B";
  captainName: string;
  coachName?: string;
  city: string;
  playersCount: number;
  players: TournamentPlayer[];
  stats: {
    matches: number;
    won: number;
    lost: number;
    points: number;
    nrr: number;
  };
}

export interface TournamentMatchInnings {
  runs: number;
  wickets: number;
  overs: number;
}

export interface TournamentMatch {
  id: string;
  matchNumber: number;
  stage: MatchStage;
  group?: "Group A" | "Group B";
  teamA: {
    id: string;
    name: string;
    shortCode: string;
    score?: TournamentMatchInnings;
  };
  teamB: {
    id: string;
    name: string;
    shortCode: string;
    score?: TournamentMatchInnings;
  };
  status: MatchStatus;
  date: string;
  time: string;
  venue: string;
  resultSummary?: string;
  currentOverDetails?: string; // e.g. "Over 14.3: 112/3 (RR: 7.72, Req: 8.8)"
  tossInfo?: string;
}

export interface PointsTableEntry {
  rank: number;
  teamId: string;
  teamName: string;
  shortCode: string;
  group: "Group A" | "Group B";
  played: number;
  won: number;
  lost: number;
  tied: number;
  noResult: number;
  netRunRate: number;
  points: number;
  form: ("W" | "L" | "T" | "NR")[];
  qualified?: boolean;
}

export interface TournamentSettings {
  format: "T20" | "T10" | "ODI" | "Custom";
  oversPerInnings: number;
  ballsPerOver: number;
  powerplayOvers: number;
  maxOversPerBowler: number;
  ballType:
    "Leather (White)" | "Leather (Red)" | "Leather (Pink)" | "Tennis (Heavy)";
  pitchType: "Natural Turf" | "Astro Turf" | "Matting";
  superOverEnabled: boolean;
  dlsMethodEnabled: boolean;
  widePenalty: number;
  noBallPenalty: number;
  freeHitOnNoBall: boolean;
  leadUmpire: string;
  officialScorer: string;
}

export interface TournamentMilestone {
  id: string;
  title: string;
  date: string;
  status: "completed" | "active" | "upcoming";
  description: string;
}

export interface TournamentDetailData {
  name: string;
  slug: string;
  status: "Active" | "Upcoming" | "Completed";
  formatBadge: string;
  location: string;
  startDate: string;
  endDate: string;
  prizePool: string;
  bannerGradient: string;
  summaryStats: {
    totalTeams: number;
    totalMatches: number;
    completedMatches: number;
    totalRuns: number;
    totalWickets: number;
    topBatter: {
      name: string;
      team: string;
      runs: number;
      strikeRate: number;
    };
    topBowler: {
      name: string;
      team: string;
      wickets: number;
      economy: number;
    };
  };
  teams: TournamentTeam[];
  matches: TournamentMatch[];
  pointsTable: PointsTableEntry[];
  milestones: TournamentMilestone[];
  settings: TournamentSettings;
}

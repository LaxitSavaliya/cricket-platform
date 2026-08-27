import { getTournamentsServer, TournamentView } from "@/features/tournament";

export const metadata = {
  title: "Tournaments | Cricket Scoring & Management",
  description:
    "Manage your organization's cricket tournaments, teams, and matches.",
};

export default async function TournamentPage() {
  const initialData = await getTournamentsServer();

  return <TournamentView initialData={initialData} />;
}

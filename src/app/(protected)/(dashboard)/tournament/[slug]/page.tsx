import { TournamentDetailView } from "@/features/tournament/detail";

interface TournamentDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: TournamentDetailPageProps) {
  const { slug } = await params;
  const title = slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return {
    title: `${title || "Tournament"} | Management`,
    description: `Manage teams, fixtures, live scorecards, and standings for ${title}.`,
  };
}

export default async function TournamentDetailPage({
  params,
}: TournamentDetailPageProps) {
  const { slug } = await params;

  return <TournamentDetailView slug={slug} />;
}

import { getAnimeCharacterById } from "@/lib/jikan";
import CharacterPage from "./CharacterPage";

// Metadata for the character page
export function generateMetadata({ params }) {
  let { name } = params;
  name = decodeURIComponent(name);
  const formattedName = name.replace(/-/g, " ");

  return {
    title: `${formattedName} - Zoro Anime Character`,
    description: `Explore details, anime appearances, and stats for ${formattedName} on Zoro Anime.`,
    keywords: [formattedName, "anime character", "Zoro Anime"],
    openGraph: {
      title: `${formattedName} - Zoro Anime Character`,
      description: `Explore details, anime appearances, and stats for ${formattedName} on Zoro Anime.`,
      url: `https://zorotv.run/character/${encodeURIComponent(name)}`,
      siteName: "Zoro Anime",
      images: [
        {
          url: "/zoro.png", // fallback image since no API call
          width: 800,
          height: 1200,
          alt: formattedName,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${formattedName} - Zoro Anime Character`,
      description: `Explore details, anime appearances, and stats for ${formattedName} on Zoro Anime.`,
      images: ["/zoro.png"],
    },
  };
}

export default async function CharacterPageDetail({ params }) {
  const { id } = params;
  const { data } = await getAnimeCharacterById({ id });

  return (
    <>
      <CharacterPage character={data} />
    </>
  );
}

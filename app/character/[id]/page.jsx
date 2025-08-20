import { getAnimeCharacterById } from "@/lib/jikan";
import CharacterPage from "./CharacterPage";
export default async function CharacterPageDetail({ params }) {
  const { id } = params;
  const { data } = await getAnimeCharacterById({ id });

  return (
    <>
      <CharacterPage character={data} />
    </>
  );
}

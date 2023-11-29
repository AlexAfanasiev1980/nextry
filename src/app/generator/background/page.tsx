import GeneratorContainer from "@/components/pages/generatorContainer/GeneratorContainer";
import { getClothes, getCategories } from "@/lib/data";

export default async function GeneratorBackground({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const face = await getClothes(searchParams);

  const data = {
    clothes: [face[1]] || [],
  };

  return <GeneratorContainer data={data} />;
}
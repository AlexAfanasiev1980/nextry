import GeneratorContainer from "@/components/pages/generatorContainer/GeneratorContainer";
import { getClothes, getCategories } from "@/lib/data";

export default async function GeneratorFaseSwap({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const face = await getClothes(searchParams);

  const data = {
    clothes: face || [],
  };

  return <GeneratorContainer data={data} />;
}

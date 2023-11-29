import GeneratorContainer from "@/components/pages/generatorContainer/GeneratorContainer";
import { getClothes, getCategories } from "@/lib/data";
import mockDataBackground from '@/assets/mockData';

export default async function GeneratorBackground({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const face = await getClothes(searchParams);

  const data = {
    clothes: mockDataBackground || [],
  };

  return <GeneratorContainer data={data} />;
}
import Header from "@/components/header/Header";
import GeneratorContainer from "@/components/pages/generatorContainer/GeneratorContainer";
import { getClothes, getCategories } from "@/lib/data";

export default async function Generator({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const clothes = await getClothes(searchParams);
  const categories = await getCategories();
  const data = {
    clothes: clothes || [],
    categories: categories || [],
  };

  return (
    <>
      <Header type="generator" />
      <GeneratorContainer data={data} />
    </>
  );
}

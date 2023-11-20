import Header from "@/components/header/Header";
import GeneratorContainer from "@/components/pages/generatorContainer/GeneratorContainer";
import { getData } from "@/lib/data";

export default async function Generator({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const data = await getData(searchParams);

  return (
    <>
      <Header type="generator" />
      <GeneratorContainer data={data} />
    </>
  );
}

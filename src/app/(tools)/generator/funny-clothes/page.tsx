import { GET_CLOTHES_API } from "@/api";
import FunnyClothesPage from "@/components/pages/funnyClothesPage/FunnyClothesPage";
import { createRequest } from "@/lib/data";
export const runtime = "edge"
export interface ITemplate {
  id: string;
  title: string;
  brand_url: string;
  preview_url: string;
}

export default async function FunnyClothes() {
  
  const template: ITemplate[] = await createRequest(
    `${GET_CLOTHES_API}?tool=fitting_funny_room`
  );
  const data: ITemplate[] = template || [];

  return <FunnyClothesPage template={data} />;
}

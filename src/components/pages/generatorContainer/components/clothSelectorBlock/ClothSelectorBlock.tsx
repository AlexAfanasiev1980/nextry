import { GET_CATEGORIES_API, GET_CLOTHES_API } from "@/api";
import ContentBlock from "./ContentBlock";
import style from "./ClothSelectorBlock.module.scss";
import { Categories, Clothes } from "@/lib/data";

export interface Props {
  setStatusSelector: (status: boolean) => void;
  setSelectId: (id: string) => void;
  data: {
    categories: Categories[];
    clothes: Clothes[];
  };
}

const ClothSelectorBlock = (props: Props) => {
  return (
    <section className={style.clothSelectorBlock}>
      <ContentBlock {...props} />
    </section>
  );
};

export default ClothSelectorBlock;

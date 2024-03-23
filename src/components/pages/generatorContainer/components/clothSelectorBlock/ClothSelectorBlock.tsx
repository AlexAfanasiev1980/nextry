import ContentBlock from "./ContentBlock";
import style from "./ClothSelectorBlock.module.scss";
import { Categories, Clothes } from "@/lib/data";
import LGBorder from "@/components/ui/lGBorder/LGBorder";

export interface Props {
  setStatusSelector: (status: boolean) => void;
  setSelectId: (id: string) => void;
  selectId: string | null;
  selectorTitle: string;
  data: {
    categories?: Categories[];
    clothes: Clothes[];
  };
}

const ClothSelectorBlock = (props: Props) => {
  const styles = {
    padding: '1px',
    colorTop: 'rgba(250, 250, 250, 0.27)',
    colorBottom: 'rgba(250,250,250, 0)',
    borderRadius: '16px'
  }

  return (
    <LGBorder styles={styles} className={style.wrapper}>
      <section className={style.clothSelectorBlock}>
        <ContentBlock {...props} />
      </section>
    </LGBorder>
  );
};

export default ClothSelectorBlock;

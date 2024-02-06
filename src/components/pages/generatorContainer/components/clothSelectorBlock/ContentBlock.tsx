"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { BASE_URL } from "@/api";
import style from "./ClothSelectorBlock.module.scss";
import { Props } from "./ClothSelectorBlock";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Typography from "@/components/ui/typography/Typography";
import Button from "@/components/ui/button/Button";
import usePosition from "./usePosition";
import { Clothes } from "@/lib/data";

const ContentBlock = ({
  setStatusSelector,
  setSelectId,
  selectId,
  data,
}: Props) => {
  const { categories, clothes } = data;
  const [selectedCategories, setSelectedCategories] = useState<string | undefined>(categories && categories[1].name);
  const [selectedClothes, setSelectedClothes] = useState<Clothes[]>([]);
  const currentIndex = useMemo(() => {
    return categories?.findIndex(({ name }) => {
      return name === selectedCategories;
    });
  }, [categories, selectedCategories]);
  const { position } = usePosition({
    count: 3,
    currentIndex: currentIndex || 0,
  });
  const [selectedSubCategories, setSelectedSubCategories] =
    useState<string>("");
  const [selectedCloth, setSelectedCloth] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const styleLeft = {
    left: `${position}%`,
  };

  const handleClothStyle = (id: string) =>
    selectedCloth === "" || id == selectedCloth
      ? style.card
      : [style.card, style.opacityCard].join(" ");

  const handleSearch = (type: string, name: string) => {
    const params = new URLSearchParams(searchParams);
    if (type === "sub_category" && selectedSubCategories === name) {
      setSelectedSubCategories("");
      params.delete(type);
    } else if (type !== "category") {
      setSelectedSubCategories(name);
      params.set(type, name);
    }
    if (type === "category") {
      setSelectedSubCategories("");
      setSelectedCategories(name);
      params.set(type, name);
      params.delete("sub_category");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  const handleSelectCloth = (id: string) => {
    setSelectedCloth(id);
    setSelectId(id);
    setStatusSelector(true);
  };

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (selectedCategories && selectedCategories !== params.get("category")) {
      handleSearch("category", selectedCategories);
    } else {
      setSelectedClothes(clothes);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clothes, searchParams, selectedCategories]);

  useEffect(() => {
    if (selectId) {
      setSelectedCloth(selectId);
    } else {
      setSelectedCloth("");
    }
  }, [selectId]);

  return (
    <>
      <section className={style.navSection}>
        <Typography variant="h3">Select a background</Typography>
        <nav className={style.navbar}>
          {categories &&
            categories.map(({ name, color, display_name }, id) => {
              if (id < 3) {
                return (
                  <button
                    className={[style.btn].join(" ")}
                    key={id}
                    onClick={() => handleSearch("category", name)}
                  >
                    {display_name}
                  </button>
                );
              }
            })}
          {categories && (
            <div className={style.navbar__button} style={styleLeft}>
              <Button type="button" border>
                {categories?.filter((el) => el.name === selectedCategories)[0]
                  .display_name || ""}
              </Button>
            </div>
          )}
        </nav>
        <nav className={`${style.navbar_subCategories}`}>
          {categories &&
            currentIndex !== undefined &&
            categories[currentIndex].subCategoryDetails.map((el, id) => (
              <button
                className={[
                  style.subCategories,
                  el.name === selectedSubCategories ? style["btn-fill"] : null,
                ].join(" ")}
                key={el.id}
                onClick={() => handleSearch("sub_category", el.name)}
              >
                {el.name}
              </button>
            ))}
        </nav>
      </section>
      <section className={style.cardBlock}>
        <div className={style.cardList}>
          {selectedClothes.length > 0 &&
            selectedClothes.map(({ id, title, preview_url, brand_url }) => (
              <div
                key={id}
                className={handleClothStyle(id)}
                onClick={() => handleSelectCloth(id)}
              >
                <div className={style.card__imageWrapper}>
                  <Image
                    src={
                      pathname.includes("background")
                        ? preview_url
                        : BASE_URL + preview_url
                    }
                    width={140}
                    height={160}
                    alt="cloth image"
                    className={style.card__image}
                  />
                </div>
                <Typography variant="p1" className={style.card__text}>
                  {title}
                </Typography>
              </div>
            ))}
        </div>
      </section>
    </>
  );
};

export default ContentBlock;

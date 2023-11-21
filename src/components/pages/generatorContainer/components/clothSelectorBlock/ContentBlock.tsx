"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { BASE_URL } from "@/api";
import style from "./ClothSelectorBlock.module.scss";
import { Props } from "./ClothSelectorBlock";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

const category: { [key: string]: string } = {
  woman: "Woman",
  man: "Man",
  kid: "Kids",
};

const ContentBlock = ({ setStatusSelector, setSelectId, data }: Props) => {
  const { categories, clothes } = data || { categories: [], clothes: [] };
  const [selectedCategories, setSelectedCategories] = useState<string>("man");
  const [selectedSubCategories, setSelectedSubCategories] =
    useState<string>("");
  const [selectedCloth, setSelectedCloth] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace, refresh } = useRouter();

  const currentIndex = useMemo(() => {
    return categories?.findIndex(({ name }) => {
      return name === selectedCategories;
    });
  }, [categories, selectedCategories]);

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

  return (
    <>
      <section className={style.navSection}>
        <nav className={style.navbar}>
          {categories?.map(({ name, color }, id) => (
            <button
              className={[
                style.btn,
                name === selectedCategories ? style["btn-fill"] : null,
              ].join(" ")}
              key={id}
              onClick={() => handleSearch("category", name)}
            >
              {category[name]}
            </button>
          ))}
        </nav>
        <nav className={style.navbar}>
          {categories.length > 0 &&
            currentIndex &&
            categories[currentIndex].subCategoryDetails.map((el, id) => (
              <button
                className={[
                  style.btn,
                  style.subCategories,
                  el.name === selectedSubCategories ? style["btn-fill"] : null,
                ].join(" ")}
                key={id}
                onClick={() => handleSearch("sub_category", el.name)}
              >
                {el.name}
              </button>
            ))}
        </nav>
      </section>
      <section className={style.cardBlock}>
        <div className={style.cardList}>
          {clothes.length > 0 &&
            clothes.map(({ id, title, preview_url, brand_url }) => (
              <div
                key={id}
                className={handleClothStyle(id)}
                onClick={() => handleSelectCloth(id)}
              >
                <div>
                  <Image
                    src={BASE_URL + preview_url}
                    width={150}
                    height={170}
                    alt="cloth image"
                    className={style.card__image}
                  />
                </div>

                <p>{title}</p>
              </div>
            ))}
        </div>
      </section>
    </>
  );
};

export default ContentBlock;

"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { BASE_URL } from "@/api";
import style from "./ClothSelectorBlock.module.scss";
import { Props } from "./ClothSelectorBlock";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import Typography from "@/components/ui/typography/Typography";
import Button from "@/components/ui/button/Button";
import usePosition from "./usePosition";

const ContentBlock = ({ setStatusSelector, setSelectId, data }: Props) => {
  const { categories, clothes } = data;
  const [selectedCategories, setSelectedCategories] = useState<string>("man");
  const currentIndex = useMemo(() => {
    return categories?.findIndex(({ name }) => {
      return name === selectedCategories;
    });
  }, [categories, selectedCategories]);
  const { position } = usePosition({ count: 3, currentIndex });
  const [selectedSubCategories, setSelectedSubCategories] =
    useState<string>("");
  const [selectedCloth, setSelectedCloth] = useState("");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  console.log(BASE_URL + clothes[0].preview_url)

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
          <div className={style.navbar__button} style={styleLeft}>
            <Button type="button" border>
              {categories?.filter((el) => el.name === selectedCategories)[0]
                .display_name || ""}
            </Button>
          </div>
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
          {clothes.length > 0 &&
            clothes.map(({ id, title, preview_url, brand_url }) => (
              <div
                key={id}
                className={handleClothStyle(id)}
                onClick={() => handleSelectCloth(id)}
              >
                <div>
                  <Image
                    src={
                      pathname.includes("background")
                        ? preview_url
                        : BASE_URL + preview_url
                    }
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

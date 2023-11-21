import { GET_CATEGORIES_API, GET_CLOTHES_API, GENERATE_IMAGE } from "@/api";

const token = process.env.NEXT_PUBLIC_TOKEN;

export interface Clothes {
  id: string;
  title: string;
  brand_url: string;
  preview_url: string;
}

interface SubCategory {
  name: string;
  id: string;
}

export interface Categories {
  color: string;
  name: string;
  subCategoryDetails: SubCategory[];
}

export async function getData(
  searchParams: {
    [key: string]: string | string[] | undefined;
  } = { category: "man" }
) {
  try {
    const res = await fetch(GET_CATEGORIES_API);
    const categories: Categories[] = await res.json();
    const resClothes = await fetch(
      `${GET_CLOTHES_API}?${
        searchParams.category && `category=${searchParams.category}`
      }${
        searchParams.sub_category
          ? `&sub_category=${searchParams.sub_category}`
          : ""
      }`,
      {
        next: { revalidate: 10 },
      }
    );

    const clothes: Clothes[] = await resClothes.json();
    return { categories, clothes };
    
  } catch (err) {
    console.error(err);
  }
}

export async function getPhoto(form: FormData) {
  try {
    const res = await fetch(GENERATE_IMAGE, {
      method: "POST",
      body: form,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.json();
  } catch (err) {
    console.error(err);
  }
}

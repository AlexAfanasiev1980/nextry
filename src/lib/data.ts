import { GET_CATEGORIES_API, GET_CLOTHES_API, GENERATE_IMAGE } from "@/api";

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

export async function getClothes(searchParams: {
  [key: string]: string | undefined;
}) {
  const resClothes: any = await fetch(
    `${GET_CLOTHES_API}?${`category=${
      searchParams.category ? searchParams.category : "man"
    }`}${
      searchParams.sub_category
        ? `&sub_category=${searchParams.sub_category}`
        : ""
    }`,
    {
      next: { revalidate: 10 },
    }
  );

  if (!resClothes.ok) {
    throw new Error("Failed to fetch data");
  }

  return resClothes.json();
}

export async function getCategories() {
  try {
    const res: any = await fetch(GET_CATEGORIES_API);
    const categories: Categories[] = res.json();
    return categories;
  } catch (err) {
    console.error(err);
  }
}

export async function getPhoto(form: FormData, token: string, params?: URLSearchParams) {
  console.log(form, params?.get('gen_type'));

  try {
    const res = await fetch(`${GENERATE_IMAGE}${params ? `?${params}` : ""}`, {
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

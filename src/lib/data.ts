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

export async function getData(
  searchParams: {
    [key: string]: string | string[] | undefined;
  } = { category: "man" }
) {
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
}

export async function getPhoto(form: FormData) {
  const res = await fetch(GENERATE_IMAGE, {
    method: "POST",
    body: form,
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjIzMDUyNDYyODcuMjE5MDQ2NiwidXNlcl9pZCI6IjY1NTYzN2UzMjgzYTI3MGU4ZWFiZTg0NSIsImVtYWlsIjoiYXJtYXdpcjFAbWFpbC5ydSIsImxvZ2luIjoiQWxleCJ9.iaeELN9i5Jgd6R28sIDV06_08yvdjzBRMRD8lreSmjY",
    },
  });

  return res.json();
}

import { GET_CATEGORIES_API, GET_CLOTHES_API, GENERATE_IMAGE } from "@/api";
import { NextResponse } from "next/server";

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
  display_name: string;
}

export async function createRequest(
  url: string,
  method: "GET" | "POST" = "GET",
  body?: string,
  searchParams?: string
) {
  const options: RequestInit = {
    method: method,
    next: { revalidate: 10 },
  };

  if (body) {
    options.body = body;
  }

  const res: any = await fetch(
    `${url}${searchParams ? `?${searchParams}` : ""}`,
    options
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  
  return data;
}

export async function getClothes(searchParams: {
  [key: string]: string | undefined;
}) {
  const resClothes: any = await fetch(
    `${GET_CLOTHES_API}?tool=fitting_room&${`category=${
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

export async function getPhoto(
  endpoint: string,
  form: FormData,
  token: string,
  params?: URLSearchParams
) {
  try {
    const res = await fetch(`${endpoint}${params ? `?${params}` : ""}`, {
      method: "POST",
      body: form,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res)
    if (res.status !== 200) {
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }

    return await res.json();
  } catch (err) {
    console.error(err);
  }
}

export async function requestPassword(
  endpoint: string,
  options: { [key: string]: string | undefined }
) {
  return fetch(`${endpoint}`, {
    method: "POST",
    body: JSON.stringify(options),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res)
    .catch((err) => {
      console.error(err);
    });
}

export async function feedback(
  endpoint: string,
  options: { [key: string]: string | undefined },
  token: string
) {
  return fetch(`${endpoint}`, {
    method: "POST",
    body: JSON.stringify(options),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => res)
    .catch((err) => {
      console.error(err);
    });
}

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const SIGN_UP_API = BASE_URL + "/user/register";
export const SIGN_IN_API = BASE_URL + "/user/login";
export const GET_CATEGORIES_API = BASE_URL + "/generation/categories";
export const GET_CLOTHES_API = BASE_URL + "/generation/generationTypes";
export const GENERATE_IMAGE = BASE_URL + "/generation/generate_image/";
export const GENERATE_BACKGROUND = BASE_URL + "/generation/change_background/";
export const GENERATE_FACE = BASE_URL + "/generation/clear_face/";
export const FEEDBACK_API = BASE_URL + "/feedback/create_feedback";
export const GENERATE_FUNNY = BASE_URL + "/generation/funny_mask/";
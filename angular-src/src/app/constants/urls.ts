// const BASE_URL: string = 'http://localhost:3000';

const BASE_URL: string = '';

export const DEFAULT_IMAGE_PATH: string = 'assets/images/defaults/default-image.png';
export const LOADING_GIF_PATH: string = 'assets/images/tools/loading.gif';

export const LOGIN_URL: string = `${BASE_URL}/auth/login`;
export const CHECK_TOKEN_URL: string = `${BASE_URL}/auth/check`;

export const BASE_CATEGORY_URL: string = `${BASE_URL}/api/category`;
export const CATEGORY_HIGHEST_POSTS_URL: string = `${BASE_URL}/api/category/highest`;

export const BASE_POST_URL: string = `${BASE_URL}/api/post`;

export const BASE_IMAGE_PATH: string = `https://s3.eu-central-1.amazonaws.com/avivharuzi-blog`;

const BASE_BLOG_URL: string = `${BASE_URL}/api/blog`;

export const GET_BLOG_POSTS_URL: string = `${BASE_BLOG_URL}/posts`;
export const GET_BLOG_CATEGORIES_URL: string = `${BASE_BLOG_URL}/categories`;
export const GET_BLOG_TAGS_URL: string = `${BASE_BLOG_URL}/tags`;
export const GET_RECENT_POSTS_URL: string = `${BASE_BLOG_URL}/posts/recent`;
export const GET_POST_BY_SLUG_URL: string = `${BASE_BLOG_URL}/post`;
export const GET_OVERALL_DATA_URL: string = `${BASE_BLOG_URL}/overall`;
export const GET_POSTS_BY_CATEGORY_SLUG_URL: string = `${BASE_BLOG_URL}/posts/category`;
export const GET_POSTS_BY_TAG_URL: string = `${BASE_BLOG_URL}/posts/tag`;
export const GET_POSTS_BY_SEARCH_URL: string = `${BASE_BLOG_URL}/posts/search`;

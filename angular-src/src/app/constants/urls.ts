const BASE_URL: any = 'http://localhost:3000';

export const DEFAULT_IMAGE_PATH: any = 'assets/images/defaults/default-image.png';
export const LOADING_GIF_PATH: any = 'assets/images/tools/loading.gif';

export const LOGIN_URL: any = `${BASE_URL}/auth/login`;
export const CHECK_TOKEN_URL: any = `${BASE_URL}/auth/check`;

export const BASE_CATEGORY_URL: any = `${BASE_URL}/api/category`;
export const CATEGORY_HIGHEST_POSTS_URL: any = `${BASE_URL}/api/category/highest`;

export const BASE_POST_URL: any = `${BASE_URL}/api/post`;

export const BASE_IMAGE_PATH: any = `${BASE_URL}/images`;

const BASE_BLOG_URL: any = `${BASE_URL}/api/blog`;

export const GET_BLOG_POSTS: any = `${BASE_BLOG_URL}/posts`;
export const GET_BLOG_CATEGORIES: any = `${BASE_BLOG_URL}/categories`;
export const GET_BLOG_TAGS: any = `${BASE_BLOG_URL}/tags`;
export const GET_RECENT_POSTS: any = `${BASE_BLOG_URL}/posts/recent`;
export const GET_POST_BY_SLUG: any = `${BASE_BLOG_URL}/post`;
export const GET_OVERALL_DATA_URL: any = `${BASE_BLOG_URL}/overall`;
export const GET_POSTS_BY_CATEGORY_SLUG_URL: any = `${BASE_BLOG_URL}/posts/category`;
export const GET_POSTS_BY_TAG: any = `${BASE_BLOG_URL}/posts/tag`;
export const GET_POSTS_BY_SEARCH: any = `${BASE_BLOG_URL}/posts/search`;

export const NO_AUTHORIZATION_URLS: any[] = [LOGIN_URL, CHECK_TOKEN_URL, GET_BLOG_POSTS,
GET_BLOG_CATEGORIES, GET_BLOG_TAGS, GET_RECENT_POSTS, GET_POST_BY_SLUG,
GET_OVERALL_DATA_URL, GET_POSTS_BY_CATEGORY_SLUG_URL, GET_POSTS_BY_TAG, GET_POSTS_BY_SEARCH];

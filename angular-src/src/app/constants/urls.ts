const BASE_URL: any = 'http://localhost:3000';

export const DEFAULT_IMAGE_PATH: any = 'assets/images/defaults/default-image.png';
export const LOADING_GIF_PATH: any = 'assets/images/tools/loading.gif';

export const LOGIN_URL: any = `${BASE_URL}/auth/login`;
export const CHECK_TOKEN_URL: any = `${BASE_URL}/auth/check`;

export const BASE_CATEGORY_URL: any = `${BASE_URL}/api/category`;

export const BASE_POST_URL: any = `${BASE_URL}/api/post`;

export const NO_AUTHORIZATION_URLS: any[] = [LOGIN_URL, CHECK_TOKEN_URL];

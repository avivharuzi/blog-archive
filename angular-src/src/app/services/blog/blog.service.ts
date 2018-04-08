import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { GET_BLOG_POSTS_URL, GET_BLOG_CATEGORIES_URL, GET_POSTS_BY_SEARCH_URL,
GET_BLOG_TAGS_URL, GET_RECENT_POSTS_URL, GET_POST_BY_SLUG_URL,
GET_POSTS_BY_CATEGORY_SLUG_URL, GET_POSTS_BY_TAG_URL, GET_OVERALL_DATA_URL } from './../../constants/urls';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/throw';

@Injectable()
export class BlogService {
  constructor(
    public http: HttpClient
  ) { }

  getBlogPosts(): Observable<any> {
    return this.http.get(GET_BLOG_POSTS_URL).map((res: any) => {
      return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err));
  }

  getBlogCategories(): Observable<any> {
    return this.http.get(GET_BLOG_CATEGORIES_URL).map((res: any) => {
      return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err));
  }

  getBlogTags(): Observable<any> {
    return this.http.get(GET_BLOG_TAGS_URL).map((res: any) => {
      return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err));
  }

  getRecentPosts(): Observable<any> {
    return this.http.get(`${GET_RECENT_POSTS_URL}/5`).map((res: any) => {
      return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err));
  }

  getPostBySlug(slug: string): Observable<any> {
    return this.http.get(`${GET_POST_BY_SLUG_URL}/${slug}`).map((res: any) => {
      return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err));
  }

  getPostsByCategorySlug(slug: string): Observable<any> {
    return this.http.get(`${GET_POSTS_BY_CATEGORY_SLUG_URL}/${slug}`).map((res: any) => {
      return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err));
  }

  getPostsByTag(tag: string): Observable<any> {
    return this.http.get(`${GET_POSTS_BY_TAG_URL}/${tag}`).map((res: any) => {
      return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err));
  }

  getOverallData(): Observable<any> {
    return this.http.get(GET_OVERALL_DATA_URL).map((res: any) => {
      return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err));
  }

  searchPosts(query) {
    return this.http.get(`${GET_POSTS_BY_SEARCH_URL}/${query}`).map((res: any) => {
      return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err));
  }
}

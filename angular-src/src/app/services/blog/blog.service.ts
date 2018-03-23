import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { GET_BLOG_POSTS, GET_BLOG_TAGS, GET_BLOG_CATEGORIES, GET_RECENT_POSTS,
GET_POST_BY_SLUG, GET_OVERALL_DATA_URL, GET_POSTS_BY_CATEGORY_SLUG_URL } from '../../constants/urls';

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
    return this.http.get(GET_BLOG_POSTS).map((res: any) => {
      return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err));
  }

  getBlogCategories(): Observable<any> {
    return this.http.get(GET_BLOG_CATEGORIES).map((res: any) => {
      return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err));
  }

  getBlogTags(): Observable<any> {
    return this.http.get(GET_BLOG_TAGS).map((res: any) => {
      return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err));
  }

  getRecentPosts(): Observable<any> {
    return this.http.get(`${GET_RECENT_POSTS}/5`).map((res: any) => {
      return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err));
  }

  getPostBySlug(slug): Observable<any> {
    return this.http.get(`${GET_POST_BY_SLUG}/${slug}`).map((res: any) => {
      return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err));
  }

  getPostsByCategorySlug(slug): Observable<any> {
    return this.http.get(`${GET_POSTS_BY_CATEGORY_SLUG_URL}/${slug}`).map((res: any) => {
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
}

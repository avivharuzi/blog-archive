import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Post } from '../../models/post.model';
import { ValidationService } from '../validation/validation.service';
import { BASE_POST_URL } from './../../constants/urls';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/throw';

@Injectable()
export class PostService {
  public updatedPost: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private http: HttpClient,
    private validationService: ValidationService
  ) { }

  getPosts(): Observable<any> {
    return this.http.get(BASE_POST_URL).map((res: any) => {
        return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err.error));
  }

  setPost(post: Post): Observable<any> {
    const fd: FormData = this.validationService.getFormDataFromObject(post);

    return this.http.post(BASE_POST_URL, fd).map((res: any) => {
      return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err.error));
  }

  deletePost(postId: string): Observable<any> {
    return this.http.delete(`${BASE_POST_URL}/${postId}`).map((res: any) => {
      return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err.error));
  }

  editPost(post: Post, postId: string): Observable<any> {
    const fd: FormData = this.validationService.getFormDataFromObject(post);

    return this.http.put(`${BASE_POST_URL}/${postId}`, fd).map((res: any) => {
      return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err.error));
  }
}

import { BASE_POST_URL } from './../../constants/urls';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/throw';
import { Post } from '../../models/post.model';

@Injectable()
export class PostService {
  constructor(
    private http: HttpClient
  ) { }

  getPosts(): Observable<any> {
    return this.http.get(BASE_POST_URL).map((res: any) => {
        return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err.error));
  }

  setPost(post: Post): Observable<any> {
    const fd: FormData = new FormData();

    for (let key in post) {
      if (post.hasOwnProperty(key)) {
        if (post[key].constructor === Array) {
          for (let arrKey of post[key]) {
            fd.append(key, arrKey);
          }
        } else {
          fd.append(key, post[key]);
        }
      }
    }

    return this.http.post(BASE_POST_URL, fd).map((res: any) => {
        return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err.error));
  }
}

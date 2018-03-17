import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BASE_CATEGORY_URL } from './../../constants/urls';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/throw';
import { Category } from '../../models/category.model';

@Injectable()
export class CategoryService {
  constructor(
    private http: HttpClient
  ) { }

  getCategories(): Observable<any> {
    return this.http.get(BASE_CATEGORY_URL).map((res: any) => {
      return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err.error));
  }

  setCategory(category: Category): Observable<any> {
    const fd: FormData = new FormData();

    for (let key in category) {
      if (category.hasOwnProperty(key)) {
        fd.append(key, category[key]);
      }
    }

    return this.http.post(BASE_CATEGORY_URL, fd).map((res: any) => {
      return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err.error));
  }

  updateCategory(categoryId: string, category: Category): Observable<any> {
    const fd: FormData = new FormData();

    for (let key in category) {
      if (category.hasOwnProperty(key)) {
        fd.append(key, category[key]);
      }
    }

    return this.http.put(`${BASE_CATEGORY_URL}/${categoryId}`, category).map((res: any) => {
      return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err.error));
  }
}

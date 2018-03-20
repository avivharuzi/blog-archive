import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Category } from '../../models/category.model';
import { ValidationService } from '../validation/validation.service';
import { BASE_CATEGORY_URL } from './../../constants/urls';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/filter';
import 'rxjs/add/observable/throw';

@Injectable()
export class CategoryService {
  public updatedCategory: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private http: HttpClient,
    private validationService: ValidationService
  ) { }

  getCategories(): Observable<any> {
    return this.http.get(BASE_CATEGORY_URL).map((res: any) => {
      return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err.error));
  }

  setCategory(category: Category): Observable<any> {
    const fd: FormData = this.validationService.getFormDataFromObject(category);

    return this.http.post(BASE_CATEGORY_URL, fd).map((res: any) => {
      return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err.error));
  }

  updateCategory(category: Category, categoryId: string): Observable<any> {
    const fd: FormData = this.validationService.getFormDataFromObject(category);

    return this.http.put(`${BASE_CATEGORY_URL}/${categoryId}`, fd).map((res: any) => {
      return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err.error));
  }

  deleteCategory(categoryId: string): Observable<any> {
    return this.http.delete(`${BASE_CATEGORY_URL}/${categoryId}`).map((res: any) => {
      return res;
    })
    .catch((err: HttpErrorResponse) => Observable.throw(err.error));
  }
}

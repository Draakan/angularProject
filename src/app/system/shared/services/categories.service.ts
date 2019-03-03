import { BaseApi } from '../../../shared/core/base-api';
import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CategoriesService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  addCategory(category: Category): Observable<Category> {
    return this.post('/UserProfile/AddCategory', category);
  }

  getCategoriesOne(): Observable<Category[]> {
    return this.getOne('/UserProfile/UserCategory');
  }

  updateCategory(category: Category): Observable<Category> {
    return this.put(`categories/${category.id}`, category);
  }

  getCategoryById(id: string): Observable<Category> {
    return this.getOne(`/UserProfile/UserCategoryId/${id}`);
  }
}

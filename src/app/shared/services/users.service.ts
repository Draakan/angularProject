import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs/Observable';
import { BaseApi } from '../core/base-api';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class UsersService extends BaseApi {

  constructor(public http: HttpClient) { super(http); }

  getUserByEmail(email: string): Observable<any> {
    return this.getOne(`/ApplicationUser/GetEmail/${email}`)
  }

  createNewUser(user: User): Observable<any> {
    return this.post('/ApplicationUser/Register', user);
  }

  login(formData: any): Observable<any> {
    return this.post('/ApplicationUser/Login', formData)
  }

  getUserName(): Observable<any> {
    return this.getOne('/UserProfile');
  }
}

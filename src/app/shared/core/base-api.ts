import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BaseApi {
  
  private baseUrlOne = 'https://webapiuserregistration20190321081457.azurewebsites.net/api';

  constructor(
    public http: HttpClient
  ) { }
 
  private getUrlOne(url: string = ''): string {
    return this.baseUrlOne + url
  }

  public post(url: string = '', data: any = { }): Observable<any> {
    return this.http.post(this.getUrlOne(url), data);
  }

  public getOne(url: string = ''): Observable<any> {
    return this.http.get(this.getUrlOne(url));
  }

  public put(url: string = '', data: any = { }): Observable<any> {
    return this.http.put(this.getUrlOne(url), data);
  }
}

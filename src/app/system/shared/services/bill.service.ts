import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Bill } from '../models/bill.model';
import { BaseApi } from '../../../shared/core/base-api';

@Injectable()
export class BillService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  getBill(): Observable<Bill> {
    return this.getOne('/UserProfile/UserBill');
  }

  updateBill(bill: Bill): Observable<any> {
    return this.put('/UserProfile/UpdateBill', bill);
  }

  getCurrencyUAH() {
    return this.getOne('/UserProfile/Exchange')
  }
}

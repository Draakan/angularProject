import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs';
import { combineLatest } from 'rxjs/index';

import { BillService } from '../shared/services/bill.service';
import { Bill } from '../shared/models/bill.model';

@Component({
  selector: 'app-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {

  subscription: Subscription;
  subscriptionOne: Subscription;

  currencyUAH: any[];
  bill: Bill;

  isLoaded: boolean = false;

  constructor(
    private billService: BillService
  ) { }

  ngOnInit() {
    this.subscription = combineLatest(
      this.billService.getBill(),
      this.billService.getCurrencyUAH()
    ).subscribe((data: [Bill, any[]]) => {
      this.bill = data[0];
      this.currencyUAH = data[1].filter(e => e.cc === 'USD' || e.cc === 'RUB' || e.cc === 'EUR' );
      this.isLoaded = true;
    });
  }

  onRefresh() {
    this.isLoaded = false;
    this.subscriptionOne = this.billService.getCurrencyUAH()
      .subscribe((currency: any[]) => {
        this.currencyUAH = currency.filter(e => e.cc === 'USD' || e.cc === 'RUB' || e.cc === 'EUR');;
        this.isLoaded = true;
      })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    if (this.subscriptionOne) {
      this.subscriptionOne.unsubscribe();
    }
  }

}

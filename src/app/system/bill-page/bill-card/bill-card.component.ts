import { Component, OnInit, Input } from '@angular/core';
import { Bill } from '../../shared/models/bill.model';

@Component({
  selector: 'app-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {

  @Input() bill: Bill;
  @Input() currency: any[];

  dollar: number;
  euro: number;

  constructor() { }

  ngOnInit() {
    this.currency.forEach(c => {
      if (c.cc === 'USD') {
        this.dollar = this.bill.value / c.rate;
      }
      if (c.cc === 'EUR') {
        this.euro = this.bill.value / c.rate;
      }
    });
  }

}

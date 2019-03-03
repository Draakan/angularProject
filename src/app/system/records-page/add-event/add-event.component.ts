import { Component, OnInit, Input } from '@angular/core';
import { Category } from '../../shared/models/category.model';
import { NgForm } from '@angular/forms';
import { AppEvent } from '../../shared/models/event.model';
import * as moment from 'moment';
import { EventService } from '../../shared/services/events.service';
import { BillService } from '../../shared/services/bill.service';
import { Bill } from '../../shared/models/bill.model';
import { Message } from '../../../shared/models/message.model';
import { from } from 'rxjs';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  @Input() categories: Category[] = [];

  message: Message;
  idOfCategory: string;

  types = [
    { type: 'income', label: 'Доход' },
    { type: 'outcome', label: 'Расход' }
  ];

  constructor(
    private eventService: EventService,
    private billService: BillService
  ) { }

  ngOnInit() {
    this.message = new Message('danger', '');
    this.calcIdOfCat();
  }

  private calcIdOfCat(): void {
    if (this.categories.length > 0) {
      from(this.categories)
        .last()
        .subscribe((data: Category) => {
          this.idOfCategory = data.id;
        });
    }
  }

  private showMessage(text: string) {
    this.message.text = text;
    window.setTimeout(() => this.message.text = '', 3000);
  }

  onSubmit(form: NgForm) {

    let { amount, description, category, type } = form.value;

    if (amount < 0) amount *= -1;
    const event = new AppEvent(type, amount, category, moment().format('DD.MM.YYYY HH:mm:ss'), description);
    
    this.billService.getBill()
      .subscribe((bill: Bill) => {

        let value = 0;

        if (type === 'outcome') {
          if (amount > bill.value) {
            this.showMessage('На счету недостаточно средств');
            return;
          } else {
            value = bill.value - amount;
          }
        } else {
          value = bill.value + amount;
        }

        this.billService.updateBill({ value, currency: bill.currency })
          .mergeMap(() => this.eventService.addEvent(event))
          .subscribe(() => {
            this.calcIdOfCat();
            form.setValue({
              amount: 0,
              description: ' ',
              category: this.idOfCategory,
              type: 'outcome'
            })
          });
      });
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { Category } from '../../shared/models/category.model';
import { AppEvent } from '../../shared/models/event.model';

@Component({
  selector: 'app-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {

  @Input() categories: Category[] = [];
  @Input() events: AppEvent[] = [];

  searchValue: string = '';
  searchPlaceholder: string = 'Сумма';
  searchField: string = 'amount';

  settings = {
    actions: {
      position: 'right'
    },
    columns: {
      id: {
        title: 'ID'
      },
      name: {
        title: 'Full Name'
      },
      username: {
        title: 'User Name'
      },
      email: {
        title: 'Email'
      }
    }
  };

  constructor() { }

  ngOnInit() {

    this.events.forEach((e) => {
      e.catName = this.categories.find(c => c.id === e.categoryId).name;
    });
  }

  getEventClass(e: AppEvent) {

    return {
      'label': true,
      'label-danger': e.type === 'outcome',
      'label-success': e.type === 'income'
    }
  }

  changeCriteria(field: string) {

    const namesMap = {
      amount: 'Сумма',
      date: 'Дата',
      category: 'Категория',
      type: 'Тип'
    };

    this.searchPlaceholder = namesMap[field];
    this.searchField = field;
  }
}

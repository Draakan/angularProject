import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs/observable/combineLatest';
import * as moment from 'moment';

import { CategoriesService } from '../shared/services/categories.service';
import { EventService } from '../shared/services/events.service';
import { AppEvent } from '../shared/models/event.model';
import { Category } from '../shared/models/category.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit {

  isLoaded: boolean = false;
  isFilterVisibility: boolean = false;

  categories: Category[] = [];
  events: AppEvent[] = [];
  filteredEvents: AppEvent[] = [];
  chartDataOutcome: { name: string, value: number }[] = [];
  chartDataIncome: { name: string, value: number }[] = [];

  constructor(
    private categoriesService: CategoriesService,
    private eventsService: EventService
  ) { }

  ngOnInit() {
    combineLatest(
      this.categoriesService.getCategoriesOne(),
      this.eventsService.getEvents()
    ).subscribe((data: [Category[], AppEvent[]]) => {
      this.categories = data[0];
      this.events = data[1];
      this.setOriginalEvents();
      this.calculateChartData();
      this.isLoaded = true;
    });
  }

  calculateChartData(): void {
    this.chartDataOutcome = [];
    this.chartDataIncome = [];

    this.categories.forEach((cat) => {
      const catEvent = this.filteredEvents.filter((e) => e.categoryId === cat.id && e.type === 'outcome');
      this.chartDataOutcome.push({
        name: cat.name,
        value: catEvent.reduce((total, e) => {
          total += e.amount;
          return total
        }, 0)
      });
    });

    this.categories.forEach((cat) => {
      const catEvent = this.filteredEvents.filter((e) => e.categoryId === cat.id && e.type === 'income');
      this.chartDataIncome.push({
        name: cat.name,
        value: catEvent.reduce((total, e) => {
          total += e.amount;
          return total
        }, 0)
      });
    });
  }

  private setOriginalEvents() {
    this.filteredEvents = this.events.slice();
  }

  private toggleFilterVisibility(dir: boolean) {
    this.isFilterVisibility = dir;
  }

  openFilter() {
    this.toggleFilterVisibility(true);
  }

  onFilterApply(filterData) {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();

    const startPeriod = moment().startOf(filterData.period).startOf('d');
    const endPeriod = moment().endOf(filterData.period).endOf('d');

    this.filteredEvents = this.filteredEvents
      .filter((e) => {
        return filterData.types.indexOf(e.type) !== -1;
      })
      .filter((e) => {
        return filterData.categories.indexOf(e.categoryId) !== -1;
      })
      .filter((e) => {
        console.log(e.date);
        const momentDate = moment(e.date, 'DD.MM.YYYY HH:mm:ss');
        return momentDate.isBetween(startPeriod, endPeriod);
      });

    this.calculateChartData();
  }

  onFilterCancel() {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();
    this.calculateChartData();
  }

}

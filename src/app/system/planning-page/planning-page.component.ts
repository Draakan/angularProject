import { Component, OnInit, OnDestroy } from '@angular/core';
import { BillService } from '../shared/services/bill.service';
import { CategoriesService } from '../shared/services/categories.service';
import { EventService } from '../shared/services/events.service';
import { Observable } from 'rxjs/Observable';
import { Bill } from '../shared/models/bill.model';
import { Category } from '../shared/models/category.model';
import { AppEvent } from '../shared/models/event.model';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {

  isLoaded = false;
  bill: Bill;
  categories: Category[] = [];
  events: AppEvent[] = [];

  sOne: Subscription;

  constructor(
    private billService: BillService,
    private categoriesService: CategoriesService,
    private eventService: EventService
  ) { }

  ngOnInit() {

    this.sOne = combineLatest(
      this.billService.getBill(),
      this.categoriesService.getCategoriesOne(),
      this.eventService.getEvents()
    ).subscribe((data: [Bill, Category[], AppEvent[]]) => {
      this.bill = data[0];
      this.categories = data[1];
      this.events = data[2];

      this.isLoaded = true;
    });
  }

  getCategoryCost(cat: Category): number {
    return this.events.filter(e => e.categoryId === cat.id && e.type === 'outcome')
      .reduce((total, e) => {
        total += e.amount;
        return total;
    }, 0);
  }

  private getPercent(cat: Category): number {
    const percent = (100 * this.getCategoryCost(cat)) / cat.capacity;
    return percent > 100 ? 100 : percent;
  }

  getCatPercent(cat: Category): string {
    return this.getPercent(cat) + '%';
  }

  getCatColorClass(cat: Category): string {
    const percent = this.getPercent(cat);
    return percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning';
  }

  ngOnDestroy() {
    if (this.sOne) {
      this.sOne.unsubscribe();
    }
  }

}

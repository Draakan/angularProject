import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EventService } from '../../shared/services/events.service';
import { CategoriesService } from '../../shared/services/categories.service';
import { AppEvent } from '../../shared/models/event.model';
import { Category } from '../../shared/models/category.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {

  event: AppEvent;
  category: Category;
  isLoaded = false;

  sOne: Subscription;

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventService,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit() {
    this.sOne = this.route.params
      .mergeMap((params: Params) => this.eventsService.getEventById(params['id']))
      .mergeMap((event: AppEvent) => {
        this.event = event;
        return this.categoriesService.getCategoryById(event.categoryId);
      })
      .subscribe((category: Category) => {
        this.category = category;
        this.isLoaded = true;
      });
  }

  ngOnDestroy() {
    if (this.sOne) {
      this.sOne.unsubscribe();
    }
  }

}

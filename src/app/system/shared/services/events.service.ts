import { BaseApi } from '../../../shared/core/base-api';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AppEvent } from '../models/event.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class EventService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http);
  }

  addEvent(event: AppEvent): Observable<any> {
    return this.post('/UserProfile/AddEvent', event);
  }

  getEvents(): Observable<AppEvent[]> {
    return this.getOne('/UserProfile/UserEvents');
  }

  getEventById(id: string): Observable<AppEvent> {
    return this.getOne(`/UserProfile/EventById/${id}`);
  }
}

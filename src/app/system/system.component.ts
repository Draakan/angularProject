import { Component } from "@angular/core";
import { NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styles: [`
    :host nb-layout-header a {
      font-size: 2rem;
      text-decoration: none;
    }
    :host nb-layout-column:first-child {
      background: #f4f4f7;
    }
  `],
})
export class SystemComponent {

  constructor(private sidebarService: NbSidebarService) {
  }

  toggle() {
    this.sidebarService.toggle(true);
    return false;
  }
}

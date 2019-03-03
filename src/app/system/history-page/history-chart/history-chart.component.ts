import { Component, Input } from '@angular/core';

import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-history-chart',
  templateUrl: './history-chart.component.html',
  styleUrls: ['./history-chart.component.scss']
})
export class HistoryChartComponent {

  @Input() dataIncome;
  @Input() dataOutcome;
}

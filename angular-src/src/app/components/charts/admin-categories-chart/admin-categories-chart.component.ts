import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-admin-categories-chart',
  templateUrl: './admin-categories-chart.component.html',
  styleUrls: ['./admin-categories-chart.component.css']
})
export class AdminCategoriesChartComponent implements OnInit {
  @Input()
  public categoriesHighest: any[];

  public view: any[] = [700, 400];

  // options
  public showXAxis = true;
  public showYAxis = true;
  public gradient = false;
  public showLegend = true;
  public showXAxisLabel = true;
  public xAxisLabel = 'Category';
  public showYAxisLabel = true;
  public yAxisLabel = 'Posts';

  public colorScheme = {
    domain: ['#20bf6b', '#eb3b5a', '#f7b731', '#3867d6', '#8854d0']
  };

  constructor() { }

  ngOnInit() {
  }
}

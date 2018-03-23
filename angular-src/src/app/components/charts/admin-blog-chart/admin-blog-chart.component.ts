import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-admin-blog-chart',
  templateUrl: './admin-blog-chart.component.html',
  styleUrls: ['./admin-blog-chart.component.css']
})
export class AdminBlogChartComponent implements OnInit {
  @Input()
  public overallData: any[];

  public view: any[] = [700, 200];

  public colorScheme = {
    domain: ['#a5b1c2']
  };

  constructor() {
  }

  ngOnInit() {
  }
}

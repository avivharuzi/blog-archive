import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.css']
})
export class CategoriesTableComponent implements OnInit {
  @Input()
  public categories: any[];

  constructor() { }

  ngOnInit() {
  }
}

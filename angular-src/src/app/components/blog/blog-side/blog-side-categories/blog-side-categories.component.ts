import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-blog-side-categories',
  templateUrl: './blog-side-categories.component.html',
  styleUrls: ['./blog-side-categories.component.css']
})
export class BlogSideCategoriesComponent implements OnInit {
  @Input()
  public categories: any[];

  constructor() { }

  ngOnInit() {
  }

}

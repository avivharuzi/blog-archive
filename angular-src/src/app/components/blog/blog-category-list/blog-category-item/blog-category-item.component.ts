import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-blog-category-item',
  templateUrl: './blog-category-item.component.html',
  styleUrls: ['./blog-category-item.component.css']
})
export class BlogCategoryItemComponent implements OnInit {
  @Input()
  public category: any;

  constructor() { }

  ngOnInit() {
  }
}

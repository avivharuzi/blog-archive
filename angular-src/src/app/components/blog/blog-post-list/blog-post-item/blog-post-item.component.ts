import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-blog-post-item',
  templateUrl: './blog-post-item.component.html',
  styleUrls: ['./blog-post-item.component.css']
})
export class BlogPostItemComponent implements OnInit {
  @Input()
  public post: any;

  constructor() { }

  ngOnInit() {
  }
}

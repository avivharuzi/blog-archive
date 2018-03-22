import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-blog-post-list',
  templateUrl: './blog-post-list.component.html',
  styleUrls: ['./blog-post-list.component.css']
})
export class BlogPostListComponent implements OnInit {
  @Input()
  public posts: any[];

  constructor() { }

  ngOnInit() {
  }
}

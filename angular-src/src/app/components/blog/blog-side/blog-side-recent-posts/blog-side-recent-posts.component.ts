import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-blog-side-recent-posts',
  templateUrl: './blog-side-recent-posts.component.html',
  styleUrls: ['./blog-side-recent-posts.component.css']
})
export class BlogSideRecentPostsComponent implements OnInit {
  @Input()
  public recentPosts: any[];

  constructor() { }

  ngOnInit() {
  }
}

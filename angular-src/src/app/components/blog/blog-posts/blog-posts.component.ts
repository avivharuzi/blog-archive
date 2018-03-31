import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../services/blog/blog.service';

@Component({
  selector: 'app-blog-posts',
  templateUrl: './blog-posts.component.html',
  styleUrls: ['./blog-posts.component.css']
})
export class BlogPostsComponent implements OnInit {
  public posts: any[];

  constructor(
    private blogService: BlogService
  ) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.blogService.getBlogPosts().subscribe((res: any) => {
      this.posts = res;
    });
  }
}

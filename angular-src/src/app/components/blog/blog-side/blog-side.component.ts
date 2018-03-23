import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../services/blog/blog.service';

@Component({
  selector: 'app-blog-side',
  templateUrl: './blog-side.component.html',
  styleUrls: ['./blog-side.component.css']
})
export class BlogSideComponent implements OnInit {
  public categories: any[];
  public tags: any[];
  public recentPosts: any[];

  constructor(
    private blogService: BlogService
  ) { }

  ngOnInit() {
    this.getCategories();
    this.getTags();
    this.getRecentPosts();
  }

  getCategories(): void {
    this.blogService.getBlogCategories().subscribe((res: any) => {
      if (res) {
        this.categories = res;
      }
    }, (err) => {
      console.log(err);
    });
  }

  getTags(): void {
    this.blogService.getBlogTags().subscribe((res: any) => {
      if (res) {
        this.tags = res;
      }
    }, (err) => {
      console.log(err);
    });
  }

  getRecentPosts(): void {
    this.blogService.getRecentPosts().subscribe((res: any) => {
      if (res) {
        this.recentPosts = res;
      }
    }, (err) => {
      console.log(err);
    });
  }
}

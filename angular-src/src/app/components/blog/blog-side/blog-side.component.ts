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
      this.categories = res;
    });
  }

  getTags(): void {
    this.blogService.getBlogTags().subscribe((res: any) => {
      this.tags = res;
    });
  }

  getRecentPosts(): void {
    this.blogService.getRecentPosts().subscribe((res: any) => {
      this.recentPosts = res;
    });
  }
}

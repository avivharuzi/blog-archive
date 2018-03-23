import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../../services/blog/blog.service';

@Component({
  selector: 'app-blog-category-list',
  templateUrl: './blog-category-list.component.html',
  styleUrls: ['./blog-category-list.component.css']
})
export class BlogCategoryListComponent implements OnInit {
  public categories: any[];

  constructor(
    private blogService: BlogService
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.blogService.getBlogCategories().subscribe((res: any) => {
      this.categories = res;
    }, (err) => {
      console.log(err);
    });
  }
}

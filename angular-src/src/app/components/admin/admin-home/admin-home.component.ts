import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category/category.service';
import { BlogService } from '../../../services/blog/blog.service';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  public categoriesHighest: any[];
  public overallData: any[];

  constructor(
    private categoryService: CategoryService,
    private blogService: BlogService
  ) { }

  ngOnInit() {
    this.getCategoriesWithHighestPosts();
    this.getOverallData();
  }

  getCategoriesWithHighestPosts(): void {
    this.categoryService.getCategoriesWithHighestPosts().subscribe((res: any) => {
      this.categoriesHighest = res;
    }, (err) => {
      console.log(err);
    });
  }

  getOverallData(): void {
    this.blogService.getOverallData().subscribe((res: any) => {
      this.overallData = res;
    }, (err) => {
      console.log(err);
    });
  }
}

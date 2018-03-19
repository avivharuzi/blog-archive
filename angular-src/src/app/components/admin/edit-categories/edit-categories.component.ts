import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category/category.service';

@Component({
  selector: 'app-edit-categories',
  templateUrl: './edit-categories.component.html',
  styleUrls: ['./edit-categories.component.css']
})
export class EditCategoriesComponent implements OnInit {
  public categories: any[];

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.getCategories();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((res: any) => {
      this.categories = res;
    }, (err) => {
      console.log(err);
    });
  }
}

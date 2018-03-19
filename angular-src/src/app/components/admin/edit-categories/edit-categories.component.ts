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
    this.onSuccessCategory();
  }

  getCategories() {
    this.categoryService.getCategories().subscribe((res: any) => {
      this.categories = res;
    }, (err) => {
      console.log(err);
    });
  }

  onSuccessCategory() {
    this.categoryService.updatedCategory.subscribe((updatedCategory: any) => {
      for (let i = 0; i < this.categories.length; i++) {
        if (this.categories[i]._id === updatedCategory._id) {
          this.categories[i] = updatedCategory;
          break;
        }
      }
    });
  }
}

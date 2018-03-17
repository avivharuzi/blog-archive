import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validator } from '../../../models/validator.model';
import { Category } from '../../../models/category.model';
import { CategoryService } from '../../../services/category/category.service';

@Component({
  selector: 'app-add-category-form',
  templateUrl: './add-category-form.component.html',
  styleUrls: ['./add-category-form.component.css']
})
export class AddCategoryFormComponent implements OnInit {
  public categoryForm: FormGroup;
  public categoryImage: File;
  public categoryMessage: any;
  public typeMessage: string;

  @ViewChild('fileImage')
  public fileImage: any;

  @Output()
  public successCategory: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit() {
    this.createCategoryForm();
  }

  createCategoryForm(): void {
    const name = new FormControl('', [
      Validator.required('Category name')
    ]);

    this.categoryForm = new FormGroup({
      name
    });
  }

  setCategoryForm(): void {
    if (this.categoryForm.valid) {
      const category: Category = new Category(
        this.categoryForm.get('name').value,
        this.categoryImage
      );

      console.log(category);

      this.categoryService.setCategory(category).subscribe((res: any) => {
        if (res) {
          console.log(res);
          this.categoryMessage = res.message;
          this.typeMessage = 'success';
          this.successCategory.emit(res.data);
          this.categoryForm.reset();
          this.resetCoverImage();
        }
      }, (err) => {
        console.log(err);
        this.categoryMessage = err.errors;
        this.typeMessage = 'danger';
      });
    }
  }

  changeCategoryImage(event): void {
    let fileList: FileList = event.target.files;
    this.categoryImage = fileList[0];
  }

  resetCoverImage(): void {
    this.categoryImage = null;
    this.fileImage.nativeElement.value = '';
  }
}

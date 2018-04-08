import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validator } from '../../../models/validator.model';
import { Category } from '../../../models/category.model';
import { CategoryService } from '../../../services/category/category.service';
import { ValidationService } from '../../../services/validation/validation.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  public categoryForm: FormGroup;
  public categoryImage: File;
  public categoryMessage: any;
  public typeMessage: string;
  public loading: boolean;

  @Input()
  public editCategory: any;

  @ViewChild('fileImage')
  public fileImage: any;

  @Output()
  public successCategory: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private categoryService: CategoryService,
    private validationService: ValidationService
  ) {
    this.loading = false;
  }

  ngOnInit() {
    this.createCategoryForm();
    this.checkCategoryEdit();
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
      this.loading = true;

      if (this.editCategory) {
        this.setEditCategory();
      } else {
        this.setAddCategory();
      }
    }
  }

  setAddCategory() {
    const category: Category = new Category(
      this.categoryForm.get('name').value,
      this.categoryImage
    );

    this.categoryService.setCategory(category).subscribe((res: any) => {
      if (res) {
        this.categoryMessage = res.message;
        this.typeMessage = 'success';
        this.successCategory.emit(res.data);
        this.categoryForm.reset();
        this.resetCoverImage();
        this.loading = false;
      }
    }, (err) => {
      this.categoryMessage = err.errors;
      this.typeMessage = 'danger';
      this.loading = false;
    });
  }

  setEditCategory() {
    const category: Category = new Category(
      this.categoryForm.get('name').value,
      this.categoryImage,
      this.editCategory.name,
      this.editCategory.image
    );

    this.categoryService.updateCategory(category, this.editCategory._id).subscribe((res: any) => {
      if (res) {
        this.categoryMessage = res.message;
        this.typeMessage = 'success';
        this.categoryService.updatedCategory.emit(res.data);
        this.loading = false;
      }
    }, (err) => {
      this.categoryMessage = err.errors;
      this.typeMessage = 'danger';
      this.loading = false;
    });
  }

  changeCategoryImage(event): void {
    let fileList: FileList = event.target.files;
    this.categoryImage = fileList[0];
  }

  resetCoverImage(): void {
    this.categoryImage = null;
    this.fileImage.nativeElement.value = '';
  }

  checkCategoryEdit(): void {
    if (this.editCategory) {
      this.categoryForm.setValue({
        name: this.editCategory.name,
      });
    }
  }

  getControl(controlName) {
    return this.categoryForm.get(controlName);
  }

  getStatus(controlName) {
    return this.validationService.statusClass(this.getControl(controlName));
  }
}

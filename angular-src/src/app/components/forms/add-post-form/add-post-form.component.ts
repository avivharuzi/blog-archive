import { PostService } from '../../../services/post/post.service';
import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validator } from '../../../models/validator.model';
import { Post } from '../../../models/post.model';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { CategoryService } from '../../../services/category/category.service';

@Component({
  selector: 'app-add-post-form',
  templateUrl: './add-post-form.component.html',
  styleUrls: ['./add-post-form.component.css']
})
export class AddPostFormComponent implements OnInit {
  public addPostForm: FormGroup;
  public dateNow: any;
  public coverImage: File;
  public postMessage: any;
  public typeMessage: string;
  public modalRef: BsModalRef;
  public categories: any[];

  @ViewChild('fileImage')
  public fileImage: any;

  constructor(
    private modalService: BsModalService,
    private categoryService: CategoryService,
    private postService: PostService
  ) {
    this.categories = new Array<any>();
  }

  ngOnInit() {
    this.getCategories();
    this.dateNow = new Date();
    this.createAddPostForm();
  }

  createAddPostForm(): void {
    const title = new FormControl('', [
      Validator.required('Title')
    ]);

    const slug = new FormControl('', [
      Validator.required('Slug')
    ]);

    const author = new FormControl('', [
      Validator.required('Author')
    ]);

    const summary = new FormControl('', [
      Validator.required('Summary')
    ]);

    const body = new FormControl('', [
      Validator.required('Body')
    ]);

    const tags = new FormControl('', [
      Validator.required('Tags')
    ]);

    const category = new FormControl('', [
      Validator.required('Category')
    ]);

    const isPublished = new FormControl(true);

    const publishDate = new FormControl(new Date(), [
      Validator.required('publishDate')
    ]);

    this.addPostForm = new FormGroup({
      title,
      slug,
      author,
      summary,
      body,
      tags,
      category,
      isPublished,
      publishDate
    });
  }

  setAddPostForm(): void {
    if (!this.coverImage) {
      this.postMessage = 'You need to choose cover image';
      this.typeMessage = 'danger';
      return;
    }

    if (this.addPostForm.valid) {
      let tags = this.convertTagsToArr();

      const post: Post = new Post(
        this.addPostForm.get('title').value,
        this.addPostForm.get('slug').value,
        this.addPostForm.get('author').value,
        this.addPostForm.get('summary').value,
        this.addPostForm.get('body').value,
        tags,
        this.addPostForm.get('category').value,
        this.addPostForm.get('isPublished').value,
        this.addPostForm.get('publishDate').value.getTime(),
        this.coverImage
      );

      console.log(post);

      this.postService.setPost(post).subscribe((res: any) => {
        if (res) {
          console.log(res);
          this.postMessage = res.message;
          this.typeMessage = 'success';
          this.addPostForm.reset();
          this.resetCoverImage();
        }
      }, (err) => {
        console.log(err);
        this.postMessage = err.errors;
        this.typeMessage = 'danger';
      });
    }
  }

  generateSlug(): void {
    let title = this.addPostForm.get('title').value;

    title = title
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');

    this.addPostForm.controls['slug'].setValue(title);
  }

  changeCoverImage(event): void {
    let fileList: FileList = event.target.files;
    this.coverImage = fileList[0];
  }

  resetCoverImage(): void {
    this.coverImage = null;
    this.fileImage.nativeElement.value = '';
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  getCategories(): void {
    this.categoryService.getCategories().subscribe((res: any) => {
      this.categories = res;
    }, (err) => {
      console.log(err);
    });
  }

  onSuccessCategory(newCategory): void {
    this.categories.push(newCategory);
  }

  convertTagsToArr(): string[] {
    let tags = this.addPostForm.get('tags').value;
    tags = tags.map((tag) => tag.value);
    return tags;
  }
}

import { Component, OnInit, ViewChild, TemplateRef, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validator } from '../../../models/validator.model';
import { Post } from '../../../models/post.model';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { PostService } from '../../../services/post/post.service';
import { CategoryService } from '../../../services/category/category.service';
import { ValidationService } from '../../../services/validation/validation.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  public postForm: FormGroup;
  public dateNow: any;
  public coverImage: File;
  public postMessage: any;
  public typeMessage: string;
  public modalRef: BsModalRef;
  public categories: any[];
  public loading: boolean;

  @Input()
  public editPost: any;

  @ViewChild('fileImage')
  public fileImage: any;

  constructor(
    private modalService: BsModalService,
    private categoryService: CategoryService,
    private postService: PostService,
    private validationService: ValidationService
  ) {
    this.loading = false;
  }

  ngOnInit() {
    this.dateNow = new Date();
    this.createPostForm();
    this.getCategories();
    this.checkPostEdit();
  }

  createPostForm(): void {
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
      Validator.required('Publish date')
    ]);

    this.postForm = new FormGroup({
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

  setPostForm(): void {
    if (this.editPost) {
      this.setEditPost();
    } else {
      this.setAddPost();
    }
  }

  setAddPost() {
    if (!this.coverImage) {
      this.postMessage = 'You need to choose cover image';
      this.typeMessage = 'danger';
      return;
    }

    if (this.postForm.valid) {
      this.loading = true;

      let tags = this.convertTagsToArr();

      const post: Post = new Post(
        this.postForm.get('title').value,
        this.postForm.get('slug').value,
        this.postForm.get('author').value,
        this.postForm.get('summary').value,
        this.postForm.get('body').value,
        tags,
        this.postForm.get('category').value,
        this.postForm.get('isPublished').value,
        this.postForm.get('publishDate').value.getTime(),
        this.coverImage
      );

      this.postService.setPost(post).subscribe((res: any) => {
        if (res) {
          this.postMessage = res.message;
          this.typeMessage = 'success';
          this.postForm.reset();
          this.postForm.get('category').setValue(this.categories[0]._id);
          this.resetCoverImage();
          this.loading = false;
        }
      }, (err) => {
        this.postMessage = err.errors;
        this.typeMessage = 'danger';
        this.loading = false;
      });
    }
  }

  setEditPost() {
    if (this.postForm.valid) {
      this.loading = true;

      let tags = this.convertTagsToArr();

      const post: Post = new Post(
        this.postForm.get('title').value,
        this.postForm.get('slug').value,
        this.postForm.get('author').value,
        this.postForm.get('summary').value,
        this.postForm.get('body').value,
        tags,
        this.postForm.get('category').value,
        this.postForm.get('isPublished').value,
        this.postForm.get('publishDate').value.getTime(),
        this.coverImage,
        this.editPost.title,
        this.editPost.slug,
        this.editPost.coverImage,
        this.editPost.category._id
      );

      this.postService.editPost(post, this.editPost._id).subscribe((res: any) => {
        if (res) {
          this.postMessage = res.message;
          this.typeMessage = 'success';
          this.postService.updatedPost.emit(res.data);
          this.loading = false;
        }
      }, (err) => {
        this.postMessage = err.errors;
        this.typeMessage = 'danger';
        this.loading = false;
      });
    }
  }

  generateSlug(): void {
    let title = this.postForm.get('title').value;

    title = title
      .toString()
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w\-]+/g, '')
      .replace(/\-\-+/g, '-')
      .replace(/^-+/, '')
      .replace(/-+$/, '');

    this.postForm.controls['slug'].setValue(title);
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
      if (!this.editPost) {
        this.postForm.controls['category'].setValue(this.categories[0]._id);
      }
    }, (err) => {
      console.log(err);
    });
  }

  onSuccessCategory(newCategory): void {
    this.categories.push(newCategory);
  }

  convertTagsToArr(): string[] {
    let tags = this.postForm.get('tags').value;
    tags = tags.map((tag) => tag.value);
    return tags;
  }

  convertTagsToObj(tags: any[]): any[] {
    let result = tags.map(tag => ({ value: tag, display: tag }));
    return result;
  }

  checkPostEdit() {
    if (this.editPost) {
      let tags = this.convertTagsToObj(this.editPost.tags);

      this.postForm.setValue({
        title: this.editPost.title,
        slug: this.editPost.slug,
        author: this.editPost.author,
        summary: this.editPost.summary,
        body: this.editPost.body,
        tags: tags,
        category: this.editPost.category._id,
        isPublished: this.editPost.isPublished,
        publishDate: new Date(this.editPost.publishDate)
      });
    }
  }

  getControl(controlName) {
    return this.postForm.get(controlName);
  }

  getStatus(controlName) {
    return this.validationService.statusClass(this.getControl(controlName));
  }
}

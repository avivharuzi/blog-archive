// Modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RoutingModule } from './app.routing';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Custom Modules
import { MessageModule } from './modules/message/message.module';
import { PaginationModule } from './modules/pagination/pagination.module';
import { BackToTopModule } from './modules/back-to-top/back-to-top.module';
import { LoadingModule } from './modules/loading/loading.module';

// Extra Modules
import { TagInputModule } from 'ngx-chips';
import { CKEditorModule } from 'ng2-ckeditor';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ModalModule } from 'ngx-bootstrap/modal';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';

// Components
import { AppComponent } from './app.component';
import { BlogHomeComponent } from './components/blog/blog-home/blog-home.component';
import { ErrorPageComponent } from './components/errors/error-page/error-page.component';
import { ErrorFormComponent } from './components/errors/error-form/error-form.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginFormComponent } from './components/forms/login-form/login-form.component';
import { BlogComponent } from './components/blog/blog.component';
import { AddPostComponent } from './components/admin/add-post/add-post.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { AdminHeaderComponent } from './components/admin/admin-header/admin-header.component';
import { EditPostsComponent } from './components/admin/edit-posts/edit-posts.component';
import { AddCategoryComponent } from './components/admin/add-category/add-category.component';
import { EditCategoriesComponent } from './components/admin/edit-categories/edit-categories.component';
import { PageHeaderComponent } from './components/admin/page-header/page-header.component';
import { PostFormComponent } from './components/forms/post-form/post-form.component';
import { CategoryFormComponent } from './components/forms/category-form/category-form.component';
import { PostsTableComponent } from './components/tables/posts-table/posts-table.component';
import { CategoriesTableComponent } from './components/tables/categories-table/categories-table.component';
import { PictureComponent } from './components/blog/picture/picture.component';

// Services
import { ValidationService } from './services/validation/validation.service';
import { AuthService } from './services/auth/auth.service';
import { CategoryService } from './services/category/category.service';
import { PostService } from './services/post/post.service';

// Pipes
import { SearchPipe } from './pipes/search/search.pipe';
import { CapitalizePipe } from './pipes/capitalize/capitalize.pipe';
import { UcwordsPipe } from './pipes/ucwords/ucwords.pipe';
import { DefaultPipe } from './pipes/default/default.pipe';

// Directives
import { DefaultImageDirective } from './directives/default-image/default-image.directive';

// Guards
import { AuthGuard } from './guards/auth/auth.guard';

// Interceptors
import { AuthInterceptor } from './interceptors/auth/auth.interceptor';
import { BlogHeaderComponent } from './components/blog/blog-header/blog-header.component';
import { BlogPostListComponent } from './components/blog/blog-post-list/blog-post-list.component';
import { BlogPostItemComponent } from './components/blog/blog-post-list/blog-post-item/blog-post-item.component';
import { BlogSideComponent } from './components/blog/blog-side/blog-side.component';
import { BlogSideCategoriesComponent } from './components/blog/blog-side/blog-side-categories/blog-side-categories.component';
import { BlogSideTagsComponent } from './components/blog/blog-side/blog-side-tags/blog-side-tags.component';
import { BlogSideRecentPostsComponent } from './components/blog/blog-side/blog-side-recent-posts/blog-side-recent-posts.component';

@NgModule({
  declarations: [
    AppComponent,
    ErrorPageComponent,
    ErrorFormComponent,
    CapitalizePipe,
    SearchPipe,
    UcwordsPipe,
    DefaultPipe,
    DefaultImageDirective,
    BlogHomeComponent,
    AdminComponent,
    LoginFormComponent,
    BlogComponent,
    AddPostComponent,
    AdminHomeComponent,
    BlogHomeComponent,
    AdminHeaderComponent,
    EditPostsComponent,
    PostFormComponent,
    AddCategoryComponent,
    EditCategoriesComponent,
    PageHeaderComponent,
    CategoryFormComponent,
    PostsTableComponent,
    CategoriesTableComponent,
    PictureComponent,
    BlogHeaderComponent,
    BlogPostListComponent,
    BlogPostItemComponent,
    BlogSideComponent,
    BlogSideCategoriesComponent,
    BlogSideTagsComponent,
    BlogSideRecentPostsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    RoutingModule,
    RouterModule,
    HttpClientModule,
    MessageModule.forRoot(),
    PaginationModule.forRoot(),
    BackToTopModule.forRoot(),
    LoadingModule.forRoot(),
    TagInputModule,
    CKEditorModule,
    BsDatepickerModule.forRoot(),
    ModalModule.forRoot(),
    NgxChartsModule,
    SweetAlert2Module.forRoot()
  ],
  providers: [
    ValidationService,
    AuthService,
    AuthGuard,
    CategoryService,
    PostService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

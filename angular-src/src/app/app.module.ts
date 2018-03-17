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

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layouts/header/header.component';
import { BodyComponent } from './components/layouts/body/body.component';
import { FooterComponent } from './components/layouts/footer/footer.component';
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
import { AddPostFormComponent } from './components/forms/add-post-form/add-post-form.component';
import { AddCategoryComponent } from './components/admin/add-category/add-category.component';
import { EditCategoriesComponent } from './components/admin/edit-categories/edit-categories.component';
import { PageHeaderComponent } from './components/admin/page-header/page-header.component';
import { AddCategoryFormComponent } from './components/forms/add-category-form/add-category-form.component';

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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    FooterComponent,
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
    AddPostFormComponent,
    AddCategoryComponent,
    EditCategoriesComponent,
    PageHeaderComponent,
    AddCategoryFormComponent
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
    NgxChartsModule
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

// Modules
import { NgModule, ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { BlogHomeComponent } from './components/blog/blog-home/blog-home.component';
import { ErrorPageComponent } from './components/errors/error-page/error-page.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoginFormComponent } from './components/forms/login-form/login-form.component';
import { BlogComponent } from './components/blog/blog.component';
import { AddPostComponent } from './components/admin/add-post/add-post.component';
import { AdminHomeComponent } from './components/admin/admin-home/admin-home.component';
import { EditPostsComponent } from './components/admin/edit-posts/edit-posts.component';
import { AddCategoryComponent } from './components/admin/add-category/add-category.component';
import { EditCategoriesComponent } from './components/admin/edit-categories/edit-categories.component';

// Guards
import { AuthGuard } from './guards/auth/auth.guard';

// Routes
const appRoutes: Routes = [
  {
    path: '', component: BlogComponent, children: [
      {
        path: '', component: BlogHomeComponent
      }
    ]
  },
  { path: 'admin', component: AdminComponent, canActivate: [AuthGuard], children: [
      {
        path: 'home', component: AdminHomeComponent, canActivate: [AuthGuard]
      },
      {
        path: 'add-post', component: AddPostComponent, canActivate: [AuthGuard]
      },
      {
        path: 'edit-posts', component: EditPostsComponent, canActivate: [AuthGuard]
      },
      {
        path: 'add-category', component: AddCategoryComponent, canActivate: [AuthGuard]
      },
      {
        path: 'edit-categories', component: EditCategoriesComponent, canActivate: [AuthGuard]
      },
      {
        path:  '', redirectTo: 'home', pathMatch: 'full'
      },
    ]
  },
  {
    path: 'admin/login', component: LoginFormComponent
  },
  {
    path:  '', redirectTo: '', pathMatch: 'full'
  },
  {
    path: '**', component: ErrorPageComponent
  },
];

const appRouter: ModuleWithProviders = RouterModule.forRoot(appRoutes);

@NgModule({
  imports: [
    appRouter
  ]
})
export class RoutingModule { }

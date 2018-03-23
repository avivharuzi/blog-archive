import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { BlogService } from '../../../services/blog/blog.service';

@Component({
  selector: 'app-blog-home',
  templateUrl: './blog-home.component.html',
  styleUrls: ['./blog-home.component.css']
})
export class BlogHomeComponent implements OnInit, OnDestroy {
  public paramsSubscription: Subscription;
  public posts: any[];
  public slug: string;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService
  ) { }

  ngOnInit() {
    this.checkAndGetPosts();
  }

  checkAndGetPosts() {
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.slug = params['slug'];
        if (this.slug) {
          this.getPostsByCategorySlug();
        } else {
          this.getPosts();
        }
    });
  }

  getPostsByCategorySlug() {
    this.blogService.getPostsByCategorySlug(this.slug).subscribe((res: any) => {
      if (res) {
        this.posts = res;
        console.log(res);
      }
    }, (err) => {
      this.getPosts();
    });
  }

  getPosts(): void {
    this.blogService.getBlogPosts().subscribe((res: any) => {
      if (res) {
        this.posts = res;
      }
    }, (err) => {
      console.log(err);
    });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}

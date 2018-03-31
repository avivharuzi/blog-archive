import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { BlogService } from '../../../services/blog/blog.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-home',
  templateUrl: './blog-home.component.html',
  styleUrls: ['./blog-home.component.css']
})
export class BlogHomeComponent implements OnInit, OnDestroy {
  public paramsSubscription: Subscription;
  public posts: any[];

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.checkAndGetPosts();
  }

  checkAndGetPosts(): void {
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      const slug: string = params['slug'];
      const tag: string = params['tag'];
        if (slug) {
          this.getPostsByCategory(slug);
        } else if (tag) {
          this.getPostsByTag(tag);
        } else {
          this.getPosts();
        }
    });
  }

  getPostsByCategory(slug: string): void {
    this.blogService.getPostsByCategorySlug(slug).subscribe((res: any) => {
      this.posts = res;
      this.setTitle(slug);
    }, (err) => {
      this.getPosts();
    });
  }

  getPostsByTag(tag: string): void {
    this.blogService.getPostsByTag(tag).subscribe((res: any) => {
      this.posts = res;
      this.setTitle(tag);
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

  setTitle(newTitle: string) {
    this.titleService.setTitle(this.getUcwords(newTitle));
  }

  getUcwords(str) {
    return (str + '').replace(/^(.)|\s+(.)/g, ($1) => $1.toUpperCase());
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}

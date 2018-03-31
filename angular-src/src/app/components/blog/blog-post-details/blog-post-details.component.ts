import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { BlogService } from '../../../services/blog/blog.service';
import { Location } from '@angular/common';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blog-post-details',
  templateUrl: './blog-post-details.component.html',
  styleUrls: ['./blog-post-details.component.css']
})
export class BlogPostDetailsComponent implements OnInit, OnDestroy {
  public paramsSubscription: Subscription;
  public slug: string;
  public post: any;

  constructor(
    private route: ActivatedRoute,
    private blogService: BlogService,
    private router: Router,
    private location: Location,
    private titleService: Title
  ) { }

  ngOnInit() {
    this.checkAndGetPost();
  }

  checkAndGetPost(): void {
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.slug = params['slug'];
      this.blogService.getPostBySlug(this.slug).subscribe((res: any) => {
        this.post = res;
        this.titleService.setTitle(this.getUcwords(this.post.title));
        window.scrollTo(0, 0);
      }, (err) => {
        this.router.navigate(['/']);
      });
    });
  }

  goBack(): void {
    this.location.back();
  }

  ngOnDestroy() {
    if (this.paramsSubscription) {
      this.paramsSubscription.unsubscribe();
    }
  }

  getUcwords(str) {
    return (str + '').replace(/^(.)|\s+(.)/g, ($1) => $1.toUpperCase());
  }
}

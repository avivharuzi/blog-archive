import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { BlogService } from '../../../services/blog/blog.service';
import { Location } from '@angular/common';

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
    private location: Location
  ) { }

  ngOnInit() {
    this.checkAndGetPost();
  }

  checkAndGetPost() {
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.slug = params['slug'];
      this.blogService.getPostBySlug(this.slug).subscribe((res: any) => {
        if (res) {
          this.post = res;
          console.log(res);
        }
      }, (err) => {
        this.router.navigate(['/']);
      });
    });
  }

  goBack() {
    this.location.back();
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}

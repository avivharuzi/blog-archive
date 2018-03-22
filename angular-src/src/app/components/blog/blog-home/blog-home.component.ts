import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post/post.service';

@Component({
  selector: 'app-blog-home',
  templateUrl: './blog-home.component.html',
  styleUrls: ['./blog-home.component.css']
})
export class BlogHomeComponent implements OnInit {
  public posts: any[];

  constructor(
    private postService: PostService
  ) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts(): void {
    this.postService.getPosts().subscribe((res: any) => {
      if (res) {
        this.posts = res;
      }
    }, (err) => {
      console.log(err);
    });
  }
}

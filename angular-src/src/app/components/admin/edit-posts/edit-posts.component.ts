import { Component, OnInit } from '@angular/core';
import { PostService } from '../../../services/post/post.service';

@Component({
  selector: 'app-edit-posts',
  templateUrl: './edit-posts.component.html',
  styleUrls: ['./edit-posts.component.css']
})
export class EditPostsComponent implements OnInit {
  public posts: any[];

  constructor(
    private postService: PostService
  ) { }

  ngOnInit() {
    this.getPosts();
  }

  getPosts(): void {
    this.postService.getPosts().subscribe((res: any) => {
      this.posts = res;
    }, (err) => {
      console.log(err);
    });
  }

  onDeletePost(post): void {
    this.postService.deletePost(post._id).subscribe((res: any) => {
      if (res) {
        console.log(res);
        this.posts.splice(this.posts.indexOf(post), 1);
      }
    }, (err) => {
      console.log(err);
    });
  }
}

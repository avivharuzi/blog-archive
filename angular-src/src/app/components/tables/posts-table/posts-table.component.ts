import { Component, OnInit, Input, Output, EventEmitter, TemplateRef } from '@angular/core';
import { PostService } from '../../../services/post/post.service';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

@Component({
  selector: 'app-posts-table',
  templateUrl: './posts-table.component.html',
  styleUrls: ['./posts-table.component.css']
})
export class PostsTableComponent implements OnInit {
  public modalRef: BsModalRef;
  public selectedPost: any;

  @Input()
  public posts: any[];

  @Output()
  public deletePost: EventEmitter<any> = new EventEmitter<any>();

  constructor(
    private modalService: BsModalService,
  ) { }

  ngOnInit() {
    this.selectedPost = null;
  }

  delete(post): void {
    this.deletePost.emit(post);
  }

  openModal(template: TemplateRef<any>, post) {
    this.selectedPost = post;
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-xl' })
    );
  }
}

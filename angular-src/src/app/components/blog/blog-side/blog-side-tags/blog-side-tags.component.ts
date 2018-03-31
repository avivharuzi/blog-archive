import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-blog-side-tags',
  templateUrl: './blog-side-tags.component.html',
  styleUrls: ['./blog-side-tags.component.css']
})
export class BlogSideTagsComponent implements OnInit {
  @Input()
  public tags: any[];

  constructor() { }

  ngOnInit() {
  }
}

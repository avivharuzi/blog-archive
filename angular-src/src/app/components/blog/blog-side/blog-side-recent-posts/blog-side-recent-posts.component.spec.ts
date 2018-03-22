import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogSideRecentPostsComponent } from './blog-side-recent-posts.component';

describe('BlogSideRecentPostsComponent', () => {
  let component: BlogSideRecentPostsComponent;
  let fixture: ComponentFixture<BlogSideRecentPostsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogSideRecentPostsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogSideRecentPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogPostItemComponent } from './blog-post-item.component';

describe('BlogPostItemComponent', () => {
  let component: BlogPostItemComponent;
  let fixture: ComponentFixture<BlogPostItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogPostItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogPostItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogSideTagsComponent } from './blog-side-tags.component';

describe('BlogSideTagsComponent', () => {
  let component: BlogSideTagsComponent;
  let fixture: ComponentFixture<BlogSideTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogSideTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogSideTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

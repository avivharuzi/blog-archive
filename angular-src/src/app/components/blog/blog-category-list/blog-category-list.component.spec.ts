import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogCategoryListComponent } from './blog-category-list.component';

describe('BlogCategoryListComponent', () => {
  let component: BlogCategoryListComponent;
  let fixture: ComponentFixture<BlogCategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogCategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

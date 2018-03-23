import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogCategoryItemComponent } from './blog-category-item.component';

describe('BlogCategoryItemComponent', () => {
  let component: BlogCategoryItemComponent;
  let fixture: ComponentFixture<BlogCategoryItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogCategoryItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogCategoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

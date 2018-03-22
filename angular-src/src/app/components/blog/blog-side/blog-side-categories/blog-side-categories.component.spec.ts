import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlogSideCategoriesComponent } from './blog-side-categories.component';

describe('BlogSideCategoriesComponent', () => {
  let component: BlogSideCategoriesComponent;
  let fixture: ComponentFixture<BlogSideCategoriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlogSideCategoriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlogSideCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

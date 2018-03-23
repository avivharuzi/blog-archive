import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBlogChartComponent } from './admin-blog-chart.component';

describe('AdminBlogChartComponent', () => {
  let component: AdminBlogChartComponent;
  let fixture: ComponentFixture<AdminBlogChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBlogChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBlogChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

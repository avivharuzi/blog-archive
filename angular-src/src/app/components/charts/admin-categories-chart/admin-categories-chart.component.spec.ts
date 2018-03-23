import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoriesChartComponent } from './admin-categories-chart.component';

describe('AdminCategoriesChartComponent', () => {
  let component: AdminCategoriesChartComponent;
  let fixture: ComponentFixture<AdminCategoriesChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCategoriesChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCategoriesChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

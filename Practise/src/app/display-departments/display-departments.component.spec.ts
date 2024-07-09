import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayDepartmentsComponent } from './display-departments.component';

describe('DisplayDepartmentsComponent', () => {
  let component: DisplayDepartmentsComponent;
  let fixture: ComponentFixture<DisplayDepartmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayDepartmentsComponent]
    });
    fixture = TestBed.createComponent(DisplayDepartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

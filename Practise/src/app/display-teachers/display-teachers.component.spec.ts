import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayTeachersComponent } from './display-teachers.component';

describe('DisplayTeachersComponent', () => {
  let component: DisplayTeachersComponent;
  let fixture: ComponentFixture<DisplayTeachersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayTeachersComponent]
    });
    fixture = TestBed.createComponent(DisplayTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

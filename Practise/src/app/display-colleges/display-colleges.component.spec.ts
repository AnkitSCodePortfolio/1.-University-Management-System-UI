import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCollegesComponent } from './display-colleges.component';

describe('DisplayCollegesComponent', () => {
  let component: DisplayCollegesComponent;
  let fixture: ComponentFixture<DisplayCollegesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayCollegesComponent]
    });
    fixture = TestBed.createComponent(DisplayCollegesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

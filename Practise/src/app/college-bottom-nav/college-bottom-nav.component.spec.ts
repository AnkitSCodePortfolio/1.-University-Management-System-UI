import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeBottomNavComponent } from './college-bottom-nav.component';

describe('CollegeBottomNavComponent', () => {
  let component: CollegeBottomNavComponent;
  let fixture: ComponentFixture<CollegeBottomNavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CollegeBottomNavComponent]
    });
    fixture = TestBed.createComponent(CollegeBottomNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

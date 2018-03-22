import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFieldErrorDisplayComponent } from './app-field-error-display.component';

describe('AppFieldErrorDisplayComponent', () => {
  let component: AppFieldErrorDisplayComponent;
  let fixture: ComponentFixture<AppFieldErrorDisplayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppFieldErrorDisplayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppFieldErrorDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

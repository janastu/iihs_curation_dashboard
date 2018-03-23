import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateboardcomponentComponent } from './createboardcomponent.component';

describe('CreateboardcomponentComponent', () => {
  let component: CreateboardcomponentComponent;
  let fixture: ComponentFixture<CreateboardcomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateboardcomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateboardcomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

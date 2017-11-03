import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoverToolbarComponent } from './hover-toolbar.component';

describe('HoverToolbarComponent', () => {
  let component: HoverToolbarComponent;
  let fixture: ComponentFixture<HoverToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoverToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoverToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

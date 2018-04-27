import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PublishedViewComponent } from './published-view.component';

describe('PublishedViewComponent', () => {
  let component: PublishedViewComponent;
  let fixture: ComponentFixture<PublishedViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PublishedViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublishedViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

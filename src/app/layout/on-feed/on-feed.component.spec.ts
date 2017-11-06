import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnFeedComponent } from './on-feed.component';

describe('OnFeedComponent', () => {
  let component: OnFeedComponent;
  let fixture: ComponentFixture<OnFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

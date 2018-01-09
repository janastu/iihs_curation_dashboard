import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateFeedComponent } from './create-feed.component';

describe('CreateFeedComponent', () => {
  let component: CreateFeedComponent;
  let fixture: ComponentFixture<CreateFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

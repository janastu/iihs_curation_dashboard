import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardfeedsComponent } from './boardfeeds.component';

describe('BoardfeedsComponent', () => {
  let component: BoardfeedsComponent;
  let fixture: ComponentFixture<BoardfeedsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardfeedsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoardfeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

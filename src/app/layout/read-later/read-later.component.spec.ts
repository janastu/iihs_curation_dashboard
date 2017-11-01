import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadLaterComponent } from './read-later.component';

describe('ReadLaterComponent', () => {
  let component: ReadLaterComponent;
  let fixture: ComponentFixture<ReadLaterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadLaterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadLaterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

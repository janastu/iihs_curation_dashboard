import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecentlyReadComponent } from './recently-read.component';

describe('RecentlyReadComponent', () => {
  let component: RecentlyReadComponent;
  let fixture: ComponentFixture<RecentlyReadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecentlyReadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecentlyReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

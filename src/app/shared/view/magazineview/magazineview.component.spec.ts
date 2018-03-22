import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {  MagazineviewComponent } from './magazineview.component';

describe('ArticleviewComponent', () => {
  let component: MagazineviewComponent;
  let fixture: ComponentFixture<MagazineviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MagazineviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MagazineviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

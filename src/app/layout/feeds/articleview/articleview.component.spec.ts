import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleviewComponent } from './articleview.component';

describe('ArticleviewComponent', () => {
  let component: ArticleviewComponent;
  let fixture: ComponentFixture<ArticleviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleToolbarComponent } from './article-toolbar.component';

describe('articleToolbarComponent', () => {
  let component: ArticleToolbarComponent;
  let fixture: ComponentFixture<ArticleToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

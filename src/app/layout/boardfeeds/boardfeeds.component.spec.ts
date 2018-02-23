import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BoardfeedsRoutingModule } from './boardfeeds-routing.module';
import { BoardfeedsComponent } from './boardfeeds.component';

describe('BoardfeedsComponent', () => {
  let component: BoardfeedsComponent;
  let fixture: ComponentFixture<BoardfeedsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoardfeedsComponent ],
      imports:[
      BoardfeedsRoutingModule,
        
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

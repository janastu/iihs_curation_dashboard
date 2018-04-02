import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PageHeaderModule } from './../shared/modules/page-header/page-header.module';
import { RouterTestingModule } from '@angular/router/testing';
import { MmpublishComponent } from './mmpublish.component';

describe('MmpublishComponent', () => {
  let component: MmpublishComponent;
  let fixture: ComponentFixture<MmpublishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
      RouterTestingModule,
      PageHeaderModule,
    ],
      declarations: [ MmpublishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MmpublishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

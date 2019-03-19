import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlickForComponent } from './slick-for.component';

describe('SlickForComponent', () => {
  let component: SlickForComponent;
  let fixture: ComponentFixture<SlickForComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlickForComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlickForComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

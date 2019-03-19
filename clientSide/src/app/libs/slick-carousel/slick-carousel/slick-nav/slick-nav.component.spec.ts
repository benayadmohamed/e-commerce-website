import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlickNavComponent } from './slick-nav.component';

describe('SlickNavComponent', () => {
  let component: SlickNavComponent;
  let fixture: ComponentFixture<SlickNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlickNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlickNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

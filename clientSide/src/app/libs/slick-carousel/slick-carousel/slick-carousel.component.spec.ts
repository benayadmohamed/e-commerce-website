import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlickCarouselComponent } from './slick-carousel.component';

describe('SlickCarouselComponent', () => {
  let component: SlickCarouselComponent;
  let fixture: ComponentFixture<SlickCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlickCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlickCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

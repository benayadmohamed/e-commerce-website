import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarqueComponent } from './marque.component';

describe('MarqueComponent', () => {
  let component: MarqueComponent;
  let fixture: ComponentFixture<MarqueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarqueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

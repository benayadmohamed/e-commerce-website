import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReductionComponent } from './reduction.component';

describe('ReductionComponent', () => {
  let component: ReductionComponent;
  let fixture: ComponentFixture<ReductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReductionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

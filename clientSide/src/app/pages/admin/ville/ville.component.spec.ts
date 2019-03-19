import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VilleComponent } from './ville.component';

describe('VilleComponent', () => {
  let component: VilleComponent;
  let fixture: ComponentFixture<VilleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VilleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VilleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

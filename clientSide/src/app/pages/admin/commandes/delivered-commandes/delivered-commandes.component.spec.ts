import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliveredCommandesComponent } from './delivered-commandes.component';

describe('DeliveredCommandesComponent', () => {
  let component: DeliveredCommandesComponent;
  let fixture: ComponentFixture<DeliveredCommandesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeliveredCommandesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliveredCommandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

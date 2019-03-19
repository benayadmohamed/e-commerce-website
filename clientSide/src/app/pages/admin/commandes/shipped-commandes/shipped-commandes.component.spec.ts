import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShippedCommandesComponent } from './shipped-commandes.component';

describe('ShippedCommandesComponent', () => {
  let component: ShippedCommandesComponent;
  let fixture: ComponentFixture<ShippedCommandesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShippedCommandesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShippedCommandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TarifComponent } from './tarif.component';

describe('TarifComponent', () => {
  let component: TarifComponent;
  let fixture: ComponentFixture<TarifComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TarifComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TarifComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

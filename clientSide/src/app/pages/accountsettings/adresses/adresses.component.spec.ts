import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdressesComponent } from './adresses.component';

describe('AdressesComponent', () => {
  let component: AdressesComponent;
  let fixture: ComponentFixture<AdressesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdressesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

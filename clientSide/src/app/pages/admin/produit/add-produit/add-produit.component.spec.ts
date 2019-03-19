import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddProduitComponent } from './add-produit.component';

describe('AddProduitComponent', () => {
  let component: AddProduitComponent;
  let fixture: ComponentFixture<AddProduitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddProduitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

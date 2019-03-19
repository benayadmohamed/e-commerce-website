import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProduitComponent } from './update-produit.component';

describe('UpdateProduitComponent', () => {
  let component: UpdateProduitComponent;
  let fixture: ComponentFixture<UpdateProduitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateProduitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

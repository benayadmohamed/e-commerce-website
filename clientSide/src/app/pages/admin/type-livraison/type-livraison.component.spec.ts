import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeLivraisonComponent } from './type-livraison.component';

describe('TypeLivraisonComponent', () => {
  let component: TypeLivraisonComponent;
  let fixture: ComponentFixture<TypeLivraisonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TypeLivraisonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TypeLivraisonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

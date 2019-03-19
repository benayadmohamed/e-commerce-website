import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailProduitComponent } from './detail-produit.component';

describe('DetailProduitComponent', () => {
  let component: DetailProduitComponent;
  let fixture: ComponentFixture<DetailProduitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailProduitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailProduitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

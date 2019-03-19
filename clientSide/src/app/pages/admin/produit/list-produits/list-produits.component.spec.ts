import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListProduitsComponent } from './list-produits.component';

describe('ListProduitsComponent', () => {
  let component: ListProduitsComponent;
  let fixture: ComponentFixture<ListProduitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListProduitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListProduitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

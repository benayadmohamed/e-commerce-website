import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieComponent } from './categorie.component';

describe('CategorieComponent', () => {
  let component: CategorieComponent;
  let fixture: ComponentFixture<CategorieComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategorieComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

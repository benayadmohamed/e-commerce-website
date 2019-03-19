import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InformationPersonnelleComponent } from './information-personnelle.component';

describe('InformationPersonnelleComponent', () => {
  let component: InformationPersonnelleComponent;
  let fixture: ComponentFixture<InformationPersonnelleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InformationPersonnelleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InformationPersonnelleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

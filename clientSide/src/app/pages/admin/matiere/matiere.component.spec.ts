import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatiereComponent } from './matiere.component';

describe('MatiereComponent', () => {
  let component: MatiereComponent;
  let fixture: ComponentFixture<MatiereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatiereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatiereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

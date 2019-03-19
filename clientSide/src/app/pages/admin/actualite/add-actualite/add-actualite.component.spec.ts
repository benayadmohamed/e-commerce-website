import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddActualiteComponent } from './add-actualite.component';

describe('AddActualiteComponent', () => {
  let component: AddActualiteComponent;
  let fixture: ComponentFixture<AddActualiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddActualiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddActualiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColsedCommandesComponent } from './colsed-commandes.component';

describe('ColsedCommandesComponent', () => {
  let component: ColsedCommandesComponent;
  let fixture: ComponentFixture<ColsedCommandesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColsedCommandesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColsedCommandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

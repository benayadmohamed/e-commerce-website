import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewArrivalesComponent } from './new-arrivales.component';

describe('NewArrivalesComponent', () => {
  let component: NewArrivalesComponent;
  let fixture: ComponentFixture<NewArrivalesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewArrivalesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewArrivalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

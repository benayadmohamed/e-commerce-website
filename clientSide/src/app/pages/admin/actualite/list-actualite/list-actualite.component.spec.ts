import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListActualiteComponent } from './list-actualite.component';

describe('ListActualiteComponent', () => {
  let component: ListActualiteComponent;
  let fixture: ComponentFixture<ListActualiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListActualiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListActualiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

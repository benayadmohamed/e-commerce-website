import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsCommandesComponent } from './news-commandes.component';

describe('NewsCommandesComponent', () => {
  let component: NewsCommandesComponent;
  let fixture: ComponentFixture<NewsCommandesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewsCommandesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsCommandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

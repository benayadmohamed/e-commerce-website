import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoSiteComponent } from './info-site.component';

describe('InfoSiteComponent', () => {
  let component: InfoSiteComponent;
  let fixture: ComponentFixture<InfoSiteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoSiteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

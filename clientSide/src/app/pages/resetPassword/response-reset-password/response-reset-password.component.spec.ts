import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponseResetPasswordComponent } from './response-reset-password.component';

describe('ResponseResetPasswordComponent', () => {
  let component: ResponseResetPasswordComponent;
  let fixture: ComponentFixture<ResponseResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponseResetPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponseResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

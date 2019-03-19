import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestResetPasswordComponent } from './request-reset-password.component';

describe('RequestResetPasswordComponent', () => {
  let component: RequestResetPasswordComponent;
  let fixture: ComponentFixture<RequestResetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestResetPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});


import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountSettingsComponent } from './account-settings.component';

describe('AccountSettingsComponent', () => {
  let component: AccountSettingsComponent;
  let fixture: ComponentFixture<AccountSettingsComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountSettingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});

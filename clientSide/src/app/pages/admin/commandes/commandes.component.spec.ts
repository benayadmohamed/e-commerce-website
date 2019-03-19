import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandesComponent } from './commandes.component';

describe('CommandesComponent', () => {
  let component: CommandesComponent;
  let fixture: ComponentFixture<CommandesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CommandesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

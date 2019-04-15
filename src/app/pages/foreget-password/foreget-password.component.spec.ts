import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForegetPasswordComponent } from './foreget-password.component';

describe('ForegetPasswordComponent', () => {
  let component: ForegetPasswordComponent;
  let fixture: ComponentFixture<ForegetPasswordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForegetPasswordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForegetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

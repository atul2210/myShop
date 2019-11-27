import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempRouteComponent } from './temp-route.component';

describe('TempRouteComponent', () => {
  let component: TempRouteComponent;
  let fixture: ComponentFixture<TempRouteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempRouteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

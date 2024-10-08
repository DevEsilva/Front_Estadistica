import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoporteCallComponent } from './soporte-call.component';

describe('SoporteCallComponent', () => {
  let component: SoporteCallComponent;
  let fixture: ComponentFixture<SoporteCallComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SoporteCallComponent]
    });
    fixture = TestBed.createComponent(SoporteCallComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

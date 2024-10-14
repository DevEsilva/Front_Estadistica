import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialporUserComponent } from './historialpor-user.component';

describe('HistorialporUserComponent', () => {
  let component: HistorialporUserComponent;
  let fixture: ComponentFixture<HistorialporUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HistorialporUserComponent]
    });
    fixture = TestBed.createComponent(HistorialporUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

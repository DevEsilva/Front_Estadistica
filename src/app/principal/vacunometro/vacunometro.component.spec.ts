import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VacunometroComponent } from './vacunometro.component';

describe('VacunometroComponent', () => {
  let component: VacunometroComponent;
  let fixture: ComponentFixture<VacunometroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VacunometroComponent]
    });
    fixture = TestBed.createComponent(VacunometroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

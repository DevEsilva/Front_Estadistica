import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Nino01Component } from './nino01.component';

describe('Nino01Component', () => {
  let component: Nino01Component;
  let fixture: ComponentFixture<Nino01Component>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Nino01Component]
    });
    fixture = TestBed.createComponent(Nino01Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

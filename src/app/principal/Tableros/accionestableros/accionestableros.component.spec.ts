import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccionestablerosComponent } from './accionestableros.component';

describe('AccionesComponent', () => {
  let component: AccionestablerosComponent;
  let fixture: ComponentFixture<AccionestablerosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AccionestablerosComponent]
    });
    fixture = TestBed.createComponent(AccionestablerosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

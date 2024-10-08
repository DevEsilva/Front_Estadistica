import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnemiaComponent } from './anemia.component';

describe('AnemiaComponent', () => {
  let component: AnemiaComponent;
  let fixture: ComponentFixture<AnemiaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AnemiaComponent]
    });
    fixture = TestBed.createComponent(AnemiaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

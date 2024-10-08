import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecoveryAccComponent } from './recovery-acc.component';

describe('RecoveryAccComponent', () => {
  let component: RecoveryAccComponent;
  let fixture: ComponentFixture<RecoveryAccComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecoveryAccComponent]
    });
    fixture = TestBed.createComponent(RecoveryAccComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReciennacidoComponent } from './reciennacido.component';

describe('ReciennacidoComponent', () => {
  let component: ReciennacidoComponent;
  let fixture: ComponentFixture<ReciennacidoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReciennacidoComponent]
    });
    fixture = TestBed.createComponent(ReciennacidoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

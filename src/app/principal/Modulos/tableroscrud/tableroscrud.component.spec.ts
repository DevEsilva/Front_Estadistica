import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableroscrudComponent } from './tableroscrud.component';

describe('TableroscrudComponent', () => {
  let component: TableroscrudComponent;
  let fixture: ComponentFixture<TableroscrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TableroscrudComponent]
    });
    fixture = TestBed.createComponent(TableroscrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

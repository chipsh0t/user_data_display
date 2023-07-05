import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataTableSearchbarComponent } from './data-table-searchbar.component';

describe('DataTableSearchbarComponent', () => {
  let component: DataTableSearchbarComponent;
  let fixture: ComponentFixture<DataTableSearchbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataTableSearchbarComponent]
    });
    fixture = TestBed.createComponent(DataTableSearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

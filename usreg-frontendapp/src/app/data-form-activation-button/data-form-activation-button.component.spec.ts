import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataFormActivationButtonComponent } from './data-form-activation-button.component';

describe('DataFormActivationButtonComponent', () => {
  let component: DataFormActivationButtonComponent;
  let fixture: ComponentFixture<DataFormActivationButtonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DataFormActivationButtonComponent]
    });
    fixture = TestBed.createComponent(DataFormActivationButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

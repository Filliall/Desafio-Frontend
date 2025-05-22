import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DebtDetailsDialogComponent } from './debt-details-dialog.component';

describe('DebtDetailsComponent', () => {
  let component: DebtDetailsDialogComponent;
  let fixture: ComponentFixture<DebtDetailsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DebtDetailsDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DebtDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

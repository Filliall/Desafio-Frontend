import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DebtListComponent } from './debt-list.component';
import { DebtService } from '../../core/services/debt.service';
import { of } from 'rxjs';
import { DebtSummary } from '../../core/models/debt.model';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('DebtListComponent', () => {
  let component: DebtListComponent;
  let fixture: ComponentFixture<DebtListComponent>;
  let debtService: jasmine.SpyObj<DebtService>;

  const mockDebts: DebtSummary[] = [
    {
      debtNumber: '123',
      debtorName: 'Test',
      installmentCount: 1,
      originalAmount: 100,
      daysOverdue: 10,
      updatedAmount: 103,
    },
  ];

  beforeEach(async () => {
    const debtServiceSpy = jasmine.createSpyObj('DebtService', ['getDebts']);

    await TestBed.configureTestingModule({
      declarations: [DebtListComponent],
      imports: [
        MatCardModule,
        MatProgressSpinnerModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatNativeDateModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
      ],
      providers: [{ provide: DebtService, useValue: debtServiceSpy }],
    }).compileComponents();

    debtService = TestBed.inject(DebtService) as jasmine.SpyObj<DebtService>;
    debtService.getDebts.and.returnValue(of(mockDebts));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DebtListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load debts on init', () => {
    expect(debtService.getDebts).toHaveBeenCalled();
    expect(component.debts.length).toBe(1);
    expect(component.debts[0].debtNumber).toBe('123');
  });

  it('should reload debts on date change', () => {
    component.referenceDate = new Date('2023-01-01');
    component.onDateChange();
    expect(debtService.getDebts).toHaveBeenCalledWith(new Date('2023-01-01'));
  });
});

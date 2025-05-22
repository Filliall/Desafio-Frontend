import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { DebtService } from './debt.service';
import { Debt, DebtSummary, Installment } from '../models/debt.model';

describe('DebtService', () => {
  let service: DebtService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DebtService],
    });
    service = TestBed.inject(DebtService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a debt', () => {
    const mockDebt: Debt = {
      debtNumber: '123',
      debtorName: 'Test',
      debtorCPF: '12345678901',
      interestRate: 1,
      fineRate: 2,
      installments: [{ installmentNumber: 1, dueDate: new Date(), value: 100 }],
    };

    service.createDebt(mockDebt).subscribe((debt) => {
      expect(debt).toEqual(mockDebt);
    });

    const req = httpMock.expectOne('http://localhost:5000/api/debts');
    expect(req.request.method).toBe('POST');
    req.flush(mockDebt);
  });

  it('should get debts', () => {
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

    service.getDebts().subscribe((debts) => {
      expect(debts.length).toBe(1);
      expect(debts).toEqual(mockDebts);
    });

    const req = httpMock.expectOne('http://localhost:5000/api/debts');
    expect(req.request.method).toBe('GET');
    req.flush(mockDebts);
  });
});

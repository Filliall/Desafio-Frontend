import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Debt, DebtSummary, Installment } from '../models/debt.model';
@Injectable({
  providedIn: 'root',
})
export class DebtService {
  private apiUrl = 'https://localhost:12340/api/debts';

  constructor(private http: HttpClient) {}

  getDebts(referenceDate?: Date): Observable<DebtSummary[]> {
    const params: any = {};
    if (referenceDate) params.referenceDate = referenceDate.toISOString();
    return this.http.get<DebtSummary[]>(this.apiUrl, { params });
  }

  createDebt(debt: Debt): Observable<Debt> {
    return this.http.post<Debt>(this.apiUrl, debt);
  }

  getDebtDetails(debtNumber: string): Observable<Debt> {
    return this.http.get<Debt>(`${this.apiUrl}/${debtNumber}`);
  }
}

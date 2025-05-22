import { Component, OnInit } from '@angular/core';
import { DebtService } from '../../core/services/debt.service';
import { DebtSummary } from '../../core/models/debt.model';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { DialogService } from '../../core/services/dialog.service';

@Component({
  selector: 'app-debt-list',
  imports: [
    FormsModule,
    CommonModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  templateUrl: './debt-list.component.html',
  styleUrls: ['./debt-list.component.css'],
})
export class DebtListComponent implements OnInit {
  debts: DebtSummary[] = [];
  referenceDate: Date = new Date();
  isLoading = false;

  constructor(
    private debtService: DebtService,
    private dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.loadDebts();
  }

  viewDetails(debt: any): void {
    // Carregar detalhes completos antes de abrir o diálogo
    this.debtService.getDebtDetails(debt.debtNumber).subscribe({
      next: (debtDetails) => {
        this.dialogService.openDebtDetails(debtDetails);
      },
      error: (err) => console.error('Erro ao carregar detalhes:', err),
    });
  }

  loadDebts(): void {
    this.isLoading = true;
    this.debtService.getDebts(this.referenceDate).subscribe({
      next: (debts) => {
        this.debts = debts;
        this.isLoading = false;
      },
      error: () => (this.isLoading = false),
    });
  }

  onDateChange(): void {
    this.loadDebts();
  }
}

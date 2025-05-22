import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';

import { Debt } from '../../core/models/debt.model';
import { DebtService } from '../../core/services/debt.service';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NgxMaskPipe } from 'ngx-mask';

@Component({
  imports: [
    FormsModule,
    CommonModule,
    NgxMaskPipe,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatProgressSpinnerModule,
  ],
  selector: 'app-debt-details',
  templateUrl: './debt-details.component.html',
  styleUrls: ['./debt-details.component.css'],
})
export class DebtDetailsComponent implements OnInit {
  debt: Debt | null = null;
  isLoading = false;

  constructor(
    private route: ActivatedRoute,
    private debtService: DebtService
  ) {}

  ngOnInit(): void {
    const debtNumber = this.route.snapshot.paramMap.get('debtNumber');
    if (debtNumber) {
      this.loadDebtDetails(debtNumber);
    }
  }

  loadDebtDetails(debtNumber: string): void {
    this.isLoading = true;
    this.debtService.getDebtDetails(debtNumber).subscribe({
      next: (debt) => {
        this.debt = debt;
        this.isLoading = false;
      },
      error: () => (this.isLoading = false),
    });
  }

  calculateTotal(): number {
    if (!this.debt) return 0;
    return this.debt.installments.reduce((sum, i) => sum + i.value, 0);
  }
}

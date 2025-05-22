import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DebtService } from '../../core/services/debt.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { cpfValidator } from '../../shared/cpf.validator';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  imports: [
    FormsModule,
    CommonModule,
    MatSlideToggleModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    MatCardModule,
  ],
  providers: [DebtService],
  selector: 'app-debt-create',
  templateUrl: './debt-create.component.html',
  styleUrls: ['./debt-create.component.css'],
})
export class DebtCreateComponent implements OnInit {
  debtForm: FormGroup;
  minDate = new Date();
  loading = false;

  constructor(
    private fb: FormBuilder,
    private debtService: DebtService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.debtForm = this.fb.group({
      debtNumber: ['', [Validators.required, Validators.maxLength(20)]],
      debtorName: ['', [Validators.required, Validators.maxLength(100)]],
      debtorCPF: ['', [Validators.required, cpfValidator()]],
      interestRate: [
        0,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      fineRate: [
        0,
        [Validators.required, Validators.min(0), Validators.max(100)],
      ],
      installments: this.fb.array([this.createInstallment()]),
    });
  }

  ngOnInit(): void {
    this.minDate.setDate(this.minDate.getDate() + 1);
  }

  createInstallment(): FormGroup {
    return this.fb.group({
      installmentNumber: [1, [Validators.required, Validators.min(1)]],
      dueDate: ['', Validators.required],
      value: [0, [Validators.required, Validators.min(0.01)]],
    });
  }

  get installments(): FormArray {
    return this.debtForm.get('installments') as FormArray;
  }

  addInstallment(): void {
    this.installments.push(this.createInstallment());
  }

  removeInstallment(index: number): void {
    if (this.installments.length > 1) {
      this.installments.removeAt(index);
    }
  }

  onSubmit(): void {
    if (this.debtForm.invalid) {
      this.snackBar.open(
        'Por favor, preencha todos os campos corretamente',
        'Fechar',
        {
          duration: 5000,
        }
      );
      return;
    }

    this.loading = true;
    const formValue = this.debtForm.value;

    this.debtService.createDebt(formValue).subscribe({
      next: () => {
        this.snackBar.open('Dívida cadastrada com sucesso!', 'Fechar', {
          duration: 3000,
        });

        setTimeout(() => window.location.reload(), 3000);
      },
      error: (err: { error: { message: any } }) => {
        this.loading = false;
        this.snackBar.open(
          `Erro: ${err.error?.message || 'Falha ao cadastrar dívida'}`,
          'Fechar',
          {
            duration: 5000,
          }
        );
      },
    });
  }
}

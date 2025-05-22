import { Component, Inject } from '@angular/core';
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
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
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
    MatDialogModule,
    MatProgressSpinnerModule,
  ],
  selector: 'app-debt-details',

  templateUrl: './debt-details-dialog.component.html',
  styleUrls: ['./debt-details-dialog.component.css'],
})
export class DebtDetailsDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DebtDetailsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { debt: Debt }
  ) {}

  close(): void {
    this.dialogRef.close();
  }

  calculateTotal(): number {
    return this.data.debt.installments.reduce((sum, i) => sum + i.value, 0);
  }
}

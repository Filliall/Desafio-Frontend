// dialog.service.ts
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DebtDetailsDialogComponent } from '../../features/debt-details/debt-details-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(private dialog: MatDialog) {}

  openDebtDetails(debt: any): void {
    this.dialog.open(DebtDetailsDialogComponent, {
      width: '800px',
      data: { debt },
      panelClass: 'debt-details-dialog',
    });
  }
}

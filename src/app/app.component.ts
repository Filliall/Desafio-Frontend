import { Component } from '@angular/core';
import { DebtListComponent } from './features/debt-list/debt-list.component';
import { DebtCreateComponent } from './features/debt-create/debt-create.component';
import { MatTabsModule } from '@angular/material/tabs';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-root',
  imports: [DebtListComponent, DebtCreateComponent, MatTabsModule],
  providers: [DatePipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  currentTabIndex = 0;
  currentDate: any;

  constructor(private datePipe: DatePipe) {
    this.currentDate = this.datePipe.transform(
      new Date(),
      'yyyy-MM-dd HH:mm:ss'
    );
  }
}

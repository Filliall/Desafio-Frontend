export interface Debt {
  id?: number;
  debtNumber: string;
  debtorName: string;
  debtorCPF: string;
  interestRate: number;
  fineRate: number;
  installments: Installment[];
}

export interface Installment {
  installmentNumber: number;
  dueDate: Date;
  value: number;
}

export interface DebtSummary {
  debtNumber: string;
  debtorName: string;
  installmentCount: number;
  originalAmount: number;
  daysOverdue: number;
  updatedAmount: number;
}
export interface DebtUpdate {
  id: number;
  debtNumber: string;
  debtorName: string;
  debtorCPF: string;
  interestRate: number;
  fineRate: number;
  installments: Installment[];
}

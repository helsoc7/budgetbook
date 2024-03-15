import { Counter, register } from 'prom-client';

import { Injectable } from '@nestjs/common';

@Injectable()
export class MetricsService {
  private newExpenseCounter: Counter;
  private newExpenseCount: number = 0;

  constructor() {
    this.newExpenseCounter = new Counter({
      name: 'newExpense_total_budget',
      help: 'Total number of expenses to the BudgetBOOK app',
    });
    
    register.registerMetric(this.newExpenseCounter);
    register.clear();
  }

  incrementnewExpenseCounter(): void {
    this.newExpenseCounter.inc(1);
    this.newExpenseCount++;
  }

  getMetrics(): any {
    return {
      service: 'expense',
      newExpenses: this.newExpenseCount,
    };
  }
}

import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import {
  Transaction,
  Category,
  MonthlyData,
} from "../models/transaction.model";

@Injectable({
  providedIn: "root",
})
export class ExpenseService {
  private readonly STORAGE_KEY = "expense_tracker_data";
  private transactionsSubject = new BehaviorSubject<Transaction[]>([]);
  public transactions$: Observable<Transaction[]> =
    this.transactionsSubject.asObservable();

  private defaultCategories: Category[] = [
    { id: "1", name: "Salary", type: "income", icon: "💰" },
    { id: "2", name: "Freelance", type: "income", icon: "💼" },
    { id: "3", name: "Investment", type: "income", icon: "📈" },
    { id: "4", name: "Food", type: "expense", icon: "🍔" },
    { id: "5", name: "Transport", type: "expense", icon: "🚗" },
    { id: "6", name: "Shopping", type: "expense", icon: "🛍️" },
    { id: "7", name: "Bills", type: "expense", icon: "📄" },
    { id: "8", name: "Entertainment", type: "expense", icon: "🎬" },
    { id: "9", name: "Health", type: "expense", icon: "⚕️" },
    { id: "10", name: "Other", type: "expense", icon: "📌" },
  ];

  constructor() {
    this.loadTransactions();
  }

  private loadTransactions(): void {
    const data = localStorage.getItem(this.STORAGE_KEY);
    if (data) {
      const transactions = JSON.parse(data).map((t: any) => ({
        ...t,
        date: new Date(t.date),
      }));
      this.transactionsSubject.next(transactions);
    }
  }

  private saveTransactions(transactions: Transaction[]): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(transactions));
    this.transactionsSubject.next(transactions);
  }

  addTransaction(transaction: Omit<Transaction, "id">): void {
    const transactions = this.transactionsSubject.value;
    const newTransaction: Transaction = {
      ...transaction,
      id: this.generateId(),
      date: new Date(transaction.date),
    };
    this.saveTransactions([...transactions, newTransaction]);
  }

  deleteTransaction(id: string): void {
    const transactions = this.transactionsSubject.value.filter(
      (t) => t.id !== id
    );
    this.saveTransactions(transactions);
  }

  getTransactions(): Transaction[] {
    return this.transactionsSubject.value;
  }

  getCategories(type?: "income" | "expense"): Category[] {
    if (type) {
      return this.defaultCategories.filter((c) => c.type === type);
    }
    return this.defaultCategories;
  }

  getMonthlyData(): MonthlyData[] {
    const transactions = this.transactionsSubject.value;
    const monthlyMap = new Map<string, { income: number; expenses: number }>();

    transactions.forEach((transaction) => {
      const monthKey = this.getMonthYear(transaction.date);
      const existing = monthlyMap.get(monthKey) || { income: 0, expenses: 0 };

      if (transaction.type === "income") {
        existing.income += transaction.amount;
      } else {
        existing.expenses += transaction.amount;
      }

      monthlyMap.set(monthKey, existing);
    });

    return Array.from(monthlyMap.entries())
      .map(([month, data]) => ({
        month,
        income: data.income,
        expenses: data.expenses,
        balance: data.income - data.expenses,
      }))
      .sort((a, b) => {
        const dateA = new Date(a.month);
        const dateB = new Date(b.month);
        return dateA.getTime() - dateB.getTime();
      })
      .slice(-6); // Last 6 months
  }

  getTotalIncome(): number {
    return this.transactionsSubject.value
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
  }

  getTotalExpenses(): number {
    return this.transactionsSubject.value
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
  }

  getBalance(): number {
    return this.getTotalIncome() - this.getTotalExpenses();
  }

  private getMonthYear(date: Date): string {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}`;
  }

  private generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }
}

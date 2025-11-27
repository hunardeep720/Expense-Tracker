import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ExpenseService } from "../../services/expense.service";
import { Transaction } from "../../models/transaction.model";

@Component({
  selector: "app-transaction-list",
  standalone: true,
  imports: [CommonModule],
  templateUrl: "./transaction-list.component.html",
  styleUrls: ["./transaction-list.component.css"],
})
export class TransactionListComponent implements OnInit {
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  selectedCategory: string = "all";
  selectedType: string = "all";

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.expenseService.transactions$.subscribe((transactions) => {
      this.transactions = transactions.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );
      this.filterTransactions();
    });
  }

  filterTransactions(): void {
    this.filteredTransactions = this.transactions.filter((t) => {
      const typeMatch =
        this.selectedType === "all" || t.type === this.selectedType;
      const categoryMatch =
        this.selectedCategory === "all" || t.category === this.selectedCategory;
      return typeMatch && categoryMatch;
    });
  }

  onTypeChange(event: Event): void {
    this.selectedType = (event.target as HTMLSelectElement).value;
    this.filterTransactions();
  }

  onCategoryChange(event: Event): void {
    this.selectedCategory = (event.target as HTMLSelectElement).value;
    this.filterTransactions();
  }

  deleteTransaction(id: string): void {
    if (confirm("Are you sure you want to delete this transaction?")) {
      this.expenseService.deleteTransaction(id);
    }
  }

  getUniqueCategories(): string[] {
    return [...new Set(this.transactions.map((t) => t.category))];
  }
}

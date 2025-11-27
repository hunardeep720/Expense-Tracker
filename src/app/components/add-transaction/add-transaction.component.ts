import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ExpenseService } from "../../services/expense.service";
import { Category } from "../../models/transaction.model";

@Component({
  selector: "app-add-transaction",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: "./add-transaction.component.html",
  styleUrls: ["./add-transaction.component.css"],
})
export class AddTransactionComponent {
  transactionForm: FormGroup;
  categories: Category[] = [];

  constructor(private fb: FormBuilder, private expenseService: ExpenseService) {
    this.transactionForm = this.fb.group({
      type: ["expense", Validators.required],
      amount: ["", [Validators.required, Validators.min(0.01)]],
      category: ["", Validators.required],
      description: ["", Validators.required],
      date: [new Date().toISOString().split("T")[0], Validators.required],
    });

    this.updateCategories();

    this.transactionForm.get("type")?.valueChanges.subscribe(() => {
      this.updateCategories();
      this.transactionForm.patchValue({ category: "" });
    });
  }

  updateCategories(): void {
    const type = this.transactionForm.get("type")?.value as
      | "income"
      | "expense";
    this.categories = this.expenseService.getCategories(type);
  }

  onSubmit(): void {
    if (this.transactionForm.valid) {
      const formValue = this.transactionForm.value;
      this.expenseService.addTransaction({
        ...formValue,
        amount: parseFloat(formValue.amount),
        date: new Date(formValue.date),
      });

      this.transactionForm.reset({
        type: "expense",
        date: new Date().toISOString().split("T")[0],
      });
      this.updateCategories();
    }
  }
}

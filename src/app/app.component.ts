import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { AddTransactionComponent } from "./components/add-transaction/add-transaction.component";
import { TransactionListComponent } from "./components/transaction-list/transaction-list.component";
import { ChartViewComponent } from "./components/chart-view/chart-view.component";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    RouterOutlet,
    AddTransactionComponent,
    TransactionListComponent,
    ChartViewComponent,
  ],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "Expense Tracker";
}

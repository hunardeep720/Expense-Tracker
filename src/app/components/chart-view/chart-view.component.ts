import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BaseChartDirective } from "ng2-charts";
import { ChartConfiguration, ChartData } from "chart.js";
import { ExpenseService } from "../../services/expense.service";

@Component({
  selector: "app-chart-view",
  standalone: true,
  imports: [CommonModule, BaseChartDirective],
  templateUrl: "./chart-view.component.html",
  styleUrls: ["./chart-view.component.css"],
})
export class ChartViewComponent implements OnInit {
  private isMobileView =
    typeof window !== "undefined" && window.innerWidth < 768;

  public barChartOptions: ChartConfiguration["options"] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top",
        labels: {
          padding: 10,
          font: {
            size: this.isMobileView ? 11 : 12,
          },
          boxWidth: this.isMobileView ? 30 : 40,
        },
      },
      title: {
        display: true,
        text: "Monthly Income vs Expenses",
        font: {
          size: this.isMobileView ? 14 : 16,
          weight: "bold",
        },
        padding: {
          top: 5,
          bottom: 15,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          font: {
            size: this.isMobileView ? 10 : 11,
          },
          maxRotation: this.isMobileView ? 45 : 0,
          minRotation: this.isMobileView ? 45 : 0,
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: true,
        ticks: {
          font: {
            size: this.isMobileView ? 10 : 11,
          },
          callback: function (value) {
            return "$" + value;
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.05)",
        },
      },
    },
    interaction: {
      intersect: false,
      mode: "index",
    },
  };

  public barChartData: ChartData<"bar"> = {
    labels: [],
    datasets: [
      {
        label: "Income",
        data: [],
        backgroundColor: "rgba(76, 175, 80, 0.7)",
        borderColor: "rgb(76, 175, 80)",
        borderWidth: 1,
      },
      {
        label: "Expenses",
        data: [],
        backgroundColor: "rgba(244, 67, 54, 0.7)",
        borderColor: "rgb(244, 67, 54)",
        borderWidth: 1,
      },
    ],
  };

  totalIncome = 0;
  totalExpenses = 0;
  balance = 0;

  constructor(private expenseService: ExpenseService) {}

  ngOnInit(): void {
    this.updateChartData();
    this.expenseService.transactions$.subscribe(() => {
      this.updateChartData();
    });
  }

  updateChartData(): void {
    const monthlyData = this.expenseService.getMonthlyData();

    this.barChartData.labels = monthlyData.map((d) => {
      const [year, month] = d.month.split("-");
      const date = new Date(parseInt(year), parseInt(month) - 1);
      return date.toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      });
    });

    this.barChartData.datasets[0].data = monthlyData.map((d) => d.income);
    this.barChartData.datasets[1].data = monthlyData.map((d) => d.expenses);

    this.totalIncome = this.expenseService.getTotalIncome();
    this.totalExpenses = this.expenseService.getTotalExpenses();
    this.balance = this.expenseService.getBalance();
  }
}

# Expense Tracker - Angular Project

## Project Overview
Modern Angular application for tracking income and expenses with monthly charts and category filtering.

## Features
- Add income/expenses transactions with categories
- Monthly charts for financial visualization
- Category-based filtering for transactions
- Local storage for data persistence
- Responsive UI design with gradient backgrounds
- Real-time balance calculations

## Technology Stack
- Angular 18.2
- TypeScript 5.4
- Chart.js with ng2-charts 6.0
- Local Storage API
- CSS3 with modern styling

## Project Structure
```
src/
├── app/
│   ├── components/
│   │   ├── add-transaction/       # Form to add income/expense
│   │   ├── transaction-list/      # List and filter transactions
│   │   └── chart-view/            # Monthly charts and summary
│   ├── models/
│   │   └── transaction.model.ts   # TypeScript interfaces
│   ├── services/
│   │   └── expense.service.ts     # Data management service
│   ├── app.component.ts           # Main app component
│   └── app.config.ts              # App configuration
├── index.html
├── main.ts
└── styles.css
```

## Development Commands
- `npm start` - Start dev server at http://localhost:4200
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run watch` - Build in watch mode

## Features Implementation
1. **Add Transaction Component**: Form with validation for adding transactions
2. **Transaction List Component**: Filterable list with delete functionality
3. **Chart View Component**: Bar charts showing monthly income vs expenses
4. **Expense Service**: Centralized data management with RxJS
5. **Local Storage**: Automatic persistence of all transactions

## Default Categories
- Income: Salary, Freelance, Investment
- Expenses: Food, Transport, Shopping, Bills, Entertainment, Health, Other

# Expense Tracker

A modern Angular application for tracking income and expenses with visual charts and category filtering.

## Features

- **Add Transactions**: Easily add income and expense transactions with categories
- **Monthly Charts**: Visualize your financial data with interactive charts
- **Category Filtering**: Filter transactions by type and category
- **Local Storage**: All data is persisted locally in your browser
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Technology Stack

- Angular 18+
- TypeScript
- Chart.js with ng2-charts
- Local Storage API
- CSS3

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm (version 8 or higher)

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm start
```

3. Open your browser and navigate to `http://localhost:4200`

## Available Scripts

- `npm start` - Start the development server
- `npm run build` - Build the project for production
- `npm test` - Run unit tests
- `npm run watch` - Build in watch mode

## Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── add-transaction/
│   │   ├── transaction-list/
│   │   └── chart-view/
│   ├── models/
│   │   └── transaction.model.ts
│   ├── services/
│   │   └── expense.service.ts
│   ├── app.component.ts
│   ├── app.component.html
│   ├── app.component.css
│   ├── app.config.ts
│   └── app.routes.ts
├── index.html
├── main.ts
└── styles.css
```

## Features in Detail

### Add Transactions

- Choose between income and expense
- Select from predefined categories
- Add amount and description
- Set transaction date

### View Transactions

- See all transactions in a list
- Filter by type (income/expense)
- Filter by category
- Delete unwanted transactions

### Financial Overview

- View total income, expenses, and balance
- Monthly bar chart showing income vs expenses
- Last 6 months of data visualization

## Default Categories

**Income:**

- Salary
- Freelance
- Investment

**Expenses:**

- Food
- Transport
- Shopping
- Bills
- Entertainment
- Health
- Other

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the MIT License.

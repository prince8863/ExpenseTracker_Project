# Expense Tracker - Mini Java Project

A simple Expense Tracker mini-project made for a college Java practical/project.

## Technologies

- HTML
- CSS
- JavaScript
- Basic Java

## Frontend Features

- Dashboard
- Total expenses
- Transaction count
- Average expense
- Add expense
- Expense history
- Delete expense
- Category summary
- LocalStorage for browser data

## Java Concepts

- Classes and objects
- Constructor
- Encapsulation
- ArrayList
- Scanner
- Methods
- Loops
- if/switch statements

## Run the UI

1. Open the `frontend` folder in VS Code.
2. Open `index.html`.
3. Use VS Code Live Server if installed, or simply open `index.html` in a browser.
4. Add expenses from the UI.

## Run the Java console program

Open the `backend` folder in the VS Code terminal:

```bash
javac Expense.java ExpenseTracker.java
java ExpenseTracker
```

## Important

The current frontend stores data in browser LocalStorage. The Java program is kept separate and intentionally simple so the project remains suitable for a 5-mark mini-project. Connecting the HTML frontend directly to Java would require a web server/framework, which would make the project more complex.

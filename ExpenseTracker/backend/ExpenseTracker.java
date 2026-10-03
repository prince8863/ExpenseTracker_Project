import java.util.ArrayList;
import java.util.Scanner;

public class ExpenseTracker {
    static ArrayList<Expense> expenses = new ArrayList<>();
    static Scanner sc = new Scanner(System.in);

    public static void addExpense() {
        System.out.print("Enter date (DD/MM/YYYY): ");
        String date = sc.nextLine();

        System.out.print("Enter category: ");
        String category = sc.nextLine();

        System.out.print("Enter description: ");
        String description = sc.nextLine();

        System.out.print("Enter amount: ₹");
        double amount = sc.nextDouble();
        sc.nextLine();

        expenses.add(new Expense(date, category, description, amount));
        System.out.println("Expense added successfully!");
    }

    public static void viewExpenses() {
        if (expenses.isEmpty()) {
            System.out.println("No expenses found.");
            return;
        }

        System.out.println("\n----- EXPENSE HISTORY -----");

        for (int i = 0; i < expenses.size(); i++) {
            Expense e = expenses.get(i);

            System.out.println(
                (i + 1) + ". " +
                e.getDate() + " | " +
                e.getCategory() + " | " +
                e.getDescription() + " | ₹" +
                e.getAmount()
            );
        }
    }

    public static void calculateTotal() {
        double total = 0;

        for (Expense e : expenses) {
            total += e.getAmount();
        }

        System.out.println("Total Expenses: ₹" + total);
    }

    public static void main(String[] args) {
        int choice;

        do {
            System.out.println("\n===== EXPENSE TRACKER =====");
            System.out.println("1. Add Expense");
            System.out.println("2. View Expenses");
            System.out.println("3. Calculate Total");
            System.out.println("4. Exit");
            System.out.print("Enter your choice: ");

            choice = sc.nextInt();
            sc.nextLine();

            switch (choice) {
                case 1:
                    addExpense();
                    break;

                case 2:
                    viewExpenses();
                    break;

                case 3:
                    calculateTotal();
                    break;

                case 4:
                    System.out.println("Thank you!");
                    break;

                default:
                    System.out.println("Invalid choice.");
            }
        } while (choice != 4);

        sc.close();
    }
}

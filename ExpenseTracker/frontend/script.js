let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

const sections = document.querySelectorAll(".section");
const navItems = document.querySelectorAll(".nav-item");
const pageTitle = document.getElementById("pageTitle");
const form = document.getElementById("expenseForm");
const dateInput = document.getElementById("date");

dateInput.value = new Date().toISOString().split("T")[0];

function showSection(sectionName) {
    sections.forEach(section => {
        section.classList.remove("active-section");
    });

    document.getElementById(sectionName).classList.add("active-section");

    navItems.forEach(item => {
        item.classList.toggle("active", item.dataset.section === sectionName);
    });

    const titles = {
        dashboard: "Dashboard",
        add: "Add Expense",
        history: "Expense History"
    };

    pageTitle.textContent = titles[sectionName];
}

navItems.forEach(item => {
    item.addEventListener("click", () => {
        showSection(item.dataset.section);
    });
});

document.getElementById("topAddBtn").addEventListener("click", () => {
    showSection("add");
});

document.getElementById("viewAllBtn").addEventListener("click", () => {
    showSection("history");
});

document.getElementById("cancelBtn").addEventListener("click", () => {
    form.reset();
    dateInput.value = new Date().toISOString().split("T")[0];
    showSection("dashboard");
});

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const expense = {
        id: Date.now(),
        amount: Number(document.getElementById("amount").value),
        category: document.getElementById("category").value,
        description: document.getElementById("description").value,
        date: document.getElementById("date").value
    };

    expenses.push(expense);
    saveExpenses();
    form.reset();
    dateInput.value = new Date().toISOString().split("T")[0];

    updateUI();
    showSection("dashboard");
    showToast("Expense added successfully!");
});

function deleteExpense(id) {
    expenses = expenses.filter(expense => expense.id !== id);
    saveExpenses();
    updateUI();
    showToast("Expense deleted.");
}

function saveExpenses() {
    localStorage.setItem("expenses", JSON.stringify(expenses));
}

function formatMoney(amount) {
    return "₹" + amount.toLocaleString("en-IN", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}

function formatDate(date) {
    const parts = date.split("-");
    if (parts.length !== 3) return date;
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

function getIcon(category) {
    const icons = {
        Food: "🍴",
        Travel: "🚗",
        Shopping: "🛍",
        Education: "📚",
        Entertainment: "🎬",
        Bills: "📄",
        Health: "❤",
        Other: "•"
    };
    return icons[category] || "•";
}

function updateUI() {
    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const count = expenses.length;
    const average = count ? total / count : 0;

    document.getElementById("totalAmount").textContent = formatMoney(total);
    document.getElementById("transactionCount").textContent = count;
    document.getElementById("averageAmount").textContent = formatMoney(average);

    updateRecentExpenses();
    updateTable();
    updateCategories();
}

function updateRecentExpenses() {
    const container = document.getElementById("recentExpenses");

    if (expenses.length === 0) {
        container.innerHTML = '<div class="empty">No expenses added yet.</div>';
        return;
    }

    const recent = [...expenses].reverse().slice(0, 5);

    container.innerHTML = recent.map(expense => `
        <div class="expense-row">
            <div class="expense-left">
                <div class="expense-icon">${getIcon(expense.category)}</div>
                <div>
                    <div class="expense-title">${escapeHTML(expense.description)}</div>
                    <div class="expense-meta">${escapeHTML(expense.category)} • ${formatDate(expense.date)}</div>
                </div>
            </div>
            <div class="expense-amount">${formatMoney(expense.amount)}</div>
        </div>
    `).join("");
}

function updateTable() {
    const table = document.getElementById("expenseTable");
    const empty = document.getElementById("emptyHistory");

    if (expenses.length === 0) {
        table.innerHTML = "";
        empty.classList.remove("hidden");
        return;
    }

    empty.classList.add("hidden");

    table.innerHTML = [...expenses].reverse().map(expense => `
        <tr>
            <td>${formatDate(expense.date)}</td>
            <td>${escapeHTML(expense.description)}</td>
            <td>${escapeHTML(expense.category)}</td>
            <td><strong>${formatMoney(expense.amount)}</strong></td>
            <td>
                <button class="delete-btn" onclick="deleteExpense(${expense.id})">
                    Delete
                </button>
            </td>
        </tr>
    `).join("");
}

function updateCategories() {
    const container = document.getElementById("categoryList");

    if (expenses.length === 0) {
        container.innerHTML = '<div class="empty">Category data will appear here.</div>';
        return;
    }

    const totals = {};

    expenses.forEach(expense => {
        totals[expense.category] = (totals[expense.category] || 0) + expense.amount;
    });

    const total = expenses.reduce((sum, expense) => sum + expense.amount, 0);

    container.innerHTML = Object.entries(totals)
        .sort((a, b) => b[1] - a[1])
        .map(([category, amount]) => {
            const percentage = total ? (amount / total) * 100 : 0;

            return `
                <div class="category-item">
                    <div class="category-top">
                        <span>${getIcon(category)} ${escapeHTML(category)}</span>
                        <span>${formatMoney(amount)}</span>
                    </div>
                    <div class="progress">
                        <div style="width: ${percentage}%"></div>
                    </div>
                </div>
            `;
        }).join("");
}

function escapeHTML(value) {
    return String(value)
        .replaceAll("&", "&amp;")
        .replaceAll("<", "&lt;")
        .replaceAll(">", "&gt;")
        .replaceAll('"', "&quot;")
        .replaceAll("'", "&#039;");
}

function showToast(message) {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 2200);
}

updateUI();

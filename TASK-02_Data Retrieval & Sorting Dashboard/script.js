/**
 * Mock Data
 */
const employees = [
    { id: 1, name: 'Alice Smith', department: 'Engineering', date: '2023-01-15', email: 'alice.smith@example.com' },
    { id: 2, name: 'Bob Johnson', department: 'Marketing', date: '2022-11-01', email: 'bob.j@example.com' },
    { id: 3, name: 'Charlie Davis', department: 'Design', date: '2023-03-10', email: 'charlie.d@example.com' },
    { id: 4, name: 'Diana Evans', department: 'Engineering', date: '2021-08-22', email: 'd.evans@example.com' },
    { id: 5, name: 'Ethan Foster', department: 'Sales', date: '2024-01-05', email: 'ethan.foster@example.com' },
    { id: 6, name: 'Fiona Garcia', department: 'HR', date: '2022-05-18', email: 'f.garcia@example.com' },
    { id: 7, name: 'George Harris', department: 'Engineering', date: '2023-09-30', email: 'gharris@example.com' },
    { id: 8, name: 'Hannah Irwin', department: 'Design', date: '2022-02-14', email: 'h.irwin@example.com' },
    { id: 9, name: 'Ian Jones', department: 'Sales', date: '2021-11-11', email: 'ian.jones@example.com' },
    { id: 10, name: 'Julia King', department: 'Marketing', date: '2023-07-25', email: 'jking@example.com' },
    { id: 11, name: 'Kevin Lee', department: 'Engineering', date: '2024-02-28', email: 'klee@example.com' },
    { id: 12, name: 'Laura Miller', department: 'HR', date: '2020-10-05', email: 'l.miller@example.com' }
];

// Department configuration for icons
const deptConfig = {
    'Engineering': 'ph-code',
    'Design': 'ph-palette',
    'Marketing': 'ph-megaphone',
    'HR': 'ph-users',
    'Sales': 'ph-chart-line-up'
};

/**
 * State Management
 */
let currentData = [...employees];
let activeFilter = 'all';
let sortBy = 'name';
let sortOrder = 'asc';

/**
 * DOM Elements
 */
const tableBody = document.getElementById('table-body');
const departmentFilter = document.getElementById('department-filter');
const sortBySelect = document.getElementById('sort-by');
const sortOrderSelect = document.getElementById('sort-order');
const noResultsDiv = document.getElementById('no-results');
const totalCountDisplay = document.querySelector('#total-count-display .stat-value');
const departmentSummaries = document.getElementById('department-summaries');

/**
 * Initialization
 */
function init() {
    // Set up event listeners
    departmentFilter.addEventListener('change', handleFilterChange);
    sortBySelect.addEventListener('change', handleSortChange);
    sortOrderSelect.addEventListener('change', handleOrderChange);

    // Initial render
    processData();
}

/**
 * Data Processing Pipeline (Filter -> Sort -> Render/Aggregate)
 */
function processData() {
    // 1. Filter
    if (activeFilter === 'all') {
        currentData = [...employees];
    } else {
        currentData = employees.filter(emp => emp.department === activeFilter);
    }

    // 2. Sort
    currentData.sort((a, b) => {
        let valA = a[sortBy];
        let valB = b[sortBy];

        // Handle string comparison nicely
        if (typeof valA === 'string') valA = valA.toLowerCase();
        if (typeof valB === 'string') valB = valB.toLowerCase();

        if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
        if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });

    // 3. Render
    renderTable();
    updateAggregations();
}

/**
 * Event Handlers
 */
function handleFilterChange(e) {
    activeFilter = e.target.value;
    processData();
}

function handleSortChange(e) {
    sortBy = e.target.value;
    processData();
}

function handleOrderChange(e) {
    sortOrder = e.target.value;
    processData();
}

/**
 * Rendering Logic
 */
function renderTable() {
    // Clear current contents
    tableBody.innerHTML = '';

    // Toggle empty state
    if (currentData.length === 0) {
        noResultsDiv.classList.remove('hidden');
        document.getElementById('records-table').classList.add('hidden');
        return;
    } else {
        noResultsDiv.classList.add('hidden');
        document.getElementById('records-table').classList.remove('hidden');
    }

    // Render rows
    currentData.forEach((emp) => {
        const tr = document.createElement('tr');

        // Generate Initials
        const initials = emp.name.split(' ').map(n => n[0]).join('').toUpperCase();

        // Format Date
        const dateObj = new Date(emp.date);
        const formattedDate = dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });

        tr.innerHTML = `
            <td>
                <div class="user-info">
                    <div class="avatar">${initials}</div>
                    <div class="user-details">
                        <span>${emp.name}</span>
                        <span class="user-email">${emp.email}</span>
                    </div>
                </div>
            </td>
            <td>
                <span class="dept-badge badge-${emp.department}">${emp.department}</span>
            </td>
            <td class="date-text">${formattedDate}</td>
        `;
        tableBody.appendChild(tr);
    });
}

function updateAggregations() {
    // Update total visible count
    totalCountDisplay.textContent = currentData.length;

    // We calculate aggregations based on the full dataset or filtered?
    // Usually, summary cards show context for the whole company, or change based on filter.
    // Let's show all departments if 'all' is selected, else just show the selected one.

    departmentSummaries.innerHTML = '';

    // Calculate counts
    const counts = {};
    const datasetToCount = employees; // Always count from full dataset for global summaries, active filter controls visibility

    datasetToCount.forEach(emp => {
        counts[emp.department] = (counts[emp.department] || 0) + 1;
    });

    // Render cards based on active filter
    const deptsToRender = activeFilter === 'all'
        ? Object.keys(counts)
        : [activeFilter];

    deptsToRender.forEach(dept => {
        if (!counts[dept]) return; // Skip if no employees

        const card = document.createElement('div');
        card.className = `summary-card dept-${dept}`;

        const iconClass = deptConfig[dept] || 'ph-building';

        card.innerHTML = `
            <div class="card-icon">
                <i class="ph ${iconClass}"></i>
            </div>
            <div class="card-content">
                <h3>${dept}</h3>
                <div class="count">${counts[dept]}</div>
            </div>
        `;

        departmentSummaries.appendChild(card);
    });
}

// Start immediately
document.addEventListener('DOMContentLoaded', init);

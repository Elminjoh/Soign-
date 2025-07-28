// Admin Panel JavaScript

// Global variables
let products = [
    { id: 1, name: 'Premium T-Shirt', price: 89, emoji: '👕', category: 'shirts', discount: 0, stock: 50, description: 'High-quality cotton t-shirt' },
    { id: 2, name: 'Designer Jeans', price: 189, emoji: '👖', category: 'pants', discount: 10, stock: 30, description: 'Stylish designer jeans' },
    { id: 3, name: 'Elegant Dress', price: 249, emoji: '👗', category: 'dresses', discount: 0, stock: 25, description: 'Beautiful elegant dress' },
    { id: 4, name: 'Luxury Jacket', price: 399, emoji: '🧥', category: 'jackets', discount: 15, stock: 15, description: 'Premium luxury jacket' },
    { id: 5, name: 'Premium Sneakers', price: 159, emoji: '👟', category: 'shoes', discount: 5, stock: 40, description: 'Comfortable premium sneakers' },
    { id: 6, name: 'Designer Cap', price: 69, emoji: '🧢', category: 'accessories', discount: 0, stock: 60, description: 'Stylish designer cap' }
];

let orders = [
    { id: 1, customer: 'John Doe', items: ['Premium T-Shirt', 'Designer Jeans'], total: 278, status: 'delivered', date: '2025-01-15' },
    { id: 2, customer: 'Jane Smith', items: ['Elegant Dress'], total: 249, status: 'shipped', date: '2025-01-18' },
    { id: 3, customer: 'Mike Johnson', items: ['Luxury Jacket', 'Premium Sneakers'], total: 558, status: 'processing', date: '2025-01-20' },
    { id: 4, customer: 'Sarah Wilson', items: ['Designer Cap'], total: 69, status: 'pending', date: '2025-01-22' },
    { id: 5, customer: 'David Brown', items: ['Premium T-Shirt', 'Premium Sneakers'], total: 248, status: 'delivered', date: '2025-01-25' }
];

let salesData = [
    { date: '2025-01-15', sales: 278 },
    { date: '2025-01-16', sales: 156 },
    { date: '2025-01-17', sales: 432 },
    { date: '2025-01-18', sales: 249 },
    { date: '2025-01-19', sales: 389 },
    { date: '2025-01-20', sales: 558 },
    { date: '2025-01-21', sales: 312 },
    { date: '2025-01-22', sales: 169 },
    { date: '2025-01-23', sales: 445 },
    { date: '2025-01-24', sales: 523 },
    { date: '2025-01-25', sales: 248 },
    { date: '2025-01-26', sales: 367 },
    { date: '2025-01-27', sales: 421 }
];

let currentEditingProduct = null;
let charts = {};

// Initialize admin panel
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    if (sessionStorage.getItem('adminLoggedIn') !== 'true') {
        window.location.href = 'admin-login.html';
        return;
    }
    
    showSection('dashboard');
    updateDashboardStats();
    renderProducts();
    renderOrders();
    updateRecentActivity();
    initializeCharts();
});

// Navigation functions
function showSection(sectionName) {
    // Hide all sections
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Remove active class from all nav buttons
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected section
    document.getElementById(sectionName).classList.add('active');
    
    // Add active class to clicked nav button
    event.target.classList.add('active');
    
    // Update charts if analytics section is shown
    if (sectionName === 'analytics') {
        setTimeout(() => {
            updateAnalytics();
        }, 100);
    }
}

// Dashboard functions
function updateDashboardStats() {
    const totalProducts = products.length;
    const totalSales = salesData.reduce((sum, day) => sum + day.sales, 0);
    const totalOrders = orders.length;
    const avgOrder = totalOrders > 0 ? (totalSales / totalOrders).toFixed(0) : 0;
    
    document.getElementById('total-products').textContent = totalProducts;
    document.getElementById('total-sales').textContent = `$${totalSales.toLocaleString()}`;
    document.getElementById('total-orders').textContent = totalOrders;
    document.getElementById('avg-order').textContent = `$${avgOrder}`;
}

function updateRecentActivity() {
    const activityList = document.getElementById('activity-list');
    const activities = [
        { text: 'New order #1005 received from Sarah Wilson', time: '2 hours ago' },
        { text: 'Product "Luxury Jacket" stock updated', time: '4 hours ago' },
        { text: 'Order #1004 shipped to Mike Johnson', time: '6 hours ago' },
        { text: 'New product "Designer Cap" added', time: '1 day ago' },
        { text: 'Order #1003 delivered to Jane Smith', time: '2 days ago' }
    ];
    
    activityList.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <div>${activity.text}</div>
            <div class="activity-time">${activity.time}</div>
        </div>
    `).join('');
}

// Product management functions
function showAddProductForm() {
    document.getElementById('product-form').classList.remove('hidden');
    document.getElementById('form-title').textContent = 'Add New Product';
    clearProductForm();
    currentEditingProduct = null;
}

function hideProductForm() {
    document.getElementById('product-form').classList.add('hidden');
    clearProductForm();
    currentEditingProduct = null;
}

function clearProductForm() {
    document.getElementById('product-name').value = '';
    document.getElementById('product-price').value = '';
    document.getElementById('product-emoji').value = '';
    document.getElementById('product-category').value = '';
    document.getElementById('product-discount').value = '0';
    document.getElementById('product-stock').value = '';
    document.getElementById('product-description').value = '';
}

function saveProduct(event) {
    event.preventDefault();
    
    const productData = {
        name: document.getElementById('product-name').value,
        price: parseFloat(document.getElementById('product-price').value),
        emoji: document.getElementById('product-emoji').value,
        category: document.getElementById('product-category').value,
        discount: parseInt(document.getElementById('product-discount').value) || 0,
        stock: parseInt(document.getElementById('product-stock').value),
        description: document.getElementById('product-description').value
    };
    
    if (currentEditingProduct) {
        // Update existing product
        const index = products.findIndex(p => p.id === currentEditingProduct);
        products[index] = { ...products[index], ...productData };
    } else {
        // Add new product
        const newProduct = {
            id: Math.max(...products.map(p => p.id)) + 1,
            ...productData
        };
        products.push(newProduct);
    }
    
    renderProducts();
    updateDashboardStats();
    hideProductForm();
    
    // Show success message
    alert(currentEditingProduct ? 'Product updated successfully!' : 'Product added successfully!');
}

function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (!product) return;
    
    currentEditingProduct = id;
    document.getElementById('form-title').textContent = 'Edit Product';
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-price').value = product.price;
    document.getElementById('product-emoji').value = product.emoji;
    document.getElementById('product-category').value = product.category;
    document.getElementById('product-discount').value = product.discount;
    document.getElementById('product-stock').value = product.stock;
    document.getElementById('product-description').value = product.description;
    
    document.getElementById('product-form').classList.remove('hidden');
}

function deleteProduct(id) {
    if (confirm('Are you sure you want to delete this product?')) {
        products = products.filter(p => p.id !== id);
        renderProducts();
        updateDashboardStats();
        alert('Product deleted successfully!');
    }
}

function renderProducts() {
    const tableContainer = document.getElementById('products-table');
    
    if (products.length === 0) {
        tableContainer.innerHTML = '<p style="padding: 20px; text-align: center; color: #64748b;">No products found.</p>';
        return;
    }
    
    const table = `
        <table>
            <thead>
                <tr>
                    <th>Product</th>
                    <th>Name</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Discount</th>
                    <th>Stock</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${products.map(product => `
                    <tr>
                        <td class="product-emoji">${product.emoji}</td>
                        <td>${product.name}</td>
                        <td style="text-transform: capitalize;">${product.category}</td>
                        <td class="product-price">$${product.price}</td>
                        <td>
                            ${product.discount > 0 ? 
                                `<span class="product-discount">${product.discount}% OFF</span>` : 
                                'No discount'
                            }
                        </td>
                        <td>${product.stock}</td>
                        <td class="product-actions">
                            <button class="edit-btn" onclick="editProduct(${product.id})">Edit</button>
                            <button class="delete-btn" onclick="deleteProduct(${product.id})">Delete</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    tableContainer.innerHTML = table;
}

function filterProducts() {
    const searchTerm = document.getElementById('search-products').value.toLowerCase();
    const categoryFilter = document.getElementById('filter-category').value;
    
    let filteredProducts = products;
    
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(product =>
            product.name.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
    }
    
    if (categoryFilter) {
        filteredProducts = filteredProducts.filter(product =>
            product.category === categoryFilter
        );
    }
    
    // Temporarily replace products array for rendering
    const originalProducts = [...products];
    products = filteredProducts;
    renderProducts();
    products = originalProducts;
}

// Analytics functions
function initializeCharts() {
    createSalesChart();
    createPopularProductsChart();
    createCategoryChart();
    createRevenueChart();
}

function createSalesChart() {
    const ctx = document.getElementById('salesChart').getContext('2d');
    const last7Days = salesData.slice(-7);
    
    charts.salesChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: last7Days.map(day => new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })),
            datasets: [{
                label: 'Daily Sales',
                data: last7Days.map(day => day.sales),
                borderColor: '#8b9dc3',
                backgroundColor: 'rgba(139, 157, 195, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value;
                        }
                    }
                }
            }
        }
    });
}

function createPopularProductsChart() {
    const ctx = document.getElementById('popularProductsChart').getContext('2d');
    
    // Calculate popularity based on orders
    const productSales = {};
    orders.forEach(order => {
        order.items.forEach(item => {
            productSales[item] = (productSales[item] || 0) + 1;
        });
    });
    
    const sortedProducts = Object.entries(productSales)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 5);
    
    charts.popularProductsChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: sortedProducts.map(([name]) => name),
            datasets: [{
                data: sortedProducts.map(([,sales]) => sales),
                backgroundColor: [
                    '#8b9dc3',
                    '#6b7aa0',
                    '#5a6b8d',
                    '#4a5c7a',
                    '#3a4d67'
                ]
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom'
                }
            }
        }
    });
}

function createCategoryChart() {
    const ctx = document.getElementById('categoryChart').getContext('2d');
    
    // Calculate category performance
    const categoryPerformance = {};
    products.forEach(product => {
        if (!categoryPerformance[product.category]) {
            categoryPerformance[product.category] = 0;
        }
        // Simulate sales based on price and stock sold
        categoryPerformance[product.category] += product.price * (50 - product.stock);
    });
    
    charts.categoryChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(categoryPerformance).map(cat => 
                cat.charAt(0).toUpperCase() + cat.slice(1)
            ),
            datasets: [{
                label: 'Revenue by Category',
                data: Object.values(categoryPerformance),
                backgroundColor: 'rgba(139, 157, 195, 0.7)',
                borderColor: '#8b9dc3',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

function createRevenueChart() {
    const ctx = document.getElementById('revenueChart').getContext('2d');
    
    // Calculate monthly revenue (simulated data)
    const monthlyRevenue = [
        { month: 'Jul 2024', revenue: 15420 },
        { month: 'Aug 2024', revenue: 18350 },
        { month: 'Sep 2024', revenue: 22180 },
        { month: 'Oct 2024', revenue: 19750 },
        { month: 'Nov 2024', revenue: 25900 },
        { month: 'Dec 2024', revenue: 31200 },
        { month: 'Jan 2025', revenue: 28450 }
    ];
    
    charts.revenueChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: monthlyRevenue.map(item => item.month),
            datasets: [{
                label: 'Monthly Revenue',
                data: monthlyRevenue.map(item => item.revenue),
                backgroundColor: 'rgba(139, 157, 195, 0.7)',
                borderColor: '#8b9dc3',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return '$' + value.toLocaleString();
                        }
                    }
                }
            }
        }
    });
}

function updateAnalytics() {
    // Update analytics based on time filter
    const timeFilter = document.getElementById('time-filter').value;
    
    // Update summary stats
    document.getElementById('best-product').textContent = 'Premium T-Shirt';
    document.getElementById('revenue-growth').textContent = '+15.2%';
    document.getElementById('conversion-rate').textContent = '3.4%';
    
    // Refresh charts with new data
    Object.values(charts).forEach(chart => {
        if (chart) chart.update();
    });
}

// Order management functions
function renderOrders() {
    const tableContainer = document.getElementById('orders-table');
    
    if (orders.length === 0) {
        tableContainer.innerHTML = '<p style="padding: 20px; text-align: center; color: #64748b;">No orders found.</p>';
        return;
    }
    
    const table = `
        <table>
            <thead>
                <tr>
                    <th>Order ID</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${orders.map(order => `
                    <tr>
                        <td>#${order.id.toString().padStart(4, '0')}</td>
                        <td>${order.customer}</td>
                        <td>${order.items.join(', ')}</td>
                        <td class="order-total">$${order.total}</td>
                        <td>
                            <span class="order-status status-${order.status}">${order.status}</span>
                        </td>
                        <td>${new Date(order.date).toLocaleDateString()}</td>
                        <td>
                            <select onchange="updateOrderStatus(${order.id}, this.value)">
                                <option value="pending" ${order.status === 'pending' ? 'selected' : ''}>Pending</option>
                                <option value="processing" ${order.status === 'processing' ? 'selected' : ''}>Processing</option>
                                <option value="shipped" ${order.status === 'shipped' ? 'selected' : ''}>Shipped</option>
                                <option value="delivered" ${order.status === 'delivered' ? 'selected' : ''}>Delivered</option>
                                <option value="cancelled" ${order.status === 'cancelled' ? 'selected' : ''}>Cancelled</option>
                            </select>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    tableContainer.innerHTML = table;
}

function updateOrderStatus(orderId, newStatus) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
        order.status = newStatus;
        renderOrders();
        alert(`Order #${orderId.toString().padStart(4, '0')} status updated to ${newStatus}`);
    }
}

function filterOrders() {
    const statusFilter = document.getElementById('order-status-filter').value;
    const dateFilter = document.getElementById('order-date-filter').value;
    
    let filteredOrders = orders;
    
    if (statusFilter) {
        filteredOrders = filteredOrders.filter(order => order.status === statusFilter);
    }
    
    if (dateFilter) {
        filteredOrders = filteredOrders.filter(order => order.date === dateFilter);
    }
    
    // Temporarily replace orders array for rendering
    const originalOrders = [...orders];
    orders = filteredOrders;
    renderOrders();
    orders = originalOrders;
}

// Utility functions
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        sessionStorage.removeItem('adminLoggedIn');
        window.location.href = 'admin-login.html';
    }
}

// Export products data to update main website
function updateMainWebsite() {
    // This function would typically send data to a backend
    // For now, we'll store it in localStorage
    localStorage.setItem('adminProducts', JSON.stringify(products));
    alert('Product data updated! The main website will reflect these changes.');
}

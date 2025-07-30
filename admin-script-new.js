// Content Management System JavaScript

// Global variables for content management
let articles = [
    { id: 1, title: "Sustainable Fashion: The Future is Now", category: "Editorial", author: "Sarah Chen", date: "2025-07-28", image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=250&fit=crop", excerpt: "Exploring how eco-conscious brands are revolutionizing the fashion industry...", content: "The fashion industry is undergoing a revolutionary transformation..." },
    { id: 2, title: "Street Style Chronicles: Tokyo Edition", category: "Fashion", author: "Yuki Tanaka", date: "2025-07-27", image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=250&fit=crop", excerpt: "A visual journey through Tokyo's most innovative street fashion...", content: "Tokyo's streets serve as a living canvas for fashion expression..." },
    { id: 3, title: "The Rise of Digital Fashion Weeks", category: "Culture", author: "Marcus Rodriguez", date: "2025-07-26", image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=250&fit=crop", excerpt: "How virtual runway shows are reshaping the fashion calendar...", content: "The pandemic accelerated a digital transformation..." }
];

let mediaLibrary = [
    { id: 1, title: "Tokyo Street Fashion", url: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=250&fit=crop", alt: "Tokyo street style fashion", tags: ["fashion", "tokyo", "street"] },
    { id: 2, title: "Sustainable Materials", url: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=250&fit=crop", alt: "Sustainable fashion materials", tags: ["sustainable", "materials", "eco"] },
    { id: 3, title: "Fashion Week Runway", url: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=250&fit=crop", alt: "Fashion week runway show", tags: ["runway", "fashion-week", "model"] }
];

let cultureContent = [
    { id: 1, title: "Music & Fashion Collaborations", type: "Music", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop", description: "How artists and designers create cultural moments through fashion partnerships." },
    { id: 2, title: "Art Gallery Fashion Shows", type: "Art", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop", description: "When fashion meets fine art in unconventional runway presentations." }
];

let currentEditingArticle = null;
let currentEditingCulture = null;
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
    renderArticles();
    renderMediaLibrary();
    renderCultureContent();
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
            updateCharts();
        }, 100);
    }
}

// Dashboard functions
function updateDashboardStats() {
    document.getElementById('total-articles').textContent = articles.length;
    document.getElementById('total-media').textContent = mediaLibrary.length;
    // Simulate dynamic stats
    document.getElementById('total-views').textContent = '15.2K';
    document.getElementById('engagement-rate').textContent = '4.2%';
}

// Article management functions
function showAddArticleForm() {
    document.getElementById('article-form').classList.remove('hidden');
    document.getElementById('article-form-title').textContent = 'Create New Article';
    clearArticleForm();
    currentEditingArticle = null;
}

function hideArticleForm() {
    document.getElementById('article-form').classList.add('hidden');
    clearArticleForm();
    currentEditingArticle = null;
}

function clearArticleForm() {
    document.getElementById('article-title').value = '';
    document.getElementById('article-category').value = '';
    document.getElementById('article-author').value = '';
    document.getElementById('article-date').value = '';
    document.getElementById('article-image').value = '';
    document.getElementById('article-excerpt').value = '';
    document.getElementById('article-content').value = '';
}

function saveArticle(event) {
    event.preventDefault();
    
    const articleData = {
        title: document.getElementById('article-title').value,
        category: document.getElementById('article-category').value,
        author: document.getElementById('article-author').value,
        date: document.getElementById('article-date').value,
        image: document.getElementById('article-image').value,
        excerpt: document.getElementById('article-excerpt').value,
        content: document.getElementById('article-content').value
    };
    
    if (currentEditingArticle) {
        // Update existing article
        const index = articles.findIndex(a => a.id === currentEditingArticle);
        articles[index] = { ...articles[index], ...articleData };
    } else {
        // Add new article
        const newArticle = {
            id: Math.max(...articles.map(a => a.id)) + 1,
            ...articleData
        };
        articles.push(newArticle);
    }
    
    renderArticles();
    updateDashboardStats();
    hideArticleForm();
    updateMainWebsite();
    
    alert(currentEditingArticle ? 'Article updated successfully!' : 'Article published successfully!');
}

function editArticle(id) {
    const article = articles.find(a => a.id === id);
    if (!article) return;
    
    currentEditingArticle = id;
    document.getElementById('article-form-title').textContent = 'Edit Article';
    document.getElementById('article-title').value = article.title;
    document.getElementById('article-category').value = article.category;
    document.getElementById('article-author').value = article.author;
    document.getElementById('article-date').value = article.date;
    document.getElementById('article-image').value = article.image;
    document.getElementById('article-excerpt').value = article.excerpt;
    document.getElementById('article-content').value = article.content;
    
    document.getElementById('article-form').classList.remove('hidden');
}

function deleteArticle(id) {
    if (confirm('Are you sure you want to delete this article?')) {
        articles = articles.filter(a => a.id !== id);
        renderArticles();
        updateDashboardStats();
        updateMainWebsite();
        alert('Article deleted successfully!');
    }
}

function renderArticles() {
    const tableContainer = document.getElementById('articles-table');
    
    if (articles.length === 0) {
        tableContainer.innerHTML = '<p style="padding: 20px; text-align: center; color: #64748b;">No articles found.</p>';
        return;
    }
    
    const table = `
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Author</th>
                    <th>Date</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${articles.map(article => `
                    <tr>
                        <td>
                            <div class="article-preview">
                                <img src="${article.image}" alt="${article.title}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px; margin-right: 10px;">
                                <div>
                                    <strong>${article.title}</strong>
                                    <div style="font-size: 0.9rem; color: #666;">${article.excerpt.substring(0, 60)}...</div>
                                </div>
                            </div>
                        </td>
                        <td><span class="category-tag">${article.category}</span></td>
                        <td>${article.author}</td>
                        <td>${new Date(article.date).toLocaleDateString()}</td>
                        <td class="article-actions">
                            <button class="edit-btn" onclick="editArticle(${article.id})">Edit</button>
                            <button class="delete-btn" onclick="deleteArticle(${article.id})">Delete</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    tableContainer.innerHTML = table;
}

function filterArticles() {
    const searchTerm = document.getElementById('search-articles').value.toLowerCase();
    const categoryFilter = document.getElementById('filter-article-category').value;
    
    let filteredArticles = articles;
    
    if (searchTerm) {
        filteredArticles = filteredArticles.filter(article =>
            article.title.toLowerCase().includes(searchTerm) ||
            article.author.toLowerCase().includes(searchTerm) ||
            article.excerpt.toLowerCase().includes(searchTerm)
        );
    }
    
    if (categoryFilter) {
        filteredArticles = filteredArticles.filter(article =>
            article.category === categoryFilter
        );
    }
    
    // Temporarily replace articles array for rendering
    const originalArticles = [...articles];
    articles = filteredArticles;
    renderArticles();
    articles = originalArticles;
}

// Media management functions
function showUploadForm() {
    document.getElementById('upload-form').classList.remove('hidden');
}

function hideUploadForm() {
    document.getElementById('upload-form').classList.add('hidden');
    clearUploadForm();
}

function clearUploadForm() {
    document.getElementById('media-url').value = '';
    document.getElementById('media-title').value = '';
    document.getElementById('media-alt').value = '';
    document.getElementById('media-tags').value = '';
}

function uploadMedia(event) {
    event.preventDefault();
    
    const mediaData = {
        id: Math.max(...mediaLibrary.map(m => m.id)) + 1,
        title: document.getElementById('media-title').value,
        url: document.getElementById('media-url').value,
        alt: document.getElementById('media-alt').value,
        tags: document.getElementById('media-tags').value.split(',').map(tag => tag.trim())
    };
    
    mediaLibrary.push(mediaData);
    renderMediaLibrary();
    updateDashboardStats();
    hideUploadForm();
    
    alert('Media uploaded successfully!');
}

function renderMediaLibrary() {
    const mediaGallery = document.getElementById('media-gallery');
    
    if (mediaLibrary.length === 0) {
        mediaGallery.innerHTML = '<p style="text-align: center; color: #64748b;">No media files found.</p>';
        return;
    }
    
    mediaGallery.innerHTML = mediaLibrary.map(media => `
        <div class="media-item">
            <div class="media-preview">
                <img src="${media.url}" alt="${media.alt}" />
                <div class="media-overlay">
                    <button class="media-action-btn" onclick="deleteMedia(${media.id})">🗑️</button>
                    <button class="media-action-btn" onclick="copyMediaUrl('${media.url}')">📋</button>
                </div>
            </div>
            <div class="media-info">
                <h4>${media.title}</h4>
                <p>${media.alt}</p>
                <div class="media-tags">
                    ${media.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>
            </div>
        </div>
    `).join('');
}

function deleteMedia(id) {
    if (confirm('Are you sure you want to delete this media file?')) {
        mediaLibrary = mediaLibrary.filter(m => m.id !== id);
        renderMediaLibrary();
        updateDashboardStats();
        alert('Media deleted successfully!');
    }
}

function copyMediaUrl(url) {
    navigator.clipboard.writeText(url).then(() => {
        alert('Media URL copied to clipboard!');
    });
}

// Culture content management
function showAddCultureForm() {
    document.getElementById('culture-form').classList.remove('hidden');
    document.getElementById('culture-form-title').textContent = 'Add Culture Content';
    clearCultureForm();
    currentEditingCulture = null;
}

function hideCultureForm() {
    document.getElementById('culture-form').classList.add('hidden');
    clearCultureForm();
    currentEditingCulture = null;
}

function clearCultureForm() {
    document.getElementById('culture-title').value = '';
    document.getElementById('culture-type').value = '';
    document.getElementById('culture-image').value = '';
    document.getElementById('culture-description').value = '';
}

function saveCultureContent(event) {
    event.preventDefault();
    
    const cultureData = {
        title: document.getElementById('culture-title').value,
        type: document.getElementById('culture-type').value,
        image: document.getElementById('culture-image').value,
        description: document.getElementById('culture-description').value
    };
    
    if (currentEditingCulture) {
        // Update existing content
        const index = cultureContent.findIndex(c => c.id === currentEditingCulture);
        cultureContent[index] = { ...cultureContent[index], ...cultureData };
    } else {
        // Add new content
        const newContent = {
            id: Math.max(...cultureContent.map(c => c.id)) + 1,
            ...cultureData
        };
        cultureContent.push(newContent);
    }
    
    renderCultureContent();
    hideCultureForm();
    updateMainWebsite();
    
    alert(currentEditingCulture ? 'Culture content updated successfully!' : 'Culture content published successfully!');
}

function renderCultureContent() {
    const tableContainer = document.getElementById('culture-table');
    
    if (cultureContent.length === 0) {
        tableContainer.innerHTML = '<p style="padding: 20px; text-align: center; color: #64748b;">No culture content found.</p>';
        return;
    }
    
    const table = `
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Type</th>
                    <th>Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                ${cultureContent.map(content => `
                    <tr>
                        <td>
                            <div class="content-preview">
                                <img src="${content.image}" alt="${content.title}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 5px; margin-right: 10px;">
                                <strong>${content.title}</strong>
                            </div>
                        </td>
                        <td><span class="type-tag">${content.type}</span></td>
                        <td>${content.description.substring(0, 80)}...</td>
                        <td class="content-actions">
                            <button class="edit-btn" onclick="editCultureContent(${content.id})">Edit</button>
                            <button class="delete-btn" onclick="deleteCultureContent(${content.id})">Delete</button>
                        </td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
    
    tableContainer.innerHTML = table;
}

function editCultureContent(id) {
    const content = cultureContent.find(c => c.id === id);
    if (!content) return;
    
    currentEditingCulture = id;
    document.getElementById('culture-form-title').textContent = 'Edit Culture Content';
    document.getElementById('culture-title').value = content.title;
    document.getElementById('culture-type').value = content.type;
    document.getElementById('culture-image').value = content.image;
    document.getElementById('culture-description').value = content.description;
    
    document.getElementById('culture-form').classList.remove('hidden');
}

function deleteCultureContent(id) {
    if (confirm('Are you sure you want to delete this culture content?')) {
        cultureContent = cultureContent.filter(c => c.id !== id);
        renderCultureContent();
        updateMainWebsite();
        alert('Culture content deleted successfully!');
    }
}

// Analytics functions
function initializeCharts() {
    createArticleChart();
    createEngagementChart();
    createCategoryChart();
    createTrafficChart();
}

function createArticleChart() {
    const ctx = document.getElementById('article-chart').getContext('2d');
    
    charts.articleChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
                label: 'Articles Published',
                data: [3, 5, 4, 7, 6, 8, 6],
                borderColor: '#8b9dc3',
                backgroundColor: 'rgba(139, 157, 195, 0.1)',
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function createEngagementChart() {
    const ctx = document.getElementById('engagement-chart').getContext('2d');
    
    charts.engagementChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Views', 'Shares', 'Comments', 'Likes'],
            datasets: [{
                label: 'Engagement Metrics',
                data: [15200, 892, 234, 1456],
                backgroundColor: ['#8b9dc3', '#6b7aa0', '#5a6b8d', '#4a5c7a']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function createCategoryChart() {
    const ctx = document.getElementById('content-category-chart').getContext('2d');
    
    const categoryData = {};
    articles.forEach(article => {
        categoryData[article.category] = (categoryData[article.category] || 0) + 1;
    });
    
    charts.categoryChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: Object.keys(categoryData),
            datasets: [{
                data: Object.values(categoryData),
                backgroundColor: ['#8b9dc3', '#6b7aa0', '#5a6b8d', '#4a5c7a']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function createTrafficChart() {
    const ctx = document.getElementById('traffic-chart').getContext('2d');
    
    charts.trafficChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['Organic Search', 'Social Media', 'Direct', 'Referrals'],
            datasets: [{
                data: [45, 30, 15, 10],
                backgroundColor: ['#8b9dc3', '#6b7aa0', '#5a6b8d', '#4a5c7a']
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}

function updateCharts() {
    Object.values(charts).forEach(chart => {
        if (chart) chart.update();
    });
}

// Update main website with admin changes
function updateMainWebsite() {
    localStorage.setItem('adminArticles', JSON.stringify(articles));
    localStorage.setItem('adminCulture', JSON.stringify(cultureContent));
    localStorage.setItem('adminMedia', JSON.stringify(mediaLibrary));
}

// Utility functions
function logout() {
    if (confirm('Are you sure you want to logout?')) {
        sessionStorage.removeItem('adminLoggedIn');
        window.location.href = 'admin-login.html';
    }
}

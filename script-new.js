// Editorial Website JavaScript

// Sample data for articles and content
let articles = [
    {
        id: 1,
        title: "Sustainable Fashion: The Future is Now",
        category: "Editorial",
        excerpt: "Exploring how eco-conscious brands are revolutionizing the fashion industry with innovative materials and ethical practices.",
        image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=400&h=250&fit=crop",
        author: "Sarah Chen",
        date: "July 28, 2025",
        content: "The fashion industry is undergoing a revolutionary transformation as sustainability takes center stage..."
    },
    {
        id: 2,
        title: "Street Style Chronicles: Tokyo Edition",
        category: "Fashion",
        excerpt: "A visual journey through Tokyo's most innovative street fashion, capturing the essence of youth culture and creativity.",
        image: "https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=250&fit=crop",
        author: "Yuki Tanaka",
        date: "July 27, 2025",
        content: "Tokyo's streets serve as a living canvas for fashion expression..."
    },
    {
        id: 3,
        title: "The Rise of Digital Fashion Weeks",
        category: "Culture",
        excerpt: "How virtual runway shows are reshaping the fashion calendar and creating new opportunities for global participation.",
        image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&h=250&fit=crop",
        author: "Marcus Rodriguez",
        date: "July 26, 2025",
        content: "The pandemic accelerated a digital transformation that was already brewing in fashion..."
    },
    {
        id: 4,
        title: "Minimalism Meets Maximalism",
        category: "Editorial",
        excerpt: "The unexpected harmony between contrasting design philosophies in contemporary fashion collections.",
        image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&h=250&fit=crop",
        author: "Elena Kowalski",
        date: "July 25, 2025",
        content: "In a world of extremes, fashion designers are finding beauty in contradiction..."
    },
    {
        id: 5,
        title: "Gender-Fluid Fashion Revolution",
        category: "Culture",
        excerpt: "Breaking down barriers: How contemporary designers are challenging traditional gender norms in fashion.",
        image: "https://images.unsplash.com/photo-1493655161922-ef98929de9d8?w=400&h=250&fit=crop",
        author: "Alex Morgan",
        date: "July 24, 2025",
        content: "Fashion has always been a form of self-expression, and today's designers are expanding those possibilities..."
    },
    {
        id: 6,
        title: "Artisan Craft in High Fashion",
        category: "Fashion",
        excerpt: "Celebrating traditional craftsmanship in modern luxury fashion and its cultural significance.",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=400&h=250&fit=crop",
        author: "Isabella Romano",
        date: "July 23, 2025",
        content: "The hands that create beauty in fashion often remain unseen, but their artistry is timeless..."
    }
];

let cultureContent = [
    {
        id: 1,
        title: "Music & Fashion Collaborations",
        description: "How artists and designers create cultural moments through fashion partnerships.",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=200&fit=crop"
    },
    {
        id: 2,
        title: "Art Gallery Fashion Shows",
        description: "When fashion meets fine art in unconventional runway presentations.",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop"
    },
    {
        id: 3,
        title: "Fashion Photography Evolution",
        description: "The changing landscape of fashion imagery in the digital age.",
        image: "https://images.unsplash.com/photo-1506629905877-c19d0ac2bfb9?w=300&h=200&fit=crop"
    }
];

let fashionWeekContent = [
    {
        id: 1,
        title: "Paris Fashion Week SS26",
        detail: "Spring/Summer 2026 Collections",
        image: "https://images.unsplash.com/photo-1594736797933-d0dfde661e22?w=250&h=300&fit=crop"
    },
    {
        id: 2,
        title: "Milan Fashion Week",
        detail: "Ready-to-Wear Collections",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=250&h=300&fit=crop"
    },
    {
        id: 3,
        title: "New York Fashion Week",
        detail: "Emerging Designer Showcase",
        image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=250&h=300&fit=crop"
    },
    {
        id: 4,
        title: "London Fashion Week",
        detail: "Sustainable Fashion Focus",
        image: "https://images.unsplash.com/photo-1540479859555-17af45c78602?w=250&h=300&fit=crop"
    }
];

let currentArticlesShown = 6;

// Initialize website
document.addEventListener('DOMContentLoaded', function() {
    loadArticles();
    loadCultureContent();
    loadFashionWeekContent();
    initializeHeroSlider();
});

// Load articles into the grid
function loadArticles() {
    const articlesGrid = document.getElementById('articles-grid');
    const articlesToShow = articles.slice(0, currentArticlesShown);
    
    articlesGrid.innerHTML = articlesToShow.map(article => `
        <div class="article-card" onclick="openArticle(${article.id})">
            <div class="article-image">
                <img src="${article.image}" alt="${article.title}" />
                <div class="article-category">${article.category}</div>
            </div>
            <div class="article-info">
                <h3 class="article-title">${article.title}</h3>
                <p class="article-excerpt">${article.excerpt}</p>
                <div class="article-meta">
                    <span class="author">By ${article.author}</span>
                    <span class="date">${article.date}</span>
                </div>
            </div>
        </div>
    `).join('');
    
    // Hide load more button if all articles are shown
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (currentArticlesShown >= articles.length) {
        loadMoreBtn.style.display = 'none';
    }
}

// Load more articles
function loadMoreArticles() {
    currentArticlesShown += 3;
    loadArticles();
}

// Load culture content
function loadCultureContent() {
    const cultureGrid = document.getElementById('culture-grid');
    cultureGrid.innerHTML = cultureContent.map(item => `
        <div class="culture-item" onclick="openCultureItem(${item.id})">
            <div class="culture-image">
                <img src="${item.image}" alt="${item.title}" />
            </div>
            <div class="culture-content">
                <h3 class="culture-title">${item.title}</h3>
                <p class="culture-description">${item.description}</p>
            </div>
        </div>
    `).join('');
}

// Load fashion week content
function loadFashionWeekContent() {
    const fashionGallery = document.getElementById('fashion-gallery');
    fashionGallery.innerHTML = fashionWeekContent.map(item => `
        <div class="fashion-item" onclick="openFashionItem(${item.id})">
            <img src="${item.image}" alt="${item.title}" />
            <div class="fashion-overlay">
                <div class="fashion-title">${item.title}</div>
                <div class="fashion-detail">${item.detail}</div>
            </div>
        </div>
    `).join('');
}

// Hero slider functionality
function initializeHeroSlider() {
    // Auto-slide every 5 seconds
    setInterval(() => {
        nextSlide();
    }, 5000);
}

function nextSlide() {
    const dots = document.querySelectorAll('.dot');
    const activeDot = document.querySelector('.dot.active');
    const currentIndex = Array.from(dots).indexOf(activeDot);
    const nextIndex = (currentIndex + 1) % dots.length;
    
    dots[currentIndex].classList.remove('active');
    dots[nextIndex].classList.add('active');
}

// Navigation functions
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    
    navLinks.classList.toggle('mobile-active');
    hamburger.classList.toggle('active');
}

function closeMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    const hamburger = document.querySelector('.hamburger');
    
    navLinks.classList.remove('mobile-active');
    hamburger.classList.remove('active');
}

// Shopify redirect
function redirectToShopify() {
    // Replace with your actual Shopify store URL
    window.open('https://your-shopify-store.myshopify.com', '_blank');
}

// Modal functions
function showSubscribeModal() {
    document.getElementById('subscribe-modal').style.display = 'block';
}

function closeSubscribeModal() {
    document.getElementById('subscribe-modal').style.display = 'none';
}

function subscribeNewsletter(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    
    // Here you would typically send the email to your backend
    alert(`Thank you for subscribing with ${email}! You'll receive our latest fashion insights.`);
    closeSubscribeModal();
    
    // Reset form
    event.target.reset();
}

// Article functions
function openArticle(articleId) {
    const article = articles.find(a => a.id === articleId);
    if (!article) return;
    
    const articleModal = document.getElementById('article-modal');
    const articleContent = document.getElementById('article-content');
    
    articleContent.innerHTML = `
        <div class="article-header">
            <div class="article-category-large">${article.category}</div>
            <h1>${article.title}</h1>
            <div class="article-meta-large">
                <span>By ${article.author}</span>
                <span>${article.date}</span>
            </div>
        </div>
        <div class="article-image-large">
            <img src="${article.image}" alt="${article.title}" />
        </div>
        <div class="article-body">
            <p>${article.content}</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
            <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p>
        </div>
    `;
    
    articleModal.style.display = 'block';
}

function closeArticleModal() {
    document.getElementById('article-modal').style.display = 'none';
}

function openCultureItem(itemId) {
    const item = cultureContent.find(c => c.id === itemId);
    if (!item) return;
    
    alert(`Opening: ${item.title}\n\n${item.description}\n\nThis would typically open a detailed page or modal with full content.`);
}

function openFashionItem(itemId) {
    const item = fashionWeekContent.find(f => f.id === itemId);
    if (!item) return;
    
    alert(`Opening: ${item.title}\n${item.detail}\n\nThis would typically open a gallery or detailed fashion week coverage.`);
}

// Smooth scrolling for navigation links
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed nav
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
        
        closeMobileMenu();
    });
});

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    const subscribeModal = document.getElementById('subscribe-modal');
    const articleModal = document.getElementById('article-modal');
    
    if (e.target === subscribeModal) {
        closeSubscribeModal();
    }
    
    if (e.target === articleModal) {
        closeArticleModal();
    }
});

// Scroll effects
let lastScrollTop = 0;
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Change nav background based on scroll
    if (scrollTop > 100) {
        nav.style.background = 'rgba(255, 255, 255, 0.98)';
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
        nav.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop;
});

// Add loading states for dynamic content
function showLoadingState(elementId) {
    const element = document.getElementById(elementId);
    element.innerHTML = '<div class="loading"></div>';
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animations
document.addEventListener('DOMContentLoaded', () => {
    const animatedElements = document.querySelectorAll('.article-card, .culture-item, .fashion-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Function to load admin-managed content
function loadAdminContent() {
    const adminArticles = localStorage.getItem('adminArticles');
    const adminCulture = localStorage.getItem('adminCulture');
    const adminFashion = localStorage.getItem('adminFashion');
    
    if (adminArticles) {
        articles = JSON.parse(adminArticles);
        loadArticles();
    }
    
    if (adminCulture) {
        cultureContent = JSON.parse(adminCulture);
        loadCultureContent();
    }
    
    if (adminFashion) {
        fashionWeekContent = JSON.parse(adminFashion);
        loadFashionWeekContent();
    }
}

// Call this when page loads to check for admin updates
document.addEventListener('DOMContentLoaded', () => {
    loadAdminContent();
});

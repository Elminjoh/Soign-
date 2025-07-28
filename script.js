
        let cart = [];
        let cartCount = 0;
        let cartTotal = 0;
        let products = [];

        // Load products from admin panel if available
        function loadProducts() {
            const adminProducts = localStorage.getItem('adminProducts');
            if (adminProducts) {
                products = JSON.parse(adminProducts);
                updateProductDisplay();
            }
        }

        // Update product display on main website
        function updateProductDisplay() {
            const productGrid = document.querySelector('.product-grid');
            if (!productGrid || products.length === 0) return;
            
            productGrid.innerHTML = products.map(product => {
                const discountedPrice = product.discount > 0 ? 
                    product.price * (1 - product.discount / 100) : product.price;
                
                return `
                    <div class="product-card">
                        <div class="product-image">${product.emoji}</div>
                        <div class="product-info">
                            <div class="product-name">${product.name}</div>
                            <div class="product-price">
                                ${product.discount > 0 ? 
                                    `<span style="text-decoration: line-through; color: #888; margin-right: 10px;">$${product.price}</span>
                                     <span style="color: #e74c3c;">$${discountedPrice.toFixed(0)}</span>
                                     <span style="background: #e74c3c; color: white; padding: 2px 6px; border-radius: 4px; font-size: 0.8rem; margin-left: 8px;">${product.discount}% OFF</span>` :
                                    `$${product.price}`
                                }
                            </div>
                            <button class="add-to-cart" onclick="addToCart('${product.name}', ${discountedPrice}, '${product.emoji}')" ${product.stock === 0 ? 'disabled' : ''}>
                                ${product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                            </button>
                        </div>
                    </div>
                `;
            }).join('');
        }

        function addToCart(name, price, emoji) {
            cart.push({ name, price, emoji });
            cartCount++;
            cartTotal += price;
            
            updateCartDisplay();
            
            // Add animation effect
            const button = event.target;
            button.style.transform = 'scale(0.95)';
            button.textContent = 'Added!';
            setTimeout(() => {
                button.style.transform = 'scale(1)';
                button.textContent = 'Add to Cart';
            }, 500);
        }

        function updateCartDisplay() {
            document.querySelector('.cart-count').textContent = cartCount;
            document.getElementById('cart-total').textContent = cartTotal;
            
            const cartItems = document.getElementById('cart-items');
            cartItems.innerHTML = '';
            
            cart.forEach((item, index) => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';
                cartItem.innerHTML = `
                    <div class="cart-item-image">${item.emoji}</div>
                    <div class="cart-item-info">
                        <div class="cart-item-name">${item.name}</div>
                        <div class="cart-item-price">$${item.price}</div>
                    </div>
                `;
                cartItems.appendChild(cartItem);
            });
        }

        function toggleCart() {
            const sidebar = document.querySelector('.cart-sidebar');
            const overlay = document.querySelector('.cart-overlay');
            
            sidebar.classList.toggle('open');
            overlay.classList.toggle('open');
        }

        function scrollToProducts() {
            document.getElementById('products').scrollIntoView({ 
                behavior: 'smooth' 
            });
        }

        function checkout() {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            
            alert(`Thank you for your purchase! Total: $${cartTotal}`);
            cart = [];
            cartCount = 0;
            cartTotal = 0;
            updateCartDisplay();
            toggleCart();
        }

        // Mobile menu functions
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

        // Smooth scroll for navigation links
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });

        // Add scroll effect to navigation
        window.addEventListener('scroll', () => {
            const nav = document.querySelector('nav');
            if (window.scrollY > 100) {
                nav.style.background = 'rgba(0, 0, 0, 0.95)';
            } else {
                nav.style.background = 'rgba(0, 0, 0, 0.9)';
            }
        });

        // Add parallax effect to hero
        window.addEventListener('scroll', () => {
            const hero = document.querySelector('.hero');
            const scrolled = window.pageYOffset;
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        });

        // Load products when page loads
        document.addEventListener('DOMContentLoaded', function() {
            loadProducts();
        });

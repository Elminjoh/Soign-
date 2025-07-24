
        let cart = [];
        let cartCount = 0;
        let cartTotal = 0;

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

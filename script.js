// Product data with isNew, isSale, outOfStock features, reviews and descriptions
const products = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        category: "electronics",
        price: 89999,
        image: "img1.jpg",
        isNew: true,
        isSale: false,
        outOfStock: false,
        rating: 4.7,
        reviewCount: 156,
        description: "Premium wireless headphones with noise cancellation, 30-hour battery life, and superior sound quality."
    },
    {
        id: 2,
        name: "Premium Cotton T-Shirt",
        category: "clothing",
        price: 24999,
        image: "img2.jpg",
        isNew: false,
        isSale: true,
        outOfStock: false,
        salePrice: 19999,
        rating: 4.5,
        reviewCount: 89,
        description: "Comfortable cotton t-shirt with premium stitching and breathable fabric for everyday wear."
    },
    {
        id: 3,
        name: "Smart Watch Series 5",
        category: "electronics",
        price: 149999,
        image: "img3.jpg",
        isNew: false,
        isSale: false,
        outOfStock: false,
        rating: 4.8,
        reviewCount: 203,
        description: "Advanced smartwatch with heart rate monitoring, GPS tracking, and 7-day battery life."
    },
    {
        id: 4,
        name: "Ceramic Cookware Set",
        category: "home",
        price: 129999,
        image: "img4.jpg",
        isNew: false,
        isSale: true,
        outOfStock: false,
        salePrice: 99999,
        rating: 4.6,
        reviewCount: 124,
        description: "Non-stick ceramic cookware set with induction compatibility and oven-safe design."
    },
    {
        id: 5,
        name: "Running Sneakers",
        category: "footwear",
        price: 79999,
        image: "img5.jpg",
        isNew: true,
        isSale: false,
        outOfStock: false,
        rating: 4.5,
        reviewCount: 203,
        description: "Lightweight running sneakers with cushioned soles and breathable mesh for maximum comfort."
    },
    {
        id: 6,
        name: "Leather Wallet",
        category: "accessories",
        price: 39999,
        image: "img6.jpg",
        isNew: false,
        isSale: false,
        outOfStock: true,
        rating: 4.3,
        reviewCount: 67,
        description: "Genuine leather wallet with multiple card slots and RFID protection for your cards."
    },
    {
        id: 7,
        name: "Wireless Charging Pad",
        category: "electronics",
        price: 29999,
        image: "img7.jpg",
        isNew: false,
        isSale: true,
        outOfStock: false,
        salePrice: 24999,
        rating: 4.6,
        reviewCount: 145,
        description: "Fast wireless charging pad compatible with all Qi-enabled devices, with overcharge protection."
    },
    {
        id: 8,
        name: "Denim Jacket",
        category: "clothing",
        price: 59999,
        image: "img8.jpg",
        isNew: true,
        isSale: false,
        outOfStock: false,
        rating: 4.3,
        reviewCount: 67,
        description: "Classic denim jacket with modern fit, durable construction, and timeless style."
    },
    {
        id: 9,
        name: "Tecno Spark 40",
        category: "electronics",
        price: 150000,
        salePrice: 145000,
        image: "img9.jpg",
        rating: 4.5,
        reviewCount: 178,
        inStock: true,
        isNew: true,
        isSale: true,
        description: "Latest tecno smart phone with rear and unique features affordably available "
    },
    {
        id: 10,
        name: "Psvita Console",
        category: "electronics",
        price: 250000,
        salePrice: 230000,
        image: "img10.jpg",
        rating: 4.6,
        reviewCount: 156,
        inStock: true,
        isNew: false,
        isSale: true,
        description: "Professional gaming Console with customizable buttons, precise analog sticks, and wireless connectivity."
    },
    {
        id: 11,
        name: "Wireless Gaming Controller",
        category: "electronics",
        price: 90000,
        salePrice: 79000,
        image: "img11.jpg",
        rating: 4.6,
        reviewCount: 156,
        inStock: false,
        isNew: false,
        isSale: true,
        description: "Professional gaming controller with customizable buttons, precise analog sticks, and wireless connectivity."
    },
      {
        id: 12,
        name: "Tecno Spark 30 pro",
        category: "electronics",
        price: 220000,
        salePrice: null,
        image: "img12.jpg", 
        rating: 4.7,
        reviewCount: 134,
        inStock: true,
        isNew: false,
        isSale: false,
        description: "Nice design, latest and android phone with cool features."
    },
    {
        id: 13,
        name: "iphone 17 pro",
        category: "electronics",
        price: 2000000,
        salePrice: null,
        image: "img13.jpg", 
        rating: 4.7,
        reviewCount: 134,
        inStock: true,
        isNew: true,
        isSale: false,
        description: "Sleek and nice design, latest and iphone  with fantastic features."
    }
];

// Sales data for chart
const salesData = [
    { month: "Jan", sales: 120 },
    { month: "Feb", sales: 180 },
    { month: "Mar", sales: 220 },
    { month: "Apr", sales: 280 },
    { month: "May", sales: 350 },
    { month: "Jun", sales: 420 }
];

// Cart management
let cart = [];

// DOM Elements
const productsGrid = document.getElementById('productsGrid');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('searchInput');
const cartIcon = document.getElementById('cartIcon');
const cartCount = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const closeModal = document.querySelector('.close');
const cartItemsContainer = document.getElementById('cartItems');
const cartTotalElement = document.getElementById('cartTotal');
const whatsappCheckout = document.getElementById('whatsappCheckout');
const categoryCards = document.querySelectorAll('.category-card');

// Initialize cart from localStorage or with empty cart
function initCart() {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
    } else {
        cart = [];
        localStorage.setItem('cart', JSON.stringify(cart));
    }
    updateCartUI();
}

// Update cart count and UI
function updateCartUI() {
    // Update cart count
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    if (cartCount) {
        cartCount.textContent = totalItems;
    }
    
    // Update cart modal
    renderCartItems();
    updateCartTotal();
    
    // Update WhatsApp link
    updateWhatsAppLink();
}

// Render cart items in modal
function renderCartItems() {
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Your cart is empty</p>';
        return;
    }
    
    cartItemsContainer.innerHTML = '';
    cart.forEach((item, index) => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        
        // Create image element with fallback
        const imgSrc = item.image || 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgdmlld0JveD0iMCAwIDYwIDYwIj48cmVjdCB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIGZpbGw9IiM3NzciLz48dGV4dCB4PSIzMCIgeT0iMzAiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxMiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2ZmZiI+Tm8gSW1hZ2U8L3RleHQ+PC9zdmc+';
        
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${imgSrc}" alt="${item.name}">
            </div>
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">₦${item.price.toLocaleString()}</div>
            </div>
            <div class="cart-item-actions">
                <button class="btn-quantity" data-index="${index}" data-action="decrease">-</button>
                <span>${item.quantity}</span>
                <button class="btn-quantity" data-index="${index}" data-action="increase">+</button>
                <button class="btn-remove" data-index="${index}"><i class="fas fa-trash"></i></button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);
    });
    
    // Add event listeners to quantity buttons
    const quantityButtons = document.querySelectorAll('.btn-quantity');
    if (quantityButtons && quantityButtons.length > 0) {
        quantityButtons.forEach(button => {
            button.addEventListener('click', handleQuantityChange);
        });
    }
    
    const removeButtons = document.querySelectorAll('.btn-remove');
    if (removeButtons && removeButtons.length > 0) {
        removeButtons.forEach(button => {
            button.addEventListener('click', handleRemoveItem);
        });
    }
}

// Handle quantity change
function handleQuantityChange(e) {
    const index = parseInt(e.target.dataset.index);
    const action = e.target.dataset.action;
    
    if (action === 'increase') {
        cart[index].quantity += 1;
    } else if (action === 'decrease') {
        if (cart[index].quantity > 1) {
            cart[index].quantity -= 1;
        } else {
            cart.splice(index, 1);
        }
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

// Handle remove item
function handleRemoveItem(e) {
    const index = parseInt(e.target.closest('.btn-remove').dataset.index);
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

// Update cart total
function updateCartTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    if (cartTotalElement) {
        cartTotalElement.textContent = total.toLocaleString();
    }
}



// Update WhatsApp checkout link with your custom format
function updateWhatsAppLink() {
    if (!whatsappCheckout || cart.length === 0) return;
    
    // Build the product list
    let productLines = '';
    cart.forEach((item, index) => {
        productLines += `${index + 1}. *${item.name}*\n   - Qty: ${item.quantity}\n   - Total: ₦${(item.price * item.quantity).toLocaleString()}\n\n`;
    });
    
    // Calculate totals
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = 0; // Free shipping
    const grandTotal = subtotal + shipping;
    
    // Build the complete message
    let message = `Hello ShopEasy! I would like to place an order for the following items:\n\n${productLines}---\n*ORDER SUMMARY*\nSubtotal: ₦${subtotal.toLocaleString()}\nShipping: Free\n*Grand Total: ₦${grandTotal.toLocaleString()}*\n\nPlease confirm my order and share payment details. Thank you!`;
    
    // URL encode the message
    const encodedMessage = encodeURIComponent(message);
    whatsappCheckout.href = `https://wa.me/1234567890?text=${encodedMessage}`;
}


// Display products
function displayProducts(productsToShow) {
    if (!productsGrid) return;
    
    productsGrid.innerHTML = '';
    
    productsToShow.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        // Create badge based on product status
        let badgeHTML = '';
        if (product.isNew) {
            badgeHTML = '<span class="product-badge badge-new">NEW</span>';
        } else if (product.isSale) {
            badgeHTML = '<span class="product-badge badge-sale">SALE</span>';
        } else if (product.outOfStock) {
            badgeHTML = '<span class="product-badge badge-outofstock">OUT OF STOCK</span>';
        }
        
        // Format price with sale price if applicable
        let priceHTML = `₦${product.price.toLocaleString()}`;
        if (product.isSale) {
            priceHTML = `<span style="text-decoration: line-through; color: var(--gray);">₦${product.price.toLocaleString()}</span> <span style="color: var(--success); font-weight: 600;">₦${product.salePrice.toLocaleString()}</span>`;
        }
        
        // Generate star rating
        let ratingStars = '';
        for (let i = 0; i < 5; i++) {
            if (i < Math.floor(product.rating)) {
                ratingStars += '<i class="fas fa-star"></i>';
            } else if (i < product.rating) {
                ratingStars += '<i class="fas fa-star-half-alt"></i>';
            } else {
                ratingStars += '<i class="far fa-star"></i>';
            }
        }
        
        // Use placeholder image if no image is provided
        const imgSrc = product.image || 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIiB2aWV3Qm94PSIwIDAgMjAwIDIwMCI+PHJlY3Qgd2lkdGg9IjIwMCIgaGVpZ2h0PSIyMDAiIGZpbGw9IiM3NzciLz48dGV4dCB4PSIxMDAiIHk9IjEwMCIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjE0IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmaWxsPSIjZmZmIj5Qcm9kdWN0IEltYWdlPC90ZXh0Pjwvc3ZnPg==';
        
        productCard.innerHTML = `
            <div class="product-image">
                ${badgeHTML}
                <img src="${imgSrc}" alt="${product.name}">
            </div>
            <div class="product-info">
                <div class="product-category">${product.category.charAt(0).toUpperCase() + product.category.slice(1)}</div>
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">${priceHTML}</div>
                <div class="product-rating">
                    <div class="rating-stars">${ratingStars}</div>
                    <span class="rating-count">(${product.reviewCount} reviews)</span>
                </div>
                <div class="product-description">${product.description}</div>
                <div class="product-actions">
                    ${product.outOfStock ? 
                        '<button class="btn btn-outline" disabled>Out of Stock</button>' : 
                        '<button class="btn btn-outline add-to-cart" data-id="' + product.id + '">Add to Cart</button>'
                    }
                    ${product.outOfStock ? 
                        '<button class="btn btn-primary" disabled>Buy Now</button>' : 
                        '<button class="btn btn-primary buy-now" data-id="' + product.id + '">Buy Now</button>'
                    }
                </div>
            </div>
        `;
        productsGrid.appendChild(productCard);
    });
    
    // Add event listeners to new buttons
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    if (addToCartButtons && addToCartButtons.length > 0) {
        addToCartButtons.forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }
    
    const buyNowButtons = document.querySelectorAll('.buy-now');
    if (buyNowButtons && buyNowButtons.length > 0) {
        buyNowButtons.forEach(button => {
            button.addEventListener('click', buyNow);
        });
    }
}

// Add to cart function
function addToCart(e) {
    if (!e.target.dataset.id) return;
    
    const productId = parseInt(e.target.dataset.id);
    const product = products.find(p => p.id === productId);
    
    if (!product || product.outOfStock) {
        return;
    }
    
    // Check if product is already in cart
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    
    // Show feedback
    const originalText = e.target.textContent;
    e.target.textContent = 'Added!';
    e.target.style.backgroundColor = 'var(--success)';
    e.target.style.color = 'white';
    
    setTimeout(() => {
        e.target.textContent = originalText;
        e.target.style.backgroundColor = '';
        e.target.style.color = '';
    }, 1500);
}

// Buy now function (adds to cart and opens modal)
function buyNow(e) {
    if (!e.target.dataset.id) return;
    
    const productId = parseInt(e.target.dataset.id);
    const product = products.find(p => p.id === productId);
    
    if (!product || product.outOfStock) {
        return;
    }
    
    addToCart(e);
    openCartModal();
}

// Filter products by category
function filterProducts(category) {
    if (category === 'all') {
        displayProducts(products);
    } else {
        const filtered = products.filter(product => product.category === category);
        displayProducts(filtered);
    }
}

// Search functionality
function searchProducts(query) {
    const filtered = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase())
    );
    displayProducts(filtered);
}

// Generate sales chart
function generateChart() {
    const chartContainer = document.getElementById('salesChart');
    if (!chartContainer) return;
    
    chartContainer.innerHTML = '';
    
    const maxSales = Math.max(...salesData.map(item => item.sales));
    
    salesData.forEach(item => {
        const barHeight = (item.sales / maxSales) * 250; // Max height 250px
        
        const bar = document.createElement('div');
        bar.className = 'bar';
        bar.style.height = `${barHeight}px`;
        
        const value = document.createElement('div');
        value.className = 'bar-value';
        value.textContent = `₦${item.sales}k`;
        
        const label = document.createElement('div');
        label.className = 'bar-label';
        label.textContent = item.month;
        
        bar.appendChild(value);
        chartContainer.appendChild(bar);
        chartContainer.appendChild(label);
    });
}

// Modal functions
function openCartModal() {
    if (cartModal) {
        cartModal.style.display = 'block';
    }
}

function closeCartModal() {
    if (cartModal) {
        cartModal.style.display = 'none';
    }
}

// Event Listeners
if (filterButtons && filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Filter products
            filterProducts(button.dataset.category);
        });
    });
}

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        searchProducts(e.target.value);
    });
}

if (cartIcon) {
    cartIcon.addEventListener('click', openCartModal);
}

if (closeModal) {
    closeModal.addEventListener('click', closeCartModal);
}

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (cartModal && e.target === cartModal) {
        closeCartModal();
    }
});

// Category card filtering
if (categoryCards && categoryCards.length > 0) {
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            const category = card.dataset.category;
            filterProducts(category);
            
            // Update active filter button
            if (filterButtons && filterButtons.length > 0) {
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                    if (btn.dataset.category === category) {
                        btn.classList.add('active');
                    }
                });
            }
        });
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Clear any existing cart data to ensure it starts empty
    localStorage.removeItem('cart');
    cart = [];
    
    initCart();
    displayProducts(products);
    generateChart();
});

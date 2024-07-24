document.addEventListener('DOMContentLoaded', () => {
    const products = [
        { id: 1, name: 'Elegant Bloom', price: 85, description: 'A delicate floral fragrance.', image: 'images/perfume1.jpg' },
        { id: 2, name: 'Mystic Forest', price: 95, description: 'A refreshing woody scent.', image: 'images/perfume2.jpg' },
        { id: 3, name: 'Ocean Breeze', price: 75, description: 'A cool and crisp aquatic aroma.', image: 'images/perfume3.jpg' },
    ];

    const productList = document.getElementById('product-list');
    const cartList = document.getElementById('cart-list');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    let cart = [];

    products.forEach(product => {
        const productItem = document.createElement('div');
        productItem.classList.add('product-item');
        productItem.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p>$${product.price}</p>
            <button class="btn add-to-cart" data-id="${product.id}">Add to Cart</button>
        `;
        productList.appendChild(productItem);
    });

    productList.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = e.target.getAttribute('data-id');
            const product = products.find(prod => prod.id == productId);
            addToCart(product);
        }
    });

    cartList.addEventListener('click', (e) => {
        if (e.target.classList.contains('remove-btn')) {
            const productId = e.target.getAttribute('data-id');
            removeFromCart(productId);
        }
    });

    function addToCart(product) {
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCart();
    }

    function removeFromCart(productId) {
        cart = cart.filter(item => item.id != productId);
        updateCart();
    }

    function updateCart() {
        cartList.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            total += item.price * item.quantity;
            const cartItem = document.createElement('div');
            cartItem.classList.add('cart-item');
            cartItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <div class="item-info">
                    <h3>${item.name}</h3>
                    <p>Quantity: ${item.quantity}</p>
                </div>
                <p class="item-price">$${item.price * item.quantity}</p>
                <button class="remove-btn" data-id="${item.id}">Remove</button>
            `;
            cartList.appendChild(cartItem);
        });
        cartCount.textContent = cart.length;
        cartTotal.textContent = `$${total}`;
    }
});


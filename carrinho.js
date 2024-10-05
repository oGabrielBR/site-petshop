// Mock data for products (you can replace it with actual API or dynamic data)
const products = [
    {
        id: 1,
        name: "Ração Pedigree Adulto",
        price: 159.90,
        img: "ração.jpg",
        quantity: 1
    },
    {
        id: 2,
        name: "Ração Whiskas Adulto",
        price: 149.90,
        img: "whiskas.jpg",
        quantity: 1
    },
    {
        id: 3,
        name: "Shampoo para Cachorro Adulto",
        price: 18.70,
        img: "https://images.tcdn.com.br/img/img_prod/694926/shampoo_para_cachorro_pelos_escuros_sanol_dog_500ml_361105_1_aa70320321b6d7e45e953657c2786248.jpg",
        quantity: 1
    },
    {
        id: 4,
        name: "Shampoo para Gatos",
        price: 14.70,
        img: "shampoo gato.jpg",
        quantity: 1
    }
];

// Increase quantity of a product
function loadCart() {
    return JSON.parse(localStorage.getItem('cartItems')) || [];
}

// Renderizar os produtos no carrinho
function renderCart() {
    const cartItemsContainer = document.querySelector('.cart-items');
    cartItemsContainer.innerHTML = '';
    let total = 0;

    const products = loadCart();

    if (products.length === 0) {
        cartItemsContainer.innerHTML = '<p>Seu carrinho está vazio.</p>';
        document.getElementById('checkout-btn').disabled = true;
        return;
    } else {
        document.getElementById('checkout-btn').disabled = false;
    }

    products.forEach(product => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h2>${product.name}</h2>
                <span>Preço: R$ ${product.price.toFixed(2)}</span>
            </div>
            <div class="cart-item-actions">
                <button onclick="decreaseQuantity('${product.name}')">-</button>
                <input type="text" value="${product.quantity}" readonly>
                <button onclick="increaseQuantity('${product.name}')">+</button>
                <button onclick="removeItem('${product.name}')">Remover</button>
            </div>
        `;
        cartItemsContainer.appendChild(cartItem);

        total += product.price * product.quantity;
    });

    document.getElementById('cart-total').textContent = `R$ ${total.toFixed(2)}`;
}

function increaseQuantity(productName) {
    let products = loadCart();
    const product = products.find(p => p.name === productName);
    if (product) {
        product.quantity += 1;
        localStorage.setItem('cartItems', JSON.stringify(products));
        renderCart();
    }
}

function decreaseQuantity(productName) {
    let products = loadCart();
    const product = products.find(p => p.name === productName);
    if (product && product.quantity > 1) {
        product.quantity -= 1;
        localStorage.setItem('cartItems', JSON.stringify(products));
        renderCart();
    } else if (product.quantity === 1) {
        removeItem(productName);
    }
}

function removeItem(productName) {
    let products = loadCart();
    products = products.filter(product => product.name !== productName);
    localStorage.setItem('cartItems', JSON.stringify(products));
    renderCart();
}

window.onload = function() {
    renderCart();
};
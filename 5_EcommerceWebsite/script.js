const products = [
  { id: 1, name: 'Wireless Headphones', price: 1999, image: 'https://images-cdn.ubuy.co.in/667e9ab17dfef84adb3bde66-gaming-headset-ps5-ps4-headset-with-7-1.jpg' },
  { id: 2, name: 'Gaming Mouse', price: 899, image: 'https://www.portronics.com/cdn/shop/files/Artboard1_2b95dd60-aa4a-45ee-8ed0-4b7e8603321e.jpg?v=1702375127&width=1445' },
  { id: 3, name: 'Smart Watch', price: 2499, image: 'https://www.leafstudios.in/cdn/shop/files/1_1099cd20-7237-4bdf-a180-b7126de5ef3d_1024x1024.png?v=1722230645https://www.boat-lifestyle.com/cdn/shop/files/Stone_SpinXPro_1.png?v=1709717404' },
  { id: 4, name: 'Bluetooth Speaker', price: 1299, image: 'https://www.boat-lifestyle.com/cdn/shop/files/Stone_SpinXPro_1.png?v=1709717404' },
  { id: 5, name: 'Chair', price: 1599, image: 'https://m.media-amazon.com/images/I/71DlNwhYT1L.jpg' },
  { id: 6, name: 'Noise Cancelling Earbuds', price: 2999, image: 'https://m.media-amazon.com/images/I/61f1YfTkTDL._AC_UL400_.jpg' },
  { id: 7, name: 'Portable Charger', price: 799, image: 'https://images-cdn.ubuy.co.in/633a9cf2d90be755fe748c04-ubuy-online-shopping.jpg' },
  { id: 8, name: 'LED Desk Lamp', price: 599, image: 'https://www.mojolife.in/cdn/shop/files/desk-1_2.png?v=1727094719' }
];

let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartDisplay() {
  const cartEl = document.getElementById('cart-items');
  const totalEl = document.getElementById('total');
  cartEl.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.qty;
    cartEl.innerHTML += `
      <div class="cart-item">
        <span>${item.name} (x${item.qty})</span>
        <button onclick="removeItem(${item.id})">❌</button>
      </div>
    `;
  });

  totalEl.innerText = total;
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty++;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  updateCartDisplay();
}

function removeItem(id) {
  cart = cart.filter(item => item.id !== id);
  updateCartDisplay();
}

function checkout() {
  if (cart.length === 0) {
    alert("🛒 Your cart is empty!");
    return;
  }
  alert("✅ Order placed successfully!");
  cart = [];
  updateCartDisplay();
}

window.onload = () => {
  const productContainer = document.getElementById('products');
  products.forEach(p => {
    productContainer.innerHTML += `
      <div class="product-card">
        <img src="${p.image}" alt="${p.name}" />
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `;
  });
  updateCartDisplay();
};

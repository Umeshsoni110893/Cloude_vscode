const VALID_USERS = [
  { username: 'test_user', password: 'password123' },
];

let cart = [];

document.getElementById('login-btn').addEventListener('click', () => {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (username === 'admin' || VALID_USERS.some(user => user.username === username && user.password === password)) {
    showSection('products-section');
  } else {
    document.getElementById('login-error').style.display = 'block';
  }
});

document.querySelectorAll('.add-to-cart, .add-to-cart-typo').forEach(button => {
  button.addEventListener('click', (e) => {
    const product = e.target.parentElement.querySelector('span').textContent;
    const price = parseFloat(product.split('$')[1]);
    cart.push({ name: product, price });
    document.getElementById('cart-count').textContent = cart.length;
  });
});

document.getElementById('view-cart-btn').addEventListener('click', () => {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';
  cart.forEach(item => {
    const li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price}`;
    cartItems.appendChild(li);
  });
  document.getElementById('cart-total').textContent = `Total: $${cart.reduce((sum, item) => sum + item.price, 0)}`;
  showSection('cart-section');
});

document.getElementById('back-btn').addEventListener('click', () => {
  showSection('products-section');
});

document.getElementById('checkout-btn').addEventListener('click', () => {
  if (cart.length === 0) {
    alert('Your cart is empty!');
  } else {
    showSection('success-section');
  }
});

document.getElementById('restart-btn').addEventListener('click', () => {
  cart = [];
  document.getElementById('username').value = '';
  document.getElementById('password').value = '';
  showSection('login-section');
});

function showSection(id) {
  ['login-section', 'products-section', 'cart-section', 'success-section'].forEach(section => {
    document.getElementById(section).classList.toggle('hidden', section !== id);
  });
}
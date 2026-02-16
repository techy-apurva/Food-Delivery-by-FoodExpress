

function showMenu(category)
{

let items = document.querySelectorAll(".menu-item");

items.forEach(item => {

if(item.classList.contains(category))
{
item.style.display = "block";
}
else
{
item.style.display = "none";
}

});

document.getElementById("menu").scrollIntoView();

}



document.addEventListener("DOMContentLoaded", function()
{
updateCartUI();
});


let cart = JSON.parse(localStorage.getItem("cart")) || [];
let total = JSON.parse(localStorage.getItem("total")) || 0;

document.addEventListener("DOMContentLoaded", function() {
    updateCartUI();
});
function addToCart(name, price) {
    let existingItem = cart.find(item => item.name === name);
    if(existingItem){
        existingItem.qty += 1;
        existingItem.totalPrice = existingItem.price * existingItem.qty;
       
    } else {
        cart.push({name, price, qty: 1, totalPrice: price});
        alert(`${name} added to cart! 🛒`); 
    }

    updateCartTotals();
    updateCartUI();
}


function removeItem(index){
    cart.splice(index, 1);
    updateCartTotals();
    updateCartUI();
}

function changeQty(index, action){
    if(action === "plus"){
        cart[index].qty += 1;
    } else if(action === "minus"){
        if(cart[index].qty > 1){
            cart[index].qty -= 1;
        } else {
    
            removeItem(index);
            return;
        }
    }
    cart[index].totalPrice = cart[index].price * cart[index].qty;
    updateCartTotals();
    updateCartUI();
}

function updateCartTotals(){
    total = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("total", total);
}
function updateCartUI(){
    const cartItemsEl = document.getElementById("cart-items");
    const totalEl = document.getElementById("total");
    const countEl = document.getElementById("cart-count");
    const emptyMsg = document.getElementById("empty-cart-msg");

    cartItemsEl.innerHTML = "";

    if(cart.length === 0){
        emptyMsg.style.display = "block";
    } else {
        emptyMsg.style.display = "none";

        cart.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                <span class="item-name">${item.name}</span>
                <div class="qty-price">
                    <button class="qty-btn" onclick="changeQty(${index}, 'minus')">−</button>
                    <span class="item-qty">${item.qty}</span>
                    <button class="qty-btn" onclick="changeQty(${index}, 'plus')">+</button>
                    <span class="item-price">₹${item.totalPrice}</span>
                    <span class="remove-btn" onclick="removeItem(${index})">✖</span>
                </div>
            `;
            cartItemsEl.appendChild(li);
        });
    }

    let totalCount = 0;
    let totalPrice = 0;
    cart.forEach(item => {
        totalCount += item.qty;
        totalPrice += item.totalPrice;
    });

    if(totalEl) totalEl.innerText = totalPrice;
    if(countEl) countEl.innerText = totalCount;

   
    localStorage.setItem("cart", JSON.stringify(cart));
    localStorage.setItem("total", totalPrice);
}

function openCart(){
    document.getElementById("cart").classList.add("active");
}

function closeCart(){
    document.getElementById("cart").classList.remove("active");
}



function removeItem(index)
{
total -= cart[index].price;
cart.splice(index, 1);
localStorage.setItem("cart", JSON.stringify(cart));
localStorage.setItem("total", total);

updateCartUI();

}

const checkoutModal = document.getElementById('checkout-modal');
const checkoutItemsEl = document.getElementById('checkout-items');
const checkoutSubtotalEl = document.getElementById('checkout-subtotal');
const checkoutTaxEl = document.getElementById('checkout-tax');
const checkoutTotalEl = document.getElementById('checkout-total');
const confirmOrderBtn = document.getElementById('confirm-order');
const closeCheckoutBtn = document.querySelector('.close-checkout');

function openCheckout() {
    if (cart.length === 0) {  
        alert("Your cart is empty!");
        return;
    }

    checkoutItemsEl.innerHTML = '';
    let subtotal = 0;

    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} x${item.qty} - ₹${item.totalPrice}`;
        checkoutItemsEl.appendChild(li);
        subtotal += item.totalPrice;
    });

    const tax = Math.round(subtotal * 0.05); 
    const total = subtotal + tax;

    checkoutSubtotalEl.textContent = subtotal;
    checkoutTaxEl.textContent = tax;
    checkoutTotalEl.textContent = total;

    checkoutModal.classList.add('active');
}


closeCheckoutBtn.onclick = () => checkoutModal.classList.remove('active');


confirmOrderBtn.onclick = () => {
    const name = document.getElementById('cust-name').value.trim();
    const address = document.getElementById('cust-address').value.trim();
    const phone = document.getElementById('cust-phone').value.trim();

    if (!name || !address || !phone) {
        alert("Please fill all delivery details!");
        return;
    }

    alert(`Thank you, ${name}! Your order has been placed successfully.\nTotal: ₹${checkoutTotalEl.textContent}`);

    
    cart = [];
    updateCartUI();
    localStorage.removeItem('cart');
    localStorage.removeItem('total');

    checkoutModal.classList.remove('active');
};

function animateCounter(id, max) {
    const el = document.getElementById(id);
    let count = 0;
    const speed = Math.floor(Math.random() * 20) + 10; 
    const increment = Math.ceil(max / 100);
    const interval = setInterval(() => {
        count += increment;
        if(count >= max) {
            count = max; 
            clearInterval(interval);
        }
        el.innerText = count;
    }, speed);
}
document.addEventListener("DOMContentLoaded", () => {
    animateCounter("count1", Math.floor(Math.random() * 10000) + 1);
    animateCounter("count2", Math.floor(Math.random() * 10000) + 1);
    animateCounter("count3", Math.floor(Math.random() * 10000) + 1);
    animateCounter("count4", Math.floor(Math.random() * 10000) + 1);
});


// script.js — Bloom Valley Nursery
// Task 3.1: JavaScript alert functionality
// Task 3.2: Web storage

document.addEventListener('DOMContentLoaded', function () {

    // ── Helpers: sessionStorage cart ───────────────────────────────────────────
    function getCart() {
        return JSON.parse(sessionStorage.getItem('bvn_cart') || '[]');
    }

    function saveCart(cart) {
        sessionStorage.setItem('bvn_cart', JSON.stringify(cart));
    }

    function renderCart() {
        var el = document.getElementById('cart-items');
        if (!el) return;
        var cart = getCart();
        if (cart.length === 0) {
            el.innerHTML = 'Your cart is empty.';
            return;
        }
        var total = 0;
        var html = '<ul class="list-unstyled mb-2">';
        cart.forEach(function (entry) {
            total += parseFloat(entry.price);
            html += '<li>' + entry.item + ' \u2014 $' + parseFloat(entry.price).toFixed(2) + '</li>';
        });
        html += '</ul><strong>Total: $' + total.toFixed(2) + '</strong>';
        el.innerHTML = html;
    }

    // ── Subscribe buttons (all pages) ──────────────────────────────────────────
    document.querySelectorAll('#subscribe-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            alert('Thank you for subscribing.');
        });
    });

    // ── Gallery: Add to Cart ────────────────────────────────────────────────────
    document.querySelectorAll('.add-to-cart-btn').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var cart = getCart();
            cart.push({item: btn.dataset.item, price: btn.dataset.price});
            saveCart(cart);
            alert('Item added to the cart.');
        });
    });

    // ── Gallery: View Cart modal — populate on open ─────────────────────────────
    var cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.addEventListener('show.bs.modal', function () {
            renderCart();
        });
    }

    // ── Gallery: Clear Cart ─────────────────────────────────────────────────────
    var clearCartBtn = document.getElementById('clear-cart-btn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function () {
            saveCart([]);
            renderCart();
            alert('Cart cleared.');
        });
    }

    // ── Gallery: Process Order ──────────────────────────────────────────────────
    var processOrderBtn = document.getElementById('process-order-btn');
    if (processOrderBtn) {
        processOrderBtn.addEventListener('click', function () {
            saveCart([]);
            renderCart();
            alert('Thank you for your order.');
        });
    }

    // ── About Us: Contact form — save to localStorage ───────────────────────────
    var contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            var data = {
                name: document.getElementById('full-name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                requestType: document.getElementById('request-type').value,
                message: document.getElementById('message').value,
                submitted: new Date().toISOString()
            };
            localStorage.setItem('bvn_contact', JSON.stringify(data));
            alert('Thank you for your message.');
        });
    }

});

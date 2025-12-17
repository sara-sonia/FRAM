const cartCountElem = document.querySelector('.cart-count');
let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
cartCountElem.textContent = cartCount;

const addButtons = document.querySelectorAll('.add-btn');
const modal = document.getElementById('quantity-modal');
const input = document.getElementById('quantity-input');
const cancelBtn = document.getElementById('modal-cancel');
const confirmBtn = document.getElementById('modal-confirm');

let currentButton = null;

// Keep track of focusable elements inside the modal
const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
let focusableElements = [];
let firstFocusable = null;
let lastFocusable = null;

// Open modal
addButtons.forEach(button => {
  button.addEventListener('click', () => {
    currentButton = button;
    input.value = 1;
    modal.style.display = 'flex';

    // Focus management
    focusableElements = Array.from(modal.querySelectorAll(focusableSelectors));
    firstFocusable = focusableElements[0];
    lastFocusable = focusableElements[focusableElements.length - 1];

    firstFocusable.focus();
  });
});

// Close modal helper
function closeModal() {
  modal.style.display = 'none';
  currentButton?.focus(); // return focus to the button that opened it
  currentButton = null;
}

// Cancel button
cancelBtn.addEventListener('click', closeModal);

// Confirm button
function confirmQuantity() {
  let quantity = parseInt(input.value);
  if (isNaN(quantity) || quantity < 1) quantity = 1;

  cartCount += quantity;
  cartCountElem.textContent = cartCount;
  localStorage.setItem('cartCount', cartCount);

  closeModal();
}

confirmBtn.addEventListener('click', confirmQuantity);

// Keyboard support inside modal
modal.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    e.preventDefault();
    closeModal();
  }
  if (e.key === 'Tab') {
    // Focus trap
    if (e.shiftKey) { // Shift + Tab
      if (document.activeElement === firstFocusable) {
        e.preventDefault();
        lastFocusable.focus();
      }
    } else { // Tab
      if (document.activeElement === lastFocusable) {
        e.preventDefault();
        firstFocusable.focus();
      }
    }
  }
  if (e.key === 'Enter') {
    if (document.activeElement === input) {
      e.preventDefault();
      confirmQuantity();
    }
  }
});

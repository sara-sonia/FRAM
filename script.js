document.addEventListener('DOMContentLoaded', () => {
  const menuBtn = document.querySelector('.menu-btn');
  const popoverMenu = document.getElementById('popoverMenu');
  const menuClose = document.querySelector('.menu-close');

  // Toggle menu on hamburger click
  menuBtn.addEventListener('click', () => {
    popoverMenu.classList.toggle('active');
  });

  // Close menu on X click
  menuClose.addEventListener('click', () => {
    popoverMenu.classList.remove('active');
  });
});
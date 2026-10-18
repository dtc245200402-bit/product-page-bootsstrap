(function () {
  'use strict';

  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  const colorButtons = document.querySelectorAll('.color-swatch');
  const selectedColor = document.getElementById('selectedColor');
  let currentColor = 'Midnight';

  colorButtons.forEach((button) => {
    button.addEventListener('click', () => {
      colorButtons.forEach((item) => {
        item.classList.remove('active');
        item.setAttribute('aria-pressed', 'false');
      });
      button.classList.add('active');
      button.setAttribute('aria-pressed', 'true');
      currentColor = button.dataset.color || 'Midnight';
      if (selectedColor) selectedColor.textContent = currentColor;
    });
  });

  const storageSelect = document.getElementById('storageSelect');
  const priceDisplay = document.getElementById('priceDisplay');
  const buyButton = document.getElementById('buyButton');
  const buyMessage = document.getElementById('buyMessage');
  const prices = { '256': 24990000, '512': 27990000 };

  function formatVnd(value) {
    return new Intl.NumberFormat('vi-VN').format(value) + '₫';
  }

  function updatePrice() {
    if (!storageSelect || !priceDisplay) return;
    priceDisplay.textContent = formatVnd(prices[storageSelect.value] || prices['256']);
  }

  if (storageSelect) storageSelect.addEventListener('change', updatePrice);
  if (buyButton) {
    buyButton.addEventListener('click', () => {
      if (!buyMessage || !storageSelect) return;
      const storage = storageSelect.value + ' GB';
      buyMessage.textContent = `Bạn đã chọn Nova X Pro màu ${currentColor}, dung lượng ${storage}. Đây là bản demo nên chưa tạo đơn hàng.`;
      buyMessage.classList.remove('d-none');
    });
  }

  colorButtons.forEach((button) => button.setAttribute('aria-pressed', button.classList.contains('active') ? 'true' : 'false'));
  updatePrice();
})();

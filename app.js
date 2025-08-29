// Simple catalog logic
const YEAR_EL = document.getElementById('year');
if (YEAR_EL) YEAR_EL.textContent = new Date().getFullYear();

const WA_NUMBER = '91XXXXXXXXXX'; // TODO: replace with your WhatsApp number (no +, only country code + number)

const products = [
  // Replace image paths with your own (e.g., 'assets/001.jpg')
  { id: 1, name: 'Classic Satin Corset', sku: 'UN-001', price: 1299, image: 'assets/001.jpg', featured: true },
  { id: 2, name: 'Lace-Up Crop Top', sku: 'UN-002', price: 899, image: 'assets/002.jpg', featured: true },
  { id: 3, name: 'Boned Corset Top', sku: 'UN-003', price: 1499, image: 'assets/003.jpg', featured: false },
  { id: 4, name: 'Sweetheart Bustier', sku: 'UN-004', price: 1199, image: 'assets/004.jpg', featured: false },
  { id: 5, name: 'Mesh Overlay Corset', sku: 'UN-005', price: 1399, image: 'assets/005.jpg', featured: false },
  { id: 6, name: 'Velvet Evening Corset', sku: 'UN-006', price: 1699, image: 'assets/006.jpg', featured: false },
];

const grid = document.getElementById('productGrid');
const searchInput = document.getElementById('searchInput');
const sortSelect = document.getElementById('sortSelect');

function render(list) {
  if (!grid) return;
  grid.innerHTML = '';
  list.forEach(p => {
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <div class="thumb">
        <img src="${p.image}" alt="${p.name}" onerror="this.src='assets/placeholder.jpg'">
      </div>
      <div class="content">
        <div class="row">
          <div class="title">${p.name}</div>
          <div class="price">₹${p.price}</div>
        </div>
        <div class="row">
          <div class="sku">SKU: ${p.sku}</div>
          <button class="btn btn-primary">Enquire</button>
        </div>
      </div>
    `;
    const btn = card.querySelector('button');
    btn.addEventListener('click', () => {
      const msg = encodeURIComponent(`Hi Unnati, I'm interested in ${p.name} (SKU: ${p.sku}) priced at ₹${p.price}.`);
      window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank');
    });
    grid.appendChild(card);
  });
}

function applyFilters() {
  const q = (searchInput?.value || '').toLowerCase().trim();
  let list = products.filter(p => !q || p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q));
  const sort = sortSelect?.value || 'featured';
  if (sort === 'priceAsc') list.sort((a,b) => a.price - b.price);
  if (sort === 'priceDesc') list.sort((a,b) => b.price - a.price);
  if (sort === 'nameAsc') list.sort((a,b) => a.name.localeCompare(b.name));
  if (sort === 'featured') list.sort((a,b) => (b.featured|0) - (a.featured|0));
  render(list);
}

searchInput?.addEventListener('input', applyFilters);
sortSelect?.addEventListener('change', applyFilters);

applyFilters();

// Mobile menu
const menuBtn = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
menuBtn?.addEventListener('click', () => {
  const shown = getComputedStyle(nav).display !== 'none';
  nav.style.display = shown ? 'none' : 'flex';
});

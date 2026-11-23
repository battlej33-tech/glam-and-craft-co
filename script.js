const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const menu = $('.menu-toggle');
if(menu) menu.addEventListener('click',()=>$('.navlinks')?.classList.toggle('open'));
const themeButton = $('#themeToggle');
if(themeButton) themeButton.addEventListener('click',()=>{
  document.body.classList.toggle('dark');
  themeButton.textContent = document.body.classList.contains('dark') ? '☀' : '☾';
});
const topButton = $('.top-button');
window.addEventListener('scroll',()=>{if(topButton) topButton.classList.toggle('show',window.scrollY>450)});
if(topButton) topButton.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));
$$('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());
const orderForm = $('#orderForm');
if(orderForm) orderForm.addEventListener('submit',e=>{
  e.preventDefault();
  const msg = $('#formMessage');
  if(msg) msg.textContent = 'Your form is filled out! This is a website preview: connect a business email or trusted form service before accepting real orders.';
  orderForm.reset();
});
const search = $('#siteSearch');
if(search) search.addEventListener('input',()=>{
  const term=search.value.toLowerCase();
  $$('.category-card').forEach(card=>card.style.display=card.innerText.toLowerCase().includes(term)?'':'none');
});

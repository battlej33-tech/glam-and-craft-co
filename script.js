const $ = (s, root = document) => root.querySelector(s);
const $$ = (s, root = document) => [...root.querySelectorAll(s)];

const menu = $('.menu-toggle');
if (menu) {
  menu.addEventListener('click', () => $('.navlinks')?.classList.toggle('open'));
}

const themeButton = $('#themeToggle');
if (themeButton) {
  themeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    themeButton.textContent = document.body.classList.contains('dark') ? '☀' : '☾';
  });
}

const topButton = $('.top-button');
window.addEventListener('scroll', () => {
  if (topButton) topButton.classList.toggle('show', window.scrollY > 450);
});
if (topButton) {
  topButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

$$('[data-year]').forEach(el => {
  el.textContent = new Date().getFullYear();
});

// EmailJS order-form connection
const orderForm = $('#orderForm');
if (orderForm) {
  const message = $('#formMessage');
  const submitButton = $('#orderSubmit');

  // This is the EmailJS Public Key (not a private key or password).
  const EMAILJS_PUBLIC_KEY = 'toNUBjEnCRZBxEpWs';
  const EMAILJS_SERVICE_ID = 'service_niuta7o';
  const EMAILJS_TEMPLATE_ID = 'template_0ow2tow';

  if (window.emailjs) {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  } else if (message) {
    message.textContent = 'The order form email service did not load. Please refresh the page and try again.';
  }

  orderForm.addEventListener('submit', async event => {
    event.preventDefault();

    if (!window.emailjs) {
      if (message) message.textContent = 'The email service is unavailable right now. Please try again later.';
      return;
    }

    if (!orderForm.reportValidity()) return;

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending request...';
    }
    if (message) message.textContent = 'Sending your order request...';

    try {
      await emailjs.sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, orderForm);
      if (message) {
        message.textContent = 'Thank you! Your order request was sent successfully. The GLAM & CRAFT CO. team will follow up by email. ♡';
      }
      orderForm.reset();
    } catch (error) {
      console.error('EmailJS order form error:', error);
      if (message) {
        message.textContent = 'Sorry, your request could not be sent. Please try again later or contact GLAM & CRAFT CO. directly.';
      }
    } finally {
      if (submitButton) {
        submitButton.disabled = false;
        submitButton.textContent = 'Submit order request ♡';
      }
    }
  });
}

const search = $('#siteSearch');
if (search) {
  search.addEventListener('input', () => {
    const term = search.value.toLowerCase();
    $$('.category-card').forEach(card => {
      card.style.display = card.innerText.toLowerCase().includes(term) ? '' : 'none';
    });
  });
}

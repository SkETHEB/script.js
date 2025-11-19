    const modeToggle = document.getElementById('modeToggle');
    const hamburger = document.getElementById('hamburger');
    const navList = document.getElementById('navList');
    const cartCountEl = document.getElementById('cart-count');
    const addBtns = document.querySelectorAll('.add-to-cart');
    const contactForm = document.getElementById('contactForm');
    const toast = document.getElementById('toast');

    if (modeToggle) {
      modeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        const dark = document.body.classList.contains('dark');
        modeToggle.textContent = dark ? '☀' : '🌙';
        modeToggle.setAttribute('aria-pressed', dark ? 'true' : 'false');
      });
    }

    if (hamburger && navList) {
      hamburger.addEventListener('click', () => {
        const isOpen = navList.classList.toggle('show');
        hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });

      document.addEventListener('click', (e) => {
        if (!navList.contains(e.target) && !hamburger.contains(e.target) && window.innerWidth <= 768) {
          navList.classList.remove('show');
          hamburger.setAttribute('aria-expanded', 'false');
        }
      });
    }

    let cartCount = 0;
    if (addBtns && cartCountEl) {
      addBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();
          cartCount++;
          cartCountEl.textContent = cartCount;
          const original = btn.textContent;

          btn.textContent = "Added ✅";
          btn.classList.add("added");
          btn.disabled = true;

          setTimeout(() => { btn.textContent = original; btn.disabled = false; }, 1200);
        });
      });
    }

    if (contactForm) {
      contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('name')?.value?.trim();
        const email = document.getElementById('email')?.value?.trim();
        const message = document.getElementById('message')?.value?.trim();
        if (!name || !email || !message) {
          showToast('Please fill in all fields.');
          return;
        }
 
        showToast('Thanks — message sent!');
        createConfetti(30);
        contactForm.reset();
      });
    }

    let toastTimer = null;
    function showToast(text = '', ms = 2500) {
      if (!toast) return;
      toast.textContent = text;
      toast.style.display = 'block';
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => toast.style.display = 'none', ms);
    }

    function createConfetti(count = 30) {
    for (let i = 0; i < count; i++) {
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = Math.random() * 100 + 'vw';
    c.style.background = `hsl(${Math.random() * 360}, 90%, 55%)`;
    c.style.width = (Math.random() * 8 + 4) + 'px';
    c.style.height = (Math.random() * 8 + 4) + 'px';
    c.style.animationDuration = (Math.random() * 2 + 2) + 's';
    c.style.animationDelay = Math.random() + 's';
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 4000);
  }
}

    window.addEventListener('load', () => { setTimeout(() => showToast('👋 Welcome — explore our collection!'), 600); });

    console.log('Site script initialized');
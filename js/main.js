document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav Toggle
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('open');
      
      // Update menu icon
      const svg = mobileToggle.querySelector('svg');
      if (svg) {
        if (navMenu.classList.contains('open')) {
          svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />';
        } else {
          svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
        }
      }
    });

    // Close menu when clicking links
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
        const svg = mobileToggle.querySelector('svg');
        if (svg) {
          svg.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />';
        }
      });
    });
  }

  // Active Link Tracker using Intersection Observer
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  };

  const observerCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, observerOptions);
  sections.forEach(section => observer.observe(section));

  // Header Scroll Shadow
  const header = document.querySelector('.header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.boxShadow = 'var(--shadow-sm)';
      header.style.backgroundColor = 'rgba(250, 251, 253, 0.95)';
    } else {
      header.style.boxShadow = 'none';
      header.style.backgroundColor = 'rgba(250, 251, 253, 0.9)';
    }
  });

  // Contact Form Submission (Simulated)
  const contactForm = document.getElementById('contact-form');
  const formMessage = document.getElementById('form-message');

  if (contactForm && formMessage) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Basic validation
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      
      // Visual feedback loading state
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      setTimeout(() => {
        submitBtn.textContent = 'Message Sent';
        formMessage.textContent = 'Thank you! Your message has been sent successfully. Ahemed will get back to you shortly.';
        formMessage.classList.add('success');
        
        contactForm.reset();
        
        setTimeout(() => {
          formMessage.style.display = 'none';
          formMessage.classList.remove('success');
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }, 5000);
      }, 1200);
    });
  }

});


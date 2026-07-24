
  // =====================
  // CANVAS PARTICLE BG
  // =====================
  (function () {
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];
    const PARTICLE_COUNT = 80;
    const MAX_DIST = 130;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function rnd(a, b) { return a + Math.random() * (b - a); }

    function createParticle() {
      return {
        x: rnd(0, W), y: rnd(0, H),
        r: rnd(0.8, 2.2),
        vx: rnd(-0.25, 0.25),
        vy: rnd(-0.25, 0.25),
        alpha: rnd(0.2, 0.7),
        color: Math.random() < 0.5 ? [108,99,255] : Math.random() < 0.5 ? [0,212,255] : [255,107,157]
      };
    }

    function init() {
      particles = Array.from({ length: PARTICLE_COUNT }, createParticle);
    }

    function draw() {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const a = (1 - dist / MAX_DIST) * 0.12;
            const [r, g, b] = particles[i].color;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      particles.forEach(p => {
        const [r, g, b] = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(' + r + ',' + g + ',' + b + ',' + p.alpha + ')';
        ctx.fill();
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
      });
      requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize, { passive: true });
    resize();
    init();
    draw();
  })();

  // =====================
  // NAVBAR SCROLL
  // =====================
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('back-to-top');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
      backToTop.classList.add('visible');
    } else {
      navbar.classList.remove('scrolled');
      backToTop.classList.remove('visible');
    }
  }, { passive: true });

  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // =====================
  // MOBILE MENU
  // =====================
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  hamburger.addEventListener('click', function () {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
  });

  mobileLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // =====================
  // TYPED TEXT EFFECT
  // =====================
  var phrases = ['Software Developer', 'Web Developer', 'Problem Solver', 'Creative Coder'];
  var phraseIndex = 0, charIndex = 0, deleting = false;
  var typedEl = document.getElementById('typed');

  function type() {
    var current = phrases[phraseIndex];
    if (!deleting) {
      typedEl.textContent = current.slice(0, charIndex + 1);
      charIndex++;
      if (charIndex === current.length) {
        deleting = true;
        setTimeout(type, 1800);
        return;
      }
    } else {
      typedEl.textContent = current.slice(0, charIndex - 1);
      charIndex--;
      if (charIndex === 0) {
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
    setTimeout(type, deleting ? 60 : 100);
  }
  type();

  // =====================
  // SCROLL REVEAL
  // =====================
  var revealEls = document.querySelectorAll('.reveal');
  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(function (el) { revealObserver.observe(el); });

  // =====================
  // SKILL BARS ANIMATION
  // =====================
  var skillBars = document.querySelectorAll('.skill-bar-fill');
  var barObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        var bar = entry.target;
        var w = parseFloat(bar.getAttribute('data-width'));
        bar.style.transform = 'scaleX(' + w + ')';
        barObserver.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });
  skillBars.forEach(function (bar) { barObserver.observe(bar); });

  // =====================
  // CONTACT FORM
  // =====================
  var form = document.getElementById('contact-form');
  var toast = document.getElementById('toast');
  var toastMsg = document.getElementById('toast-msg');
  var toastIcon = document.getElementById('toast-icon');
  var toastTimer;

  function showToast(msg, success) {
    toastMsg.textContent = msg;
    toast.style.borderColor = success ? 'var(--accent-green)' : 'var(--accent-tertiary)';
    toast.style.color = success ? 'var(--accent-green)' : 'var(--accent-tertiary)';
    toastIcon.textContent = success ? '\u2705' : '\u274C';
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove('show'); }, 3500);
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = document.getElementById('form-name').value.trim();
    var email = document.getElementById('form-email').value.trim();
    var subject = document.getElementById('form-subject').value.trim();
    var message = document.getElementById('form-message').value.trim();

    if (!name || !email || !subject || !message) {
      showToast('Please fill in all fields.', false);
      return;
    }
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      showToast('Please enter a valid email address.', false);
      return;
    }

    var btn = document.getElementById('form-submit-btn');
    btn.textContent = 'Opening email client...';
    btn.disabled = true;

    var mailtoLink = 'mailto:poojapal852746@gmail.com?subject=' +
      encodeURIComponent(subject) + '&body=' +
      encodeURIComponent('Name: ' + name + '\nEmail: ' + email + '\n\n' + message);
    window.location.href = mailtoLink;

    setTimeout(function () {
      btn.textContent = 'Send Message \uD83D\uDE80';
      btn.disabled = false;
      form.reset();
      showToast('Email client opened!', true);
    }, 1500);
  });

  // =====================
  // ACTIVE NAV HIGHLIGHT
  // =====================
  var sections = document.querySelectorAll('section[id]');
  var navAnchors = document.querySelectorAll('.nav-links a');

  var sectionObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        navAnchors.forEach(function (a) {
          a.style.color = '';
          if (a.getAttribute('href') === '#' + entry.target.id) {
            a.style.color = 'var(--accent-primary)';
          }
        });
      }
    });
  }, { threshold: 0.4 });
  sections.forEach(function (s) { sectionObserver.observe(s); });

  // =====================
  // CURSOR GLOW
  // =====================
  var glowBlob = document.createElement('div');
  glowBlob.style.cssText = 'position:fixed;pointer-events:none;z-index:1;width:350px;height:350px;border-radius:50%;background:radial-gradient(circle,rgba(108,99,255,0.06) 0%,transparent 70%);transform:translate(-50%,-50%);transition:left 0.15s ease,top 0.15s ease;left:-500px;top:-500px;';
  document.body.appendChild(glowBlob);

  document.addEventListener('mousemove', function (e) {
    glowBlob.style.left = e.clientX + 'px';
    glowBlob.style.top = e.clientY + 'px';
  });

  // =====================
  // CARD TILT EFFECT
  // =====================
  document.querySelectorAll('.project-card, .skill-card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;
      var cx = rect.width / 2;
      var cy = rect.height / 2;
      var rotX = ((y - cy) / cy) * -5;
      var rotY = ((x - cx) / cx) * 5;
      card.style.transform = 'translateY(-8px) perspective(600px) rotateX(' + rotX + 'deg) rotateY(' + rotY + 'deg) scale(1.02)';
    });
    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
    });
  });

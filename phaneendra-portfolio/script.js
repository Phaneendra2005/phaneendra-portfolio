// ============================================================
//  PHANEENDRA KANDURI — PORTFOLIO SCRIPTS
// ============================================================

// ── EMAILJS INIT ──
// IMPORTANT: Replace these with your actual EmailJS credentials
// Sign up free at https://emailjs.com → get your Service ID, Template ID, Public Key
const EMAILJS_SERVICE_ID  = 'service_2z33wwj';   // e.g. 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'template_8ubpsz2';  // e.g. 'template_xyz789'
const EMAILJS_PUBLIC_KEY  = 'n_4nGK3k2Ux1y6K-d';   // e.g. 'abc123XYZ'

emailjs.init(EMAILJS_PUBLIC_KEY);

// ── SEND EMAIL ──
function sendEmail() {
  const name    = document.getElementById('senderName').value.trim();
  const email   = document.getElementById('senderEmail').value.trim();
  const message = document.getElementById('senderMessage').value.trim();
  const alert   = document.getElementById('formAlert');
  const btn     = document.getElementById('sendBtn');

  // Validate
  if (!name || !email || !message) {
    showAlert('error', '⚠️ Please fill in all fields before sending.');
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    showAlert('error', '⚠️ Please enter a valid email address.');
    return;
  }

  btn.textContent = 'Sending...';
  btn.disabled = true;

  const templateParams = {
    from_name:    name,
    from_email:   email,
    message:      message,
    to_email:     'kphaneendra2005@gmail.com',
    reply_to:     email
  };

  emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
    .then(() => {
      showAlert('success', '✅ Message sent! Phaneendra will get back to you soon.');
      document.getElementById('senderName').value    = '';
      document.getElementById('senderEmail').value   = '';
      document.getElementById('senderMessage').value = '';
      btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
      btn.disabled = false;
    })
    .catch((err) => {
      console.error('EmailJS error:', err);
      showAlert('error', '❌ Failed to send. Please email directly: kphaneendra2005@gmail.com');
      btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
      btn.disabled = false;
    });
}

function showAlert(type, msg) {
  const alert = document.getElementById('formAlert');
  alert.textContent = msg;
  alert.className = 'form-alert ' + type;
  alert.style.display = 'block';
  setTimeout(() => { alert.style.display = 'none'; }, 6000);
}

// ── CERTIFICATE MODAL ──
function openCertModal(url) {
  document.getElementById('certFrame').src = url;
  document.getElementById('certModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeCertModal() {
  document.getElementById('certModal').classList.remove('active');
  document.getElementById('certFrame').src = '';
  document.body.style.overflow = '';
}

// Close modal on ESC
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeCertModal();
});

// ── NAVBAR SCROLL ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ── MOBILE MENU ──
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('mobileMenu').classList.toggle('open');
});
function closeMobile() {
  document.getElementById('mobileMenu').classList.remove('open');
}

// ── TYPING EFFECT ──
const phrases = [
  'Building secure, intelligent systems.',
  'ML Engineer | 99.9% Phishing Accuracy.',
  'Full Stack Developer | React & Node.js.',
  'Cybersecurity Researcher & Builder.',
  'Turning data into impactful solutions.'
];
let phraseIndex = 0, charIndex = 0, isDeleting = false;
const typingEl = document.getElementById('typingText');

function typeEffect() {
  const current = phrases[phraseIndex];
  typingEl.textContent = isDeleting
    ? current.substring(0, charIndex - 1)
    : current.substring(0, charIndex + 1);
  isDeleting ? charIndex-- : charIndex++;
  let speed = isDeleting ? 40 : 70;
  if (!isDeleting && charIndex === current.length) { speed = 2000; isDeleting = true; }
  else if (isDeleting && charIndex === 0) { isDeleting = false; phraseIndex = (phraseIndex + 1) % phrases.length; speed = 400; }
  setTimeout(typeEffect, speed);
}
setTimeout(typeEffect, 1500);

// ── PARTICLE BACKGROUND ──
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() { this.reset(); }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.3;
    this.speedX = (Math.random() - 0.5) * 0.4;
    this.speedY = (Math.random() - 0.5) * 0.4;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.color = Math.random() > 0.5 ? '0, 245, 255' : '176, 68, 255';
  }
  update() {
    this.x += this.speedX; this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) this.reset();
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
    ctx.fill();
  }
}

for (let i = 0; i < 80; i++) particles.push(new Particle());

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(0, 245, 255, ${0.06 * (1 - dist / 120)})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ── ACTIVE NAV ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(s => { if (window.scrollY >= s.offsetTop - 120) current = s.id; });
  navLinks.forEach(link => {
    link.style.color = link.getAttribute('href') === `#${current}` ? 'var(--cyan)' : '';
  });
});

// ── SMOOTH SCROLL ──
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ── CUSTOM CURSOR (desktop) ──
if (window.innerWidth > 768) {
  const cursor = document.createElement('div');
  cursor.style.cssText = `position:fixed;width:20px;height:20px;border-radius:50%;background:rgba(0,245,255,0.15);border:1px solid rgba(0,245,255,0.4);pointer-events:none;z-index:9999;transform:translate(-50%,-50%);transition:width 0.3s,height 0.3s;`;
  document.body.appendChild(cursor);
  document.addEventListener('mousemove', e => { cursor.style.left = e.clientX + 'px'; cursor.style.top = e.clientY + 'px'; });
  document.querySelectorAll('a,button,.glass-card').forEach(el => {
    el.addEventListener('mouseenter', () => { cursor.style.width = '40px'; cursor.style.height = '40px'; });
    el.addEventListener('mouseleave', () => { cursor.style.width = '20px'; cursor.style.height = '20px'; });
  });
}

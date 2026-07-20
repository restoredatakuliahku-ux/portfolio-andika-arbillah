// Drag-to-scroll tech stack rows
document.querySelectorAll('.techstack-scroll').forEach(el => {
  let isDown = false, startX, scrollLeft;
  el.addEventListener('mousedown', e => {
    isDown = true;
    startX = e.pageX - el.offsetLeft;
    scrollLeft = el.scrollLeft;
  });
  el.addEventListener('mouseleave', () => isDown = false);
  el.addEventListener('mouseup', () => isDown = false);
  el.addEventListener('mousemove', e => {
    if (!isDown) return;
    e.preventDefault();
    el.scrollLeft = scrollLeft - (e.pageX - el.offsetLeft - startX);
  });
});

// Auto-scroll tech stack rows
document.querySelectorAll('.techstack-scroll').forEach(el => {
  let paused = false;
  let speed = 0.6;

  // Clone badges untuk infinite loop
  const clone = el.innerHTML;
  el.innerHTML = clone + clone;

  let pos = 0;
  const half = el.scrollWidth / 2;

  function autoScroll() {
    if (!paused) {
      pos += speed;
      if (pos >= half) pos = 0;
      el.scrollLeft = pos;
    }
    requestAnimationFrame(autoScroll);
  }

  el.addEventListener('mouseenter', () => paused = true);
  el.addEventListener('mouseleave', () => paused = false);
  el.addEventListener('touchstart', () => paused = true, { passive: true });
  el.addEventListener('touchend', () => setTimeout(() => paused = false, 2000));

  requestAnimationFrame(autoScroll);
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.reveal, .timeline-item').forEach(el => observer.observe(el));

// Navbar scroll effect
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.navbar');
  nav.style.padding = window.scrollY > 50 ? '.5rem 0' : '1rem 0';
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 100;
  sections.forEach(sec => {
    const top = sec.offsetTop, height = sec.offsetHeight;
    const id = sec.getAttribute('id');
    const link = document.querySelector(`.nav-link[href="#${id}"]`);
    if (link) {
      link.classList.toggle('active', scrollY >= top && scrollY < top + height);
    }
  });
});

// Smooth close mobile menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    const collapse = document.querySelector('.navbar-collapse');
    if (collapse.classList.contains('show')) {
      bootstrap.Collapse.getInstance(collapse)?.hide();
    }
  });
});

// Typed effect for hero subtitle
const roles = ['Full-Stack Developer', 'Network Technician', 'Laravel Developer', 'React Developer', 'IT Enthusiast'];
let ri = 0, ci = 0, deleting = false;
const typedEl = document.getElementById('typed');

function type() {
  if (!typedEl) return;
  const current = roles[ri];
  typedEl.textContent = deleting ? current.slice(0, ci--) : current.slice(0, ci++);
  if (!deleting && ci > current.length) { deleting = true; setTimeout(type, 1500); return; }
  if (deleting && ci < 0) { deleting = false; ri = (ri + 1) % roles.length; }
  setTimeout(type, deleting ? 60 : 100);
}
type();
// Loading screen
window.addEventListener('load', () => {
  setTimeout(() => {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
      loadingScreen.classList.add('hidden');
    }
  }, 1500);
});

// Scroll progress bar
const scrollProgress = document.getElementById('scrollProgress');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  scrollProgress.style.width = scrollPercent + '%';
});

// Back to top button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// Mobile navigation toggle
const navMenuToggle = document.getElementById('navMenuToggle');
const navLinks = document.getElementById('navLinks');

navMenuToggle.addEventListener('click', () => {
  navMenuToggle.classList.toggle('active');
  navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navMenuToggle.classList.remove('active');
    navLinks.classList.remove('active');
  });
});

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, (i % 4) * 80);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

reveals.forEach(el => observer.observe(el));

// Typing effect in terminal - infinite loop
const terminalLines = document.querySelectorAll('.t-cmd');
terminalLines.forEach(line => {
  const originalText = line.textContent;
  let isTyping = false;
  
  function typeText() {
    if (isTyping) return;
    isTyping = true;
    line.textContent = '';
    let i = 0;
    
    const typingInterval = setInterval(() => {
      if (i < originalText.length) {
        line.textContent += originalText[i++];
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          isTyping = false;
        }, 1000); // Wait 1 seconds before restarting
      }
    }, 60);
  }
  
  const tObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { 
      // Start infinite loop when visible
      typeText();
      const loopInterval = setInterval(() => {
        typeText();
      }, 1000); // Restart every 1000ms
      tObs.disconnect();
    }
  });
  tObs.observe(line);
});

// Typing effect for section titles
const sectionTitles = document.querySelectorAll('.section-title');
sectionTitles.forEach(title => {
  const originalText = title.textContent;
  
  const titleObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      title.textContent = '';
      let i = 0;
      const typingInterval = setInterval(() => {
        if (i < originalText.length) {
          title.textContent += originalText[i++];
        } else {
          clearInterval(typingInterval);
        }
      }, 50);
      titleObs.unobserve(title);
    }
  }, { threshold: 0.5 });
  titleObs.observe(title);
});

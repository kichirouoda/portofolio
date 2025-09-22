// navbar.js - Enhanced version with backdrop
class ResponsiveNavbar {
  constructor() {
      this.mobileMenuToggle = document.getElementById('mobileMenuToggle');
      this.mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
      this.body = document.body;
      this.backdrop = null;
      
      this.init();
  }

  init() {
      // Create backdrop element
      this.createBackdrop();
      
      // Toggle mobile menu
      this.mobileMenuToggle?.addEventListener('click', () => this.toggleMobileMenu());
      
      // Close menu when clicking backdrop
      this.backdrop?.addEventListener('click', () => this.closeMobileMenu());
      
      // Close menu when clicking on links
      const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
      mobileNavLinks.forEach(link => {
          link.addEventListener('click', () => this.closeMobileMenu());
      });
      
      // Handle window resize
      window.addEventListener('resize', () => {
          if (window.innerWidth > 768) {
              this.closeMobileMenu();
          }
      });
      
      // Handle escape key
      document.addEventListener('keydown', (e) => {
          if (e.key === 'Escape') {
              this.closeMobileMenu();
          }
      });
      
      // Set active menu item
      this.setActiveMenuItem();
      
      // Navbar scroll effect
      this.handleNavbarScroll();
  }

  createBackdrop() {
      this.backdrop = document.createElement('div');
      this.backdrop.className = 'mobile-menu-backdrop';
      this.backdrop.id = 'mobileMenuBackdrop';
      document.body.appendChild(this.backdrop);
  }

  toggleMobileMenu() {
      const isActive = this.mobileMenuToggle.classList.contains('active');
      
      if (isActive) {
          this.closeMobileMenu();
      } else {
          this.openMobileMenu();
      }
  }

  openMobileMenu() {
      this.mobileMenuToggle.classList.add('active');
      this.mobileMenuOverlay.classList.add('active');
      this.backdrop.classList.add('active');
      this.body.classList.add('menu-open');
      
      // Focus trap for accessibility
      const firstFocusable = this.mobileMenuOverlay.querySelector('a');
      if (firstFocusable) {
          setTimeout(() => firstFocusable.focus(), 300);
      }
  }

  closeMobileMenu() {
      this.mobileMenuToggle.classList.remove('active');
      this.mobileMenuOverlay.classList.remove('active');
      this.backdrop.classList.remove('active');
      this.body.classList.remove('menu-open');
      
      // Return focus to toggle button
      this.mobileMenuToggle.focus();
  }

  setActiveMenuItem() {
      // Get current page from URL
      const currentPage = window.location.pathname.split('/').pop().replace('.html', '') || 'index';
      const pageMap = {
          'index': 'home',
          '': 'home'
      };
      
      const activePage = pageMap[currentPage] || currentPage;
      
      // Remove all active classes
      document.querySelectorAll('.nav-link').forEach(link => {
          link.classList.remove('active');
      });
      
      // Add active class to current page
      document.querySelectorAll(`[data-page="${activePage}"]`).forEach(link => {
          link.classList.add('active');
      });
  }

  handleNavbarScroll() {
      const navbar = document.querySelector('.navbar');
      let lastScrollY = window.scrollY;
      
      window.addEventListener('scroll', () => {
          const currentScrollY = window.scrollY;
          
          if (currentScrollY > 50) {
              navbar.style.background = 'rgba(255, 255, 255, 0.98)';
              navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
          } else {
              navbar.style.background = 'rgba(255, 255, 255, 0.95)';
              navbar.style.boxShadow = 'none';
          }
          
          // Auto-hide navbar on scroll down (optional)
          if (currentScrollY > lastScrollY && currentScrollY > 100) {
              navbar.style.transform = 'translateY(-100%)';
          } else {
              navbar.style.transform = 'translateY(0)';
          }
          
          lastScrollY = currentScrollY;
      });
  }
}

// Function to load navbar
function loadNavbar() {
  return fetch('navbar.html')
      .then(response => {
          if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.text();
      })
      .then(data => {
          document.getElementById('navbar-container').innerHTML = data;
          new ResponsiveNavbar();
          console.log('🚀 Enhanced Navbar loaded successfully!');
      })
      .catch(error => {
          console.error('Error loading navbar:', error);
          if (window.location.protocol === 'file:') {
              console.warn('⚠️ Running locally, navbar may not load. Use localhost or GitHub Pages.');
          }
      });
}

// Auto initialize if navbar elements exist
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('mobileMenuToggle')) {
      new ResponsiveNavbar();
      console.log('🚀 Enhanced Responsive Navbar initialized!');
  }
});
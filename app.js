// Adrenaline Arena JavaScript Application

// Application Data
const appData = {
  activities: [
    {
      id: "paintball",
      name: "Paintball",
      description: "Experience intense tactical combat in our professional paintball arena with multiple themed battlefields and top-quality equipment.",
      image: "paintball.jpg",
      duration: "2-3 hours",
      minAge: "12+",
      maxPlayers: "20",
      price: "$35",
      features: ["Professional equipment", "Multiple arenas", "Safety briefing", "Protective gear included"]
    },
    {
      id: "airsoft",
      name: "Airsoft Shooting",
      description: "Engage in realistic military-style scenarios with authentic airsoft replicas in our climate-controlled indoor facility.",
      image: "airsoft.jpg",
      duration: "2-4 hours",
      minAge: "14+",
      maxPlayers: "16",
      price: "$40",
      features: ["Military-grade equipment", "Tactical scenarios", "Professional instruction", "Full-face protection"]
    },
    {
      id: "karting",
      name: "Go-Karting",
      description: "Race at high speeds on our professionally designed track with powerful electric karts and advanced timing systems.",
      image: "go-karting0.jpg",
      duration: "30-60 minutes",
      minAge: "10+",
      maxPlayers: "12",
      price: "$25",
      features: ["Electric karts", "Timing system", "Safety barriers", "Racing suits provided"]
    },
    {
      id: "lasertag",
      name: "Laser Tag",
      description: "Battle in our multi-level laser tag arena featuring fog effects, neon lighting, and strategic obstacles.",
      image: "laser tag.jpg",
      duration: "1-2 hours",
      minAge: "8+",
      maxPlayers: "24",
      price: "$20",
      features: ["Multi-level arena", "Special effects", "Team battles", "High-tech equipment"]
    },
    {
      id: "vr",
      name: "VR Experience",
      description: "Immerse yourself in virtual worlds with our cutting-edge VR technology and multiplayer experiences.",
      image: "vr-exp.jpg",
      duration: "30-90 minutes",
      minAge: "10+",
      maxPlayers: "8",
      price: "$30",
      features: ["Latest VR headsets", "Multiplayer games", "Various experiences", "Motion tracking"]
    }
  ],
  packages: [
    {
      name: "Basic Package",
      price: "$25",
      priceValue: 25,
      duration: "2 hours",
      includes: ["1 activity", "Basic equipment", "Safety briefing"],
      popular: false
    },
    {
      name: "Premium Package",
      price: "$45",
      priceValue: 45,
      duration: "4 hours",
      includes: ["2 activities", "Premium equipment", "Safety briefing", "Refreshments"],
      popular: true
    },
    {
      name: "Corporate Package",
      price: "$75",
      priceValue: 75,
      duration: "6 hours",
      includes: ["3 activities", "Premium equipment", "Catering", "Private area", "Team building activities"],
      popular: false
    }
  ],
  testimonials: [
    {
      name: "Sarah Johnson",
      text: "Amazing experience! The paintball arena was incredible and the staff was very professional. Perfect for our team building event.",
      rating: 5,
      activity: "Paintball"
    },
    {
      name: "Mike Chen",
      text: "The go-karting track is fantastic! Great safety measures and the electric karts are really fast. Will definitely come back!",
      rating: 5,
      activity: "Go-Karting"
    },
    {
      name: "Emily Rodriguez",
      text: "VR experience was mind-blowing! The graphics were amazing and the multiplayer games were so much fun with friends.",
      rating: 5,
      activity: "VR Experience"
    }
  ],
  galleryImages: [
    { src: "paintball.jpg", category: "paintball", alt: "Paintball arena action" },
    { src: "Airsoft equipment.jpg", category: "airsoft", alt: "Airsoft equipment" },
    { src: "go-karting.jpg", category: "karting", alt: "Go-kart racing" },
    { src: "go-karting3.jpg", category: "karting", alt: "Go-kart racing" },
    { src: "VR gaming area.jpg", category: "facilities", alt: "VR gaming area" },
    { src: "Paintball team strategy.jpg", category: "paintball", alt: "Paintball team strategy" },
    { src: "Airsoft tactical gear.jpg", category: "airsoft", alt: "Airsoft tactical gear" },
    { src: "go-karting2.jpg", category: "karting", alt: "Racing track overview" },
    { src: "Gaming lounge.jpg", category: "facilities", alt: "Gaming lounge" }
  ]
};

// Application Class
class AdrenalineArenaApp {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.loadContent();
    this.setupSmoothScrolling();
    this.setupAnimations();
    this.setMinDate();
  }

  setupEventListeners() {
    // Navigation
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
      });
    }

    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (navToggle && navMenu) {
          navToggle.classList.remove('active');
          navMenu.classList.remove('active');
        }
      });
    });

    // Gallery tabs
    document.querySelectorAll('.gallery-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        const category = e.target.dataset.category;
        this.filterGallery(category);
        
        // Update active tab
        document.querySelectorAll('.gallery-tab').forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
      });
    });

    // Booking form
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
      bookingForm.addEventListener('submit', (e) => this.handleBookingSubmit(e));
    }

    // Contact form
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => this.handleContactSubmit(e));
    }

    // Price calculation
    const priceInputs = ['activity-select', 'package-select', 'participants'];
    priceInputs.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.addEventListener('change', () => this.calculatePrice());
        element.addEventListener('input', () => this.calculatePrice());
      }
    });

    // Modal
    const modal = document.getElementById('gallery-modal');
    const modalClose = document.getElementById('modal-close');
    const modalOverlay = document.getElementById('modal-overlay');

    if (modalClose) {
      modalClose.addEventListener('click', () => this.closeModal());
    }
    if (modalOverlay) {
      modalOverlay.addEventListener('click', () => this.closeModal());
    }

    // Navbar scroll effect
    window.addEventListener('scroll', () => this.handleNavbarScroll());
  }

  loadContent() {
    this.loadActivities();
    this.loadPackages();
    this.loadTestimonials();
    this.loadGallery();
    this.loadBookingOptions();
  }

  loadActivities() {
    const container = document.getElementById('activities-grid');
    if (!container) return;

    container.innerHTML = appData.activities.map(activity => `
      <div class="activity-card animate-on-scroll">
        <div class="activity-image" style="background-image: url('${activity.image}'); background-size: cover; background-position: center; background-color: #333;">
          <div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; color: white; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.8);">
            ${activity.name}
          </div>
        </div>
        <h3>${activity.name}</h3>
        <p>${activity.description}</p>
        <div class="activity-details">
          <div class="activity-detail">
            <span>Duration:</span>
            <strong>${activity.duration}</strong>
          </div>
          <div class="activity-detail">
            <span>Min Age:</span>
            <strong>${activity.minAge}</strong>
          </div>
          <div class="activity-detail">
            <span>Max Players:</span>
            <strong>${activity.maxPlayers}</strong>
          </div>
          <div class="activity-detail">
            <span>Starting at:</span>
            <strong>${activity.price}</strong>
          </div>
        </div>
        <ul class="activity-features">
          ${activity.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
        <div class="activity-price">${activity.price}</div>
      </div>
    `).join('');
  }

  loadPackages() {
    const container = document.getElementById('packages-grid');
    if (!container) return;

    container.innerHTML = appData.packages.map(pkg => `
      <div class="package-card ${pkg.popular ? 'popular' : ''} animate-on-scroll">
        <h3 class="package-name">${pkg.name}</h3>
        <div class="package-price">${pkg.price}</div>
        <div class="package-duration">${pkg.duration}</div>
        <ul class="package-includes">
          ${pkg.includes.map(item => `<li>${item}</li>`).join('')}
        </ul>
        <a href="#booking" class="btn btn--accent btn--full-width">Choose Package</a>
      </div>
    `).join('');
  }

  loadTestimonials() {
    const container = document.getElementById('testimonials-slider');
    if (!container) return;

    container.innerHTML = appData.testimonials.map(testimonial => `
      <div class="testimonial-card animate-on-scroll">
        <div class="rating">
          ${Array.from({length: testimonial.rating}, () => '<span class="star">★</span>').join('')}
        </div>
        <p class="testimonial-text">"${testimonial.text}"</p>
        <div class="testimonial-author">${testimonial.name}</div>
        <div class="testimonial-activity">${testimonial.activity}</div>
      </div>
    `).join('');
  }

  loadGallery() {
    const container = document.getElementById('gallery-grid');
    if (!container) return;

    container.innerHTML = appData.galleryImages.map((image, index) => `
      <div class="gallery-item animate-on-scroll" 
           data-category="${image.category}" 
           data-src="${image.src}"
           data-alt="${image.alt}"
           style="background-image: url('${image.src}'); background-size: cover; background-position: center; background-color: #444;"
           onclick="app.openModal('${image.src}', '${image.alt}')">
        <div style="display: flex; align-items: center; justify-content: center; width: 100%; height: 100%; background: rgba(0,0,0,0.3); color: white; font-weight: bold; opacity: 0; transition: opacity 0.3s;" 
             onmouseover="this.style.opacity='1'" 
             onmouseout="this.style.opacity='0'">
          ${image.alt}
        </div>
      </div>
    `).join('');
  }

  loadBookingOptions() {
    const activitySelect = document.getElementById('activity-select');
    const packageSelect = document.getElementById('package-select');

    if (activitySelect) {
      activitySelect.innerHTML = '<option value="">Select Activity</option>' +
        appData.activities.map(activity => 
          `<option value="${activity.id}" data-price="${activity.price.replace('$', '')}">${activity.name} - ${activity.price}</option>`
        ).join('');
    }

    if (packageSelect) {
      packageSelect.innerHTML = '<option value="">Select Package</option>' +
        appData.packages.map(pkg => 
          `<option value="${pkg.name}" data-price="${pkg.priceValue}">${pkg.name} - ${pkg.price}</option>`
        ).join('');
    }
  }

  filterGallery(category) {
    const items = document.querySelectorAll('.gallery-item');
    
    items.forEach(item => {
      if (category === 'all' || item.dataset.category === category) {
        item.style.display = 'flex';
      } else {
        item.style.display = 'none';
      }
    });
  }

  calculatePrice() {
    const activitySelect = document.getElementById('activity-select');
    const packageSelect = document.getElementById('package-select');
    const participantsInput = document.getElementById('participants');
    const priceDisplay = document.getElementById('total-price');

    if (!activitySelect || !packageSelect || !participantsInput || !priceDisplay) return;

    const selectedPackage = packageSelect.selectedOptions[0];
    const participants = parseInt(participantsInput.value) || 0;

    let totalPrice = 0;

    if (selectedPackage && participants > 0) {
      const basePrice = parseInt(selectedPackage.dataset.price) || 0;
      totalPrice = basePrice * participants;
    }

    priceDisplay.textContent = `$${totalPrice}`;
  }

  openModal(src, alt) {
    const modal = document.getElementById('gallery-modal');
    const modalImage = document.getElementById('modal-image');
    
    if (modal && modalImage) {
      modalImage.src = src;
      modalImage.alt = alt;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  closeModal() {
    const modal = document.getElementById('gallery-modal');
    if (modal) {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    }
  }

  handleBookingSubmit(e) {
    e.preventDefault();
    
    const bookingData = {
      activity: document.getElementById('activity-select')?.value || '',
      package: document.getElementById('package-select')?.value || '',
      date: document.getElementById('booking-date')?.value || '',
      time: document.getElementById('booking-time')?.value || '',
      participants: document.getElementById('participants')?.value || '',
      name: document.getElementById('customer-name')?.value || '',
      email: document.getElementById('customer-email')?.value || '',
      phone: document.getElementById('customer-phone')?.value || '',
      requirements: document.getElementById('special-requirements')?.value || '',
      totalPrice: document.getElementById('total-price')?.textContent || '$0'
    };

    // Validate required fields
    const requiredFields = [
      { field: 'activity', element: 'activity-select', name: 'Activity' },
      { field: 'package', element: 'package-select', name: 'Package' },
      { field: 'date', element: 'booking-date', name: 'Date' },
      { field: 'time', element: 'booking-time', name: 'Time' },
      { field: 'participants', element: 'participants', name: 'Participants' },
      { field: 'name', element: 'customer-name', name: 'Name' },
      { field: 'email', element: 'customer-email', name: 'Email' },
      { field: 'phone', element: 'customer-phone', name: 'Phone' }
    ];

    let isValid = true;
    let errors = [];

    requiredFields.forEach(({ field, element, name }) => {
      if (!bookingData[field]) {
        isValid = false;
        errors.push(name);
        const el = document.getElementById(element);
        if (el) {
          el.style.borderColor = 'var(--color-error)';
          setTimeout(() => {
            el.style.borderColor = '';
          }, 3000);
        }
      }
    });

    // Validate email format
    if (bookingData.email && !this.validateEmail(bookingData.email)) {
      isValid = false;
      errors.push('Valid Email');
      const emailEl = document.getElementById('customer-email');
      if (emailEl) {
        emailEl.style.borderColor = 'var(--color-error)';
        setTimeout(() => {
          emailEl.style.borderColor = '';
        }, 3000);
      }
    }

    if (isValid) {
      // Get activity and package names for display
      const activityName = document.getElementById('activity-select')?.selectedOptions[0]?.text?.split(' - ')[0] || bookingData.activity;
      const packageName = bookingData.package;
      
      alert(`🎯 Booking Confirmed!\n\n` +
            `Activity: ${activityName}\n` +
            `Package: ${packageName}\n` +
            `Date: ${bookingData.date}\n` +
            `Time: ${bookingData.time}\n` +
            `Participants: ${bookingData.participants}\n` +
            `Total: ${bookingData.totalPrice}\n\n` +
            `Confirmation details will be sent to:\n${bookingData.email}\n\n` +
            `Thank you for choosing Adrenaline Arena!`);
      
      e.target.reset();
      document.getElementById('total-price').textContent = '$0';
    } else {
      alert(`Please fill in the following required fields:\n• ${errors.join('\n• ')}`);
    }
  }

  handleContactSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    
    // Simple validation
    const name = form.querySelector('input[type="text"]')?.value;
    const email = form.querySelector('input[type="email"]')?.value;
    const subject = form.querySelector('input[type="text"]:nth-of-type(2)')?.value;
    const message = form.querySelector('textarea')?.value;
    
    if (name && email && subject && message) {
      alert(`Thank you ${name}!\n\nYour message has been received. We'll get back to you at ${email} within 24 hours.`);
      form.reset();
    } else {
      alert('Please fill in all required fields.');
    }
  }

  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          const offsetTop = target.offsetTop - 80; // Account for fixed navbar
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  setupAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    // Observe elements after they're loaded
    setTimeout(() => {
      document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
      });
    }, 100);
  }

  handleNavbarScroll() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.style.background = 'rgba(26, 26, 26, 0.98)';
        navbar.style.backdropFilter = 'blur(15px)';
      } else {
        navbar.style.background = 'rgba(26, 26, 26, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
      }
    }
  }

  setMinDate() {
    const dateInput = document.getElementById('booking-date');
    if (dateInput) {
      const today = new Date().toISOString().split('T')[0];
      dateInput.min = today;
    }
  }
}

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.app = new AdrenalineArenaApp();
  console.log('🎯 Adrenaline Arena loaded successfully!');
});

// Handle window resize
window.addEventListener('resize', () => {
  const navMenu = document.getElementById('nav-menu');
  const navToggle = document.getElementById('nav-toggle');
  
  if (window.innerWidth > 768 && navMenu && navToggle) {
    navMenu.classList.remove('active');
    navToggle.classList.remove('active');
  }
});

// Keyboard navigation for accessibility
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const modal = document.getElementById('gallery-modal');
    if (modal?.classList.contains('active')) {
      window.app?.closeModal();
    }
    
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    if (navMenu?.classList.contains('active') && navToggle) {
      navMenu.classList.remove('active');
      navToggle.classList.remove('active');
    }
  }
});

// Console welcome message
console.log('%c🎯 Welcome to Adrenaline Arena!', 'color: #ff6b35; font-size: 24px; font-weight: bold;');
console.log('%cWhere Adventure Meets Adrenaline', 'color: #ff6b35; font-size: 16px;');
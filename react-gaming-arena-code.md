# React Gaming Arena Website Code Structure

This document provides the React code structure for the gaming arena website. It's organized by components and follows modern React best practices.

## Project Structure

```
gaming-arena/
├── public/
│   ├── index.html
│   ├── favicon.ico
│   └── images/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.js
│   │   │   ├── Footer.js
│   │   │   └── Layout.js
│   │   ├── home/
│   │   │   ├── Hero.js
│   │   │   ├── ActivityPreview.js
│   │   │   ├── PackageCard.js
│   │   │   └── Testimonial.js
│   │   ├── activities/
│   │   │   ├── ActivitiesSection.js
│   │   │   └── ActivityCard.js
│   │   ├── booking/
│   │   │   ├── BookingForm.js
│   │   │   └── PricingCalculator.js
│   │   ├── gallery/
│   │   │   ├── Gallery.js
│   │   │   └── ImageModal.js
│   │   ├── about/
│   │   │   ├── AboutSection.js
│   │   │   └── TeamMember.js
│   │   └── contact/
│   │       ├── ContactForm.js
│   │       └── Map.js
│   ├── pages/
│   │   ├── Home.js
│   │   ├── Activities.js
│   │   ├── Booking.js
│   │   ├── Gallery.js
│   │   ├── About.js
│   │   └── Contact.js
│   ├── context/
│   │   └── BookingContext.js
│   ├── hooks/
│   │   └── useBookingCalculator.js
│   ├── data/
│   │   ├── activities.js
│   │   ├── packages.js
│   │   └── testimonials.js
│   ├── utils/
│   │   ├── validation.js
│   │   └── formatting.js
│   ├── styles/
│   │   ├── global.css
│   │   └── components/
│   ├── App.js
│   └── index.js
└── package.json
```

## Key Component Files

### App.js

```jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookingProvider } from './context/BookingContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Activities from './pages/Activities';
import Booking from './pages/Booking';
import Gallery from './pages/Gallery';
import About from './pages/About';
import Contact from './pages/Contact';
import './styles/global.css';

function App() {
  return (
    <BookingProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Layout>
      </Router>
    </BookingProvider>
  );
}

export default App;
```

### Navbar.js

```jsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../../styles/components/navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="container">
        <div className="navbar__brand">
          <Link to="/">Adrenaline Arena</Link>
        </div>
        <div className={`navbar__menu ${isOpen ? 'navbar__menu--active' : ''}`}>
          <Link to="/" className="navbar__link">Home</Link>
          <Link to="/activities" className="navbar__link">Activities</Link>
          <Link to="/booking" className="navbar__link">Booking</Link>
          <Link to="/gallery" className="navbar__link">Gallery</Link>
          <Link to="/about" className="navbar__link">About</Link>
          <Link to="/contact" className="navbar__link">Contact</Link>
        </div>
        <div className="navbar__toggle" onClick={toggleMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
```

### Hero.js

```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/components/hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero__overlay"></div>
      <div className="hero__content">
        <h1>Where Adventure Meets Adrenaline</h1>
        <p>Experience the ultimate thrill with paintball, airsoft, go-karting, laser tag, and VR adventures at our state-of-the-art gaming arena.</p>
        <div className="hero__buttons">
          <Link to="/booking" className="btn btn--primary btn--lg">Book Now</Link>
          <Link to="/activities" className="btn btn--outline btn--lg">Explore Activities</Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
```

### ActivityCard.js

```jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/components/activity-card.css';

const ActivityCard = ({ activity }) => {
  const { id, name, description, image, duration, minAge, price, features } = activity;

  return (
    <div className="activity-card">
      <div className="activity-card__image">
        <img src={image} alt={name} />
      </div>
      <div className="activity-card__content">
        <h3 className="activity-card__title">{name}</h3>
        <p className="activity-card__description">{description}</p>
        <div className="activity-card__details">
          <div className="activity-card__detail">
            <span className="activity-card__detail-label">Duration:</span>
            <span className="activity-card__detail-value">{duration}</span>
          </div>
          <div className="activity-card__detail">
            <span className="activity-card__detail-label">Age:</span>
            <span className="activity-card__detail-value">{minAge}</span>
          </div>
          <div className="activity-card__detail">
            <span className="activity-card__detail-label">Price:</span>
            <span className="activity-card__detail-value">{price}</span>
          </div>
        </div>
        <ul className="activity-card__features">
          {features.map((feature, index) => (
            <li key={index} className="activity-card__feature">
              <span className="icon">✓</span> {feature}
            </li>
          ))}
        </ul>
        <Link to={`/booking?activity=${id}`} className="btn btn--primary btn--full">
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default ActivityCard;
```

### BookingForm.js

```jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useBooking } from '../../context/BookingContext';
import { useBookingCalculator } from '../../hooks/useBookingCalculator';
import '../../styles/components/booking-form.css';

const BookingForm = () => {
  const location = useLocation();
  const { activities, packages } = useBooking();
  const [formData, setFormData] = useState({
    activity: '',
    date: '',
    time: '',
    participants: 1,
    package: 'basic',
    name: '',
    email: '',
    phone: '',
    specialRequirements: ''
  });
  const { calculatePrice, totalPrice } = useBookingCalculator();

  useEffect(() => {
    // Parse URL params to pre-select activity
    const params = new URLSearchParams(location.search);
    const activityParam = params.get('activity');
    
    if (activityParam && activities.some(a => a.id === activityParam)) {
      setFormData(prev => ({
        ...prev,
        activity: activityParam
      }));
    }
  }, [location, activities]);

  useEffect(() => {
    // Calculate price whenever relevant form fields change
    calculatePrice(formData.activity, formData.package, formData.participants);
  }, [formData.activity, formData.package, formData.participants, calculatePrice]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Submit booking logic would go here
    console.log('Booking submitted:', formData);
    alert('Booking submitted successfully! We will contact you shortly to confirm your reservation.');
    // Reset form or redirect
  };

  return (
    <div className="booking-form">
      <h2>Book Your Adventure</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="activity">Select Activity</label>
          <select 
            id="activity" 
            name="activity" 
            value={formData.activity} 
            onChange={handleChange}
            required
          >
            <option value="">Choose an activity</option>
            {activities.map(activity => (
              <option key={activity.id} value={activity.id}>
                {activity.name} ({activity.price})
              </option>
            ))}
          </select>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input 
              type="date" 
              id="date" 
              name="date" 
              value={formData.date} 
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="time">Time</label>
            <select 
              id="time" 
              name="time" 
              value={formData.time} 
              onChange={handleChange}
              required
            >
              <option value="">Select time</option>
              <option value="10:00">10:00 AM</option>
              <option value="12:00">12:00 PM</option>
              <option value="14:00">2:00 PM</option>
              <option value="16:00">4:00 PM</option>
              <option value="18:00">6:00 PM</option>
            </select>
          </div>
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="participants">Number of Participants</label>
            <input 
              type="number" 
              id="participants" 
              name="participants" 
              min="1" 
              max="50" 
              value={formData.participants} 
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="package">Package</label>
            <select 
              id="package" 
              name="package" 
              value={formData.package} 
              onChange={handleChange}
              required
            >
              {packages.map((pkg, index) => (
                <option key={index} value={pkg.name.toLowerCase().replace(' ', '-')}>
                  {pkg.name} ({pkg.price})
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name} 
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={formData.email} 
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input 
              type="tel" 
              id="phone" 
              name="phone" 
              value={formData.phone} 
              onChange={handleChange}
              required
            />
          </div>
        </div>
        
        <div className="form-group">
          <label htmlFor="specialRequirements">Special Requirements</label>
          <textarea 
            id="specialRequirements" 
            name="specialRequirements" 
            value={formData.specialRequirements} 
            onChange={handleChange}
            rows="3"
          ></textarea>
        </div>
        
        <div className="booking-summary">
          <h3>Booking Summary</h3>
          <p className="total-price">Total Price: <span>${totalPrice}</span></p>
        </div>
        
        <button type="submit" className="btn btn--primary btn--full">
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default BookingForm;
```

### BookingContext.js

```jsx
import React, { createContext, useContext, useState } from 'react';
import activitiesData from '../data/activities';
import packagesData from '../data/packages';

const BookingContext = createContext();

export const useBooking = () => useContext(BookingContext);

export const BookingProvider = ({ children }) => {
  const [activities] = useState(activitiesData);
  const [packages] = useState(packagesData);

  const value = {
    activities,
    packages
  };

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
};
```

### useBookingCalculator.js

```jsx
import { useState, useCallback } from 'react';
import { useBooking } from '../context/BookingContext';

export const useBookingCalculator = () => {
  const { activities, packages } = useBooking();
  const [totalPrice, setTotalPrice] = useState(0);

  const calculatePrice = useCallback((activityId, packageName, participants) => {
    if (!activityId || !packageName || !participants) {
      setTotalPrice(0);
      return;
    }

    // Find base prices
    const activity = activities.find(a => a.id === activityId);
    const packageInfo = packages.find(p => p.name.toLowerCase().replace(' ', '-') === packageName);
    
    if (!activity || !packageInfo) {
      setTotalPrice(0);
      return;
    }

    // Calculate base price (remove $ sign and convert to number)
    const activityBasePrice = parseFloat(activity.price.replace('$', ''));
    const packageBasePrice = parseFloat(packageInfo.price.replace('$', ''));
    
    // Calculate total based on participants and package selection
    const calculatedPrice = (activityBasePrice + packageBasePrice) * participants;
    
    setTotalPrice(calculatedPrice);
  }, [activities, packages]);

  return { calculatePrice, totalPrice };
};
```

### activities.js (Data File)

```jsx
const activities = [
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
    image: "https://images.unsplash.com/photo-1566737236500-c8ac43014a8e?w=500",
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
    image: "https://images.unsplash.com/photo-1558618990-fbd4c2cd8a6a?w=500",
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
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=500",
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
    image: "https://images.unsplash.com/photo-1592478411213-6153e4ebc696?w=500",
    duration: "30-90 minutes",
    minAge: "10+",
    maxPlayers: "8",
    price: "$30",
    features: ["Latest VR headsets", "Multiplayer games", "Various experiences", "Motion tracking"]
  }
];

export default activities;
```

## Installation and Setup

To set up this project, you would:

1. Create a new React application:
```bash
npx create-react-app gaming-arena
cd gaming-arena
```

2. Install necessary dependencies:
```bash
npm install react-router-dom
npm install @fortawesome/react-fontawesome @fortawesome/free-solid-svg-icons @fortawesome/free-brands-svg-icons
npm install react-datepicker
npm install react-modal
```

3. Replace the default files with the structure and components provided above.

4. Start the development server:
```bash
npm start
```

This would launch the application at http://localhost:3000/
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
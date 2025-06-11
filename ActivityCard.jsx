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
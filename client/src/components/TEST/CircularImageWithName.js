import React from 'react';

const CircularImageWithName = ({ imageUrl, name }) => {
  return (
    <div className="d-flex flex-column align-items-center">
      <div className="circular-image d-flex justify-content-center align-items-center" style={{ width: '100px', height: '100px' }}>
        <img src={imageUrl} alt={name} className="rounded-circle" style={{ width: '80px', height: '80px' }} />
      </div>
      <span style={{ fontSize: '24px' }}>{name}</span>
    </div>
  );
};

export default CircularImageWithName;

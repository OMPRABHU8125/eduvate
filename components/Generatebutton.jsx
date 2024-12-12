import React from 'react';

const buttonStyles = {
  border: 'none',
  width: '15em',
  height: '5em',
  borderRadius: '3em',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '12px',
  background: '#1C1A1C',
  cursor: 'pointer',
  transition: 'all 450ms ease-in-out',
};

const textStyles = {
  fontWeight: '600',
  color: '#AAAAAA',
  fontSize: 'medium',
  transition: 'color 450ms ease-in-out',
};

const sparkleStyles = {
  fill: '#AAAAAA',
  transition: 'all 800ms ease',
};

const hoverButtonStyles = {
    background: 'linear-gradient(0deg,#A47CF3,#683FEA)',
    boxShadow:
      'inset 0px 1px 0px 0px rgba(255, 255, 255, 0.4), ' +
      'inset 0px -4px 0px 0px rgba(0, 0, 0, 0.2), ' +
      '0px 0px 0px 4px rgba(255, 255, 255, 0.2), ' +
      '0px 0px 180px 0px #9917FF',
    transform: 'translateY(-2px)',
  };
  
const hoverTextStyles = {
  color: 'white',
};

const hoverSparkleStyles = {
  fill: 'white',
  transform: 'scale(1.2)',
};

const Generatebutton = () => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <button
      className="btn"
      style={isHovered ? { ...buttonStyles, ...hoverButtonStyles } : buttonStyles}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <svg
        height="24"
        width="24"
        fill="#FFFFFF"
        viewBox="0 0 24 24"
        data-name="Layer 1"
        id="Layer_1"
        className="sparkle"
        style={isHovered ? { ...sparkleStyles, ...hoverSparkleStyles } : sparkleStyles}
      >
        <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z"></path>
      </svg>
      <span
        className="text"
        style={isHovered ? { ...textStyles, ...hoverTextStyles } : textStyles}
      >
        Generate
      </span>
    </button>
  );
};

export default Generatebutton;

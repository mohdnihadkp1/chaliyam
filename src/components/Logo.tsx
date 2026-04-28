import React from "react";

interface LogoProps {
  className?: string;
  size?: number | string;
}

const Logo: React.FC<LogoProps> = ({ className = "", size }) => {
  return (
    <img
      src="/icon.svg"
      alt="Chaliyam"
      className={className}
      style={size ? { width: size, height: size, objectFit: 'contain' } : { objectFit: 'contain' }}
    />
  );
};

export default Logo;
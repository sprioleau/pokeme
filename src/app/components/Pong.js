import React from "react";

const Pong = ({ src, alt, isSelected, onClick, show }) => {
  if (!show) return null;

  return (
    <div className={`pong${isSelected ? " selected" : ""} x`} role="button" tabIndex="0" onClick={onClick}>
      <img className="pong__image y" src={src} alt={alt} />
    </div>
  );
};

export default Pong;

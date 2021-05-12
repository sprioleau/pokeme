import React from "react";

const Loading = ({ loadingMessage }) => {
  return (
    <section className="modal loading-modal">
      <div className="loading">
        <h2 className="sub-heading">{loadingMessage}</h2>
        <img src="/images/wave.svg" alt="loading animation" />
      </div>
    </section>
  );
};

export default Loading;

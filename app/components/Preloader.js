"use client";

export default function Preloader() {
  return (
    <div className="preloader" aria-hidden="true">
      <div className="preloader-heart-wrap">
        <span className="heart heart-main" />
        <span className="heart heart-left" />
        <span className="heart heart-right" />
      </div>
      <p className="preloader-text">Loading our love story...</p>
    </div>
  );
}

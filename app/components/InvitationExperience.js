"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Preloader from "./Preloader";
import envelope from "../../assets/envelope.png";
import logo from "../../assets/logo.png";
import leaves from "../../assets/leaves.png";

const PRELOADER_MS = 1600;
const TARGET_DATE = new Date("2026-05-22T18:00:00");

function getCountdownParts() {
  const now = new Date();
  const diff = TARGET_DATE.getTime() - now.getTime();

  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return { days, hours, minutes, seconds };
}

function formatCount(value) {
  return String(value).padStart(2, "0");
}

export default function InvitationExperience({ scriptClassName, serifClassName }) {
  const [phase, setPhase] = useState("envelope");
  const [countdown, setCountdown] = useState(() => getCountdownParts());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(getCountdownParts());
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  const openEnvelope = () => {
    if (phase !== "envelope") {
      return;
    }

    setPhase("preload");
    window.setTimeout(() => {
      setPhase("invitation");
    }, PRELOADER_MS);
  };

  return (
    <>
      {phase === "envelope" && (
        <main className="envelope-page">
          <section className="envelope-content">
            <button className="envelope-button" type="button" onClick={openEnvelope}>
              <Image className="envelope-image" src={envelope} alt="Open invitation envelope" priority />
            </button>
            <p className="envelope-text">Tap the envelope to open your invitation</p>
          </section>
        </main>
      )}

      {phase === "preload" && <Preloader />}

      {phase === "invitation" && (
        <div className="invitation-stack">
          <main className="landing-page">
            <section className="landing-content">
              <Image className="logo-image" src={logo} alt="Buyan and Sewwandi logo" priority />
              <p className={`wedding-date ${serifClassName}`}>22.05.2026</p>
              <p className={`save-date ${scriptClassName}`}>Save the date</p>
              <Image className="leaves-image" src={leaves} alt="" aria-hidden="true" />
            </section>
          </main>
          <section className="second-page">
            <div className="second-page-content">
              <div className="second-page-header">
                <p className="countdown-subtitle">THE FINAL COUNTDOWN</p>
                <h2 className="countdown-title">
                  Until We Say <span className="countdown-highlight">"I Do"</span>
                </h2>
                <p className="countdown-paragraph">
                  With hearts full of joy and love, we are counting every moment until our forever
                  begins. Thank you for being part of this beautiful journey.
                </p>
                <div className="countdown-section">
                  <p className="countdown-kicker">Time Remaining</p>
                  <div className="countdown-grid" aria-label="Countdown to wedding date">
                    <article className="countdown-item">
                      <p className="countdown-value">{countdown.days}</p>
                      <p className="countdown-label">Days</p>
                    </article>
                    <article className="countdown-item">
                      <p className="countdown-value">{formatCount(countdown.hours)}</p>
                      <p className="countdown-label">Hours</p>
                    </article>
                    <article className="countdown-item">
                      <p className="countdown-value">{formatCount(countdown.minutes)}</p>
                      <p className="countdown-label">Minutes</p>
                    </article>
                    <article className="countdown-item">
                      <p className="countdown-value">{formatCount(countdown.seconds)}</p>
                      <p className="countdown-label">Seconds</p>
                    </article>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </>
  );
}

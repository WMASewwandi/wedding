"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import HotelRoundedIcon from "@mui/icons-material/HotelRounded";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import CallRoundedIcon from "@mui/icons-material/CallRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import Preloader from "./Preloader";
import envelope from "../../assets/envelope.png";
import logo from "../../assets/logo.png";
import leaves from "../../assets/leaves.png";

const PRELOADER_MS = 1600;
const TARGET_DATE = new Date("2026-05-22T18:00:00");
const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const CALENDAR_YEAR = 2026;
const CALENDAR_MONTH_INDEX = 4;
const CALENDAR_MONTH_LABEL = "May 2026";
const WEDDING_DAY = 22;
const HEART_PARTICLES = [
  { left: 4, duration: 13, delay: 0, size: 16 },
  { left: 12, duration: 15, delay: 2, size: 20 },
  { left: 21, duration: 14, delay: 1, size: 14 },
  { left: 29, duration: 18, delay: 3, size: 19 },
  { left: 37, duration: 16, delay: 0.5, size: 17 },
  { left: 45, duration: 14, delay: 2.4, size: 15 },
  { left: 54, duration: 17, delay: 1.1, size: 21 },
  { left: 62, duration: 13.5, delay: 0.8, size: 15 },
  { left: 70, duration: 16.5, delay: 2.2, size: 18 },
  { left: 78, duration: 14.5, delay: 1.7, size: 16 },
  { left: 86, duration: 17.2, delay: 0.4, size: 20 },
  { left: 94, duration: 15.3, delay: 2.9, size: 14 },
];

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

function getCalendarCells(year, monthIndex) {
  const firstDayOffset = new Date(year, monthIndex, 1).getDay();
  const totalDays = new Date(year, monthIndex + 1, 0).getDate();
  const leadingEmptyCells = Array.from({ length: firstDayOffset }, () => null);
  const monthDays = Array.from({ length: totalDays }, (_, index) => index + 1);

  return [...leadingEmptyCells, ...monthDays];
}

export default function InvitationExperience({ scriptClassName, serifClassName }) {
  const [phase, setPhase] = useState("envelope");
  const [countdown, setCountdown] = useState(() => getCountdownParts());
  const [guestName, setGuestName] = useState("");
  const [isConfirmed, setIsConfirmed] = useState(false);
  const calendarCells = getCalendarCells(CALENDAR_YEAR, CALENDAR_MONTH_INDEX);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(getCountdownParts());
    }, 1000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    if (phase !== "invitation") {
      return;
    }

    const sections = document.querySelectorAll(".second-page, .details-page, .map-page, .rsvp-page");
    if (sections.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const textNodes = entry.target.querySelectorAll(
            "h2, h3, p, a, label, button, .agenda-key, .agenda-value, .agenda-contact-link"
          );

          textNodes.forEach((node, index) => {
            node.classList.add("slide-text");
            node.style.setProperty("--slide-delay", `${Math.min(index * 70, 500)}ms`);
            node.classList.add("is-visible");
          });

          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, [phase]);

  const openEnvelope = () => {
    if (phase !== "envelope") {
      return;
    }

    setPhase("preload");
    window.setTimeout(() => {
      setPhase("invitation");
    }, PRELOADER_MS);
  };

  const confirmAttendance = (event) => {
    event.preventDefault();

    if (!guestName.trim()) {
      return;
    }

    setIsConfirmed(true);
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
          <div className="heart-rain" aria-hidden="true">
            {HEART_PARTICLES.map((item, index) => (
              <span
                key={`heart-${index}`}
                className="heart-rain-item"
                style={{
                  "--left": `${item.left}%`,
                  "--duration": `${item.duration}s`,
                  "--delay": `${item.delay}s`,
                  "--size": `${item.size}px`,
                }}
              />
            ))}
          </div>
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
                <h2 className={`countdown-title ${serifClassName}`}>
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
          <section className="third-page">
            <div className="third-page-content">
              <div className="calendar-card">
                <p className="calendar-subtitle">Wedding Calendar</p>
                <h3 className={`calendar-title ${serifClassName}`}>{CALENDAR_MONTH_LABEL}</h3>
                <div className="calendar-weekdays">
                  {WEEK_DAYS.map((day) => (
                    <p key={day} className="calendar-weekday">
                      {day}
                    </p>
                  ))}
                </div>
                <div className="calendar-grid" aria-label="Wedding date calendar">
                  {calendarCells.map((day, index) => (
                    <div
                      key={`${day ?? "empty"}-${index}`}
                      className={`calendar-cell ${day === WEDDING_DAY ? "calendar-cell-highlight" : ""} ${
                        day === null ? "calendar-cell-empty" : ""
                      } ${
                        day !== null && (index % 7 === 0 || index % 7 === 6)
                          ? "calendar-cell-weekend"
                          : ""
                      }`}
                    >
                      {day === null ? (
                        ""
                      ) : (
                        <>
                          <span className="calendar-day-number">{day}</span>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <section className="details-page">
            <div className="details-card">
              <p className="details-subtitle">Event Agenda</p>
              <h3 className={`details-title ${serifClassName}`}>Plan for the Celebration</h3>

              <ul className="agenda-list">
                <li className="agenda-item">
                  <div className="agenda-text">
                    <div className="agenda-heading">
                      <span className="agenda-icon" aria-hidden="true">
                        <HotelRoundedIcon fontSize="inherit" />
                      </span>
                      <span className="agenda-key">Hotel</span>
                    </div>
                    <span className="agenda-value">Depanama Water Villa</span>
                  </div>
                </li>
                <li className="agenda-item">
                  <div className="agenda-text">
                    <div className="agenda-heading">
                      <span className="agenda-icon" aria-hidden="true">
                        <LocationOnRoundedIcon fontSize="inherit" />
                      </span>
                      <span className="agenda-key">Address</span>
                    </div>
                    <span className="agenda-value">No . 196/26 Isuru Uyana , Pannipitiya</span>
                  </div>
                </li>
                <li className="agenda-item">
                  <div className="agenda-text">
                    <div className="agenda-heading">
                      <span className="agenda-icon" aria-hidden="true">
                        <CallRoundedIcon fontSize="inherit" />
                      </span>
                      <span className="agenda-key">Contact No</span>
                    </div>
                    <div className="agenda-value agenda-value-contact">
                      <a className="agenda-contact-link" href="tel:0768650713">
                        0768650713 - Groom
                      </a>
                      <a className="agenda-contact-link" href="tel:0789251014">
                        0789251014 - Bride
                      </a>
                    </div>
                  </div>
                </li>
                <li className="agenda-item">
                  <div className="agenda-text">
                    <div className="agenda-heading">
                      <span className="agenda-icon" aria-hidden="true">
                        <AccessTimeRoundedIcon fontSize="inherit" />
                      </span>
                      <span className="agenda-key">Time</span>
                    </div>
                    <span className="agenda-value">6PM - 11PM</span>
                  </div>
                </li>
              </ul>
            </div>
          </section>
          <section className="map-page">
            <div className="map-card">
              <p className="map-subtitle">Location</p>
              <h3 className={`map-title ${serifClassName}`}>Find Us on Google Maps</h3>
              <div className="map-frame-wrap">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.2612086572585!2d79.94205057397703!3d6.859265119172573!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae25190ebac6777%3A0xbf32d26d152457bc!2sDepanama%20Water%20Villa%20Hotel!5e0!3m2!1sen!2slk!4v1777115384337!5m2!1sen!2slk"
                  className="map-frame"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Depanama Water Villa Hotel location"
                />
              </div>
            </div>
          </section>
          <section className="rsvp-page">
            <div className="rsvp-page-content">
              <p className="rsvp-page-subtitle">Final Confirmation</p>
              <h3 className={`rsvp-page-title ${serifClassName}`}>Please Confirm Your Attendance</h3>
              <form className="rsvp-page-form" onSubmit={confirmAttendance}>
                <input
                  id="rsvp-name"
                  className="rsvp-page-input"
                  type="text"
                  value={guestName}
                  onChange={(event) => {
                    setGuestName(event.target.value);
                    if (isConfirmed) {
                      setIsConfirmed(false);
                    }
                  }}
                  placeholder="Enter your name"
                  required
                />
                <button className="rsvp-page-button" type="submit">
                  Confirm Attendance
                </button>
                <p className="rsvp-page-note">
                  Your presence is the greatest gift to us on this special day.  
                  We would be truly honored to celebrate this joyful beginning together with you.
                </p>
              </form>
              {isConfirmed && (
                <p className="rsvp-page-success">
                  Thank you, {guestName.trim()}! We are excited to celebrate with you.
                </p>
              )}
            </div>
            <footer className="rsvp-page-footer">With love, Buyan &amp; Sewwandi</footer>
          </section>
        </div>
      )}
    </>
  );
}

"use client";

import { useState } from "react";
import Image from "next/image";
import Preloader from "./Preloader";
import envelope from "../../assets/envelope.png";
import logo from "../../assets/logo.png";
import leaves from "../../assets/leaves.png";

const PRELOADER_MS = 1600;

export default function InvitationExperience({ scriptClassName, serifClassName }) {
  const [phase, setPhase] = useState("envelope");

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
        <main className="landing-page">
          <section className="landing-content">
            <Image className="logo-image" src={logo} alt="Buyan and Sewwandi logo" priority />
            <p className={`wedding-date ${serifClassName}`}>22.05.2026</p>
            <p className={`save-date ${scriptClassName}`}>Save the date</p>
            <Image className="leaves-image" src={leaves} alt="" aria-hidden="true" />
          </section>
        </main>
      )}
    </>
  );
}

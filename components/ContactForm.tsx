"use client";

import { useState } from "react";

type Mode = "general" | "commission";

export default function ContactForm() {
  const [mode, setMode] = useState<Mode>("general");
  const [sent, setSent] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const g = (k: string) => String(data.get(k) || "").trim();
    const name = g("name");
    const subject = mode === "commission" ? `Commission inquiry from ${name}` : `Inquiry from ${name}`;
    const lines = [
      `Type: ${mode === "commission" ? "Commission" : "General inquiry"}`,
      `Name: ${name}`,
      `Email: ${g("email")}`,
      g("location") ? `Location: ${g("location")}` : "",
      g("piece") ? `Piece: ${g("piece")}` : "",
      mode === "commission" && g("details") ? `Commission details: ${g("details")}` : "",
      "",
      g("message"),
    ].filter(Boolean);
    window.location.href = `mailto:hello@swetadassani.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(lines.join("\n"))}`;
    setSent(true);
  };

  return (
    <form className={`form mode-${mode}`} onSubmit={onSubmit}>
      <div className="seg" role="tablist" aria-label="Type of inquiry">
        <button type="button" className={mode === "general" ? "on" : ""} role="tab" aria-selected={mode === "general"} onClick={() => setMode("general")}>
          General
        </button>
        <button type="button" className={mode === "commission" ? "on" : ""} role="tab" aria-selected={mode === "commission"} onClick={() => setMode("commission")}>
          Commission
        </button>
      </div>

      <div className="field">
        <label htmlFor="name">Your name</label>
        <input id="name" name="name" type="text" autoComplete="name" required />
      </div>

      <div className="row">
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" autoComplete="email" required />
        </div>
        <div className="field">
          <label htmlFor="location">Location</label>
          <input id="location" name="location" type="text" placeholder="City, country" />
        </div>
      </div>

      <div className="field">
        <label htmlFor="piece">
          Which piece? <span style={{ textTransform: "none", letterSpacing: 0, color: "var(--muted)" }}>(optional)</span>
        </label>
        <input id="piece" name="piece" type="text" placeholder="Title of the work, if you have one in mind" />
      </div>

      <div className="field commission-only">
        <label htmlFor="details">About your commission</label>
        <textarea id="details" name="details" placeholder="Subject, feeling, rough size, and where it will live" />
        <span className="form-note">Commission pricing depends on the piece. Share as much or as little as you like.</span>
      </div>

      <div className="field">
        <label htmlFor="message">Message</label>
        <textarea id="message" name="message" required />
      </div>

      <button className="btn" type="submit">Send inquiry</button>

      {sent && (
        <p className="form-status">
          Thank you. Your email app should open with the message ready to send. If it does not, write to hello@swetadassani.com.
        </p>
      )}

      <p className="form-note" style={{ marginTop: "1.2rem" }}>
        This preview opens your email app with the message ready to send. At launch it will submit directly through the site.
      </p>
    </form>
  );
}

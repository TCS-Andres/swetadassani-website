import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Inquire",
  description:
    "Inquire about an original painting or commission by Sweta Dassani. Worldwide shipping, in USD or INR.",
};

export default function Contact() {
  return (
    <>
      <header className="page-head bordered">
        <div className="container">
          <span className="label reveal">Inquiries &amp; Commissions</span>
          <h1 className="reveal d1">Let us talk.</h1>
          <p className="lead reveal d2">
            Reached the piece you have been looking for, or have one in mind that does not exist yet? Send a note. Every work is an original, priced individually, and shipped worldwide.
          </p>
        </div>
      </header>

      <section className="about">
        <div className="container contact-grid">
          <div className="reveal">
            <ContactForm />
          </div>
          <aside className="contact-side reveal d1">
            <div className="block">
              <h4>Email</h4>
              <a href="mailto:hello@swetadassani.com">hello@swetadassani.com</a>
            </div>
            <div className="block">
              <h4>Instagram</h4>
              <a href="https://instagram.com" rel="noopener noreferrer" target="_blank">@swetadassani</a>
            </div>
            <div className="block">
              <h4>Studio</h4>
              <p>Mumbai, India</p>
            </div>
            <div className="block">
              <h4>Good to know</h4>
              <p>Originals and commissions</p>
              <p>Inquire for price, in USD or INR</p>
              <p>Worldwide shipping</p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

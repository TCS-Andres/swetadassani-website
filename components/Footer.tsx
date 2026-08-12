import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="top">
          <div>
            <Link className="wordmark" href="/">
              Sweta Dassani<span className="dot">.</span>
            </Link>
            <p style={{ marginTop: "1rem", maxWidth: "30ch", color: "var(--muted)", fontSize: "0.9rem" }}>
              Contemporary devotional paintings. Mumbai, India.
            </p>
          </div>
          <div className="cols">
            <div className="col">
              <h4>Explore</h4>
              <Link href="/portfolio">Work</Link>
              <Link href="/about">About</Link>
              <Link href="/contact">Inquire</Link>
            </div>
            <div className="col">
              <h4>Connect</h4>
              <a href="https://instagram.com" rel="noopener noreferrer" target="_blank">Instagram</a>
              <Link href="/contact">Email</Link>
            </div>
            <div className="col">
              <h4>Details</h4>
              <span>Inquire for price</span>
              <span>Worldwide shipping</span>
              <span>Commissions welcome</span>
            </div>
          </div>
        </div>
        <div className="base">
          <span>&copy; 2026 Sweta Dassani. All works original.</span>
          <span className="preview-note">Design preview &middot; placeholder art and copy</span>
        </div>
      </div>
    </footer>
  );
}

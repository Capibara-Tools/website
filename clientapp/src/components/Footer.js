export default function Footer() {
  return (
    <div className="outer-footer">
      <nav className="inner-footer">
        <span className="footer-text">
          capibara.tools © {new Date().getFullYear()}. All Rights Reserved.
        </span>
      </nav>
    </div>
  );
}

import { NavLink } from "react-router-dom";
import logo from "../resources/capibara-logo.png";
import { SiDiscord, SiGithub } from "react-icons/si";

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

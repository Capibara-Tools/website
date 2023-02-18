import { NavLink } from "react-router-dom";
import logo from "../resources/capibara-logo.png";
import { SiDiscord, SiGithub } from "react-icons/si";

export default function Header() {
  return (
    <div className="outer-nav">
      <nav className="inner-nav">
        <div className="left-side">
          <div className="logo">
            <NavLink to="/">
              <img src={logo} alt="Capibara Logo" />
            </NavLink>
          </div>
          <div className="links">
            <NavLink to="/plugins">Plugins</NavLink>
            <NavLink to="/docs">Docs</NavLink>
            <NavLink to="/capi">CAPI</NavLink>
            <NavLink to="/about">About</NavLink>
            <a
              href="https://shop.capibara.tools/"
              rel="noreferrer noopener"
              target="_blank"
            >
              Store
            </a>
          </div>
        </div>
        <div className="right-side">
          <div className="links">
            <a
              href="https://github.com/Capibara-Tools"
              rel="noreferrer noopener"
              target="_blank"
            >
              <SiGithub />
            </a>
            <a
              href="https://discord.gg/XwNUMMY4b2"
              rel="noreferrer noopener"
              target="_blank"
            >
              <SiDiscord />
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}

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
          </div>
        </div>
        <div className="right-side">
          <div className="links">
            <a href="https://github.com/Capibara-Tools"><SiGithub/></a>
            <a href="https://discord.gg/XwNUMMY4b2"><SiDiscord/></a>
          </div>
        </div>
      </nav>
    </div>
  );
}

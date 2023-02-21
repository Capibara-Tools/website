import { Link } from "react-router-dom";

export default function Plugins() {
  return (
    <div className="page docs">
      <h1>Plugins</h1>
      <h2>Capibara Plugins</h2>
      <h3>Available Now</h3>
      <ul>
        <li>
          <a href="https://github.com/Capibara-Tools/capibara-vs-code">
            Capibara Visual Studio Code Extension
          </a>
        </li>
        <li>
          <a href="https://github.com/Capibara-Tools/capibara-vim">
            Capibara Vim Extension
          </a>
        </li>
      </ul>
      <h3>Coming Soon</h3>
      <ul>
        <li>TBA</li>
      </ul>
      <h2>About</h2>
      <p>
        The power of Capibara lies in it's IDE agnostic repository of
        documentation, <b>CAPI</b>.
      </p>
      <p>
        With IDE specific plugins we can make the documentation available to any
        extensible editor enabling better context, intelligent suggestions, and
        hover-enabled documentation, thus freeing users from manpages and
        browser tabs.
      </p>
      <h2>Contribute</h2>
      <p>
        Anyone can build plugins. If Capibara doesn't already have an extension
        for your favorite editor, perhaps you could contribute one.
      </p>
      <p>
        To get started click the link,{" "}
        <Link to="/docs/building-a-plugin">Building A Plugin</Link>
      </p>
    </div>
  );
}

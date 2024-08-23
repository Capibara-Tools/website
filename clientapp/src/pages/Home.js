import { NavLink } from "react-router-dom";
import code from "../resources/code-complete.gif";

export default function Home() {
  return (
    <>
      <div className="banner">
        <div className="banner-inner">
          <div className="main-hero">
            <div className="prompt">Capibara is open source</div>
            <div className="left">Crowd-sourced.</div>
            <div className="middle colored">C library documentation and tooling. </div>
            <div className="right">For today's developers.</div>
          </div>
        </div>
      </div>
      <div className="page">
        <p className="text">
          Capibara is crowd-sourced C library documentation and plugins for your
          favorite editors like VS Code, Vim, etc.
          <div className="link-buttons middle">
            <NavLink to="/capi">Search C Documentation</NavLink>
            <NavLink to="/plugins">Plugins</NavLink>
          </div>
        </p>
        <hr />
        <div className="title-split-container">
          <h1>See How It Works</h1>
          <div className="inner-title-split-container">
            <div className="sub1">
              <List
                items={[
                  "You contribute documentation for a C library.",
                  "All the documentation is parsed into a fat JSON file.",
                  "The JSON is made available here to consume via REST API or download.",
                  "Users can use plugins or just search this website.",
                ]}
              />
            </div>
            <div className="sub2 video-container">
              <img src={code} />
            </div>
          </div>
        </div>
        <div className="get-started">
          <h1>Contribute</h1>
          <p className="text">
            Document a new C library or build a new plugin.
            <div className="link-buttons left">
              <NavLink to="/docs/contribute-docs">Document a C Library</NavLink>
              <NavLink to="/docs/build-a-plugin">Create a New Plugin</NavLink>
            </div>
          </p>
        </div>
      </div>
    </>
  );
}

function List({ items }) {
  const formattedItems = items.map((x, i) => {
    return (
      <div className="list-item" key={i}>
        <div className="list-item-number">
          <span>{i + 1}</span>
        </div>
        <div className="list-item-value">{x}</div>
      </div>
    );
  });

  return <div className="list">{formattedItems}</div>;
}

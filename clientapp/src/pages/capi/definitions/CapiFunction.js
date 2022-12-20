import { capiLinkReplace } from "../Utility.js";
import { Link } from "react-router-dom";

export default function CapiFunction({ fn }) {
  const parameters = fn.parameters.map((p) => {
    return (
      <>
        <li className="parameter">
          <span className="type">
            {capiLinkReplace(p.type)}
          </span>
          <span className="name">{p.name}</span>
          &ensp;-&ensp;
          <span>{capiLinkReplace(p.description)}</span>
        </li>
      </>
    );
  });

  return (
    <>
      <h4 className="breadcrumbs">
        <Link to="/capi">CAPI</Link>&ensp;/&ensp;
        <Link to={"/capi/" + fn.header.ref}>&lt;{fn.header.name}&gt;</Link>
        &ensp;/&ensp;<b>{fn.name}</b>
      </h4>
      <h2>
        function <code>{fn.name}</code>
      </h2>
      <div className="attributes">
        <div className="attribute-group">
          <h3>summary</h3>
          <p>{capiLinkReplace(fn.summary)}</p>
        </div>
        <div className="attribute-group">
          <h3>returns</h3>
          <p className="type">{capiLinkReplace(fn.returns)}</p>
        </div>
        <div className="attribute-group">
          <h3>parameters</h3>
          <ul>{parameters}</ul>
        </div>
        <div className="attribute-group">
          <h3>description</h3>
          <p>{capiLinkReplace(fn.description)}</p>
        </div>
      </div>
    </>
  );
}

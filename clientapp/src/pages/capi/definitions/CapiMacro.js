import { capiLinkReplace, SupportedOs } from "../Utility.js";
import { Link } from "react-router-dom";

export default function CapiMacro({ mo }) {
  var parameters = [];

  if (!!mo.kind?.function) {
    parameters = mo.kind.function.parameters.map((p) => {
      return (
        <>
          <li className="parameter">
            <span className="name">{p.name}</span>
            <span className="description">
              {capiLinkReplace(p.description)}
            </span>
          </li>
        </>
      );
    });
  }

  return (
    <>
      <h4 className="breadcrumbs">
        <Link to="/capi">CAPI</Link>&ensp;/&ensp;
        <Link to={"/capi/" + mo.header.ref}>&lt;{mo.header.name}&gt;</Link>
        &ensp;/&ensp;<b>{mo.name}</b>
      </h4>
      <h2>
        macro <code>{mo.name}</code>
        <SupportedOs affinity={mo.os_affinity} />
      </h2>
      <div className="attributes">
        <div className="attribute-group">
          <h3>summary</h3>
          <p>{capiLinkReplace(mo.summary)}</p>
        </div>
        {!!mo.kind?.object && (
          <div className="attribute-group">
            <h3>kind</h3>
            <p>object-like</p>
          </div>
        )}

        {!!mo.kind?.function && (
          <>
            <div className="attribute-group">
              <h3>kind</h3>
              <p>function-like</p>
            </div>
            <div className="attribute-group">
              <h3>returns</h3>
              <span className="type rtype">
                {capiLinkReplace(mo.kind.function.returns.type)}
              </span>
              <p className="description">
                {capiLinkReplace(mo.kind.function.description)}
              </p>
            </div>
            <div className="attribute-group">
              <h3>parameters</h3>
              <ul>{parameters}</ul>
            </div>
          </>
        )}
        <div className="attribute-group">
          <h3>description</h3>
          <p>{capiLinkReplace(mo.description)}</p>
        </div>
      </div>
    </>
  );
}

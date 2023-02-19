import { capiLinkReplace, capiMdLinkReplace, SupportedOs } from "../Utility.js";
import { Link } from "react-router-dom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown.js";

export default function CapiEnum({ em }) {
  const variants = em.variants.map((p) => {
    return (
      <>
        <li className="parameter">
          <span className="name">{p.name}</span>
          <span className="description">{capiLinkReplace(p.description)}</span>
        </li>
      </>
    );
  });

  return (
    <>
      <h4 className="breadcrumbs">
        <Link to="/capi">CAPI</Link>&ensp;/&ensp;
        <Link to={"/capi/" + em.header.ref}>&lt;{em.header.name}&gt;</Link>
        &ensp;/&ensp;<b>{em.name}</b>
      </h4>
      <h2>
        enum <code>{em.name}</code>
        <SupportedOs affinity={em.os_affinity} />
      </h2>
      <div className="attributes">
        <div className="attribute-group">
          <h3>summary</h3>
          <p>{capiLinkReplace(em.summary)}</p>
        </div>
        <div className="attribute-group">
          <h3>variants</h3>
          <ul>{variants}</ul>
        </div>
        <div className="attribute-group">
          <h3>description</h3>
          <div className="description">
            <ReactMarkdown children={capiMdLinkReplace(em.description)} />
          </div>
        </div>
      </div>
    </>
  );
}

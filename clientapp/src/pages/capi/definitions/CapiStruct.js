import { capiLinkReplace, capiMdLinkReplace, SupportedOs } from "../Utility.js";
import { Link } from "react-router-dom";
import { ReactMarkdown } from "react-markdown/lib/react-markdown.js";

export default function CapiStruct({ st }) {
  const fields = st.fields.map((p) => {
    return (
      <>
        <li className="parameter">
          <span className="type">{capiLinkReplace(p.type)}</span>
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
        <Link to={"/capi/" + st.header.ref}>&lt;{st.header.name}&gt;</Link>
        &ensp;/&ensp;<b>{st.name}</b>
      </h4>
      <h2>
        struct <code>{st.name}</code>
        <SupportedOs affinity={st.os_affinity} />
      </h2>
      <div className="attributes">
        <div className="attribute-group">
          <h3>summary</h3>
          <p>{capiLinkReplace(st.summary)}</p>
        </div>
        <div className="attribute-group">
          <h3>fields</h3>
          <ul>{fields}</ul>
        </div>
        <div className="attribute-group">
          <h3>description</h3>
          <div className="description">
            <ReactMarkdown children={capiMdLinkReplace(st.description)} />
          </div>
        </div>
      </div>
    </>
  );
}

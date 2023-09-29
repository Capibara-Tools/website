import { capiLinkReplace, capiMdLinkReplace, SupportedOs } from "../Utility.js";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";

export default function CapiFunction({ fn }) {
  const parameters = fn.parameters.map((p) => {
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

  const examples = fn.examples.map((e) => {
    return (
      <>
        <h4>{e.title}</h4>
        <div className="example">
          <SyntaxHighlighter language="c" style={oneLight} code={e.code} />
        </div>
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
        <SupportedOs affinity={fn.os_affinity} />
      </h2>
      <div className="attributes">
        <div className="attribute-group">
          <h3>summary</h3>
          <p>{capiLinkReplace(fn.summary)}</p>
        </div>
        <div className="attribute-group">
          <h3>returns</h3>
          <span className="type rtype">{capiLinkReplace(fn.returns.type)}</span>
          <p className="description">
            {capiLinkReplace(fn.returns.description)}
          </p>
        </div>
        <div className="attribute-group">
          <h3>parameters</h3>
          <ul>{parameters}</ul>
        </div>
        <div className="attribute-group">
          <h3>description</h3>
          <div className="description">
            <ReactMarkdown children={capiMdLinkReplace(fn.description)} />
          </div>
        </div>
        <div className="attribute-group">
          <h3>examples</h3>
          {examples}
        </div>  
      </div>
    </>
  );
}

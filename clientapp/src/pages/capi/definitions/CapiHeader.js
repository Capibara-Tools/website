import { Link } from "react-router-dom";

export default function CapiHeader({ header }) {
  const renderedFunctions = [];

  header.functions.forEach((fn) => {
    const parameters = fn.parameters.map((p, i) => {
      return (
        <>
          <span className="parameter">
            <span className="type">
              {p.type.replace(/\[\`(.+)\/(.+)\`\]/gm, "$2")}
            </span>
            <span className="name">{p.name}</span>
            {i!=fn.parameters.length-1 ? "," : ""}
          </span>
        </>
      );
    });

    renderedFunctions.push(
      <li className="code_li">
        <Link
          className="code_link"
          to={"/capi/" + fn.header.ref + "/" + fn.name}
        >
          {fn.name}({parameters}):
          <span className="description">
            {fn.summary.replace(/\[\`(.+)\/(.+)\`\]/gm, "`$2`")}
          </span>
        </Link>
      </li>
    );
  });

  return (
    <>
      <h4 className="breadcrumbs">
        <Link to="/capi">CAPI</Link>&ensp;/&ensp;
        <b>&lt;{header.name}&gt;</b>
      </h4>
      <h2>header &lt;{header.name}&gt;</h2>
      <div className="attributes">
        <div className="attribute-group">
          <h3>functions</h3>
          <ul>{(renderedFunctions.length > 0) ? renderedFunctions : "no functions have been defined"}</ul>
        </div>
      </div>
    </>
  );
}

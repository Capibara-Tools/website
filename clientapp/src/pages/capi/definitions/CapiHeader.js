import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { Link } from "react-router-dom";
import { capiLinkReplace, SupportedOs } from "../Utility";

export default function CapiHeader({ header }) {
  const renderedMacros = [];
  const renderedEnums = [];
  const renderedStructs = [];
  const renderedTypedefs = [];
  const renderedFunctions = [];

  header.macros.forEach((mo) => {
    var parameters = [];

    if (!!mo.kind?.function){
      parameters = mo.kind.function.parameters.map((p, i) => {
        return (
          <>
            <span className="parameter">
              <span className="name">{p.name}</span>
              {i!=mo.kind.function.parameters.length-1 ? "," : ""}
            </span>
          </>
        );
      });
    }

    renderedMacros.push(
      <li className="code_li">
        <Link
          className="code_link"
          to={"/capi/" + mo.header.ref + "/" + mo.name}
        >
          {mo.name}{!!mo.kind?.function && (<>({parameters}) <AiOutlineArrowRight/> <span className="parameter"><span className="type rtype">
              {mo.kind.function.returns.type.replace(/\[\`(.+)\/(.+)\`\]/gm, "$2")}
            </span></span></>)}
          <SupportedOs affinity={mo.os_affinity}/>
          <span className="description">
            {mo.summary.replace(/\[\`(.+)\/(.+)\`\]/gm, "`$2`")}
          </span>
        </Link>
      </li>
    );
  });

  header.enums.forEach((em) => {
    renderedEnums.push(
      <li className="code_li">
        <Link
          className="code_link"
          to={"/capi/" + em.header.ref + "/" + em.name}
        >
          {em.name}
          <SupportedOs affinity={em.os_affinity}/>
          <span className="description">
            {em.summary.replace(/\[\`(.+)\/(.+)\`\]/gm, "`$2`")}
          </span>
        </Link>
      </li>
    );
  });

  header.structs.forEach((st) => {
    renderedStructs.push(
      <li className="code_li">
        <Link
          className="code_link"
          to={"/capi/" + st.header.ref + "/" + st.name}
        >
          {st.name}
          <SupportedOs affinity={st.os_affinity}/>
          <span className="description">
            {st.summary.replace(/\[\`(.+)\/(.+)\`\]/gm, "`$2`")}
          </span>
        </Link>
      </li>
    );
  });

  header.typedefs.forEach((tf) => {
    renderedTypedefs.push(
      <li className="code_li">
        <Link
          className="code_link"
          to={"/capi/" + tf.header.ref + "/" + tf.name}
        >
          {tf.name} <AiOutlineArrowLeft/><span className="parameter"><span className="type">
              {tf.type.replace(/\[\`(.+)\/(.+)\`\]/gm, "$2")}
            </span></span>
          <SupportedOs affinity={tf.os_affinity}/>
          <span className="description">
            {tf.summary.replace(/\[\`(.+)\/(.+)\`\]/gm, "`$2`")}
          </span>
        </Link>
      </li>
    );
  });

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
          {fn.name}({parameters})&ensp;<AiOutlineArrowRight/><span className="parameter"><span className="type rtype">
              {fn.returns.type.replace(/\[\`(.+)\/(.+)\`\]/gm, "$2")}
            </span></span>
          <SupportedOs affinity={fn.os_affinity}/>
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
      <h2>header &lt;{header.name}&gt; <SupportedOs affinity={header.os_affinity}/></h2>
      <div className="attributes">
        <div className="attribute-group">
          <h3>summary</h3>
          <p>{capiLinkReplace(header.summary)}</p>
        </div>
        <div className="attribute-group">
          <h3>macros</h3>
          <ul>{(renderedMacros.length > 0) ? renderedMacros : "no macros have been defined"}</ul>
          </div>
        <div className="attribute-group">
          <h3>enums</h3>
          <ul>{(renderedEnums.length > 0) ? renderedEnums : "no enums have been defined"}</ul>
          </div>
        <div className="attribute-group">
          <h3>structs</h3>
          <ul>{(renderedStructs.length > 0) ? renderedStructs : "no structs have been defined"}</ul>
          </div>
        <div className="attribute-group">
          <h3>typedefs</h3>
          <ul>{(renderedTypedefs.length > 0) ? renderedTypedefs : "no typedefs have been defined"}</ul>
          </div>
        <div className="attribute-group">
          <h3>functions</h3>
          <ul>{(renderedFunctions.length > 0) ? renderedFunctions : "no functions have been defined"}</ul>
        </div>
      </div>
    </>
  );
}

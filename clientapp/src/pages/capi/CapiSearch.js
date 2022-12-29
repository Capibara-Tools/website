import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { SupportedOs } from "./Utility";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

export default function CapiSearch({
  searchText,
  setBufferedSearchText,
  setRawSearchText,
}) {
  const navigate = useNavigate();
  const [data, setData] = useState({
    macros: [],
    enums: [],
    structs: [],
    typedefs: [],
    functions: [],
  });

  useEffect(() => {
    axios
      .get("/api/v1/search", { params: { term: searchText } })
      .then((data) => {
        setData(data.data);
      });
  }, [setData, searchText]);

  const renderedMacros = [];
  const renderedEnums = [];
  const renderedStructs = [];
  const renderedTypedefs = [];
  const renderedFunctions = [];

  data.macros.forEach((mo) => {
    var parameters = [];

    if (!!mo.kind?.function) {
      parameters = mo.kind.function.parameters.map((p, i) => {
        return (
          <>
            <span className="parameter">
              <span className="name">{p.name}</span>
              {i != mo.kind.function.parameters.length - 1 ? "," : ""}
            </span>
          </>
        );
      });
    }

    renderedMacros.push(
      <li className="code_li">
        <Link
        onClick={(e) => {
          e.preventDefault();
          navigate("/capi/" + mo.header.ref + "/" + mo.name);
          setBufferedSearchText("");
          setRawSearchText("");
        }}
          className="code_link"
          to={"/capi/" + mo.header.ref + "/" + mo.name}
        >
          {mo.name}
          {!!mo.kind?.function && <>({parameters})&ensp;<AiOutlineArrowRight/><span className="parameter"><span className="type rtype">
              {mo.kind.function.returns.type.replace(/\[\`(.+)\/(.+)\`\]/gm, "$2")}
            </span></span></>}
          <SupportedOs affinity={mo.os_affinity} />
          <span className="description">
            {mo.summary.replace(/\[\`(.+)\/(.+)\`\]/gm, "`$2`")}
          </span>
        </Link>
      </li>
    );
  });

  data.enums.forEach((em) => {
    renderedEnums.push(
      <li className="code_li">
        <Link
        onClick={(e) => {
          e.preventDefault();
          navigate("/capi/" + em.header.ref + "/" + em.name);
          setBufferedSearchText("");
          setRawSearchText("");
        }}
          className="code_link"
          to={"/capi/" + em.header.ref + "/" + em.name}
        >
          {em.name}
          <SupportedOs affinity={em.os_affinity} />
          <span className="description">
            {em.summary.replace(/\[\`(.+)\/(.+)\`\]/gm, "`$2`")}
          </span>
        </Link>
      </li>
    );
  });

  data.structs.forEach((st) => {
    renderedStructs.push(
      <li className="code_li">
        <Link
        onClick={(e) => {
          e.preventDefault();
          navigate("/capi/" + st.header.ref + "/" + st.name);
          setBufferedSearchText("");
          setRawSearchText("");
        }}
          className="code_link"
          to={"/capi/" + st.header.ref + "/" + st.name}
        >
          {st.name}
          <SupportedOs affinity={st.os_affinity} />
          <span className="description">
            {st.summary.replace(/\[\`(.+)\/(.+)\`\]/gm, "`$2`")}
          </span>
        </Link>
      </li>
    );
  });

  data.typedefs.forEach((tf) => {
    renderedTypedefs.push(
      <li className="code_li">
        <Link
        onClick={(e) => {
          e.preventDefault();
          navigate("/capi/" + tf.header.ref + "/" + tf.name);
          setBufferedSearchText("");
          setRawSearchText("");
        }}
          className="code_link"
          to={"/capi/" + tf.header.ref + "/" + tf.name}
        >
          {tf.name} <AiOutlineArrowLeft />
          <span className="parameter">
            <span className="type">
              {tf.type.replace(/\[\`(.+)\/(.+)\`\]/gm, "$2")}
            </span>
          </span>
          <SupportedOs affinity={tf.os_affinity} />
          <span className="description">
            {tf.summary.replace(/\[\`(.+)\/(.+)\`\]/gm, "`$2`")}
          </span>
        </Link>
      </li>
    );
  });

  data.functions.forEach((fn) => {
    const parameters = fn.parameters.map((p, i) => {
      return (
        <>
          <span className="parameter">
            <span className="type">
              {p.type.replace(/\[\`(.+)\/(.+)\`\]/gm, "$2")}
            </span>
            <span className="name">{p.name}</span>
            {i != fn.parameters.length - 1 ? "," : ""}
          </span>
        </>
      );
    });

    renderedFunctions.push(
      <li className="code_li">
        <Link
          onClick={(e) => {
            e.preventDefault();
            navigate("/capi/" + fn.header.ref + "/" + fn.name);
            setBufferedSearchText("");
            setRawSearchText("");
          }}
          className="code_link"
          to={"/capi/" + fn.header.ref + "/" + fn.name}
        >
          {fn.name}({parameters})&ensp;<AiOutlineArrowRight/><span className="parameter"><span className="type rtype">
              {fn.returns.type.replace(/\[\`(.+)\/(.+)\`\]/gm, "$2")}
            </span></span>
          <SupportedOs affinity={fn.os_affinity} />
          <span className="description">
            {fn.summary.replace(/\[\`(.+)\/(.+)\`\]/gm, "`$2`")}
          </span>
        </Link>
      </li>
    );
  });

  return (
    <>
      <h2>Results for '{searchText}'</h2>
      <div className="attributes">
        {renderedMacros.length > 0 ? (
          <div className="attribute-group">
            <h3>macros</h3>
            <ul>{renderedMacros}</ul>
          </div>
        ) : (
          ""
        )}
        {renderedEnums.length > 0 ? (
          <div className="attribute-group">
            <h3>enums</h3>
            <ul>{renderedEnums}</ul>
          </div>
        ) : (
          ""
        )}
        {renderedStructs.length > 0 ? (
          <div className="attribute-group">
            <h3>structs</h3>
            <ul>{renderedStructs}</ul>
          </div>
        ) : (
          ""
        )}
        {renderedTypedefs.length > 0 ? (
          <div className="attribute-group">
            <h3>typedefs</h3>
            <ul>{renderedTypedefs}</ul>
          </div>
        ) : (
          ""
        )}
        {renderedFunctions.length > 0 ? (
          <div className="attribute-group">
            <h3>functions</h3>
            <ul>{renderedFunctions}</ul>
          </div>
        ) : (
          ""
        )}

        {renderedMacros.length == 0 &&
        renderedEnums.length == 0 &&
        renderedStructs.length == 0 &&
        renderedTypedefs.length == 0 &&
        renderedStructs.length == 0 ? (
          <div className="attribute-group">
            <h3>no results found</h3>
          </div>
        ) : (
          ""
        )}
      </div>
    </>
  );
}

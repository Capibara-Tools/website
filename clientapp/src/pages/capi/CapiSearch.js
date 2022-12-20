import { useNavigate } from "react-router";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function CapiSearch({
  searchText,
  setBufferedSearchText,
  setRawSearchText,
}) {
  const navigate = useNavigate();
  const [data, setData] = useState({ functions: [] });

  useEffect(() => {
    axios
      .get("/api/v1/search", { params: { term: searchText } })
      .then((data) => {
        setData(data.data);
      });
  }, [setData, searchText]);

  const renderedFunctions = [];

  data.functions.forEach((fn) => {
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
          onClick={(e) => {
            e.preventDefault();
            navigate("/capi/" + fn.header.ref + "/" + fn.name);
            setBufferedSearchText("");
            setRawSearchText("");
          }}
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
      <h2>Results for '{searchText}'</h2>
      <div className="attributes">
        <div className="attribute-group">
          <h3>functions</h3>
          <ul>{renderedFunctions}</ul>
        </div>
      </div>
    </>
  );
}

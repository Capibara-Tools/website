import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { SupportedOs } from "./Utility";

export default function CapiListing() {
  const [fetching, setFetching] = useState(false);
  const [headers, setHeaders] = useState([]);

  useEffect(() => {
    setFetching(true);
    axios.get("/api/v1/headers").then((headers) => {
      setHeaders(headers.data);
      setFetching(false);
    });
  }, [setHeaders, setFetching]);

  const renderedHeaders = headers.map((header) => (
    <li className="code_li">
      <Link className="code_link" to={"/capi/" + header.ref}>
        &lt;{header.name}&gt;
        <SupportedOs affinity={header.os_affinity} />
        <span className="description">
          {header.summary.replace(/\[\`(.+)\/(.+)\`\]/gm, "`$2`")}
        </span>
      </Link>
    </li>
  ));

  return (
    <>
      <h4 className="breadcrumbs">
        <b>CAPI</b>
      </h4>
      <h2>Capibara CAPI</h2>
      <div className="attributes">
        <div className="attribute-group">
          <h3>headers</h3>
          <ul>{!fetching ? renderedHeaders : "Loading..."}</ul>
        </div>
      </div>
    </>
  );
}

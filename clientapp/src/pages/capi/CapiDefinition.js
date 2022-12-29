import { useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import { useEffect } from "react";
import CapiHeader from "./definitions/CapiHeader";
import CapiFunction from "./definitions/CapiFunction";
import { Link } from "react-router-dom";
import CapiEnum from "./definitions/CapiEnum";
import CapiStruct from "./definitions/CapiStruct";
import CapiTypedef from "./definitions/CapiTypedef";
import CapiMacro from "./definitions/CapiMacro";

export default function CapiDefinition() {
  const [fetching, setFetching] = useState(true);
  const [data, setData] = useState(undefined);
  const location = useLocation();
  const regexp = new RegExp(/^\/capi\/(.+?)(?:\/?)$/gm);
  const definition = regexp.exec(location.pathname)[1];

  useEffect(() => {
    setFetching(true);
    axios
      .get("/api/v1/definition/" + definition)
      .then((result) => {
        setData(result.data);
        setFetching(false);
      })
      .catch(() => {
        setData(undefined);
        setFetching(false);
      });
  }, [definition, setData, setFetching]);

  console.log(data);

  if(!!data?.header){
      return <CapiHeader header={data.header} />;
  } else if (!!data?.macro) {
    return <CapiMacro mo={data.macro} />;

  } else if (!!data?.enum) {
    return <CapiEnum em={data.enum} />;
    
  } else if (!!data?.struct) {
    return <CapiStruct st={data.struct} />;
    
  } else if (!!data?.typedef) {
    return <CapiTypedef tf={data.typedef} />;
    
  } else if (!!data?.function) {
    return <CapiFunction fn={data.function} />;
  }

  if (fetching) {
    return <h2>loading "{definition}"</h2>;
  }

  return (
    <>
      <h2>"{definition}" not found</h2>
      <div className="attributes">
        <div className="attribute-group">
          <h3>You can help us!</h3>
          <p>
            The Capibara CAPI is filled with documentation contributed by people
            like you! There's a pretty good chance that the entry that you're looking for exists, but
            someone may not have contributed any info on it.
          </p>
          <p>
            Please consider contributing this entry to help make the CAPI
            better!
          </p>
          <p>
          To get started click the link, <Link to="/docs/contribute-docs">Contributing C Library Documentation</Link>
          </p>
        </div>
      </div>
    </>
  );
}

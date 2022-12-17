import { Route, Routes } from "react-router";
import { Link } from "react-router-dom";
import BuildingAPlugin from "./docs/BuildingAPlugin";
import ContributingCLibraryDocumentation from "./docs/ContributingCLibraryDocumentation";
import UsingCapibaraProcessor from "./docs/UsingCapibaraProcessor";

export default function Docs() {
  return (
    <div className="page docs">
      <Routes>
        <Route path="/" element={<ListDocs />} exact />
        <Route path="contribute-docs" element={<ContributingCLibraryDocumentation />} exact />
        <Route path="building-a-plugin" element={<BuildingAPlugin />} exact />
        <Route path="using-capibara-processor" element={<UsingCapibaraProcessor />} exact />
      </Routes>
    </div>
  );
}

function ListDocs() {
  return (
    <>
      <h1>Documentation</h1>
      <ul>
        <li><Link to="/docs/contribute-docs">Contributing C Library Documentation</Link></li>
        <li><Link to="/docs/building-a-plugin">Building a Plugin</Link></li>
        <li><Link to="/docs/using-capibara-processor">Using the Capibara Processor</Link></li>
      </ul>
    </>
  );
}

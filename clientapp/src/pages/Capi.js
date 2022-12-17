import { Route, Routes, useLocation, useParams } from "react-router";
import { AiOutlineSearch } from "react-icons/ai";
import { useEffect, useState } from "react";
import CapiListing from "./capi/CapiListing";
import CapiDefinition from "./capi/CapiDefinition";
import CapiSearch from "./capi/CapiSearch";

export default function Capi() {
  const [rawSearchText, setRawSearchText] = useState("");
  const [bufferedSearchText, setBufferedSearchText] = useState("");

  useEffect(() => {
    const timeOutId = setTimeout(
      () => setBufferedSearchText(rawSearchText),
      500
    );
    return () => clearTimeout(timeOutId);
  }, [rawSearchText]);

  return (
    <div className="page docs capi">
      <h1>Capibara CAPI</h1>
      <div className="search">
        <input
          name="search"
          id="search"
          placeholder="Type to search for enums, types, functions..."
          onChange={(e) => setRawSearchText(e.target.value)}
          value={rawSearchText}
        />
      </div>
      <hr />
      {bufferedSearchText != "" ? (
        <CapiSearch
          searchText={bufferedSearchText}
          setBufferedSearchText={setBufferedSearchText}
          setRawSearchText={setRawSearchText}
        />
      ) : (
        <Routes>
          <Route path="/" element={<CapiListing />} exact />
          <Route path="/*" element={<CapiDefinition />} />
        </Routes>
      )}
    </div>
  );
}
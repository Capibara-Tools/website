import { capiLinkReplace, SupportedOs } from "../Utility.js";
import { Link } from "react-router-dom";
import CapiEnum from "./CapiEnum.js";
import CapiStruct from "./CapiStruct.js";

export default function CapiTypedef({ tf }) {
  /*const fields = st.fields.map((p) => {
    return (
      <>
        <li className="parameter">
          <span className="type">{capiLinkReplace(p.type)}</span>
          <span className="name">{p.name}</span>
          <span className="description">{capiLinkReplace(p.description)}</span>
        </li>
      </>
    );
  });*/

  return (
    <>
      <h4 className="breadcrumbs">
        <Link to="/capi">CAPI</Link>&ensp;/&ensp;
        <Link to={"/capi/" + tf.header.ref}>&lt;{tf.header.name}&gt;</Link>
        &ensp;/&ensp;<b>{tf.name}</b>
      </h4>
      <h2>
        typedef <code>{tf.name}</code>
        <SupportedOs affinity={tf.os_affinity} />
      </h2>
      <div className="attributes">
        <div className="attribute-group">
          <h3>summary</h3>
          <p>{capiLinkReplace(tf.summary)}</p>
        </div>
        <div className="attribute-group">
          <h3>base type</h3>
          <p className="type">{capiLinkReplace(tf.type)}</p>
        </div>
        <div className="attribute-group">
          <h3>linked type definition</h3>
          {!!tf.associated_ref?.enum && (
            <div className="quotebox">
              <CapiEnum em={tf.associated_ref.enum} />
            </div>
          )}
          {!!tf.associated_ref?.struct && (
            <div className="quotebox">
              <CapiStruct st={tf.associated_ref.struct} />
            </div>
          )}
          {!!tf.associated_ref?.none && (
            <div className="quotebox">No definition linked.</div>
          )}
        </div>
        <div className="attribute-group">
          <h3>description</h3>
          <p className="description">{capiLinkReplace(tf.description)}</p>
        </div>
      </div>
    </>
  );
}

import reactStringReplace from "react-string-replace"
import { Link } from "react-router-dom";

export const capiLinkReplace = (string) => {
    const link_match = RegExp(/\[\`(.+)\/(.+)\`\]/gm);

    return reactStringReplace(string, /(\[\`(?:.+)\/(?:.+)\`\])/gm, (match)=> {
      const capture = link_match.exec(match);
      return <Link to={"/capi/"+capture[1]+"/"+capture[2]}>{capture[2]}</Link>
    })
    //return string.replace(/\[\`(.+)\/(.+)\`\]/gm, "[`$2`](/capi/$1/$2)");
}
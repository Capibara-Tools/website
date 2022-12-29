import reactStringReplace from "react-string-replace"
import { Link } from "react-router-dom";
import { SiC, SiLinux, SiWindows } from "react-icons/si";

export const capiLinkReplace = (string) => {
    const link_match = RegExp(/\[\`(.+)\/(.+?)\`\]/);

    return reactStringReplace(string, /(\[\`(?:.+?)\/(?:.+?)\`\])/gm, (match)=> {
      const capture = link_match.exec(match);
      console.log(match)
      console.log(capture)
      return <Link to={"/capi/"+capture[1]+"/"+capture[2]}>{capture[2]}</Link>
    })
    //return string.replace(/\[\`(.+)\/(.+)\`\]/gm, "[`$2`](/capi/$1/$2)");
}

export const SupportedOs = ({affinity}) => {
  return(
    <span className="supported-oses">
      <ul>
        {affinity.includes("windows") && <li><SiWindows/></li>}
        {affinity.includes("std") && <li><SiC/></li>}
        {affinity.includes("unix") && <li><SiLinux/></li>}
      </ul>
    </span>
  )
}
import { Link } from "react-router-dom";

export default function BuildingAPlugin() {
  return (
    <>
      <h1>Building a Plugin</h1>
      <p>
        Plugins serve as a major component of the Capibara ecosystem. In fact,
        the entire project was designed to be IDE agnostic to make the creation
        and development of plugins accessible.
      </p>
      <h2>Getting Started</h2>
      <p>
        To understand how plugins should work, we first need to review how the
        entire Capibara project works from contribution to capibara enabled
        intelligent coding in your favorite editor.
      </p>
      <h3>The Repository</h3>
      <p>
        The Capibara github repository,&ensp;
        <a href="https://github.com/Capibara-Tools/capibara">here</a>, is filled
        with many contributions from people like you, but these documents are
        stored in <code>.yaml</code> files. Ultimately, it's an easy format for
        a person to navigate through but a nasty job for a computer to do on the
        fly. For more info on the repository format see,{" "}
        <Link to="/docs/contribute-docs">
          Contributing C Library Documentation
        </Link>
      </p>
      <h3>Capibara Processor</h3>
      <p>
        In order to accumulate the human readable data into something a bit more
        machine oriented we use the&ensp;
        <a href="https://github.com/Capibara-Tools/capibara-processor">
          Capibara Processor
        </a>
        . This tool converts the folder structure into a compact but more ugly{" "}
        <code>capibara.json</code> file. This is the file that your plugin will
        ultimately end up using.
      </p>
      <h3>The Website</h3>
      <p>
        Using a CI/CD system, the <Link to="/">capibara.tools</Link> website,
        always maintains an up-to-date processed version of the{" "}
        <code>capibara.json</code> file. And this file is exposed via an
        endpoint here,{" "}
        <a href="https://capibara.tools/capibara.json">
          https://capibara.tools/capibara.json
        </a>
      </p>
      <h3>Your Plugin</h3>
      <p>
        Your plugin should make contact with and cache the{" "}
        <code>capibara.json</code> file, it should also offer support for
        periodically checking for an updated file either manually or
        automatically at author's convenience.
      </p>
      <h2>
        <code>capibara.json</code> File
      </h2>
      <p>
        The <code>capibara.json</code> file, is emitted by the processor, so if
        something about the format seems unclear it's best to check the
        processor code. But obviously, if that was a staple of a plugin
        developer's development experience, then this would be bad
        documentation.
      </p>
      <h3>File Overview</h3>
      <pre className="code overflow">
        <b>
          <code>capibara.json</code>
        </b>
        <hr />
        {`{
  "build_date":	"2022-12-29T16:48:36.988626935+00:00" - The UTC timestamped processing date.
  //This is the URL that can be combined with reference links to provide actual links to hosted documentation.
  "reference_url":	"https://capibara.tools" 
  "headers":    […] - Contains a list of the all the documented headers.
  "macros":     […] - Contains a list of the all the documented macros.
  "enums":      […] - Contains a list of the all the documented enums.
  "structs":    […] - Contains a list of the all the documented structs.
  "typedefs":   […] - Contains a list of the all the documented typedefs.
  "functions":  […] - Contains a list of the all the documented functions.
}`}
      </pre>

      <h3>Headers</h3>
      <pre className="code overflow">
        {`{
  "ref": "arpa/inet", - This is the reference path of the header
  "name": "arpa/inet.h", - This is actual name of the header
  "summary": "A collection of internet related utilities.", - A brief summary of the header.
  "os_affinity": [ - An array containing the collective affinities of all definitions belonging to this header.
    "unix" - May contain "unix", "std", or "windows" or any combination.
  ]
}`}
      </pre>
      <h3>Macros</h3>
      <pre className="code overflow">
        <b>
          <code>object-like</code>
        </b>
        <hr />
        {`{
  "name": "NULL", - Name of the defintion.
  "header": { - Contains a tiny bit of info about header file.
    "ref": "string", - This is the header ref path
    "name": "string.h" - This is the header's actual name.
  },
  "summary": "The value of a null pointer constant.", - Just a summary of the macro in question.
  "kind": { - Technically an enum-like field, can contain either function or object.
    "object": {} - An object-like macro has has no nested fields.
  },
  "description": "It may be defined as ((void*)0), 0 or 0L depending on the compiler vendor. Frequently\nused as a possible return value for functions that may or may not return a defined result\nbased on arguments.\n",
  "os_affinity": ["std"] - May contain "unix", "std", or "windows" or any combination.
}`}
      </pre>
      <pre className="code overflow">
        <b>
          <code>function-like</code>
        </b>
        <hr />
        {`{
  "name": "assert",
  "header": {
    "ref": "assert",
    "name": "assert.h"
  },
  "summary": "The value of a null pointer constant.",
  "kind": {
    "function": { - A function-like macro contains nested fields.
      "returns": {
        "type": "void", - The macro's return type. 
        "description": "Macro does not return." - A brief description of what it returns.
      },
      "parameters": [ - A list of macro function arguments. Same as function parameters but without types.
        {
          "name": "expression", - Name of macro function argument
          //A description of the macro function argument.
          "description": "Any expression that reduces to an integer sentinel value of TRUE, not 0, or FALSE, 0."
        }
      ]
      "examples": [
        {
          "title": "Using assert to verify expected behavior",
          "code": "#include <stdio.html>\n\nint main(int argc, char ** argv){\nassert(1==1)\n}\n"
        }
      ]
    }
  },
  // A description of the macro as a whole.
  "description": "If the expression evaluates to TRUE, the macro does nothing. If it evaluates to false, it writes an error\nstderr and the program dies. Typically used to diagnose or test various pieces of code.\n",
  "os_affinity": [
    "std"
  ]
}`}
      </pre>
      <h3>Enums</h3>
      <pre className="code overflow">
        {`{
  "name": "_WSAEcomparator",
  "header": {"ref": "winsock2","name": "winsock2.h"},
  "summary": "An enumeration type used for defining the semantics of version comparison.",
  "variants": [ // Similar to function parameters except there's no type specified.
    {
      "name": "COMP_EQUAL = 0",
      "description": "Used for determining if a version is equal to a given value."
    },
    {
      "name": "COMP_NOTLESS",
      "description": "Used to determine if a version is not less than a given value."
    }
  ],
  "description": "Used for version comparison semantics. This enum type is rarely referenced directly and\nactually has 3 type definitions: [\`winsock2/WSAECOMPARATOR\`], *[\`winsock2/PWSAECOMPARATOR\`],\n*[\`winsock2/LPWSAECOMPARATOR\`]. It's also indirectly a member of the struct, [\`winsock2/_WSAVersion\`]\nby means of type definition.\n",
  "os_affinity": ["windows"]
}`}
      </pre>
      <h3>Structs</h3>
      <pre className="code overflow">
        {`{
  "name": "in_addr",
  "header": {
    "ref": "netinet/in",
    "name": "netinet/in.h"
  },
  "summary": "An internet address struct capable of representing an ip address.",
  "fields": [ //Same exact sub fields as function parameters but the intended meaning and use is obviously different.
    {
      "name": "server_address",
      "type": "[\`netinet/in/in_addr_t\`]",
      "description": "The ip address of the server."
    }
  ],
  "description": "The in_addr struct is a component of the [\`netinet/in/sock_addr_in\`] structure. This struct is commonly\nused with internet addressing. And it's used frequently in socket networking.\n",
  "os_affinity": [
    "unix"
  ]
}`}
      </pre>
      <h3>Typedefs</h3>
      <pre className="code overflow">
        {`{
  "name": "PWSAECOMPARATOR",
  "header": {
    "ref": "winsock2",
    "name": "winsock2.h"
  },
  "summary": "A pointer type for the enum, [\`winsock2/_WSAEcomparator\`], concerned with Winsock2 versioning semantics.",
  "type": "*[\`winsock2/_WSAEcomparator\`]",
  "associated_ref": {
    "enum": {
      "name": "_WSAEcomparator",
      "header": {
        "ref": "winsock2",
        "name": "winsock2.h"
      },
      "summary": "An enumeration type used for defining the semantics of version comparison.",
      "variants": [
        {
          "name": "COMP_EQUAL = 0",
          "description": "Used for determining if a version is equal to a given value."
        },
        {
          "name": "COMP_NOTLESS",
          "description": "Used to determine if a version is not less than a given value."
        }
      ],
      "description": "Used for version comparison semantics. This enum type is rarely referenced directly and\nactually has 3 type definitions: [\`winsock2/WSAECOMPARATOR\`], *[\`winsock2/PWSAECOMPARATOR\`],\n*[\`winsock2/LPWSAECOMPARATOR\`]. It's also indirectly a member of the struct, [\`winsock2/_WSAVersion\`]\nby means of type definition.\n",
      "os_affinity": [
        "windows"
      ]
    }
  },
  "description": "One of several type definitions over the [\`winsock2/_WSAEcomparator\`] enum.\n",
  "os_affinity": [
    "windows"
  ]
}`}
      </pre>
      <p>
        Typedefs are very straightforward excepting the{" "}
        <code>associated_ref</code> field. This field like the kind field on the
        macro represents an enum-like object. It may contain an enum, a struct,
        or none. In the above example we see it contains an enum. The none
        object is simply <code>"none": {`{}`}</code>. And the <code>"enum":</code> and <code>"struct":</code> objects
        mirror their respective formats shown earlier.
      </p>
      <h3>Functions</h3>
      <pre className="code overflow">
        {` "name": "strcat",
  "header": {
    "ref": "string",
    "name": "string.h"
  },
  "summary": "Concatenates a source string onto the end of a destination string.",
  "returns": {
    "type": "char *", //The return type of the function.
    "description": "A pointer to the destination string."
  },
  "parameters": [
    {
      "name": "dest",
      "type": "char *",
      "description": "A pointer to the destination string. Must be large enough to contain the resulting string."
    },
    {
      "name": "source",
      "type": "const char *",
      "description": "A pointer to the source string. The source must not overlap the destination."
    }
  ],
  "description": "Note: [\`string/strncat\`] is a similar function that should generally be preferred\nbecause it has a character limit while strcat does not. This means strcat will more\nlikely be vulnerable to overflow attacks if used without care. The strcat function is\ndesigned to operate exclusively on strings and as such it will terminate on the null\ncharacter. This function concatenates a non-overlapping source string onto the end\nof the destination string. It also returns a pointer to the destination string.\n",
  "examples": [
    {
      "title": "Using strcat to concatenate two strings.",
      "code": "#include <stdio.html>\n\nint main(int argc, char ** argv){\nchar buffer[50] = "Hello";\nchar append[50] = "World";\nstrcat(buffer,append);\n}\n"
    }
  ]
  "associated": [ //This contains a list of associated functions think of like a see also.
    "string/strncat"
  ],
  "os_affinity": ["std"]
}`}</pre>
<p>Backtick reference links can be expected to appear in summaries, types, and descriptions.</p>
      <h2>Finalizing Your Extension</h2>
      <h3>Licensing</h3>
      <p>
        All of our code is MIT Licensed and we hope you are willing to
        contribute your code under the same license, but any open-source license
        is allowed. The Capibara documentation can obviously be used by a
        privatized extension that offers a "freemium" model or just charges out
        right for features, but we will not necessarily collaborate with or
        extend support to a plugin or developer that does so.
      </p>
      <h3>Sponsors & Donations</h3>
      <p>
        Requests for sponsors and donation as a means of support for your hard
        labor, is permitted and encouraged as long as it isn't annoying and
        gratuitous.
      </p>
      <h3>Publishing</h3>
      <p>
        After your extension is ready for general public release, notify us and
        we can move it under the Capibara-Tools github organization and provide
        links to it here on our website.
      </p>
    </>
  );
}

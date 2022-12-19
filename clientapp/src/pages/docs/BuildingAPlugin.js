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
      <h3>File Specification</h3>
      <pre className="code overflow">
        <b>
          <code>capibara.json</code>
        </b>
        <hr />
        {`{  
  "build_date": "2022-12-06T04:03:57.535553262+00:00", // This is a UTC timestamped date of processing.
  "reference_url": "https://capibara.tools",           // This is the url that you can use to lookup backticked reference links.
  "headers": [                                         // Contains a list of all the documented headers
    { "ref": "winsock2", "name": "winsock2.h", "os_affinity": ["windows"] },
    { "ref": "arpa/inet", "name": "arpa/inet.h", "os_affinity": ["unix"] }

    // ref is the definition lookup link
    // name is the actual header file name
    // os_affinity is an array that contains the list of systems
    // - you will find the header file on. Can contain "unix", "windows", or "std"
  ],
  "functions": [                   // Contains a list of all the documented functions
    {
      "name": "ntohl",             // The function name
      "header": {                  // A header summary same info as headers above.
        "ref": "arpa/inet",
        "name": "arpa/inet.h",
        "os_affinity": ["unix"]
      },
      "summary": "Converts an [\`inttypes/uint32_t\`] from network byte order to host byte order.",
                                           // ^----- A summary of the function
      "returns": "[\`inttypes/uint32_t\`]",  // The return type of the function
      "parameters": [                      // An array of function parameters
        {
          "name": "netlong",               // Name of the parameter
          "type": "[\`inttypes/uint32_t\`]", // The reference linked type of the parameter
          "description": "A short in network byte order." // A brief description of the parameter
        }
      ],
      "description": "Socket function calls are always made with ports and addresses in a Big-endian\\nformat also known as network byte order. Because the endianess of host bytes may\\nvary depending on the host software and hardware, the ntohs function is used to ensure\\nthat shorts in network byte order can have their value represented natively irrespective \\nof the native endianess of the host.\\n",      
      "associated": ["arpa/inet/htons", "arpa/inet/htonl", "arpa/inet/ntohs"]

      // description is a long description of the entire function and its behavior,
      // - contains \\n characters, and possible reference links.
      // associated contains an array of references to other definitions
    }
  ]
}`}
      </pre>
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
        Requests for sponsors and donation as a means of support for your hard labor, is permitted and encouraged
        as long as it isn't annoying and gratuitous.
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

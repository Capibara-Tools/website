import { Link } from "react-router-dom";

export default function ContributingCLibraryDocumentation() {
  return (
    <>
      <h1>Contributing C Library Documentation</h1>
      <p>
        Documenting a C library is farely simple. In the Capibara github
        repository,&ensp;
        <a href="https://github.com/Capibara-Tools/capibara">here</a>, there's
        already a few documented libraries that should assist in providing a
        format.
      </p>
      <h2>Header File Folder Structure</h2>
      <p>
        Most libraries you try to document there will likely contain more than
        one header file. In Capibara each C library header file is represented
        as a folder containing a <code>meta.yaml</code> file.
      </p>
      <h3>Translating Headers into a Folder Structure</h3>
      <p>
        Consider <code>&lt;arpa/inet.h&gt;</code> a relatively standard header
        file available on unix systems. In Capibara this would be represented as
        a folder named <code>arpa</code>. Inside that folder you would have{" "}
        <code>inet</code>, aka a terminal folder. Notice we dropped the{" "}
        <code>.h</code> extension.
      </p>
      <p>
        You're probably wondering how we distingush between a folder containing
        a header file e.g. <code>arpa</code> and a header file represented as a
        folder e.g. <code>inet</code>. That's where the <code>meta.yaml</code>{" "}
        comes in. A <code>meta.yaml</code> lives exclusively in header file
        folders aka terminal folders.
      </p>
      <h3>
        A folder with meta.yaml represents a C header file and should not
        contain subfolders
      </h3>
      <p>
        It's important to note that the existence of a <code>meta.yaml</code>{" "}
        files indicates that the containing folder should not contain
        subdirectories. You would never see a{" "}
        <code>&lt;arpa/inet.h/sub_header.h&gt;</code> so it reasons that{" "}
        <code>meta.yaml</code> indicates a terminal point in the file tree. By
        the same qualifications, any folder without sub-folder should contain a{" "}
        <code>meta.yaml</code> file. Below is an sample folder layout.
      </p>
      <pre className="code">
        arpa/
        <br />
        &ensp;&ensp;- inet/
        <br />
        &ensp;&ensp;&ensp;&ensp;- meta.yaml
        <br />
        &ensp;&ensp;&ensp;&ensp;- fn-htons.yaml
        <br />
        &ensp;&ensp;&ensp;&ensp;- fn-htonl.yaml
        <br />
        &ensp;&ensp;&ensp;&ensp;- fn-ntohs.yaml
        <br />
        &ensp;&ensp;&ensp;&ensp;- fn-ntosl.yaml
        <br />
        winsock2/
        <br />
        &ensp;&ensp;- meta.yaml
        <br />
        &ensp;&ensp;- em-_WSAEcomparator.yaml
        <br />
        &ensp;&ensp;- tf-PWSAECOMPARATOR.yaml
        <br />
        &ensp;&ensp;- tf-WSAECOMPARATOR.yaml
        <br />
      </pre>
      <h2>Terminal Folders</h2>
      <p>
        In the above sample, you're probably wondering what all those{" "}
        <code>fn-somename.yaml</code> files are. In capibara all header file
        definitions get thir own <code>.yaml</code> file. This was done for ease
        of maintainability when adding or updating the documentation. Currently
        there are 5 prefixes:
        <ul>
          <li>
            <code>mo-</code> indicates the file documents a macro.
          </li>
          <li>
            <code>em-</code> indicates the file documents a enum.
          </li>
          <li>
            <code>st-</code> indicates the file documents a struct.
          </li>
          <li>
            <code>tf-</code> indicates the file documents a typedef.
          </li>
          <li>
            <code>fn-</code> indicates the file documents a function.
          </li>
        </ul>
      </p>
      As you might have guessed, to derive the file name the prefix is simply
      followed by the actual name of whatever definition is in question. Later
      on we'll discuss the formats used in each file.
      <h3>Terminal Folder Metadata</h3>
      <p>
        The <code>meta.yaml</code> or terminal folder metdata file contains all
        of the pertinent metadata for a given C library header. Right now the
        list of definitions is pretty small but this will likely increase in the
        future. Below is a sample file.
      </p>
      <pre className="code">
        <b>
          <code>arpa/inet/meta.yaml</code>
        </b>
        <hr />
        summary: A collection of internet related utilities.{" "}
        <i>{"//A summary of the header and what it contains."}</i>
        <br />
      </pre>
      <h2>Reference Linking</h2>
      <p>
        As you will sample files later on, the{" "}
        <code>[`brackets and backtick`]</code> combination when used inside a
        string signifies that the identified type can be looked up and should
        link to some other definition in the Capibara project. This feature is
        implemented by this website and some of the plugins.
      </p>
      <h3>Associated Definitions</h3>
      <p>
        The <code>associated:</code> list found on functions should also contain
        definitions in their linkable format however. You don't need backticks
        here because the link is implied.
      </p>
      <p>
        The <code>associated_ref:</code> which is used to document typedefs also
        takes the linkable format without backticks.
      </p>
      <h2>Macros</h2>
      <p>
        Macros come in two varieties, namely, object-like and function-like. As
        such both variants must be documentable but they also reside in the same
        type. The extended aspects of these sub-types of macros are nested under
        a <code>kind</code> property which may either be set to{" "}
        <code>!function</code> or <code>!object</code>. If you're confused by
        this, hopefully the sample below will help to clear this up.
      </p>
      <pre className="code">
        <b>
          <code>string/mo-NULL.yaml (object-like)</code>
        </b>
        <hr />
        {`summary: "The value of a null pointer constant."
kind: !object //Has no subproperties so !object is sufficient.
description: |
  It may be defined as ((void*)0), 0 or 0L depending on the compiler vendor. Frequently
  used as a possible return value for functions that may or may not return a defined result
  based on arguments.
os_affinity: ["std"]`}
      </pre>
      <p>
        As you can see between the first and second examples there is a distinct
        difference between object-like and functional-like macros. However, this
        chosen format is very unimposing and extendable.
      </p>
      <pre className="code">
        <b>
          <code>assert/mo-assert.yaml (function-like)</code>
        </b>
        <hr />
        {`summary: "A macro function that is used to diagnose or test various pieces of code."
kind: !function //Has subproperties that help to document the functional behavior.
  returns:
    type: "void"
    description: "Macro does not return."
  parameters:
    - name: expression
      description: "Any expression that reduces to an integer sentinel value of TRUE, not 0, or FALSE, 0."
  examples: [
    - title: "Using assert to verify expected behavior"
      code: |
        #include <stdio.html>
        
        int main(int argc, char ** argv){
          assert(1==1)
        }
  ]
description: |
  If the expression evaluates to TRUE, the macro does nothing. If it evaluates to false, it writes an error
  stderr and the program dies. Typically used to diagnose or test various pieces of code.
os_affinity: ["std"]`}
      </pre>
      <p>
        <ul>
          <li>
            <code>os_affinity</code> is a list of environments this function is
            commonly found in, may contain "unix", "windows", "std", or a
            combination.
          </li>
        </ul>
      </p>
      <h2>Enums</h2>
      <p>
        Enums are probably the simplest documentable types. Their definitions
        are fairly short and there really isn't much to be said, however you'll
        still want to a see a sample.
      </p>
      <pre className="code">
        <b>
          <code>winsock2/em-_WSAEcomparator.yaml</code>
        </b>
        <hr />
        {`summary: "An enumeration type used for defining the semantics of version comparison."
variants:
  - name: "COMP_EQUAL = 0"
    description: Used for determining if a version is equal to a given value.
  - name: "COMP_NOTLESS"
    description: Used to determine if a version is not less than a given value.
description: |
  Used for version comparison semantics. This enum type is rarely referenced directly and
  actually has 3 type definitions: [\`winsock2/WSAECOMPARATOR\`], *[\`winsock2/PWSAECOMPARATOR\`],
  *[\`winsock2/LPWSAECOMPARATOR\`]. It's also indirectly a member of the struct, [\`winsock2/_WSAVersion\`]
  by means of type definition.
os_affinity: ["windows"]`}
      </pre>
      <h2>Structs</h2>
      <p>
        The struct is another fairly simple type. Struct fields effectively are
        the same object as a function's parameters, but named differently for
        clarities sake.
      </p>
      <pre className="code">
        <b>
          <code>netinet/in/st-in_addr.yaml</code>
        </b>
        <hr />
        {`summary: An internet address struct capable of representing an ip address.
fields:
  - name: server_address
    type: "[\`netinet/in/in_addr_t\`]"
    description: "The ip address of the server."
description: |
  The in_addr struct is a component of the [\`netinet/in/sock_addr_in\`] structure. This struct is commonly
  used with internet addressing. And it's used frequently in socket networking.
os_affinity: ["unix"]`}
      </pre>
      <h2>Typedefs</h2>
      <p>
        Typedefs are a bit more complicated in terms of how they're serialized
        and deserialized but for in the human-readable <code>.yaml</code> format
        they're very short and sweet.
      </p>
      <pre className="code">
        {`summary: "A pointer type for the enum, [\`winsock2/_WSAEcomparator\`], concerned with Winsock2 versioning semantics."
type: "*[\`winsock2/_WSAEcomparator\`]"
associated_ref: "winsock2/_WSAEcomparator"
description: |
  One of several type definitions over the [\`winsock2/_WSAEcomparator\`] enum.
os_affinity: ["windows"]`}
      </pre>
      <p>
        <ul>
          <li>
            <code>associated_ref</code> as mentioned before, should contain the
            typedef base type in a reference linkable format if it is a struct
            or enum. Otherwise it should be left empty. This field instructs the
            processor to lookup and load the associated definition into the
            typedef definition when it generates the <code>capibara.json</code>{" "}
            file.
          </li>
        </ul>
      </p>
      <h2>Functions</h2>
      <p>
        The bread and butter of C library definitions, functions, are the
        lengthiest and likely most tedious definitions to document. The sample
        below should generally clear up any questions you have about formatting.
      </p>
      <pre className="code">
        <b>
          <code>arpa/inet/fn-htonl.yaml</code>
        </b>
        <hr />
        {`summary: "Converts an [\`inttypes/uint32_t\`] from host byte order to network byte order."
returns:
  type: "[\`inttypes/uint32_t\`]"
  description: "The hostlong in network byte order."
parameters:
  - name: "hostlong"
    type: "[\`inttypes/uint32_t\`]"
    description: "A long in host byte order."
description: |
  Socket function calls are always made with ports and addresses in a Big-endian
  format also known as network byte order. Because the endianess of host bytes may
  vary depending on the host software and hardware, the htonl function is used to ensure
  that a long being provided to the socket functions is Big-endian irrespective of the native
  endianess of the host.
associated: ["arpa/inet/htons", "arpa/inet/ntohl", "arpa/inet/ntohs"]
examples: []
os_affinity: ["unix"]`}
      </pre>
      <p>
        <ul>
          <li>
            <code>examples</code> is a recently added array field that can be used 
            to share example snippets of code showing how the function in question might
            be used. It contains two fields, <code>title</code> and <code>code</code>. The code
            field should be written using the multi-line format like description, code will
            be rendered as in without considering markdown. So to document aspects of your code use 
            inline comments e.g <code>//</code> as though you were actually writing C.
          </li>
        </ul>
      </p>
      <h2>Testing Your Contribution</h2>
      <p>
        To test your new definitions we recommend running them through{" "}
        <a href="https://github.com/Capibara-Tools/capibara-processor">
          Capibara Processor
        </a>
        . This tool is used to generate the JSON file that is distributed here
        on the website, and as such it's the perfect tool to test whether your
        new definitions will process as expected. The tool ingests the header
        folder structure and generates a fat JSON file.
        <h3>Capibara Processor Documentation</h3>
        You can find the docs for this tool here,{" "}
        <Link to="/docs/using-capibara-processor">
          Using Capibara Processor
        </Link>
        .
      </p>
    </>
  );
}

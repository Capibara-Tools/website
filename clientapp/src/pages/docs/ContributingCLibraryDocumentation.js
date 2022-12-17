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
        &ensp;&ensp;- fn-getsockopt.yaml
        <br />
      </pre>

      <h2>Terminal Folders</h2>
      <p>
        In the above sample, you're probably wondering what all those{" "}
        <code>fn-somename.yaml</code> files are. In capibara all header file
        function definitions get thir own <code>.yaml</code> file. This was done
        for ease of maintainability when adding or updating the documentation.
      </p>

      <h3>Terminal Folder Metadata</h3>
      <p>
        The <code>meta.yaml</code> or terminal folder metdata file contains all
        of the pertinenet metadata for a given C library header. Right now the
        list of definitions is pretty small but this will likely increase in the
        future. Below is a sample file.
      </p>

      <pre className="code">
        <b>
          <code>arpa/inet/meta.yaml</code>
        </b>
        <hr />
        os-affinity: ["unix"]{" "}
        <i>
          //This list may contain "unix", "windows", "std", or a combination of
          any of those options.
        </i>
        <br />
      </pre>

      <h3>Functions</h3>
      <p>
        As you might have guessed, the <code>fn-</code> prefix simply indicates
        that the file documents a function because Capibara will support type
        and enum definition documentation as well. The rest of the file name is
        just the actual function name. Below is a sample function file{" "}
        <code>fn-htonl.yaml</code>.
      </p>
      <pre className="code">
        <b>
          <code>arpa/inet/fn-htonl.yaml</code>
        </b>
        <hr />
        summary: "Converts an [`inttypes/uint32_t`] from host byte order to
        network byte order."
        <br />
        returns: "[`inttypes/uint32_t`]"
        <br />
        parameters:
        <br />
        - name: "hostlong"
        <br />
        &ensp;&ensp;type: "[`inttypes/uint32_t`]"
        <br />
        &ensp;&ensp;description: "A long in host byte order."
        <br />
        description: |
        <br />
        &ensp;&ensp;Socket function calls are always made with ports and
        addresses in a
        <br />
        &ensp;&ensp;Big-endian format also known as network byte order. Because
        the
        <br />
        &ensp;&ensp;endianess of host bytes may vary depending on the host
        software and
        <br />
        &ensp;&ensp;hardware, the htonl function is used to ensure that a long
        being
        <br />
        &ensp;&ensp;provided to the socket functions is Big-endian irrespective
        of the
        <br />
        &ensp;&ensp;native endianess of the host.
        <br />
        associated: ["arpa/inet/htons", "arpa/inet/ntohl", "arpa/inet/ntohs"]{" "}
        <i>//A list of associated functions and types</i>
      </pre>
      <h2>Reference Linking</h2>
      <p>
        As you can see in the above file, the{" "}
        <code>[`brackets and backtick`]</code> combination when used inside a
        string signifies that the indentified type can be looked up and should
        link to some other definition in the Capibara project. This feature is
        implemented by this website and some of the plugins.
      </p>
      <h3>Associated Definitions</h3>
      <p>
        The <code>associated:</code> list should also contain defintions in
        their linkable format however. You don't need backticks here because the
        link is implied.
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

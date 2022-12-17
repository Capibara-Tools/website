export default function UsingCapibaraProcessor() {
  return (
    <>
      <h1>Using Capibara Processor</h1>
      <p>
        Capibara Processor is a tool that takes the human readable
        documentation from the the Capibara github repository,&ensp;
        <a href="https://github.com/Capibara-Tools/capibara">here</a>, and
        outputs the <code>capibara.json</code> file that is consumed by this
        website and Capibara plugins.
      </p>
      <h2>Building Capibara Processor</h2>
      <p>
        You can download the source to Capibara Processor,&ensp;
        <a href="https://github.com/Capibara-Tools/capibara-processor">here</a>.
        The tool is written in Rust, so you'll need the Rust toolchain to
        compile it. After you've acquired the toolchain, simply enter the source
        code directory and run <code>cargo build --release</code>. The binary
        will be output at <code>target/release/capibara-processor</code>.
      </p>
      <h2>Running Capibara Processor</h2>
      <h3>How To Run</h3>
      <p>
        If you're using cargo, you may find it easier to just use{" "}
        <code>cargo run --release -- processor_arguments_here</code>. Otherwise,
        just building the binary and executing it without cargo is another
        option.
      </p>
      <h3>Arguments</h3>
      <p>
        In it's current state, the processor provides very little feedback.
        However it does take two arguments:
      </p>
      <ol>
        <li>
          <code>capibara root folder path</code>: this is either an absolute or
          relative path to the root folder of the capibara C documentation
          repository. For example, <code>"../capibara"</code>
        </li>
        <li>
          <code>capibara resource lookup URL</code>: this is the URL where the{" "}
          <code>capibara.json</code> file is located. For example,{" "}
          <code>"https://capibara.tools"</code>
        </li>
      </ol>
      <p>
        Here is a sample execution line:{" "}
        <code>./capibara-processor "../capibara" "https://capibara.tools"</code>
      </p>
      <h3>Output</h3>
      <p>
        Capibara Processor will output a <code>capibara.json</code> in the
        working directory from which it was executed. You should inspect the
        output to make sure it is what you expect. Otherwise, there is likely an
        error in the formatting of the capibara repository.
      </p>
    </>
  );
}

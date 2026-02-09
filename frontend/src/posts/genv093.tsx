const GenesisV093 = () => {
  return (
    <div className="post-seven">
      <p>
        Good Morning!
        <br />
        This is my first official post about{' '}
        <strong>
          <em>Genesis</em>
        </strong>
        , so I want to share a bit of backstory before diving into development
        progress and recent updates.
        <br />
        <br />
        Genesis began as a curiosity interest in the development of programming
        languages for a class I took in College. But what started as a simple
        experiment quickly evolved into a full-fledged passion project, driven
        by a desire to help others navigate their journey through web
        development. Frustrated by the unpredictability of JavaScript's dynamic
        typing and the complexity of modern tooling, I wanted to create a
        language that could offer a more structured and unified experience.
        Genesis brings together the reliability of static typing, the clarity of
        clean, well-defined C-style syntax, and the flexibility of both
        functional and imperative programming, all within a single, cohesive
        language built for the modern web.
      </p>
      <h2>✨What is Genesis?</h2>
      <p>
        At its core, Genesis is a statically typed, high-level programming
        language designed specifically for the modern web. It blends the
        familiar feel of C-style syntax with inspiration from languages like C++
        and TypeScript. Functional and imperative paradigms coexist, allowing
        developers to write expressive code that's both readable and performant.
        <br />
        <br />
        Unlike other languages that require a custom runtime or new tooling
        ecosystem, Genesis is built, with interoperability in mind. It
        transpiles directly to JavaScript, meaning it runs anywhere JavaScript
        does: in the browser, in Node.js, or embedded within larger
        applications. No virtual machine. No heavy overhead. Just clean Genesis
        code that becomes deployable JavaScript. This means Genesis code is
        instantly portable and ready to deploy without needing a separate
        runtime or complex toolchain.
      </p>
      <h2>🚧 Current Development & Version 0.9.3 Update</h2>
      <p>
        As of June 16th, 2025, Genesis is still under active development and is{' '}
        <strong>not yet production ready</strong>. However, I've made strong
        progress in laying the foundation for the language's compiler pipeline.
        <br />
        <br />
        Here's what currently functional in version 0.9.3:
      </p>
      <ul>
        <li>
          Genesis can now tokenize .gen source files, breaking input down into
          meaningful units such as identifiers, literals, operators, and
          keywords.
        </li>
        <li>
          The lexer's output is passed to the parser, which constructs a robust
          Abstract Syntax Tree, or AST for short, that captures the structure
          and meaning of the original Genesis code.
        </li>
        <li>
          Genesis translates the AST into JavaScript syntax using a custom
          transpiler. The output is then handled by the code generator, which
          writes clean JavaScript files that mirror the original Genesis logic.
        </li>
        <li>
          The standard library is evolving steadily. It includes utility
          functions that can be imported into Genesis projects or even reused
          directly in JavaScript environments.
        </li>
      </ul>
      <p>
        Genesis currently has support for: Variable delcaration and assignmnet,
        Simple control flow using basic statemetns, Expression evaluation,
        String and number handling, and Integration of standard library
        functions.
      </p>
      <h2>🔍 A Glimpse into the Compiler Flow</h2>
      <p>
        To give you a better idea of how Genesis works behind the scenes, here's
        a quick breakdown of its pipeline.
      </p>
      <ul>
        <li>
          Genesis reads a .gen file line by line, breaking it into tokens, each
          labeled by type (e.g., int, identifier, string, etc.). This raw array
          of tokens captures the core syntax elements of your code.
        </li>
        <li>
          The parser takes the token array and transforms it into an AST, a
          tree-like structure that models how the code is meant to behave.
        </li>
        <li>
          The AST is passed into a transpiler, which rewrites it into equivalent
          JavaScript code while preserving semantics. It converts your Genesis
          logic into something browsers and Node.js can run.
        </li>
        <li>
          Finally, the JavaScript output is written to dist in a new file,
          clean, readable, and ready to execute or bundle.
        </li>
      </ul>
      <p>
        Genesis is still in its early days, but it's evolving quickly. The
        vision is to provide a beautiful balance between structure and
        creativity, offering developers a tool that makes writing code feel
        intuitive, safe, and enjoyable, without compromising performance or
        ecosystem compatibility.
        <br />
        <br />
        If you're interested in the progress or want to contribute, keep an eye
        out for upcoming updates, example projects, and documentation. Click{' '}
        <a href="https://github.com/Simpleboi/Genesis" target="_blank">
          Here
        </a>{' '}
        if you'd like to see the GitHub repo for Genesis. Version 1.0 will be
        focused on stability, developer experience, and real-world usage. Thanks
        for following the journey. Let's keep building.
        <br />- <span>&lt;Nate/&gt;</span>
      </p>
    </div>
  );
};

export default GenesisV093;

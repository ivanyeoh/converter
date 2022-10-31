/* eslint-disable turbo/no-undeclared-env-vars */

export default function Web() {
  return (
    <main className="container">
      <h1>FREE Docx to PDF</h1>
      <p>Usage</p>
      <pre>
        <code>curl -OJ -F file=@path/to/your.docx {process.env.NEXT_PUBLIC_HOST}/api/v1/docx-to-pdf</code>
      </pre>
    </main>
  );
}

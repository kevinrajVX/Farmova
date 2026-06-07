export default function Home() {
  return (
    <main className="page">
      <div className="card">
        <span className="badge">🌱 Next.js</span>
        <h1>Farmova</h1>
        <p>
          Your app is up and running. This is a clean starter — edit{" "}
          <code>app/page.js</code> and the page reloads automatically.
        </p>
        <div className="links">
          <a
            className="btn primary"
            href="https://nextjs.org/docs"
            target="_blank"
            rel="noreferrer"
          >
            Read the docs
          </a>
          <a
            className="btn"
            href="https://nextjs.org/learn"
            target="_blank"
            rel="noreferrer"
          >
            Learn Next.js
          </a>
        </div>
      </div>
    </main>
  );
}

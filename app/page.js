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
          <a className="btn primary" href="/login">
            Tenant sign in
          </a>
          <a className="btn" href="/dashboard">
            Go to dashboard
          </a>
        </div>
      </div>
    </main>
  );
}

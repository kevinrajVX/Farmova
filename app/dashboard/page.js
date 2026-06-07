import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySession } from "@/lib/auth";
import LogoutButton from "./logout-button";

export default async function DashboardPage() {
  const store = await cookies();
  const session = await verifySession(store.get(SESSION_COOKIE)?.value);

  return (
    <main className="page">
      <div className="card dash">
        <div className="dash-head">
          <span className="badge">🌱 {session?.tenant} tenant</span>
          <LogoutButton />
        </div>
        <h1 className="auth-title">Welcome back</h1>
        <p className="auth-sub">
          Signed in as <strong>{session?.username}</strong>.
        </p>

        <div className="stats">
          <div className="stat">
            <span className="stat-num">12</span>
            <span className="stat-label">Active fields</span>
          </div>
          <div className="stat">
            <span className="stat-num">340</span>
            <span className="stat-label">Acres tracked</span>
          </div>
          <div className="stat">
            <span className="stat-num">8</span>
            <span className="stat-label">Open tasks</span>
          </div>
        </div>

        <p className="auth-sub small">
          This is a protected page — only signed-in tenant users can reach it.
        </p>
      </div>
    </main>
  );
}

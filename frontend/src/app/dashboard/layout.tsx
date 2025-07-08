// app/dashboard/layout.tsx
import { ReactNode } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: 250,
          backgroundColor: "#003366",
          color: "white",
          padding: 20,
          minHeight: "100vh",
        }}
      >
        <h2>Dashboard</h2>
        <nav>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <a
                href="/dashboard"
                style={{ color: "white", textDecoration: "none" }}
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/dashboard/properties"
                style={{ color: "white", textDecoration: "none" }}
              >
                Properties
              </a>
            </li>
            <li>
              <a
                href="/dashboard/users"
                style={{ color: "white", textDecoration: "none" }}
              >
                Users
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <main style={{ flexGrow: 1, padding: 20 }}>{children}</main>
    </div>
  );
}

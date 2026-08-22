import { NavLink, Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="app-layout">

      <aside className="sidebar">

        <div className="brand">
          <div className="brand-mark">W</div>
          <span>WealthPath</span>
        </div>

        <nav>
          <p className="nav-label">OVERVIEW</p>

          <NavLink to="/" className="nav-link">
            Dashboard
          </NavLink>

          <NavLink to="/portfolio" className="nav-link">
            Portfolio
          </NavLink>

          <NavLink to="/goals" className="nav-link">
            Goals
          </NavLink>

          <p className="nav-label">INTELLIGENCE</p>

          <NavLink to="/hype-check" className="nav-link">
            Hype Check
          </NavLink>

          <NavLink
            to="/doctor"
            className="nav-link"
            style={{
              display: "block",
              visibility: "visible",
              opacity: 1,
              color: "#111827",
              background: "#f1f5f9",
              marginTop: "8px",
            }}
          >
            WealthPath Buddy
          </NavLink>

        </nav>

        <div className="sidebar-bottom">

          <div className="connection">
            <span className="status-dot"></span>

            <div>
              <strong>Demo data connected</strong>
              <small>Last synced just now</small>
            </div>
          </div>

          <div className="user-card">
            <div className="avatar">M</div>

            <div>
              <strong>Mihad</strong>
              <small>Personal account</small>
            </div>
          </div>

        </div>

      </aside>

      <main className="main-content">
        <Outlet />
      </main>

    </div>
  );
}

export default Layout;
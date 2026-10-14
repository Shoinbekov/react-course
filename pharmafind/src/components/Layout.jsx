import { NavLink, Outlet } from 'react-router-dom'

export default function Layout() {
  return (
    <div className="app">
      <header className="header">
        <div className="container header__inner">
          <NavLink to="/" className="logo" end>
            <span className="logo__mark" aria-hidden="true">+</span>
            PharmaFind
          </NavLink>
          <nav className="nav">
            <NavLink to="/" end className="nav__link">
              Catalog
            </NavLink>
            <NavLink to="/add" className="nav__link nav__link--primary">
              <span aria-hidden="true">+ </span>Add<span className="hide-sm"> medicine</span>
            </NavLink>
          </nav>
        </div>
      </header>

      <main className="container main">
        <Outlet />
      </main>

      <footer className="footer">
        <div className="container">
          PharmaFind — medicine catalog for Almaty pharmacies. Demo data, not medical advice.
        </div>
      </footer>
    </div>
  )
}

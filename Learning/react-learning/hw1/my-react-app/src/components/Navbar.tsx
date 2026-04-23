function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-logo">
        <span className="logo-circle">▶</span>
        <h1>SoftRoll</h1>
      </div>
      <nav className="nav-links">
        <a href="#">Home</a>
        <a href="#">Movies</a>
        <a href="#">TV</a>
        <a href="#">Most Popular</a>
        <a href="#">Top Airing</a>
      </nav>
    </header>
  );
}

export default Navbar;

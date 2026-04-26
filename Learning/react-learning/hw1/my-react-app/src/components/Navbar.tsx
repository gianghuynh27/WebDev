function Navbar() {
   return (
    <header className="flex items-center justify-between px-10 py-5 border-b border-white/10">
      
      {/* Logo */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 flex items-center justify-center border-2 border-yellow-300 rounded-full text-yellow-300">
          ▶
        </div>
        <h1 className="text-lg font-semibold">AniWatch</h1>
      </div>

      {/* Links */}
      <nav className="flex gap-8 text-sm text-yellow-200">
        <a href="#">Home</a>
        <a href="#">Movies</a>
        <a href="#">TV</a>
        <a href="#">Most Popular</a>
        <a href="#">Top Airing</a>
      </nav>

      {/* Button */}
      <button className="px-5 py-2 rounded-full border border-white/20 bg-white/10 hover:bg-white/20">
        Full Site
      </button>
    </header>
  );
}

export default Navbar;

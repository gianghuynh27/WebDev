const topSearches = [
     'One Piece',
    'Naruto',
    'Attack on Titan',
    'Jujutsu Kaisen',
    'Solo Leveling',
];

function HeroSection() {

    return (
    <section className="hero">
      <div className="hero-left">
        <div className="hero-brand">
          <span className="hero-logo-circle">▶</span>
          <h2>AniWatch</h2>
        </div>

        <p className="hero-description">
          Stream anime in HD with fast updates, subbed and dubbed options, and
          clean browsing.
        </p>

        <div className="search-bar">
          <input type="text" placeholder="Search anime titles..." />
          <button type="button">🔍</button>
        </div>

        <div className="top-searches">
         <span className = "top-searches-label">
            Top searches:
         </span>
         {topSearches.map(anime => (
           <span key={anime} className="search-tag">
             {anime}
           </span>
         ))}
        </div>

        <div className="hero-actions">
          <button type="button" className="browse-btn">
            Browse Full Site
          </button>
          <span className="trending-link">Trending anime</span>
        </div>
      </div>

      <div className="hero-right">
        <img
          src="/hero-anime.png"
          alt="Trending anime characters"
        />
      </div>
    </section>
    )
}

export default HeroSection;
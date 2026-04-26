import heroImage from '../assets/hero-anime.jpg';
const topSearches = [
     'One Piece',
    'Naruto',
    'Attack on Titan',
    'Jujutsu Kaisen',
    'Solo Leveling',
];

function HeroSection() {

     return (
    <section className="flex flex-col lg:flex-row items-center justify-between px-10 py-20 gap-10">
      
      {/* LEFT */}
      <div className="flex-1 max-w-xl">

        {/* Logo */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 flex items-center justify-center border-2 border-yellow-300 rounded-full text-yellow-300 text-lg">
            ▶
          </div>
          <h2 className="text-5xl font-bold text-yellow-200">AniWatch</h2>
        </div>

        {/* Description */}
        <p className="text-gray-300 leading-relaxed mb-6">
          Stream anime in HD with fast updates, subbed and dubbed options, and
          clean browsing.
        </p>

        {/* Search */}
        <div className="flex items-center bg-white rounded-full overflow-hidden mb-5">
          <input
            type="text"
            placeholder="Search anime titles..."
            className="flex-1 px-5 py-4 text-black outline-none"
          />
          <button className="bg-yellow-300 px-6 py-4 text-black">
            🔍
          </button>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="font-semibold">Top searches:</span>
          {topSearches.map((anime) => (
            <span
              key={anime}
              className="px-3 py-1 text-sm bg-white/10 border border-white/10 rounded-full"
            >
              {anime}
            </span>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="bg-yellow-300 text-black px-6 py-3 rounded-full font-semibold">
            Browse Full Site
          </button>
          <span className="text-gray-300">Trending anime</span>
        </div>
      </div>

      {/* RIGHT IMAGE */}
      <div className="flex-1 flex justify-center">
        <img
          src={heroImage}
          alt="anime"
          className="max-w-5xl rounded-xl"
        />
      </div>
    </section>
  );
}

export default HeroSection;
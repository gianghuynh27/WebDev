import "./App.css";
import BusinessCard from "./components/BusinessCard";
import FavouriteAnime from "./components/FavouriteAnime";
function App() {
  return (
    <>
      <BusinessCard
        name="Giang"
        occupation="Programmer Analyst"
        interest="I love playing games"
      />
      <FavouriteAnime />
    </>
  );
}

export default App;

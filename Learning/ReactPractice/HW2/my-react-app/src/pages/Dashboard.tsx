import ThemeToggle from '../components/ThemeToggle'
import SearchWithDebounce from '../components/SearchWithDebounce'
import UserProfileSearch from '../components/UserProfileSearch'

export default function Dashboard() {
  return (
    <section className="page">
      <h1>Dashboard</h1>
      <div className="grid-two">
        <ThemeToggle />
        <UserProfileSearch />
      </div>
      <SearchWithDebounce />
    </section>
  )
}

import Stopwatch from '../components/Stopwatch'
import CountdownTimer from '../components/CountdownTimer'
import PomodoroTimer from '../components/PomodoroTimer'
import TaskTimerList from '../components/TaskTimerList'

export default function Timers() {
  return (
    <section className="page">
      <h1>Timers</h1>
      <div className="grid-two">
        <Stopwatch />
        <CountdownTimer />
      </div>
      <div className="grid-two">
        <PomodoroTimer />
        <TaskTimerList />
      </div>
    </section>
  )
}

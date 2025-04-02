import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import StudentPerformance from './pages/StudentPerformance'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <StudentPerformance/>
    </>
  )
}

export default App

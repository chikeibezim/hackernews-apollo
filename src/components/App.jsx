import { useState } from 'react'
import LinkList from './LinkList'
// import '../styles/App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <LinkList />
    </div>
  )
}

export default App

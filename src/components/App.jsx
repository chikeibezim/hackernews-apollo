import { useState } from 'react'
import LinkList from './LinkList'
import CreateLink from './CreateLink'
// import '../styles/App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <CreateLink />
    </div>
  )
}

export default App

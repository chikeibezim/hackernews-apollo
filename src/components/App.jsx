import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import LinkList from './LinkList'
import CreateLink from './CreateLink'
import Header from './Header'

function App() {

  return (
    <div className="center w85">
      <Header />
      <div className='ph3 pv1 backgound-gray'>
        <Routes>
            <Route path='/' element={<LinkList/>}/>
            <Route path='/create' element={<CreateLink />} />
        </Routes>
      </div>
      
    </div>
  )
}

export default App

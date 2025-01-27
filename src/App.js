import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home.jsx'
// import Create from './components/Create.jsx'
import Update from './components/Update.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'

const App = () => {
  return (
    <div>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path='/create' element={<Create />} /> */}
          <Route path='/update/:id' element={<Update />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
    </div>
  )
}

export default App
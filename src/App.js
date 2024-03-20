import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './sidebar';
import Navbar from './navbar';
import Watchin from './watchin';
import Watchout from './watchout';
import Staff from './staff';

function App() {
  return (
    <Router>
      <div className="d-flex flex-column" style={{ height: '100vh' }}>
        <div className='newbg'><Navbar /></div>
        
        <div className="d-flex flex-row flex-grow-1">
          <Sidebar />
          <div className="content flex-grow-1 p-3">
            <div className='side'>
              <Routes>
                <Route path="/" element={<Watchin/>} />
                <Route path="/watchin" element={<Watchin />} />
                <Route path="/watchout" element={<Watchout />} />
                <Route path="/staff" element={<Staff />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

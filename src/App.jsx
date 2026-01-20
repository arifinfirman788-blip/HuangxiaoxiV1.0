import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import MobileWrapper from './components/MobileWrapper';
import Home from './pages/Home';
import Trip from './pages/Trip';
import Message from './pages/Message';
import Profile from './pages/Profile';
import Shop from './pages/Shop';
import AgentCategoryList from './pages/AgentCategoryList';

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <MobileWrapper>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/trip" element={<Trip />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/message" element={<Message />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/category/:id" element={<AgentCategoryList />} />
          </Route>
        </Routes>
      </MobileWrapper>
    </Router>
  );
}

export default App;

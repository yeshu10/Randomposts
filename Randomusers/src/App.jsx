
import RandomUserProfile from './components/RandomUserProfile';
import RandomJokesTweet from './components/RandomJokesTweet';
import CatsListing from './components/CatsListing';
import Navbar from './components/Navbar';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/random-user" />} />
        <Route path="/random-user" element={<RandomUserProfile />} />
        <Route path="/random-jokes" element={<RandomJokesTweet />} />
        <Route path="/cats-listing" element={<CatsListing />} />
      </Routes>
    </Router>
  );
}

export default App;
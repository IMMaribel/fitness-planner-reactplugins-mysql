import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Map from './pages/Map';
import Calendar from './pages/Calendar';
import Charts from './pages/Charts';
import WorkoutsPage from './pages/WorkoutsPage';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/map" element={<Map />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/charts" element={<Charts />} />
          <Route path="/workouts" element={<WorkoutsPage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
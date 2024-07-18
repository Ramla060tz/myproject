import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './Pages/Navbar';
import FishermanList from './Pages/FishermanList';
import AddFisherman from './Pages/AddFisherman';

// import Navbar from './Pages/Navbar';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="Navbar" element={<Navbar />} />
        <Route path="/" element={<FishermanList />} />
        <Route path="/Main/fisherman_add" element={<AddFisherman />} />
        <Route path="/Main/fisherman_update/:id" element={<AddFisherman />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

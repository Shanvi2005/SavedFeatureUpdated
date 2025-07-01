import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Saved from './pages/Saved';
import { SavedPostsProvider } from './context/SavedPostsContext';

const App = () => {
  return (
    <SavedPostsProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/saved" element={<Saved />} />
      </Routes>
    </SavedPostsProvider>
  );
};

export default App;

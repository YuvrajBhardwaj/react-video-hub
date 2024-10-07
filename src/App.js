import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Upload from './components/Upload';
import Videos from './components/Videos';
import Signup from './components/Signup';
import NotFound from './components/NotFound';
import { useState } from 'react';

function App() {
  const [videosData, setVideosData] = useState([]); // State to store video data

  // Function to handle video upload
  const handleVideoUpload = (videoUrl) => {
    setVideosData((prev) => [...prev, videoUrl]); // Add new video URL to the array
  };

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route 
          path="/videos" 
          element={<Videos videosData={videosData} onVideoUpload={handleVideoUpload} />} // Pass video data and upload handler to Videos
        />
        <Route 
          path="/upload" 
          element={<Upload onUpload={handleVideoUpload} />} // Pass upload handler to Upload component
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<NotFound />} /> 
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

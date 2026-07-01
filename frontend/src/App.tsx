import { Route, Routes } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import InterviewPrepPage from './pages/InterviewPrepPage';
import LandingPage from './pages/LandingPage';
import ResumeReviewPage from './pages/ResumeReviewPage';

export default function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-slate-50 text-slate-900">
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/resume-review" element={<ResumeReviewPage />} />
        <Route path="/interview-prep" element={<InterviewPrepPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

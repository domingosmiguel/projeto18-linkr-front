import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './Assets/reset.css';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';
import TimelinePage from './Pages/Timeline/TimelinePage';
import ContextProvider from './context/DadosContext';
import Hashtag from './Pages/Hashtag/Hashtag';
import UserTimeline from './Pages/UserTimeline/UserTimeline';

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/timeline" element={<TimelinePage />} />
          <Route path="/hashtag/:hashtag" element={<Hashtag />} />
          <Route path="/user/:id" element={<UserTimeline />} />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;

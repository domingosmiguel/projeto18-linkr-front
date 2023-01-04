import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './Assets/reset.css';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';
import TimelinePage from './Pages/Timeline/TimelinePage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/timeline" element={<TimelinePage/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;

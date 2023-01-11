import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './Assets/reset.css';
import ContextProvider from './context/DadosContext';
import useToken from './hooks/useToken';
import Hashtag from './Pages/Hashtag/Hashtag';
import Login from './Pages/Login/Login';
import SignUp from './Pages/SignUp/SignUp';
import TimelinePage from './Pages/Timeline/TimelinePage';
import UserTimeline from './Pages/UserTimeline/UserTimeline';

function App() {
  const [config, updateToken, deleteToken] = useToken();

  return (
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path='/'
            element={
              <Login
                logged={config?.headers.Authorization !== 'Bearer null'}
                updateToken={updateToken}
              />
            }
          />
          <Route
            path='/sign-up'
            element={
              <SignUp
                logged={config?.headers.Authorization !== 'Bearer null'}
              />
            }
          />
          <Route
            path='/timeline'
            element={<TimelinePage config={config} deleteToken={deleteToken} />}
          />
          <Route
            path='/hashtag/:hashtag'
            element={<Hashtag config={config} deleteToken={deleteToken} />}
          />
          <Route
            path='/user/:id'
            element={<UserTimeline config={config} deleteToken={deleteToken} />}
          />
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  );
}

export default App;

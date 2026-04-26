import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import SigninPage from './pages/SigninPage';
import SignupPage from './pages/SignupPage';
import Dashboard from './pages/Dashboard';


function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/signin"
          element={<SigninPage />}
        />

        <Route
          path="/signup"
          element={<SignupPage />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;

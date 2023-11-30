import axios from 'axios';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BrowserView } from 'react-device-detect';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Desktop version:
import Header from './desktop/components/Header';
import MainPage from './desktop/Pages/MainPage';
import LoginPage from './desktop/Pages/LoginPage';
import NewTicketPage from './desktop/Pages/NewTicketPage';

function App() {
  axios.defaults.baseURL = "https://fix-it-now-24.onrender.com/api";
  axios.defaults.headers.post['Content-Type'] = 'application/json';

  return (
    <>
      <BrowserView>
      <BrowserRouter>
        {/* desktop version */}
        <Header />
        <Routes>
          <Route path='*' element={<MainPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path="/new-ticket" element={<NewTicketPage />} />
        </Routes>
      </BrowserRouter>
      </BrowserView>
      
      {/* toastify container for notifications */}
      <ToastContainer
				position="bottom-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="colored" />
    </>
  );
}

export default App;

import axios from 'axios';
import { createContext, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BrowserView } from 'react-device-detect';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Desktop version:
import Header from './desktop/components/Header';
import MainPage from './desktop/Pages/MainPage';
import LoginPage from './desktop/Pages/LoginPage';
import NewTicketPage from './desktop/Pages/NewTicketPage';
import DashboardPage from './desktop/Pages/DashboardPage';

export const UserData = createContext(null);

function App() {
  axios.defaults.baseURL = "https://humble-memory-r979x4w9g6x2vg-5050.app.github.dev/api";
  axios.defaults.headers.post['Content-Type'] = 'application/json';

  return (
    <>
      <BrowserView>
      <BrowserRouter>
        {/* desktop version */}
        <UserData.Provider value={{text: 'test'}}>
          <Header />
          <Routes>
            <Route path='*' element={<MainPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path="/new-ticket" element={<NewTicketPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </UserData.Provider>
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

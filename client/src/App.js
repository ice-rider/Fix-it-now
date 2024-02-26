import React, { useEffect } from 'react';
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
import LogoutPage from './desktop/Pages/LogoutPage';

const Data = createContext(null);

function App() {
  const [data, setData] = useState({
    auth: localStorage.getItem("auth") === "true" || false,
    access_token: localStorage.getItem("access_token"),
    avatar: localStorage.getItem("avatar"),
    username: localStorage.getItem("username"),
    user_id: localStorage.getItem('user_id')
  })
  let servers = {
    dev_server: "http://localhost:5000/api",
    prod_server: "https://fix-it-now-24-8go9.onrender.com/api"
  }
  
  axios.defaults.baseURL = process.env.SERVER_URL;
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  
  useEffect(() => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${data.access_token}`
  }, [data])
  
  const setterWithObserver = (data) => {
    setData({...data});
    console.log("Observer: ", data);
    localStorage.setItem("auth", data.auth);
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("avatar", data.avatar);
    localStorage.setItem("username", data.username);
    localStorage.setItem("user_id", data.user_id)
  }

  return (
    <>
      <BrowserView>
      <BrowserRouter>
        {/* desktop version */}
        <Data.Provider value={{user: data, setter: setterWithObserver}}>
          <Header />
          <Routes>
            <Route path='*' element={<MainPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path="/new-ticket" element={<NewTicketPage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/logout" element={<LogoutPage />} />
          </Routes>
        </Data.Provider>
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
export {Data};
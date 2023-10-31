import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { BrowserView } from 'react-device-detect';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Desktop version:
import MainPage from './desktop/Pages/MainPage';

function App() {
  return (
    <>
      <BrowserView>
      <BrowserRouter>
        {/* desktop version */}
        <Routes>
          <Route path='*' element={<MainPage />} />
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

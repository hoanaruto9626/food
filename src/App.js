import './App.css';
import Index from './fontend/index';
import { BrowserRouter as BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import FontendRouter from './router/fontend';
import { UserProvider } from './fontend/context/userContext';
import store from './redux/store';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import BackendRoute from './router/backend';
import IndexAdmin from './backend';
function App() {
  return (
    <Provider store={store}>
      <UserProvider>
        <BrowserRouter>
          <ToastContainer/>
          <Routes>
            <Route path="/" element={<Index />}>
              {
                FontendRouter.map((route, index)=>{
                  const Page = route.component;
                  return <Route key={index} path={route.path} element={<Page/>}/>
                })
              }
            </Route>
            {/* backend route */}
            <Route path="/admin" element={<IndexAdmin />}>
              {
                BackendRoute.map((route, index)=>{
                  const Page = route.component;
                  return <Route key={index} path={route.path} element={<Page/>}/>
                })
              }
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </Provider>
  );
}

export default App;

import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Footer from "./componenets/Footer";

import "./App.css";

// import Test from './pages/Test'

import { PrivateRoute } from "./helper/PrivateRoute";
import Header from "./componenets/Header";
import AddCourse from "./pages/AddCourse";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Signin from "./pages/Signing";
import ViewCourse from "./pages/ViewCourse";
import ViewQueries from "./pages/ViewQueries";
import Signup from "./pages/Signup";
import Facilitator from "./pages/Facilitator";
import HelpDesk from "./pages/HelpDesk";
// import { useDispatch } from "react-redux";
// import Cookies from "universal-cookie";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import VideoDetail from "./pages/VideoDetail";
import ShowContent from "./pages/ShowContent";
import ErrorPage from "./pages/ErrorPage";
import Profile from "./pages/Profile";
import AddQuestion from "./pages/AddQuestion";
import BasicDocument from "./pages/BasicDocuemnt";
import ForgetPassword from "./pages/ForgotPassword";


function App() {

  return (
    <BrowserRouter>
      <div className="">
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </div>
      <Routes>

        <Route path="/" element={<PrivateRoute><Header /></PrivateRoute>}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="addcourse" element={<AddCourse />} />
          <Route path="viewcourse" element={<ViewCourse />} />
          <Route path="viewqueries" element={<ViewQueries />} />
          <Route path="helpdesk" element={<HelpDesk />} />


          <Route path="videodetail/:id" element={<VideoDetail />} />
          <Route path="showcontent/:id" element={<ShowContent />} />
          <Route path="profile" element={<Profile />} />

          <Route path="addQuestion/:id" element={<AddQuestion />} />

          <Route path="doc/:id" element={<BasicDocument />} />
        </Route>


        <Route path="/signin" element={<Header />}>
          <Route index element={<Signin />} />
        </Route>
        <Route path="/forgot-password" element={<Header />}>
          <Route index element={<ForgetPassword />} />
        </Route>
        <Route path="/signup" element={<Header />}>
          <Route index element={<Signup />} />
        </Route>

        <Route path="/facilitator" element={<Header />}>
          <Route index element={<Facilitator />} />
        </Route>



        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

import { useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GlobalState } from "./GlobalState";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BroadUser";
import BoardModerator from "./components/BoardModerator";
import BoardAdmin from "./components/BoardAdmin";
import HeaderCom from "./components/header";
import { logout } from "./slices/auth";
import UserInformation from "./components/UserInformation/UserInformation";
import EventBus from "./common/EventBus";
import AccountChecking from "./components/Admin/AccountChecking/AccountChecking";
// import ForgotPassword from "./components/ForgotPassword/forgotPasswordForm";
import ChangePassWord from "./components/ChangePassword/ChangePassword";
import ForgotPassword from "./components/ForgotPassword/forgotPasswordForm";
import Verification from "./components/ForgotPassword/verification";
import ChangePassWithVerification from "./components/ForgotPassword/changePassWithVerificationCode";
import AddMovieModal from "./components/Admin/AddMovieModal/AddMovieModal";
import MovieManagement from "./components/Admin/Movie management/MovieManagement";
import TicketFiltering from "./components/Employee/TicketFiltering";
import AllMovie from "./components/AllMovie";
import DetailMovie from "./components/DetailMovie";
import ShowtimeManagement from "./components/Admin/ShowtimeManagement/ShowtimeMangement";
import BookingTicket from "./components/BookingTicket";
const App = () => {
  const [showModeratorBoard, setShowModeratorBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);

  // const state = useContext(GlobalState);
  // const [isLogged] = state.userAPI.isLogged;
  // const [isAdmin] = state.userAPI.isAdmin;
  // console.log("isAdmin", isAdmin, "isLogged", isLogged);
  // console.log(state);

  return (
    <Router>
      <div>
        <HeaderCom />
        <div>
          <Routes>
            <Route path="/verification" element={<Verification />} />
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user-infor" element={<UserInformation />} />
            <Route path="/user" element={<BoardUser />} />
            <Route path="/mod" element={<BoardModerator />} />
            <Route path="/admin" element={<BoardAdmin />} />
            <Route path="/accounts" element={<AccountChecking />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/update-password"
              element={<ChangePassWithVerification />}
            />
            <Route path="/add-film" element={<AddMovieModal />} />
            <Route path="/admin-search-movie" element={<MovieManagement />} />
            <Route path="/ticket-employee" element={<TicketFiltering />} />
            <Route path="/search-film-by-name" element={<AllMovie />} />
            <Route path="/detail-select-movie" element={<DetailMovie />} />
            <Route path="/show-time" element={<ShowtimeManagement />} />
            <Route path="/buy-ticket" element={<BookingTicket />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SpaceDetail from "./pages/SpaceDetail";
import SpaceList from "./pages/SpaceList";
import ModalPayment from "./components/modal/ModalPayment";
import ModalRent from "./components/modal/ModalRent";
import ModalReview from "./components/modal/ModalReview";
import LayoutMange from "./components/manageLayout/LayoutMange";
import SpaceAdd from "./module/space/SpaceAdd";
import SpaceManage from "./module/space/SpaceManage";
import SpaceBusiness from "./module/space/SpaceBusiness";
import { useState } from "react";
import Backdrop from "./components/backdrop/Backdrop";
import { useAuth } from "./context/auth-context";
import { useNavigate } from "react-router-dom";
import MyReservation from "./components/modal/MyReservation";
import ReservationDetail from "./components/request/ReservationDetail";
import SpaceUpdate from "./module/space/SpaceUpdate";
import ReservationRequest from "./components/request/ReservationRequest";
import HelpPage from "./pages/HelpPage";
import UserPage from "./pages/UserPage";

function App() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const id = user.id;
  const [isBackdrop, setBackdrop] = useState(false);
  const [isModalPayment, setModalPayment] = useState(false);
  const [reservation, setReservation] = useState({});
  const [reservationReview, setReservationReview] = useState({});
  const [isModalReview, setModalReview] = useState(false);

  const onBackdropHandler = () => {
    setModalPayment(false);
    setBackdrop(false);
    setModalReview(false);
  };
  const onActiveModalPayment = (input_reservation) => {
    setReservation(input_reservation);

    setBackdrop(true);
    if (user) {
      setModalPayment(true);
    } else {
      navigate(`/rent/${id}`);
    }
  };
  const onExitModalPayment = () => {
    setModalPayment(false);
    setBackdrop(false);
  };

  const onActiveModalReview = (reservation) => {
    setReservationReview(reservation);
    setBackdrop(true);
    setModalReview(true);
  };
  const onExitModalReview = () => {
    setBackdrop(false);
    setModalReview(false);
  };

  return (
    <>
      {isBackdrop && <Backdrop onBackdrop={onBackdropHandler} />}
      {isModalPayment && (
        <ModalPayment
          onExitModalPayment={onExitModalPayment}
          reservation={reservation}
        />
      )}
      {isModalReview && (
        <ModalReview
          onExitModalReview={onExitModalReview}
          reservation={reservationReview}
        />
      )}
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/space-list" element={<SpaceList />} />
          <Route path="/space/:id" element={<SpaceDetail />} />
          <Route
            path="/rent/:id"
            element={<ModalRent onActiveModalPayment={onActiveModalPayment} />}
          />
          <Route
            path="/myreservation"
            element={
              <MyReservation onActiveModalReview={onActiveModalReview} />
            }
          />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/reservation/:id" element={<ReservationDetail />} />
        </Route>
        <Route path="/manage" element={<LayoutMange />}>
          <Route path="/manage/space" element={<SpaceManage />} />
          <Route path="/manage/users" element={<UserPage />} />
          <Route path="/manage/add-space" element={<SpaceAdd />} />
          <Route path="/manage/update-space/:id" element={<SpaceUpdate />} />
          <Route path="/manage/business" element={<SpaceBusiness />} />
          <Route
            path="/manage/businessDetail/:id"
            element={<ReservationRequest />}
          />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
}

export default App;

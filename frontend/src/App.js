import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import SpaceDetail from "./pages/SpaceDetail";
import SpaceList from "./pages/SpaceList";
import ModalPayment from "./components/modal/ModalPayment";
import ModalRent from "./components/modal/ModalRent";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/space-list/:id" element={<SpaceList />} />
          <Route path="/space/:id" element={<SpaceDetail />} />
          <Route path="/payment/:id" element={<ModalPayment />} />
          <Route path="/rent/:id" element={<ModalRent />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
}

export default App;

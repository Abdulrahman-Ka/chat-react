import Room from "./pages/Room";
import LoginPage from "./pages/LoginPage";
import { BrowserRouter, Route, Routes } from "react-router";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Room />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
};
export default App;

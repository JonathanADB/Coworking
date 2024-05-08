import { Route, Routes } from "react-router-dom";
import { ResetPassword } from "../pages/ResetPassword.jsx";
import ValidateUser from "../pages/ValidateUser.jsx";

function App() {
  return (
    <Routes>
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/validate" element={<ValidateUser />} />
    </Routes>
  );
}

export default App;

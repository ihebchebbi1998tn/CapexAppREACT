import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Authentifications/Login/LoginPage";
import ProblemPage from "./Authentifications/ProblemeConnection/ProblemPage";
import AdminRoutes from "./AdminRoutes";
import LoadingPage from "./extra/LoadingPage";

function App() {
  return (
    <BrowserRouter>
    
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/prblmauthentification" element={<ProblemPage />} />
        <Route path="/DashboardAdmin/*" element={<AdminRoutes />} />
        <Route path="/authentificationloading" element={<LoadingPage/>} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;

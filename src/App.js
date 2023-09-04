import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./Authentifications/Login/LoginPage";
import ProblemPage from "./Authentifications/ProblemeConnection/ProblemPage";
import AdminRoutes from "./AdminRoutes";
import LoadingPage from "./extra/LoadingPage";
import { UserProvider } from "./UserContext";
function App() {
  return (
    <BrowserRouter>
        <UserProvider> {/* Wrap your App with UserProvider */}

      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/prblmauthentification" element={<ProblemPage />} />
        <Route path="/DashboardAdmin/*" element={<AdminRoutes />} />
        <Route path="/authentificationloading" element={<LoadingPage/>} />

      </Routes>
      </UserProvider>
    </BrowserRouter>
  );
}

export default App;

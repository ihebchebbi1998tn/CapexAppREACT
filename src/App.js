import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import LoginPage from "./Authentifications/Login/LoginPage";
import ProblemPage from "./Authentifications/ProblemeConnection/ProblemPage";
import AdminRoutes from "./AdminRoutes";
import LoadingPage from "./extra/LoadingPage";
import { UserProvider } from "./UserContext";
import { SessionProvider } from "./SessionContext";
import OTPVerification from "./Authentifications/Login/Otp/OTPVerification";
import ErrorBoundary from "./ErrorBoundary";
import ErrorIp from "./ErrorIp"

function App() {
  return (
    <BrowserRouter>
    <ErrorBoundary>
      <UserProvider>
        <SessionProvider>
        {" "}
        {/* Wrap your App with UserProvider */}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/notallowed" element={<ErrorIp />} />
          <Route path="/otpverif" element={<OTPVerification />} />
          <Route path="/prblmauthentification" element={<ProblemPage />} />
          <Route path="/dashboard/*" element={<AdminRoutes />} />
          <Route path="/authentificationloading" element={<LoadingPage />} />
          {/* Catch-all route for unmatched routes */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        </SessionProvider>
      </UserProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;

import React, { useEffect } from "react";
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import LoginForm from './LoginForm';
import { useUser } from "../../UserContext";

const LoginPage = () => {
  const { userData } = useUser(); // Access userData from UserContext
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const userEmail = userData.email; // Updated to userData.email
  const userId = userData.id; // Updated to userData.id
  const userRole = userData.type; // Updated to userData.type

  useEffect(() => {
    // Check if all of the user data is not empty, and if so, redirect to the home page
    if (userEmail && userId && userRole) {
      navigate("/authentificationloading");
    }
  }, [userEmail, userId, userRole, navigate]);

  return (
    <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
      <div className="d-flex align-items-center justify-content-center w-100">
        <div className="row justify-content-center w-100">
          <div className="col-md-8 col-lg-6 col-xxl-3">
            <div className="card mb-0">
              <div className="card-body">
                <div className="text-nowrap logo-img text-center d-block py-3 w-100">
                  <img src="assets/logo.png" width="250" alt="" />
                </div>
                <LoginForm />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

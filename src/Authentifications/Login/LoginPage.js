import React from 'react';
import LoginForm from './LoginForm';

const LoginPage = () => {
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

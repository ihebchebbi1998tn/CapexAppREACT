import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LoadingPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate for navigation


  useEffect(() => {
    // Simulate a loading delay for 5 seconds
    const loadingTimeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    // Clear the timeout when the component unmounts
    return () => clearTimeout(loadingTimeout);
  }, []);

  useEffect(() => {
    // Redirect after loading is complete
    if (!isLoading) {
      const redirectTimeout = setTimeout(() => {
        navigate(`/DashboardAdmin`);

      }, 0); // Delay the redirect slightly to ensure the state update is processed

      return () => clearTimeout(redirectTimeout);
    }
  }, [isLoading, navigate]);

  return (
    <div>
      {isLoading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <img src="assets/loadinggif.gif" alt="Loading..." style={{ width: '100px', height: '80px' }} />
         
        </div>
      ) : null}
    </div>
  );
};

export default LoadingPage;

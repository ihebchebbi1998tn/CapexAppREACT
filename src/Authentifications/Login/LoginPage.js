import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoginForm from "./LoginForm";
import { useUser } from "../../UserContext";
import axios from "axios";
const LoginPage = () => {
  const { userData } = useUser();
  const navigate = useNavigate();
  const [ipAddress, setIpAddress] = useState(null);
  const [ipList, setIpList] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [otpAdvanced, setOtpAdvanced] = useState("0");  // Add these lines
  const [ipAdvanced, setIpAdvanced] = useState("0");    // Add these lines
  const [uploadapiAdvanced, setUploadapiAdvanced] = useState("");  // Add these lines
  const userEmail = userData.email;
  const userId = userData.id;
  const userRole = userData.type;

  useEffect(() => {
    if (userEmail && userId && userRole) {
      navigate("/authentificationloading");
    }
  }, [userEmail, userId, userRole, navigate]);

  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/advanced/list");
        const latestAdvanced = response.data[0];
        if (latestAdvanced) {
          setOtpAdvanced(latestAdvanced.otp_advanced);
          setIpAdvanced(latestAdvanced.ip_advanced);
          setUploadapiAdvanced(latestAdvanced.uploadapi_advanced);
        }
      } catch (error) {
        console.error("Error fetching latest Advanced entity:", error);
      }
    };
  
    const intervalId = setInterval(fetchData, 3000);
    console.log(otpAdvanced);
    // Cleanup: Clear the interval on component unmount
    return () => clearInterval(intervalId);
  }, [otpAdvanced, ipAdvanced, uploadapiAdvanced]); // Include state variables in the dependency array

  useEffect(() => {
    const fetchIpAddress = async () => {
      try {
        const apiKey = '9bbe0f6949179b'; // Replace with your actual API key
        const response = await fetch(`https://ipinfo.io/json?token=${apiKey}`);
        const data = await response.json();
        setIpAddress(data.ip);
      } catch (error) {
        console.error('Error fetching IP address:', error);
      } finally {
        setLoading(false); // Set loading to false when IP address is fetched
      }
    };

    const fetchIpList = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/ips/list");
        const data = await response.json();
        setIpList(data);
      } catch (error) {
        console.error('Error fetching IP list:', error);
      }
    };

    // Fetch IP address after a delay of 5 seconds
    const ipFetchTimeout = setTimeout(() => {
      fetchIpAddress();
      fetchIpList();
    }, 5000);

    // Cleanup the timeout to prevent memory leaks
    return () => clearTimeout(ipFetchTimeout);
  }, []);

  useEffect(() => {
    // Check if both IP address and list of IPs are available
    if (!loading && ipAddress && ipList.length > 0) {
      // Check if the current IP address is in the list
      if (!ipList.some((ip) => ip.address_ip === ipAddress) &&  (ipAdvanced === "1") ) {
        navigate("/notallowed");
      }
    }
  }, [loading, ipAddress, ipList, navigate]);

  return (
    <div className="position-relative overflow-hidden radial-gradient min-vh-100 d-flex align-items-center justify-content-center">
      <div className="d-flex align-items-center justify-content-center w-100">
        <div className="row justify-content-center w-100">
          <div className="col-md-8 col-lg-6 col-xxl-3">
            <div className="card mb-0">
              <div className="card-body text-center">
                <div className="d-flex justify-content-end mb-3">
                  <span className="font-weight-bold mr-2">
                    {loading ? <p>Chargement...</p> : <p>{ipAddress}</p>}
                  </span>
                  <img src="assets/ipOK.png" width="10" height="10" alt="" />
                </div>
                <div className="text-nowrap logo-img text-center d-block py-3 w-100">
                  <img src="assets/logocapex.png" width="250" alt="" />
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

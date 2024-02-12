import React from 'react';
import SettingsPage from './SettingsPage';
import "./Settings.css";
import SettingsPageUser from './SettingsPageUser';
import { useUser } from '../../UserContext';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const ContentSettings = () => {
  const { userData } = useUser(); // Access userData from UserContext
  const userType = userData?.type;
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  useEffect(() => {

    if (userType !== "Admin"){
      navigate(`/`);

    }
  }, []);

  return (
    <div className="container-fluid">
      {userType === "Admin" ? <SettingsPage /> : <SettingsPageUser />}
    </div>
  );
};

export default ContentSettings;

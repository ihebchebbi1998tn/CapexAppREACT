import React, { useState } from "react";

import NormalListData from './NormalListData';
import FournisseursCentreCout from './FournisseursCentreCout';
import Test from './Test';
import ModalReglageavance from './ModalReglageavance';
import { useEffect } from "react";
import { useUser } from "../../UserContext";
import { useNavigate } from 'react-router-dom';
const ContentCapexSettings = () => {
  const [showModalReglageavance, setShowModalReglageavance] = useState(false);
  const { userData } = useUser(); // Access userData from UserContext
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  const userType = userData.type ;

  useEffect(() => {

    if (userType !== "Admin"){
      navigate(`/`);

    }
  }, []);
  
  return (
    <div className="container-fluid">
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }} onClick={() => setShowModalReglageavance(true)} >
        <button className="btn btn-gradient"><i className="fa fa-cog fa-spin fa-1x fa-f"></i> Réglages avancés</button>

      </div>
      <NormalListData />
      <FournisseursCentreCout />
      <ModalReglageavance
       showModal={showModalReglageavance}
       handleClose={() => setShowModalReglageavance(false)}
      />
    </div>
  );
};

export default ContentCapexSettings;

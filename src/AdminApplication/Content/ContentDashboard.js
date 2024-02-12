import React from "react";
import PartiePre from "./PartiePre";
import PartieDeux from "./PartieDeux";
import News from "./News";
import Banner from "./Banner";
import QuickActionToolbar from "./QuickActionToolbar";

const Content = () => {
  return (
    <div className="container-fluid">
      <Banner />
      <QuickActionToolbar />
          <News />
     <div className="row">
   
  
      </div>
    </div>
  );
};

export default Content;

import React from 'react';


const PartiePre = () => {
  return (
    <div className="row">
    <div className="col-lg-8 d-flex align-items-strech">
      <div className="card w-100">
        <div className="card-body">
          <div className="d-sm-flex d-block align-items-center justify-content-between mb-9">
            <div className="mb-3 mb-sm-0">
              <h5 className="card-title fw-semibold">Partie 1</h5>
            </div>
           
          </div>
          <div id="chart"></div>
        </div>
      </div>
    </div>
    <div className="col-lg-4">
      <div className="row">
        <div className="col-lg-12">
          <div className="card overflow-hidden">
            <div className="card-body p-4">
              <h5 className="card-title mb-9 fw-semibold">Partie 1.2</h5>
              <div className="row align-items-center">
                <div className="col-8">
                 
                </div>
                <div className="col-4">
                  <div className="d-flex justify-content-center">
                    <div id="breakup"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-12">
         
          <div className="card">
            <div className="card-body">
              <div className="row alig n-items-start">
                <div className="col-8">
                  <h5 className="card-title mb-9 fw-semibold"> Partie 1.3 </h5>
                  
                  
                </div>
                <div className="col-4">
                  <div className="d-flex justify-content-end">
                   
                  </div>
                </div>
              </div>
            </div>
            <div id="earning"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default PartiePre;

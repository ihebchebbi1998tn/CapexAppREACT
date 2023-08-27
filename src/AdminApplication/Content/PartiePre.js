import React from 'react';


const PartiePre = () => {
  return (
    <div class="row">
    <div class="col-lg-8 d-flex align-items-strech">
      <div class="card w-100">
        <div class="card-body">
          <div class="d-sm-flex d-block align-items-center justify-content-between mb-9">
            <div class="mb-3 mb-sm-0">
              <h5 class="card-title fw-semibold">Partie 1</h5>
            </div>
           
          </div>
          <div id="chart"></div>
        </div>
      </div>
    </div>
    <div class="col-lg-4">
      <div class="row">
        <div class="col-lg-12">
          <div class="card overflow-hidden">
            <div class="card-body p-4">
              <h5 class="card-title mb-9 fw-semibold">Partie 1.2</h5>
              <div class="row align-items-center">
                <div class="col-8">
                 
                </div>
                <div class="col-4">
                  <div class="d-flex justify-content-center">
                    <div id="breakup"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-12">
         
          <div class="card">
            <div class="card-body">
              <div class="row alig n-items-start">
                <div class="col-8">
                  <h5 class="card-title mb-9 fw-semibold"> Partie 1.3 </h5>
                  
                  
                </div>
                <div class="col-4">
                  <div class="d-flex justify-content-end">
                   
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

import React, { Component } from "react";

class Banner extends Component {
  render() {
    return (
      <div className="row">
        <div className="col-12 grid-margin stretch-card">
          <div className="card corona-gradient-card">
            <div className="card-body py-0 px-0 px-sm-3">
              <div className="row align-items-center">
                <div className="col-4 col-sm-3 col-xl-2">
                  <img
                    src="/icons/Group126@2x.png"
                    className="gradient-corona-img img-fluid"
                    alt="banner"
                  />
                </div>
                <div className="col-5 col-sm-7 col-xl-8 p-0">
                  <h4 className="mb-1 mb-sm-0">Nouveau look rafraîchissant</h4>
                  <p className="mb-0 font-weight-normal d-none d-sm-block">
                  La nouvelle application Capex au design moderne et aux nouvelles fonctionnalités

                  </p>
                </div>
               
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Banner;

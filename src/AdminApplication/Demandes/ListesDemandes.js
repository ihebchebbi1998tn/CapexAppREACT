import React from "react";
import "./demandes.css";

const ListesDemandes = () => {
  return (
    <section className="section">
      <div className="container">
        <div className="justify-content-center row">
          <div className="col-lg-12">
            <div className="candidate-list-widgets mb-4">
              <form action="#" className="">
                <div className="g-2 row">
                  <div className="col-lg-3">
                    <div className="filler-job-form">
                      <i className="uil uil-briefcase-alt"></i>
                      <input
                        id="exampleFormControlInput1"
                        placeholder="Recherche..."
                        type="search"
                        className="form-control filler-job-input-box form-control"
                      />
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="filler-job-form">
                      <i className="uil uil-location-point"></i>
                      <select
                        className="form-select selectForm__inner"
                        data-trigger="true"
                        name="choices-single-location"
                        id="choices-single-location"
                        aria-label="Default select example"
                      >
                        <option value="AF">SBC - CLC-CF -Delta</option>
                        <option value="AX">CLSB - SDEM</option>
                        <option value="AL">CLN </option>
                        <option value="AL">DG : Joumena </option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div className="filler-job-form">
                      <i className="uil uil-clipboard-notes"></i>
                      <select
                        className="form-select selectForm__inner"
                        data-trigger="true"
                        name="choices-single-categories"
                        id="choices-single-categories"
                        aria-label="Default select example"
                      >
                        <option value="4">RH</option>
                        <option value="1">IT</option>
                        <option value="3">Approvisionement</option>
                        <option value="5">Banking</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-3">
                    <div>
                      <a className="btn btn-primary" href="#">
                        <i className="uil uil-filter"></i> Filter
                      </a>
                  
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12">
            <div className="align-items-center row">
              <div className="col-lg-8">
                <div className="mb-3 mb-lg-0">
                  <h6 className="fs-16 mb-0">Affichage de 1 à 1 résultats sur 1</h6>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="candidate-list-widgets">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="selection-widget">
                        <select
                          className="form-select"
                          data-trigger="true"
                          name="choices-single-filter-orderby"
                          id="choices-single-filter-orderby"
                          aria-label="Default select example"
                        >
                          <option value="df">Default</option>
                          <option value="ne">Newest</option>
                          <option value="od">Oldest</option>
                          <option value="rd">Random</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="selection-widget mt-2 mt-lg-0">
                        <select
                          className="form-select"
                          data-trigger="true"
                          name="choices-candidate-page"
                          id="choices-candidate-page"
                          aria-label="Default select example"
                        >
                          <option value="df">All</option>
                          <option value="8">8 per Page</option>
                          <option value="12">12 per Page</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="candidate-list">
          <div className="candidate-list-box card mt-4">
            <div className="p-4 card-body">
              <div className="align-items-center row">
                <div className="col-auto">
                  <div className="candidate-list-images">
                    <a href="#">
                      <img
                        src="https://bootdey.com/img/Content/avatar/avatar1.png"
                        alt=""
                        className="avatar-md img-thumbnail rounded-circle"
                      />
                    </a>
                  </div>
                </div>
                <div className="col-lg-5">
                  <div className="candidate-list-content mt-3 mt-lg-0">
                    <h5 className="fs-19 mb-0">
                      <a className="primary-link" href="#">
                        Iheb Chebbi
                      </a>
                  
                    </h5>
                    <p className="text-muted mb-2">Project Manager</p>
                    <ul className="list-inline mb-0 text-muted">
                      <li className="list-inline-item">
                        <i className="mdi mdi-map-marker"></i><strong>Demande de changement de nom de projet</strong> 
                      </li>
                      <li className="list-inline-item">
                        <i className="mdi mdi-wallet"></i> Projet climatiseur / a Projet climatiseur PUISSANT
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="mt-2 mt-lg-0 d-flex flex-wrap align-items-start gap-1">
                    <span className="badge bg-soft-secondary fs-14 mt-1">DLC</span>
                    <span className="badge bg-soft-secondary fs-14 mt-1">RH</span>
                  </div>
                </div>
              </div>
              <div className="favorite-icon">
                <a href="#">
                  <i className="mdi mdi-heart fs-18"></i>
                </a>
              </div>
            </div>
          </div>
          {/* Add more candidate list boxes here */}
        </div>
        
      </div>
    </section>
  );
};

export default ListesDemandes;

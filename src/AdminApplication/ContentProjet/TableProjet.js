import React from 'react';

const TableProjet = () => {
 

  return (
    <div className="col-lg-12 d-flex align-items-stretch">
    <div className="card w-100">
      <div className="card-body p-4">
        <div className="d-flex justify-content-between mb-3">
          <h5 className="card-title fw-semibold">Listes des projets</h5>
          
        </div>
        <form className="d-flex">
          {/* Search input */}
          <div className="input-group">
            <input
              type="text"
              className="form-control bg-light border-0 small search-input"
              id="searchInput"
              aria-describedby="emailHelp"
              placeholder="Rechercher..."
              aria-label="Search"
            />
            <div className="input-group-append">
              <span className="input-group-text bg-light border-0 search-icon">
                <i className="ti ti-search"></i>
              </span>
            </div>
          </div>
        </form>
        <div className="table-responsive">
          <table className="table text-nowrap mb-0 align-middle">
            {/* Table headers */}
            <thead className="text-dark fs-4">
              <tr>
                <th className="border-bottom-0">
                  <h6 className="fw-semibold mb-0">Projet</h6>
                </th>
                <th className="border-bottom-0">
                  <h6 className="fw-semibold mb-0">Exigence réglémentaire</h6>
                </th>
                <th className="border-bottom-0">
                  <h6 className="fw-semibold mb-0">Productivité</h6>
                </th>
                <th className="border-bottom-0">
                  <h6 className="fw-semibold mb-0">Priorité</h6>
                </th>
                <th className="border-bottom-0">
                  <h6 className="fw-semibold mb-0">Catégorie du projet</h6>
                </th>
                <th className="border-bottom-0">
                  <h6 className="fw-semibold mb-0">Nature du projet</h6>
                </th>
                <th className="border-bottom-0">
                  <h6 className="fw-semibold mb-0">Total Budget</h6>
                </th>
                <th className="border-bottom-0">
                  <h6 className="fw-semibold mb-0">Date début prévu</h6>
                </th>
                <th className="border-bottom-0">
                  <h6 className="fw-semibold mb-0">Date fin prévu</h6>
                </th>
                <th className="border-bottom-0">
                  <h6 className="fw-semibold mb-0">Pilote du projet</h6>
                </th>
                <th className="border-bottom-0">
                  <h6 className="fw-semibold mb-0">Commentaires</h6>
                </th>
                <th className="border-bottom-0">
                  <h6 className="fw-semibold mb-0">Suivis projet</h6>
                </th>
              </tr>
            </thead>
            {/* Table body */}
            <tbody>
              <tr>
                <td className="border-bottom-0"><h6 className="fw-semibold mb-0">-</h6></td>
                <td className="border-bottom-0">
                  <h6 className="fw-semibold mb-1">-</h6>
                </td>
                <td className="border-bottom-0">
                  <p className="mb-0 fw-normal">-</p>
                </td>
                <td className="border-bottom-0">
                  <div className="d-flex align-items-center gap-2">
                    <span className="mb-0 fw-normal">-</span>
                  </div>
                </td>
                <td className="border-bottom-0">
                  <h6 className="fw-semibold mb-0 fs-4">-</h6>
                </td>
                <td className="border-bottom-0">
                  <h6 className="fw-semibold mb-0 fs-4">-</h6>
                </td>
                <td className="border-bottom-0">
                  <h6 className="fw-semibold mb-0 fs-4">-</h6>
                </td>
                <td className="border-bottom-0">
                  <h6 className="fw-semibold mb-0 fs-4">-</h6>
                </td>
                <td className="border-bottom-0">
                  <h6 className="fw-semibold mb-0 fs-4">-</h6>
                </td>
                <td className="border-bottom-0">
                  <h6 className="fw-semibold mb-0 fs-4">-</h6>
                </td>
                <td className="border-bottom-0">
                  <h6 className="fw-semibold mb-0 fs-4"> <button className="btn btn-primary btn-sm"><i className="ti ti-message-circle-2"></i></button></h6>
                </td>
                <td className="border-bottom-0">
                  <h6 className="fw-semibold mb-0 fs-4"> <button className="btn btn-primary btn-sm"><i className="ti ti-list-details"></i></button></h6>
                </td>
              </tr>
              {/* Add other transaction rows here */}
            </tbody>
            
          </table>
          
        </div>
         {/* Espacement entre les éléments */}
         <div className="row">
              <div className="col-md-12">
                <div style={{ height: '15px' }}></div>
              </div>
            </div>
        <div className="d-flex align-items-center">
  <label htmlFor="rowsPerPage" className="me-3" style={{ minWidth: "140px" }}>
    Nombres de rangées :
  </label>
  <select
    id="rowsPerPage"
    className="form-select form-select-sm"
    onChange={(e) => {
      const value = e.target.value;
      // Add code here to handle the selected value and update the table rows per page.
    }}
  >
    <option value="5">5</option>
    <option value="10">10</option>
    <option value="15">15</option>
    <option value="all">Tout</option>
  </select>
</div>

      </div>
    </div>
  </div>
  
  );
};

export default TableProjet;

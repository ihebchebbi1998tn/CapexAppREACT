import React from "react";

const SettingsPage = () => {
  return (
    
    <div className="row">
        
      <div className="col-lg-12 d-flex align-items-stretch">
        <div className="col-12 col-lg-12 col-xl-8 mx-auto">
          <div className="my-4">
            <form>
              <div className="row mt-5 align-items-center">
                <div className="col-md-3 text-center mb-5">
                  <div className="avatar avatar-xl">
                    <img
                      src="../assets/images/profile/user-1.jpg"
                      alt="..."
                      className="avatar-img rounded-circle"
                    />
                  </div>
                </div>
                <div className="col">
                  <div className="row align-items-center">
                    <div className="col-md-7">
                      <h4 className="mb-1">ConnectedUser.name</h4>
                      <p className="small mb-3">
                        <span className="badge badge-dark">Test adress, TUN</span>
                      </p>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-md-7">
                      <p className="text-muted">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Mauris blandit nisl ullamcorper, rutrum metus in, congue
                        lectus. In hac habitasse platea dictumst. Cras urna
                        quam, malesuada vitae risus at, pretium blandit sapien.
                      </p>
                    </div>
                    <div className="col">
                      <p className="small mb-0 text-muted">
                        Nec Urna Suscipit Ltd
                      </p>
                      <p className="small mb-0 text-muted">
                        P.O. Box 464, 5975 Eget Avenue
                      </p>
                      <p className="small mb-0 text-muted">(537) 315-1481</p>
                    </div>
                  </div>
                </div>
              </div>
              <hr className="my-4" />
              <div className="form-row">
                <div className="row">
                  <div className="form-group col-md-6">
                    <label htmlFor="firstname">Prénom</label>
                    <input
                      type="text"
                      id="firstname"
                      className="form-control"
                      placeholder="Brown"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="lastname">Nom</label>
                    <input
                      type="text"
                      id="lastname"
                      className="form-control"
                      placeholder="Asher"
                    />
                  </div>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="inputEmail4">E-mail</label>
                <input
                  type="email"
                  className="form-control"
                  id="inputEmail4"
                  placeholder="brown@asher.me"
                />
              </div>
              <div className="form-group">
                <label htmlFor="inputAddress5">Adresse</label>
                <input
                  type="text"
                  className="form-control"
                  id="inputAddress5"
                  placeholder="P.O. Box 464, 5975 Eget Avenue"
                />
              </div>
              <div className="form-row">
                <div className="row">
                  <div className="form-group col-md-6">
                    <label htmlFor="inputCompany5">Entreprise</label>
                    <input
                      type="text"
                      className="form-control"
                      id="inputCompany5"
                      placeholder="Nec Urna Suscipit Ltd"
                    />
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="inputState5">État</label>
                    <select id="inputState5" className="form-control">
                      <option selected>Choisir...</option>
                      <option>...</option>
                    </select>
                  </div>
                </div>
              </div>
              <hr className="my-4" />
              <div className="row mb-4">
                <div className="col-md-6">
                  <div className="form-group">
                    <label htmlFor="inputPassword4">Ancien mot de passe</label>
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword5"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputPassword5">Nouveau mot de passe</label>
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword5"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="inputPassword6">
                      Confirmez le mot de passe
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="inputPassword6"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <p className="mb-2">Exigences du mot de passe</p>
                  <p className="small text-muted mb-2">
                    Pour créer un nouveau mot de passe, vous devez respecter
                    toutes les exigences suivantes :
                  </p>
                  <ul className="small text-muted pl-4 mb-0">
                    <li>Minimum 8 caractères</li>
                    <li>Au moins un caractère spécial</li>
                    <li>Au moins un chiffre</li>
                    <li>
                      Ne peut pas être identique à un mot de passe précédent
                    </li>
                  </ul>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
              <i className="ti ti-device-floppy"></i> Sauvegarder
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;

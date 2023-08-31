import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AjouterUnNouveauProjet = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedExigence, setSelectedExigence] = useState('');
  const [selectedProductivite, setSelectedProductivite] = useState('');
  const [selectedPriority, setSelectedPriority] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedNature, setSelectedNature] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  return (
    <div className="row">
      <div className="col-lg-12 d-flex align-items-stretch">
        <div className="card w-100">
          <div className="card-body">
            <div className="d-sm-flex d-block align-items-center justify-content-between mb-9">
              <div className="mb-3 mb-sm-0">
                <h5 className="card-title fw-semibold">Première étape</h5>
              </div>
            </div>

            <div className="row ">
              <div className="col-md-4">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Tâche
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="col-md-4">
                <label htmlFor="exigenceSelect" className="form-label">
                  Exigence réglementaire
                </label>
                <select
                  className="form-control"
                  id="exigenceSelect"
                  value={selectedExigence}
                  onChange={(e) => setSelectedExigence(e.target.value)}
                >
                  <option value="">Loula 1</option>
                  <option value="exigence1">Loula 2</option>
                  <option value="exigence2">Loula 3</option>
                </select>
              </div>
              <div className="col-md-4">
                <label htmlFor="productiviteSelect" className="form-label">
                  Productivité (économie)
                </label>
                <select
                  className="form-control"
                  id="productiviteSelect"
                  value={selectedProductivite}
                  onChange={(e) => setSelectedProductivite(e.target.value)}
                >
                  <option value="">Loula 1</option>
                  <option value="exigence1">Loula 2</option>
                  <option value="exigence2">Loula 3</option>
                </select>
              </div>
            </div>

            <div className="row mb-3">
              <div className="col-md-4">
                <label htmlFor="prioritySelect" className="form-label">
                  Priorité
                </label>
                <select
                  className="form-control"
                  id="prioritySelect"
                  value={selectedPriority}
                  onChange={(e) => setSelectedPriority(e.target.value)}
                >
                  <option value="">Loula 1</option>
                  <option value="exigence1">Loula 2</option>
                  <option value="exigence2">Loula 3</option>
                </select>
              </div>
              <div className="col-md-4">
                <label htmlFor="categorySelect" className="form-label">
                  Catégorie du projet
                </label>
                <select
                  className="form-control"
                  id="categorySelect"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Loula 1</option>
                  <option value="exigence1">Loula 2</option>
                  <option value="exigence2">Loula 3</option>
                </select>
              </div>
              <div className="col-md-4">
                <label htmlFor="natureSelect" className="form-label">
                  Nature du projet
                </label>
                <select
                  className="form-control"
                  id="natureSelect"
                  value={selectedNature}
                  onChange={(e) => setSelectedNature(e.target.value)}
                >
                  <option value="">Loula 1</option>
                  <option value="exigence1">Loula 2</option>
                  <option value="exigence2">Loula 3</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Date début prévue
                </label>
                <div>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    className="form-control"
                    id="exampleInputPassword1"
                    popperPlacement="bottom"
                    popperModifiers={{
                      flip: {
                        enabled: true,
                      },
                      preventOverflow: {
                        enabled: true,
                        boundariesElement: 'viewport',
                      },
                    }}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Date fin prévue
                </label>
                <div>
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    className="form-control"
                    id="exampleInputPassword1"
                    popperPlacement="bottom"
                    popperModifiers={{
                      flip: {
                        enabled: true,
                      },
                      preventOverflow: {
                        enabled: true,
                        boundariesElement: 'viewport',
                      },
                    }}
                  />
                </div>
              </div>
              <div className="col-md-4">
                <label htmlFor="exampleInputUsername1" className="form-label">
                  Pilote du projet
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleInputUsername1"
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Code centre de coûts
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  aria-describedby="emailHelp"
                />
              </div>
              <div className="col-md-8">
                <label htmlFor="chooseFile" className="form-label">
                  Pièces jointes
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="chooseFile"
                  accept=".jpg, .jpeg, .png, .pdf"
                  onChange={handleFileChange}
                />
              </div>
            </div>

            {/* Espacement entre les éléments */}
            <div className="row">
              <div className="col-md-12">
                <div style={{ height: '15px' }}></div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-12 d-flex justify-content-end">
                <button type="submit" className="btn btn-primary ">
                  SUIVANT
                </button>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AjouterUnNouveauProjet;

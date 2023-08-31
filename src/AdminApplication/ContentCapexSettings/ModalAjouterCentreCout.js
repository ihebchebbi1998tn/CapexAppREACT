import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";

const ModalAjouterCentreCout = ({ showModal, handleClose, tableData }) => {
    const [selectedGroup, setSelectedGroup] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const [successAlertVisible, setSuccessAlertVisible] = useState(false);
    const [codeExistsAlertVisible, setCodeExistsAlertVisible] = useState(false);
    const [emptyFieldsAlertVisible, setEmptyFieldsAlertVisible] = useState(false);

    const [groups, setGroups] = useState([]);
    const [departments, setDepartments] = useState([]);

    const fetchData = async () => {
        try {
            const groupsResponse = await fetch("http://127.0.0.1:8000/groupes/get");
            const groupsData = await groupsResponse.json();
            setGroups(groupsData);

            const departmentsResponse = await fetch("http://127.0.0.1:8000/departements/get");
            const departmentsData = await departmentsResponse.json();
            setDepartments(departmentsData);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleSave = async () => {
        const codeCentrecout = document.getElementById("inputCode").value;
        const totalValue = document.getElementById("inputReste").value;
        const depenseValue = document.getElementById("inputTotal").value;
        const resteValue = document.getElementById("inputDepense").value;

        // Check if any of the required input fields are empty
        if (!codeCentrecout || !selectedGroup || !selectedDepartment || !totalValue || !depenseValue || !resteValue) {
            setEmptyFieldsAlertVisible(true);
            setTimeout(() => {
                setEmptyFieldsAlertVisible(false);
            }, 3000);
            return;
        }

        // Check if the codeCentrecout already exists in tableData
        const codeExists = tableData.some((item) => item.code_centrecout === codeCentrecout);

        if (codeExists) {
            setCodeExistsAlertVisible(true);
            setTimeout(() => {
                setCodeExistsAlertVisible(false);
            }, 3000);
            return;
        }

        const newCenterCout = {
            code_centrecout: codeCentrecout,
            groupe_centrecout: selectedGroup,
            departement_centrecout: selectedDepartment,
            total_centrecout: totalValue,
            depense_centrecout: depenseValue,
            reste_centrecout: resteValue,
        };

        try {
            const response = await fetch("http://127.0.0.1:8000/centres-cout/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newCenterCout),
            });

            if (response.ok) {
                setSuccessAlertVisible(true);
                setTimeout(() => {
                    setSuccessAlertVisible(false);
                    handleClose();
                    fetchData();
                }, 3000);
            } else {
                console.error("Error creating center de coût");
            }
        } catch (error) {
            console.error("Error creating center de coût:", error);
        }
    };

    return (
        <div className={`modal fade ${showModal ? "show" : ""}`} style={{ display: showModal ? "block" : "none" }}>
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Ajouter un centre de coût</h5>
                    </div>
                    <div className="modal-body">
                        <div
                            id="success-alert"
                            className={`alert alert-success ${
                                successAlertVisible ? "d-block" : "d-none"
                            } mt-3`}
                        >
                            Centre de cout ajouté avec succès!
                        </div>
                        <div
                            id="code-exists-alert"
                            className={`alert alert-danger ${
                                codeExistsAlertVisible ? "d-block" : "d-none"
                            } mt-3`}
                        >
                            Le code de centre de coût existe déjà!
                        </div>
                        <div
                            id="empty-fields-alert"
                            className={`alert alert-warning ${
                                emptyFieldsAlertVisible ? "d-block" : "d-none"
                            } mt-3`}
                        >
                            Veuillez remplir tous les champs obligatoires.
                        </div>
                        <form>
                            <div className="mb-3">
                                <label htmlFor="inputCode" className="form-label">
                                    Code
                                </label>
                                <input type="text" className="form-control" id="inputCode" required />
                            </div>
                            <div className="mb-3">
                                <div className="d-flex">
                                    <div className="me-3">
                                        <label htmlFor="selectGroupe" className="form-label">
                                            Groupe
                                        </label>
                                        <select
                                            className="form-control"
                                            id="selectGroupe"
                                            value={selectedGroup}
                                            onChange={(e) => setSelectedGroup(e.target.value)}
                                            required
                                        >
                                            <option value="">Sélectionner un groupe</option>
                                            {groups.map((group) => (
                                                <option key={group.id_groupe} value={group.nom_groupe}>
                                                    {group.nom_groupe}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="selectDepartement" className="form-label">
                                            Département
                                        </label>
                                        <select
                                            className="form-control"
                                            id="selectDepartement"
                                            value={selectedDepartment}
                                            onChange={(e) => setSelectedDepartment(e.target.value)}
                                            required
                                        >
                                            <option value="">Sélectionnez un département</option>
                                            {departments.map((department) => (
                                                <option key={department.id_departement} value={department.nom_departement}>
                                                    {department.nom_departement}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="inputReste" className="form-label">
                                    Total
                                </label>
                                <div className="input-group">
                                    <input type="text" className="form-control" id="inputReste" />
                                    <span className="input-group-text">TND</span>
                                </div>
                            </div>
                            <div className="mb-3">
                                <div className="d-flex">
                                    <div className="me-3">
                                        <label htmlFor="inputTotal" className="form-label">
                                            Dépense
                                        </label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="inputTotal"
                                                value="0"
                                                readOnly
                                            />
                                            <span className="input-group-text">TND</span>
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="inputDepense" className="form-label">
                                            Reste
                                        </label>
                                        <div className="input-group">
                                            <input
                                                type="text"
                                                className="form-control"
                                                id="inputDepense"
                                                value="0"
                                                readOnly
                                            />
                                            <span className="input-group-text">TND</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button
                            type="button"
                            className="btn btn-secondary"
                            onClick={handleClose}
                        >
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleSave}
                        >
                            <FontAwesomeIcon icon={faCheck} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalAjouterCentreCout;

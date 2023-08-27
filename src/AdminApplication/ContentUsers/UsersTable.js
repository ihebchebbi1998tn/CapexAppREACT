import React, { useEffect, useState } from "react";

const UsersTable = () => {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGroup, setSelectedGroup] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [sortDirection, setSortDirection] = useState("asc"); // Default sort direction

  useEffect(() => {
    fetch("http://127.0.0.1:8001/user/get")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.nom_utilisateur.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedGroup === "" || user.groupe_utilisateur === selectedGroup) &&
      (selectedDepartment === "" || user.role_utilisateur === selectedDepartment)
  );

  const sortedUsers = [...filteredUsers].sort((a, b) => {
    const aValue = a.nom_utilisateur;
    const bValue = b.nom_utilisateur;
    if (sortDirection === "asc") {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  return (
    <div className="col-lg-12 d-flex align-items-stretch">
      <div className="card w-100">
        <div className="card-body p-4">
          <h5 className="card-title fw-semibold mb-4">Table d'Utilisateurs</h5>

          <div className="d-flex align-items-center mb-3">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Rechercher par nom..."
              className="form-control me-3"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />

            {/* Group Select */}
            <select
              className="form-select me-3"
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
            >
              <option value="">Tous les groupes</option>
              <option value="CLC">CLC</option>
              <option value="CLN">CLN</option>
              <option value="CLSB">CLSB</option>
              <option value="SBC">SBC</option>
              <option value="CF">CF</option>
              <option value="Delta Plastic">Delta Plastic</option>
              <option value="STIAL">STIAL</option>
              <option value="SOCOGES">SOCOGES</option>
            </select>

          {/* Department Select */}
<select
  className="form-select"
  value={selectedDepartment}
  onChange={(e) => setSelectedDepartment(e.target.value)}
>
  <option value="">Tous les départements</option>
  <option value="Ressources humaines (RH)">
    Ressources humaines (RH)
  </option>
  <option value="Finance">Finance</option>
  <option value="Marketing">Marketing</option>
  <option value="Ventes">Ventes</option>
  <option value="Recherche et développement (R&D)">
    Recherche et développement (R&D)
  </option>
  <option value="Production">Production</option>
  <option value="Approvisionnement">Approvisionnement</option>
  <option value="Service client">Service client</option>
  <option value="Informatique">Informatique</option>
  <option value="Juridique">Juridique</option>
  <option value="Logistique">Logistique</option>
</select>
          </div>

          <div className="table-responsive">
            <table className="table text-nowrap mb-0 align-middle">
              <thead className="text-dark fs-4">
                <tr>
                  <th className="border-bottom-0">
                    <h6 className="fw-semibold mb-0">Nom</h6>
                  </th>
                  <th className="border-bottom-0">
                    <h6 className="fw-semibold mb-0">Email</h6>
                  </th>
                  <th className="border-bottom-0">
                    <h6 className="fw-semibold mb-0">Groupe</h6>
                  </th>
                  <th className="border-bottom-0">
                    <h6 className="fw-semibold mb-0">Département</h6>
                  </th>
                  <th className="border-bottom-0">
                    <h6 className="fw-semibold mb-0">Role</h6>
                  </th>
                  <th className="border-bottom-0">
                    <h6 className="fw-semibold mb-0">-</h6>
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedUsers.map((user) => (
                  <tr key={user.id_utilisateur}>
                    <td className="border-bottom-0">
                      <h6 className="fw-semibold mb-1">
                        {user.nom_utilisateur}
                      </h6>
                      <span className="fw-normal">{user.code_utilisateur}</span>
                    </td>
                    <td className="border-bottom-0">
                      <p className="mb-0 fw-normal">{user.email_utilisateur}</p>
                    </td>
                    <td className="border-bottom-0">
                      <p className="mb-0 fw-normal">
                        {user.groupe_utilisateur}
                      </p>
                    </td>
                    <td className="border-bottom-0">
                      <div className="d-flex align-items-center gap-2">
                        {user.role_utilisateur}
                      </div>
                    </td>
                    <td className="border-bottom-0">
                      {user.type_utilisateur === "Admin" ? (
                        <span className="badge bg-primary rounded-3 fw-semibold">
                          {user.type_utilisateur}
                        </span>
                      ) : user.type_utilisateur === "Utilisateur" ? (
                        <span className="badge bg-success rounded-3 fw-semibold">
                          {user.type_utilisateur}
                        </span>
                      ) : null}
                    </td>
                    <td className="border-bottom-0">
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src="/icons/edit.png"
                          alt="Modify"
                          className="cursor-pointer"
                          style={{ width: "20px", height: "20px" }}
                        />
                        <img
                          src="/icons/delete.png"
                          alt="Delete"
                          className="cursor-pointer"
                          style={{ width: "20px", height: "20px" }}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;

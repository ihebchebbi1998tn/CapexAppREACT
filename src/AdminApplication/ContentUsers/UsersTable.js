import React, { useEffect, useState } from "react";

const UsersTable = () => {
  const [users, setUsers] = useState([]);

  // Fetch user data from Symfony API
  useEffect(() => {
    // Replace with your Symfony API endpoint to fetch users
    fetch("http://127.0.0.1:8001/user/get")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <div className="col-lg-12 d-flex align-items-stretch">
      <div className="card w-100">
        <div className="card-body p-4">
          <h5 className="card-title fw-semibold mb-4">Table d'Utilisateurs</h5>
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
                {users.map((user) => (
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

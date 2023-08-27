import React from 'react';
import UsersTable from './UsersTable';
import ButtonAjouterUser from './ButtonAjouterUser';
import AddUsers from './AddUser';
const UsersPage = () => {
 

  return (
    <div class="container-fluid">
      <ButtonAjouterUser />
      <AddUsers />
   <UsersTable />
         </div>
  );
};

export default UsersPage;

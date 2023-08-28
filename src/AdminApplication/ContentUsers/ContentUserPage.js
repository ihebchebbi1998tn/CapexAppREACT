import React from 'react';
import UsersTable from './UsersTable';
import AddUsers from './AddUser';
const UsersPage = () => {
 

  return (
    <div className="container-fluid">
      <AddUsers />
   <UsersTable />
         </div>
  );
};

export default UsersPage;

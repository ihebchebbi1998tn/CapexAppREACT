import React from 'react';

const DeleteConfirmationDialog = ({ onDelete, onCancel }) => {
  return (
    <div className="delete-confirmation-dialog">
      <p>Are you sure you want to delete this project?</p>
      <button onClick={onDelete}>Delete</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default DeleteConfirmationDialog;

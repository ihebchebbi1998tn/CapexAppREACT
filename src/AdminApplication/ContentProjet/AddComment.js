import React, { useState } from 'react';
import axios from 'axios';
import { useUser } from '../../UserContext';

const AddComment = ({projectName}) => {
  const [commentText, setCommentText] = useState('');
  const [commentAdded, setCommentAdded] = useState(false);
  const [message, setMessage] = useState(null);
  const { userData } = useUser();
  const userNom = userData.nom;
  const userImage = userData.image ;
  const addComment = async () => {
    const user_comment = userNom; // Your user's comment
    const photouser_comment = userImage;
    const text_comment = commentText;
    const date = new Date();
    const date_comment = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`; // Format the date as MM/DD/YYYY
    const project_comment = projectName?.nom_projet; // Your project name

    const newComment = {
      user_comment,
      photouser_comment,
      text_comment,
      date_comment,
      project_comment,
    };

    try {
      // Send a POST request to your API to create a new comment
      const response = await axios.post('http://127.0.0.1:8000/comments/create', newComment);
      // Handle success, e.g., show a success message
      console.log('Comment created:', response.data);
      setCommentAdded(true);
      setMessage({
        text: "Commentaire créé avec succès ✔",
        level: "success",
      }); setTimeout(() => {
        setMessage(null);
      }, 6000);
    } catch (error) {
      // Handle any errors, e.g., show an error message
      console.error('Error creating comment:', error);
    }
  };

  return (
    <div className="container mt-4">
     
        <div className="row">
          <div className="col-md-12">
            <div className="border p-3">
              <h3 className="mb-4">Nouveau Commentaire</h3>
              {message && (
              <div className={`alert alert-${message.level}`}>
                {message.text}
              </div>
            )}
              <div className="form-group">
                <label htmlFor="comment" className="sr-only">
                  Votre Commentaire
                </label>
                <textarea
                  className="form-control"
                  id="comment"
                  rows="4"
                  placeholder="Votre commentaire"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  required
                ></textarea>
              </div>
              {/* Espacement entre les éléments */}
            <div className="row">
              <div className="col-md-12">
                <div style={{ height: "15px" }}></div>
              </div>
            </div>
              <button
                className="btn btn-primary float-right"
                onClick={addComment} // Call the addComment function when the button is clicked
              >
                Soumettre un commentaire ✔
              </button>
            </div>
          </div>
        </div>
      </div>
   
  );
};

export default AddComment;

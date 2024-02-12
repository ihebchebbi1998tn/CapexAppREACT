import React, { Component } from 'react';
import axios from 'axios';

class DisplayComments extends Component {
  constructor() {
    super();
    this.state = {
      comments: [],
    };
  }

  componentDidMount() {
    this.fetchComments();

    // Refresh comments every 3 seconds
    this.refreshInterval = setInterval(() => {
      this.fetchComments();
    }, 3000);
  }

  componentWillUnmount() {
    // Clear the refresh interval when the component unmounts
    clearInterval(this.refreshInterval);
  }

  fetchComments() {
    // You can use the projectName prop here to filter comments
    const { projectName } = this.props;

    axios
      .get('http://127.0.0.1:8000/comments/list')
      .then((response) => {
        // Filter comments to show only those with matching project_comment
        const filteredComments = response.data.filter(
          (comment) => comment.project_comment === projectName?.nom_projet
        );

        // Sort the filtered comments by date in descending order (newest first)
        const sortedComments = filteredComments.sort(
          (a, b) => new Date(b.date_comment) - new Date(a.date_comment)
        );

        this.setState({ comments: sortedComments });
      })
      .catch((error) => {
        console.error('Error fetching comments:', error);
      });
  }

  handleDelete = (commentId) => {
    // Prompt the user for confirmation
    const isConfirmed = window.confirm("êtes-vous sûr de vouloir supprimer ce commentaire?");
    
    if (isConfirmed) {
      // If user confirms, proceed with the deletion
      axios
        .delete(`http://127.0.0.1:8000/comments/delete/${commentId}`)
        .then((response) => {
          console.log(response.data.message.text); // Log success message
          // Refresh comments after deletion
          this.fetchComments();
        })
        .catch((error) => {
          console.error('Error deleting comment:', error);
        });
    }
  };

  renderComment(author, photo, date, content, key, commentId) {
    // Split the date string into day, month, and year
    const [month, day, year] = date.split('/');

    // Construct a new date string in the format "MM/DD/YYYY"
    const formattedDate = `${month}/${day}/${year}`;

    return (
      <div className="media border-top" key={key}>
        <div className="row align-items-center">
          <div className="col-md-1 mr-3">
            <img
              className="mr-3"
              src={photo}
              alt="Author Image"
              style={{ width: '65px', height: '65px' }}
            />
          </div>
          <div className="col-md-11">
            <div className="row">
              <div className="col-md-12">
                <div style={{ height: '15px' }}></div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12 d-flex justify-content-between">
                <h5 className="mt-0 text2">{author}</h5>
                <div>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => this.handleDelete(commentId)} // Pass the comment id to the delete function
                  >
                   <i className="ti ti-trash"></i>
                  </button>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <p>{content}</p>
              </div>
            </div>
            <div className="row mt-3">
              <div className="col-md-12 d-flex justify-content-between">
                <span className="text3"></span>
                <span className="text4">{new Date(formattedDate).toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="container mt-12">
        <div className="row">
          <div className="col-md-12">
            <div className="border p-3 second">
              <h3 className="text1">{this.state.comments.length} Commentaires</h3>
              {this.state.comments.map((comment, index) =>
                this.renderComment(
                  comment.user_comment,
                  comment.photouser_comment,
                  comment.date_comment,
                  comment.text_comment,
                  index,
                  comment.id  // Pass the comment id to the renderComment function
                )
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default DisplayComments;

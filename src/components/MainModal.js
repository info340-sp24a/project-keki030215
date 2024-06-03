import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';

export function NoInputModal(props) {
  const { show, onHide, title } = props;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
            There is <mark>no input</mark> right now... 
            <br></br>
            Let's write something down!
        </p>
      </Modal.Body>
    </Modal>
  );
}


export function SubmissionModal(props) {

  const { show, onHide, title } = props;
  const navigate = useNavigate();

  function handleGoToDreamDiary() {
      onHide();
      navigate('/dream-diary');
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
            Your dream has been <mark>successfully recorded</mark>!
        </p>
        <div className="d-grid col-6 mx-auto">
            <button
            onClick={handleGoToDreamDiary} 
            aria-label="go to dream diary" 
            className="btn btn-dark"
            type="button">
                View in Dream Diary
            </button>
        </div>
      </Modal.Body>
    </Modal>
  );
}
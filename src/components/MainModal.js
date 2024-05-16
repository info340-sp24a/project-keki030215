import React, { useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';

export function NoInputModal({ show, onHide, title }) {
    useEffect(function setupAutoClose() {
        if (show) {
            const timer = setTimeout(onHide, 2000);
            return function cleanup() {
                clearTimeout(timer);
            };
        }
    }, [show, onHide]);

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


export function SubmissionModal({ show, onHide, title }) {
    useEffect(function setupAutoClose() {
        if (show) {
            const timer = setTimeout(onHide, 2000);
            return function cleanup() {
                clearTimeout(timer);
            };
        }
    }, [show, onHide]);

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>
            Your dream has been <mark>successfully recorded</mark>!
        </p>
      </Modal.Body>
    </Modal>
  );
}
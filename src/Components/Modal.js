import React from 'react';
import ReactDOM from 'react-dom';
import './modal.css';

function Modal(props) {
  const { show, closeModal, children } = props;
  console.log('show, closeModal, children', show());

  const modal = (
    <>
      <div className={show() ? 'modal__overlay' : 'modal_hide'} onClick={closeModal} />
      <div className={show() ? 'modal__window' : 'modal_hide'}>
        <button
          onClick={closeModal}
          className="btn-close position-absolute top-0 end-0 m-2"
          aria-label="Close"
        ></button>
        {children}
      </div>
    </>
  );
  return ReactDOM.createPortal(modal, document.getElementById('modal-root'));
}

export default Modal;

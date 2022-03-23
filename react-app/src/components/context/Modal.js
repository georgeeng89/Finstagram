import React, { useContext, useRef, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

const ModalContext = React.createContext();

export function ModalProvider({ children }) {
  const modalRef = useRef();
  const [value, setValue] = useState();

  useEffect(() => {
    setValue(modalRef.current);
  }, []);

  return (
    <>
      <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
      <div ref={modalRef} />
    </>
  );
}

// export function Modal({ onClose, children }) {
//   const modalNode = useContext(ModalContext);
//   if (!modalNode) return null;

//   return ReactDOM.createPortal(
//     <div id='modal'>
//       <div id='modal-background' onClick={onClose} />
//       <div id='modal-content'>{children}</div>
//     </div>,
//     modalNode
//   );
// }

export const Modal = props => {
  if (!props.show) {
    return null;
  }

  return (
    <div className='modal' onClick={props.onClose}>
      <div className='modal-content' onClick={e => e.stopPropagation()}>
        <div className='modal-header'>
          <h4 className='modal-title'>{props.title}</h4>
        </div>
        <div className='modal-body'>{props.children}</div>
        <div className='modal-footer'>
          <button onClick={props.onClose} className='button'>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};



export const Modal2 = props => {
  if (!props.show) {
    return null;
  }

  return (
    <div className='modal' onClick={props.onClose}>
      <div className='modal-content' onClick={e => e.stopPropagation()}>
        <div className='modal-header'>
          <div className='modal-body'>{props.title}</div>
        </div>
        <div className='modal-body'>{props.children}</div>
        <div className='modal-footer'>
          <button onClick={props.onClose} className='button'>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};


export const Modal3 = props => {
  if (!props.show) {
    return null;
  }

  return (
    <div className='comments-list-modal' onClick={props.onClose}>
      <div className='comments-list-modal-content' onClick={e => e.stopPropagation()}>
        <div className='modal-header'>
          <div className='modal-body'>{props.title}</div>
        </div>
        <div className='modal-body'>{props.children}</div>
        <div className='modal-footer'>
          <button onClick={props.onClose} className='button'>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export const Modal4 = props => {
  if (!props.show) {
    return null;
  }

  return (
    <div className='comments-list-modal' onClick={props.onClose}>
      <div className='modal-content4' onClick={e => e.stopPropagation()}>
        <div className='modal-header'>
          <h4 className='modal-title'>{props.title}</h4>
        </div>
        <div className='modal-body'>{props.children}</div>
        <div className='modal-footer'>
          <button onClick={props.onClose} className='button'>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};





export const CommentModal = props => {
  if (!props.show) {
    return null;
  }

  return (
    <div className='comment-modal' onClick={props.onClose}>
      <div className='comment-modal-content' onClick={e => e.stopPropagation()}>
        {/* <div className='comment-modal-header'> */}
        <div className='comment-modal-left'>{props.title}</div>
        {/* </div> */}


        <div className='comment-modal-right'>
          {props.children}
          </div>
        <div onClick={props.onClose} className='comment-button'>
          <div className='comment-modal-footer'>
            <i class="fas fa-times"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

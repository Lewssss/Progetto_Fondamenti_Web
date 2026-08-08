import React from 'react';
import './Modal.css';
function Modal({open, onClose, content}) {
    if(!open) return null;
    return(
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                {content}
            </div>
        </div>
    )
}
export default Modal;
import React from 'react';
import {createPortal} from 'react-dom'
import './Modal.css';
function Modal({open, onClose, content, ask, confirmAction}) {
    if(!open) return null;
    const modal = !ask ? (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                {content}
            </div>
        </div>
    ) : //preimpostiamo il modal cosi che possa fare anche da modal di confirm per delete e forse altro (se si setta ask=true quando si chiama il modal)
    <div className="modal-overlay" onClick={onClose} >
        <div className="modal-box-confirm" onClick={(e) => e.stopPropagation()}>
            <p id="confirm-text"> Sei sicuro di eliminarlo?</p>
            <button className="confirm-action" type="submit" onClick={confirmAction} id="Delete">Elimina</button>
            <button type="button" className="confirm-action" onClick={onClose} id="Cancel" >Annulla</button>
        </div>
    </div>;
    return createPortal(modal,document.body); //dato che non sappiuamo mai dove ci troviamo, lo rendiamo figlio di body direttamente, altrimenti viene clippato in base a dove siamo
}
export default Modal;
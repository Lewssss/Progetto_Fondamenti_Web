import React from 'react';
import './Modal.css';
function Modal({open, onClose, content, ask, confirmAction}) {
    if(!open) return null;
    return !ask ? (
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
}
export default Modal;
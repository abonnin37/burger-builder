import React from 'react';

import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => (
    <React.Fragment>
        <Backdrop show={props.show} clicked={props.modalClosed}/>
        <div 
            className={classes.Modal}
            style={{
                transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                opacity: props.show ? '1' : '0'
            }}>
            {props.children}
        </div>
    </React.Fragment>
);

// méthode qui est passé en second paramètre qui dit quand le composant n'a pas besoin de s'actualiser, dans notre cas nous comparons si la variable show est la même, si elle ne change pas de statut nous n'avons pas besoin d'actualiser le composant parce que le modal ne sera pas montré
const showIsEqual = (prevModal, nextModal) => prevModal.show === nextModal.show

export default React.memo(modal, showIsEqual);
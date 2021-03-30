import React from 'react';
import Modal from '../../components/UI/Modal/Modal';
import useHttpErrorHandler from '../../hooks/http-error-handler';

const withErrorHandler = ( WrappedComponent, axios ) => {
    return (props) => {
        const [error, cleanError] = useHttpErrorHandler(axios);

        return (
            <React.Fragment>
                <Modal show={error} modalClosed={cleanError}>
                    {error ? error.message : null}
                </Modal>
                <WrappedComponent {...props} />
            </React.Fragment>
        );
    };
};

export default withErrorHandler;
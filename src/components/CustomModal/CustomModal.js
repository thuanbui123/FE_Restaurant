import Modal from 'react-modal';

function CustomModal(props) {
    const modalStyle = {
        content: {
            position: 'relative',
            borderRadius: '0.3rem',
            backgroundColor: '#fff',
            border: '1px solid #dee2e6',
            boxShadow: '0 0.125rem 0.25rem rgba(0,0,0,.075)',
            padding: '0',
            maxWidth: '600px',
            margin: '0 auto',
            maxHeight: '500px',
            overflowY: 'auto',
        },
        overlay: {
            position: 'fixed',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            backgroundColor: 'rgba(0,0,0,0.5)',
        },
    };

    const headerStyle = {
        display: 'flex',
        alignItems: 'center',
        padding: '1rem',
        borderBottom: '1px solid #dee2e6',
        backgroundColor: '#f1f1f1',
        textAlign: '16px',
    };

    const bodyStyle = {
        padding: '1rem',
    };

    const footerStyle = {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '1rem',
        borderTop: '1px solid #dee2e6',
        backgroundColor: '#f1f1f1',
    };

    return (
        <Modal
            isOpen={props.isOpen}
            onRequestClose={props.onRequestClose}
            contentLabel={props.contentLabel}
            ariaHideApp={false}
            style={modalStyle}
        >
            <div style={headerStyle}>{props.contentLabel}</div>
            <div style={bodyStyle}>{props.children}</div>
            <div style={footerStyle}>{props.footer}</div>
        </Modal>
    );
}

export default CustomModal;

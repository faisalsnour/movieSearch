import './style.css';

const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <div style={{ textAlign: "center" }}> {children}
                    <button type="button" className="btn btn-primary" onClick={handleClose}>
                        Close
        </button>
                </div>

            </section>
        </div>
    );
};

export default Modal
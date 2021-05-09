import './style.css';

const Modal = ({ handleClose, show, children }) => {
    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <div style={{ textAlign: "center", marginTop: "10px" }}> {children}
                    <button type="button" name="close" className="btn btn-success mb-3" onClick={handleClose}>
                        Close
        </button>
                </div>

            </section>
        </div>
    );
};

export default Modal
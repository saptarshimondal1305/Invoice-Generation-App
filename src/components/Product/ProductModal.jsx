import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-bootstrap/Modal";

const ProductModal = (props) => {
  return (
    <div>
      <Modal
        show={props.showModal}
        onHide={props.closeModal}
        size="lg"
        centered
      >
        <div id="productCapture">
          <div className="d-flex flex-row justify-content-between align-items-start bg-light w-100 p-4">
            <div className="w-100">
              <h6 className="fw-bold text-secondary mb-1">
                Product ID: {props.info.id || ""}
              </h6>
              <h4 className="fw-bold my-2">
                {props.info.name || "John Uberbacher"}
              </h4>
              <h6 className="fw-bold text-secondary mb-1">
                Price: {props.info.currency} {props.info.price || ""}
              </h6>
            </div>
            <div className="text-end ms-4">
              <h4 className="fw-bold mt-1 mb-2">Category:</h4>
              <h6 className="fw-bold text-secondary">{props.info.category}</h6>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ProductModal;

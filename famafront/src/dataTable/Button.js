import React from "react";

const button = (props) => {
  return (
    <div className="container-fluid">
      <div className="row mt-3">
        <div className="col-md-4 offset-4">
          <div className="d-grid mx-auto">
            <button
              className="btn btn-dark"
              data-bs-toggle="modal"
              data-bs-target={props.target}
              onClick={() => props.openModal(1)}
            >
              <i className="fa-solid fa-circle-plus"></i> {props.title}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default button;

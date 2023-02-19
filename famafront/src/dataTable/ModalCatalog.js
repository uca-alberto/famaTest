import { useEffect, useState, React } from "react";

const ModalCatalog = (props) => {
  const [catalog, setCatalog] = useState(props.catalog);
  useEffect(() => {
    setCatalog(props.catalog);
  }, [props.catalog]);
  return (
    <div id={props.idModal} className="modal fade" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{props.title}</h5>
            <button className="btn-close" data-bs-dismiss="modal"></button>
          </div>
          <div className="modal-body">
            <input type="hidden" id="id" />
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                <i className="fa-solid fa-user"></i>
              </span>
              <input
                type="text"
                className="form-control"
                id="code"
                placeholder="Code"
                value={catalog.code}
                onChange={(e) =>
                  setCatalog((catalog) => ({
                    ...catalog,
                    ...{ code: e.target.value },
                  }))
                }
              />
            </div>
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                <i className="fa-solid fa-user"></i>
              </span>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Name"
                value={catalog.name}
                onChange={(e) =>
                  setCatalog((catalog) => ({
                    ...catalog,
                    ...{ name: e.target.value },
                  }))
                }
              />
            </div>
            <div className="d-grid col-6 mx-auto">
              <button
                className="btn btn-success"
                onClick={() => props.OnValidate(catalog)}
              >
                <i className="fa-solid fa-circle-plus"></i> {props.title}
              </button>
            </div>
          </div>
          <div className="modal-footer">
            <button
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              id="btnClose"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalCatalog;

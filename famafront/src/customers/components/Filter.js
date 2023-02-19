import { React, useState, useEffect } from "react";
import { MDBCol, MDBContainer, MDBRow } from "mdbreact";
export const Filter = (props) => {
  const [filter, setFilter] = useState(props.filter);
  return (
    <>
      <MDBContainer>
        <MDBRow>
          <MDBCol md="3">
            <div className="input-group mb-3">
              <span className="input-group-text" id="basic-addon1">
                <i className="fa-solid fa-user"></i>
              </span>
              <input
                type="text"
                className="form-control"
                id="firstName"
                placeholder="Filtro por nombre"
                value={filter.name}
                onChange={(e) =>
                  setFilter((filter) => ({
                    ...filter,
                    ...{ name: e.target.value },
                  }))
                }
              />
            </div>
          </MDBCol>
          <MDBCol md="6">
            <MDBRow>
              <MDBCol md="6">
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fa-solid fa-user"></i>
                  </span>
                  <input
                    type="date"
                    className="form-control"
                    id="dateStar"
                    placeholder="Fecha de inicio"
                    value={filter.dateStar}
                    onChange={(e) =>
                      setFilter((filter) => ({
                        ...filter,
                        ...{ dateStar: e.target.value },
                      }))
                    }
                  />
                </div>
              </MDBCol>
              <MDBCol md="6">
                <div className="input-group mb-3">
                  <span className="input-group-text" id="basic-addon1">
                    <i className="fa-solid fa-user"></i>
                  </span>
                  <input
                    type="date"
                    className="form-control"
                    id="dateEnd"
                    placeholder="Fecha de fin"
                    value={filter.dateEnd}
                    onChange={(e) =>
                      setFilter((filter) => ({
                        ...filter,
                        ...{ dateEnd: e.target.value },
                      }))
                    }
                  />
                </div>
              </MDBCol>
            </MDBRow>
          </MDBCol>
          <MDBCol md="3">
            <div className="d-grid col-6 mx-auto">
              <button
                className="btn btn-success"
                onClick={() => props.OnSumit(filter)}
              >
                <i className="fa-solid fa-circle-plus"></i> Filtrar
              </button>
            </div>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </>
  );
};

import { useEffect, useState, React } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBFooter,
  MDBCard,
  MDBCardBody,
  MDBCardText,
  MDBCardTitle,
} from "mdbreact";

function ModalService(props) {
  const [customer, setCustomer] = useState(props.customer);
  useEffect(() => {
    setCustomer(props.customer);
  }, [props.customer]);
  return (
    <>
      <div
        id="modalCustomer"
        className="modal fade modal-lg"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{props.title}</h5>
              <button className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <input type="hidden" id="id" />
              <MDBContainer>
                <MDBRow>
                  <MDBCol md="6">
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa-solid fa-user"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        id="firstName"
                        placeholder="First Name"
                        value={customer.firstName}
                        onChange={(e) =>
                          setCustomer((customer) => ({
                            ...customer,
                            ...{ firstName: e.target.value },
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
                        type="text"
                        className="form-control"
                        id="secondName"
                        placeholder="Second Name"
                        value={customer.secondName}
                        onChange={(e) =>
                          setCustomer((customer) => ({
                            ...customer,
                            ...{ secondName: e.target.value },
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
                        type="text"
                        className="form-control"
                        id="surnName"
                        placeholder="surnName"
                        value={customer.surnName}
                        onChange={(e) =>
                          setCustomer((customer) => ({
                            ...customer,
                            ...{ surnName: e.target.value },
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
                        type="text"
                        className="form-control"
                        id="secondSurnName"
                        placeholder="secondSurnName"
                        value={customer.secondSurnName}
                        onChange={(e) =>
                          setCustomer((customer) => ({
                            ...customer,
                            ...{ secondSurnName: e.target.value },
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
                        id="birthDate"
                        placeholder="birthDate"
                        value={new Date(customer.birthDate)
                          .toISOString()
                          .slice(0, 10)}
                        onChange={(e) =>
                          setCustomer((customer) => ({
                            ...customer,
                            ...{ birthDate: e.target.value },
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
                        type="text"
                        className="form-control"
                        id="Dni"
                        placeholder="Dni"
                        value={customer.dni}
                        onChange={(e) =>
                          setCustomer((customer) => ({
                            ...customer,
                            ...{ dni: e.target.value },
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
                        type="text"
                        className="form-control"
                        id="PhoneNumber"
                        placeholder="Telefono"
                        value={customer.PhoneNumber}
                        onChange={(e) =>
                          setCustomer((customer) => ({
                            ...customer,
                            ...{ PhoneNumber: e.target.value },
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
                        type="email"
                        className="form-control"
                        id="Email"
                        placeholder="Email"
                        value={customer.Email}
                        onChange={(e) =>
                          setCustomer((customer) => ({
                            ...customer,
                            ...{ Email: e.target.value },
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
                      <select
                        className="form-select"
                        id="isActive"
                        value={customer.isActive}
                        onChange={(e) =>
                          setCustomer((customer) => ({
                            ...customer,
                            ...{ isActive: e.target.value },
                          }))
                        }
                      >
                        <option key="0" value="0" disabled>
                          Seleccione un estado
                        </option>
                        <option key="true" value="true">
                          Activo
                        </option>
                        <option key="false" value="false">
                          Inactivo
                        </option>
                      </select>
                    </div>
                  </MDBCol>
                  <MDBCol md="6">
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa-solid fa-user"></i>
                      </span>
                      <select
                        className="form-select"
                        id="civilStatus"
                        value={customer.civilStatusId}
                        onChange={(e) =>
                          setCustomer((customer) => ({
                            ...customer,
                            ...{ civilStatusId: e.target.value },
                          }))
                        }
                      >
                        <option key="0" value="0" disabled>
                          Seleccione un estado civil
                        </option>
                        {props.civilStatus.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </MDBCol>
                  <MDBCol md="6">
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa-solid fa-user"></i>
                      </span>
                      <select
                        className="form-select"
                        id="personType"
                        value={customer.personTypeId}
                        onChange={(e) =>
                          setCustomer((customer) => ({
                            ...customer,
                            ...{ personTypeId: e.target.value },
                          }))
                        }
                      >
                        <option key="0" value="0" disabled>
                          Seleccione un tipo de persona
                        </option>
                        {props.personType.map((option) => (
                          <option key={option.id} value={option.id}>
                            {option.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </MDBCol>
                  <MDBCol md="6">
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa-solid fa-user"></i>
                      </span>
                      <select
                        className="form-select"
                        id="gender"
                        value={customer.gender}
                        onChange={(e) =>
                          setCustomer((customer) => ({
                            ...customer,
                            ...{ gender: e.target.value },
                          }))
                        }
                      >
                        <option key="0" value="0" disabled>
                          Seleccione genero
                        </option>
                        <option key="M" value="M">
                          Masculino
                        </option>
                        <option key="F" value="F">
                          Femenino
                        </option>
                      </select>
                    </div>
                  </MDBCol>
                  <MDBCol md="6">
                    <div className="input-group mb-3">
                      <span className="input-group-text" id="basic-addon1">
                        <i className="fa-solid fa-user"></i>
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        id="Address"
                        placeholder="Address"
                        value={customer.address}
                        onChange={(e) =>
                          setCustomer((customer) => ({
                            ...customer,
                            ...{ address: e.target.value },
                          }))
                        }
                      />
                    </div>
                  </MDBCol>
                  <MDBCol md="12">
                    <div className="d-grid col-6 mx-auto">
                      <button
                        className="btn btn-success"
                        onClick={() => props.OnValidate(customer)}
                      >
                        <i className="fa-solid fa-circle-plus"></i>{" "}
                        {props.title}
                      </button>
                    </div>
                  </MDBCol>
                </MDBRow>
              </MDBContainer>
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
    </>
  );
}

ModalService.propTypes = {};

export default ModalService;

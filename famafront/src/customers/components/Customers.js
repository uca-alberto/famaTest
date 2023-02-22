import { useEffect, useState } from "react";
import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { showAlert } from "./functions/functions";
import DataTableList from "./DataTableList";
import ModalService from "./ModalService";
import Button from "../../dataTable/Button";
import { Filter } from "./Filter";
import { FAMA_GET_ENDPOINTS } from "../../services/endpoints";
const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [customer, setCustomer] = useState({
    firstName: "",
    secondName: "",
    surnName: "",
    secondSurnName: "",
    id: "",
    operation: 1,
    title: "",
    isActive: 0,
    civilStatusId: 0,
    personTypeId: 0,
    address: "",
    dni: "",
    gender: 0,
    birthDate: new Date().toISOString().slice(0, 10),
    PhoneNumber: "",
    Email: "",
  });
  const [filter, setFilter] = useState({
    name: "",
    dateStar: null,
    dateEnd: null,
  });
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [civilStatus, setCivilStatus] = useState([]);
  const [personType, setPersonType] = useState([]);
  useEffect(() => {
    getCustomers();
    getCivilStatus();
    getPersonType();
  }, []);

  const getCustomers = async () => {
    fetch(`${FAMA_GET_ENDPOINTS.customers}`)
      .then((response) => response.json())
      .then((data) => {
        setCustomers(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const getCivilStatus = async () => {
    fetch(`${FAMA_GET_ENDPOINTS.civilStatus}`)
      .then((response) => response.json())
      .then((data) => {
        setCivilStatus(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const getPersonType = async () => {
    fetch(`${FAMA_GET_ENDPOINTS.personTypes}`)
      .then((response) => response.json())
      .then((data) => {
        setPersonType(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const filterCustomer = async (filter) => {
    var response = await fetch(`${FAMA_GET_ENDPOINTS.customerFilter}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(filter),
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    if (response.statusCode != null) {
      showAlert(response.message, "error", "error");
      return;
    }
    setCustomers(response);
  };

  const openModal = (op, obj) => {
    if (op === 1) {
      setTitle("Crear");
      setCustomer((customer) => ({
        ...customer,
        ...{
          firstName: "",
          secondName: "",
          surnName: "",
          secondSurnName: "",
          id: 0,
          operation: 1,
          title: "",
          isActive: 0,
          civilStatusId: 0,
          personTypeId: 0,
          address: "",
          dni: "",
          gender: 0,
          birthDate: new Date().toISOString().slice(0, 10),
          PhoneNumber: "",
          Email: "",
        },
      }));
    } else if (op === 2) {
      setTitle("Editar");
      setCustomer((customer) => ({
        ...customer,
        ...{
          firstName: obj.firstName,
          secondName: obj.secondName,
          surnName: obj.surnName,
          secondSurnName: obj.secondSurnName,
          id: obj.id,
          operation: 2,
          isActive: obj.isActive,
          civilStatusId: obj.civilStatusId,
          personTypeId: obj.personTypeId,
          address: obj.address,
          dni: obj.dni,
          gender: obj.gender,
          birthDate: obj.birthDate,
          PhoneNumber: obj.customerDetailInfosMap.find(
            (x) => x.label === "Phone"
          )?.value,
          Email: obj.customerDetailInfosMap.find((x) => x.label === "Email")
            ?.value,
        },
      }));
    }
    window.setTimeout(() => {
      document.getElementById("firstName").focus();
    }, 500);
  };

  const validate = (data) => {
    if (data.firstName.trim() === "") {
      showAlert("Ingrese el nombre", "error", "error");
      return;
    }
    if (data.secondName.trim() === "") {
      showAlert("Ingrese el segundo nombre", "error", "error");
      return;
    }
    if (data.surnName.trim() === "") {
      showAlert("Ingrese el apellido", "error", "error");
      return;
    }
    if (data.secondSurnName.trim() === "") {
      showAlert("Ingrese el segundo apellido", "error", "error");
      return;
    }
    if (data.civilStatusId === 0) {
      showAlert("Seleccione el estado civil", "error", "error");
      return;
    }
    if (data.personTypeId === 0) {
      showAlert("Seleccione el tipo de persona", "error", "error");
      return;
    }
    if (data.address.trim() === "") {
      showAlert("Ingrese la dirección", "error", "error");
      return;
    }
    if (data.dni.trim() === "") {
      showAlert("Ingrese el DNI", "error", "error");
      return;
    }

    if (data.gender.trim() === 0) {
      showAlert("Seleccione el género", "error", "error");
      return;
    }
    if (data.birthDate.trim() === "") {
      showAlert("Ingrese la fecha de nacimiento", "error", "error");
      return;
    }
    if (data.PhoneNumber.trim() === "") {
      showAlert("Ingrese el número de teléfono", "error", "error");
      return;
    }
    if (data.Email.trim() === "") {
      showAlert("Ingrese el correo electrónico", "error", "error");
      return;
    }

    if (data.operation === 1) {
      data.isActive = data.isActive === "true" ? true : false;
      addCustomer(data);
    } else if (data.operation === 2) {
      data.isActive = data.isActive === "true" ? true : false;
      editCustomer(data.id, data);
    }
    return true;
  };

  const addCustomer = async (parameters) => {
    var response = await fetch(`${FAMA_GET_ENDPOINTS.customers}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parameters),
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
      });

    if (response.statusCode != null) {
      showAlert(response.message, "error", "error");
      return;
    }
    showAlert("Registro exitoso", "success", "success");
    getCustomers();
    document.getElementById("btnClose").click();
  };
  const editCustomer = async (id, parameters) => {
    var response = await fetch(
      `${FAMA_GET_ENDPOINTS.customerCrud.replace("{id}", id)}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(parameters),
      }
    )
      .then((response) => {
        return response.json();
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    if (response.statusCode != null) {
      showAlert(response.message, "error", "error");
      return;
    }
    showAlert("Registro exitoso", "success", "success");
    getCustomers();
    document.getElementById("btnClose").click();
  };
  const deleteCustomer = async (id) => {
    const MySwal = withReactContent(Swal);
    MySwal.fire({
      title: "Está seguro?",
      text: "No se podra revertir cambios!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setId(id);
        var response = await fetch(
          `${FAMA_GET_ENDPOINTS.customerCrud.replace("{id}", id)}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
          .then((response) => {
            return response.json();
          })
          .catch((error) => {
            console.error("Error:", error);
          });
        MySwal.fire(
          "Deleted!",
          "Your file has been deleted.",
          "success",
          "success"
        );
        getCustomers();
      }
    });
  };

  return (
    <>
      <div className="App">
        <Filter
          filter={filter}
          OnSumit={(filter) => {
            filterCustomer(filter);
          }}
        />
        <Button
          title={"Nuevo"}
          openModal={(id) => {
            openModal(id);
          }}
          target={"#modalCustomer"}
        />
        <ModalService
          civilStatus={civilStatus}
          personType={personType}
          customer={customer}
          title={title}
          OnValidate={(res) => {
            validate(res);
          }}
        />
      </div>
      <div className="container">
        <DataTableList
          rows={customers}
          onFinish={(id, row) => {
            openModal(id, row);
          }}
          onDelete={(id) => {
            deleteCustomer(id);
          }}
        />
      </div>
    </>
  );
};

export default Customers;

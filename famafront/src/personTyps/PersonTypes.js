import { useState, useEffect, React } from "react";
import DataTableList from "../dataTable/DataTableCustom";
import Button from "../dataTable/Button";
import ModalCatalog from "../dataTable/ModalCatalog";
import { showAlert } from "../customers/components/functions/functions";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const URL_BASE_API = "https://localhost:7240/api/";
const columns = [
  {
    label: "Id",
    field: "id",
    sort: "asc",
    width: 150,
  },
  {
    label: "Código",
    field: "code",
    sort: "asc",
    width: 270,
  },
  {
    label: "Nombre",
    field: "name",
  },
  {
    label: "Opciones",
    field: "options",
    sort: "asc",
    width: 100,
  },
];

const PersonTypes = () => {
  const [personTypes, setPersonTypes] = useState([]);
  const [personType, setPersonType] = useState({
    id: 0,
    code: "",
    name: "",
    operation: 1,
  });
  const [title, setTitle] = useState("");
  useEffect(() => {
    getPersonType();
  }, []);
  const getPersonType = async () => {
    fetch(`${URL_BASE_API}PersonTypes`)
      .then((response) => response.json())
      .then((data) => {
        setPersonTypes(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  const openModal = (op, obj) => {
    if (op === 1) {
      setTitle("Crear");
      setPersonType((personType) => ({
        ...personType,
        ...{
          code: "",
          name: "",
          operation: 1,
        },
      }));
    } else if (op === 2) {
      setTitle("Editar");
      setPersonType((personType) => ({
        ...personType,
        ...{
          code: obj.code,
          name: obj.name,
          id: obj.id,
          operation: 2,
        },
      }));
    }
  };

  const validate = (data) => {
    if (data.code.trim() === "") {
      showAlert("Ingrese el codigo", "error", "error");
      return;
    }
    if (data.name.trim() === "") {
      showAlert("Ingrese el nombre", "error", "error");
      return;
    }
    if (data.operation === 1) {
      add(data);
    } else if (data.operation === 2) {
      edit(data.id, data);
    }
    return true;
  };
  const add = async (parameters) => {
    var response = await fetch(`${URL_BASE_API}PersonTypes`, {
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

    if (response.statusCode != null || response.status != null) {
      showAlert(
        response.message == null ? response.title : response.message,
        "error",
        "Error"
      );
      return;
    }
    showAlert("Registro exitoso", "success", "Success");
    getPersonType();
    document.getElementById("btnClose").click();
  };
  const edit = async (id, parameters) => {
    var response = await fetch(`${URL_BASE_API}PersonTypes/${id}`, {
      method: "PUT",
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
      showAlert(response.message, "error", "Error");
      return;
    }
    showAlert("Registro exitoso", "success", "Success");
    getPersonType();
    document.getElementById("btnClose").click();
  };
  const deleteApi = async (id) => {
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
        var response = await fetch(`${URL_BASE_API}PersonTypes/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            return response.json();
          })
          .catch((error) => {
            console.error("Error:", error);
          });
        MySwal.fire(
          "Eliminado!",
          "Eliminacíon correcta.",
          "success",
          "success"
        );
        getPersonType();
      }
    });
  };
  return (
    <>
      <div className="App">
        <Button
          title={"Nuevo"}
          openModal={(id) => {
            openModal(id);
          }}
          target={"#modalPersonType"}
        />
        <ModalCatalog
          idModal={"modalPersonType"}
          title={title}
          catalog={personType}
          OnValidate={(res) => {
            validate(res);
          }}
        />
      </div>
      <div className="container">
        <DataTableList
          target={"#modalPersonType"}
          rows={personTypes}
          columns={columns}
          onFinish={(id, row) => {
            openModal(id, row);
          }}
          onDelete={(id) => {
            deleteApi(id);
          }}
        />
      </div>
    </>
  );
};

export default PersonTypes;

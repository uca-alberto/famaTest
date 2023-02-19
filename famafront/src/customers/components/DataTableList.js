import React from "react";
import { MDBDataTable, MDBInput } from "mdbreact";

const DatatablePage = (props) => {
  props.rows.map((row) => {
    row.status = [
      <div className="custom-control custom-checkbox text-center">
        <input
          type="checkbox"
          className="custom-control-input"
          id={row.id}
          defaultChecked={row.isActive}
          disabled={true}
        ></input>
      </div>,
    ];
    row.options = [
      <button
        onClick={() => props.onFinish(2, row)}
        className="btn btn-warning"
        data-bs-toggle="modal"
        data-bs-target="#modalCustomer"
      >
        <i className="fa-solid fa-edit"></i>
      </button>,
      <button onClick={() => props.onDelete(row.id)} className="btn btn-danger">
        <i className="fa-solid fa-trash"></i>
      </button>,
    ];
    row.customerType = row.personTypesMap.name;
    row.civilStatus = row.civilStatusMap.name;
    row.phone = row.customerDetailInfosMap.find(
      (x) => x.label == "Phone"
    )?.value;
    row.email = row.customerDetailInfosMap.find(
      (x) => x.label == "Email"
    )?.value;
  });
  const data = {
    columns: [
      {
        label: "Id",
        field: "id",
        sort: "asc",
        width: 150,
      },
      {
        label: "Primer Nombre",
        field: "firstName",
        sort: "asc",
        width: 270,
      },
      {
        label: "Segundo Nombre",
        field: "secondName",
        sort: "asc",
        width: 200,
      },
      {
        label: "Primer Apellido",
        field: "surnName",
        sort: "asc",
        width: 100,
      },
      {
        label: "Segundo Apellido",
        field: "secondSurnName",
        sort: "asc",
        width: 150,
      },
      {
        label: "Activo",
        field: "status",
        sort: "asc",
        width: 100,
      },
      {
        label: "Tipo Cliente",
        field: "customerType",
        sort: "asc",
        width: 100,
      },
      {
        label: "Estado Civil",
        field: "civilStatus",
        sort: "asc",
        width: 100,
      },
      {
        label: "Teléfono",
        field: "phone",
        sort: "asc",
        width: 100,
      },
      {
        label: "Correo Electrónico",
        field: "email",
        sort: "asc",
        width: 100,
      },
      {
        label: "Opciones",
        field: "options",
        sort: "asc",
        width: 100,
      },
    ],
    rows: props.rows,
  };

  return <MDBDataTable striped bordered small data={data} />;
};

export default DatatablePage;

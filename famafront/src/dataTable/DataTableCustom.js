import React from "react";
import { MDBDataTable, MDBInput } from "mdbreact";

const DatatablePage = (props) => {
  props.rows.map((row) => {
    row.options = [
      <button
        onClick={() => props.onFinish(2, row)}
        className="btn btn-warning"
        data-bs-toggle="modal"
        data-bs-target={props.target}
      >
        <i className="fa-solid fa-edit"></i>
      </button>,
      <button onClick={() => props.onDelete(row.id)} className="btn btn-danger">
        <i className="fa-solid fa-trash"></i>
      </button>,
    ];
  });
  const data = {
    columns: props.columns,
    rows: props.rows,
  };

  return <MDBDataTable striped bordered small data={data} />;
};

export default DatatablePage;

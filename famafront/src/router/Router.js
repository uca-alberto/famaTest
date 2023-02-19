import React, { Component } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Customers from "../customers/components/Customers";
import FixedNavbar from "../layout/NavService";
import FooterPage from "../layout/Footer";
import { MDBContainer } from "mdbreact";
import CivilStatus from "../civilStatus/CivilStatus";
import PersonTypes from "../personTyps/PersonTypes";

class Router extends Component {
  render() {
    return (
      <>
        <FixedNavbar />
        <MDBContainer className="text-center mt-5 pt-5">
          <BrowserRouter>
            <Routes>
              <Route exact path="/" element=<Customers /> />
              <Route exact path="/civilStatus" element=<CivilStatus /> />
              <Route exact path="/personTypes" element=<PersonTypes /> />
            </Routes>
          </BrowserRouter>
        </MDBContainer>
        <FooterPage />
      </>
    );
  }
}

export default Router;

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Customers from "./customers/components/Customers";
import { MDBNav, MDBNavItem, MDBNavLink } from "mdbreact";
import Router from "./router/Router";

function App() {
  return (
    <>
      <Router />
    </>
  );
}

export default App;

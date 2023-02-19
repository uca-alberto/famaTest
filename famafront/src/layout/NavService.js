import React from "react";
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavbarToggler,
  MDBCollapse,
  MDBNavItem,
  MDBLink,
  MDBIcon,
} from "mdbreact";
import { BrowserRouter as Router } from "react-router-dom";

class FixedNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
    };

    this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
      collapse: !this.state.collapse,
    });
  }

  render() {
    const bgPink = { backgroundColor: "#ac1f2d" };
    const container = { height: 1300 };
    return (
      <header>
        <MDBNavbar style={bgPink} dark expand="md" fixed="buttom">
          <MDBContainer>
            <MDBNavbarToggler onClick={this.onClick} />
            <MDBCollapse isOpen={this.state.collapse} navbar>
              <MDBNavbarNav left>
                <MDBNavItem active>
                  <MDBNavbarBrand>
                    <a href="/" className="link-dark">
                      <strong className="white-text" href="/">
                        Clientes
                      </strong>
                    </a>
                  </MDBNavbarBrand>
                </MDBNavItem>
                <MDBNavItem active>
                  <MDBNavbarBrand>
                    <a href="/civilStatus" className="link-dark">
                      <strong className="white-text" href="/">
                        Estados Civiles
                      </strong>
                    </a>
                  </MDBNavbarBrand>
                </MDBNavItem>
                <MDBNavItem active>
                  <MDBNavbarBrand>
                    <a href="/personTypes" className="link-dark">
                      <strong className="white-text" href="/">
                        Tipos de Personas
                      </strong>
                    </a>
                  </MDBNavbarBrand>
                </MDBNavItem>
              </MDBNavbarNav>
            </MDBCollapse>
          </MDBContainer>
        </MDBNavbar>
      </header>
    );
  }
}

export default FixedNavbar;

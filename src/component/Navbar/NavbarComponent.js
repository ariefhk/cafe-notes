import React from "react";
import { Button, Navbar, Container, Image } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Biji } from "../../assets";

function NavbarComponent() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [buttonLogin, setButtonLogin] = useState(true);
  const [buttonAdmin, setButtonAdmin] = useState(false);

  useEffect(() => {
    if (!token) {
      setButtonLogin(false);
    } else if (role === "Admin") {
      setButtonAdmin(true);
      setButtonLogin(true);
      console.log("Token dari navigation : ", token);
    } else if (role === "User") {
      setButtonAdmin(false);
      setButtonLogin(true);
      console.log("Token dari navigation : ", token);
    }
  }, [token, role]);

  const moveToAdmin = () => {
    navigate(`/admin`);
  };

  const logOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setButtonAdmin(false);
    console.log("ini token logout :", token);
    navigate(`/login`);
  };

  return (
    <Navbar expand="lg" style={{ backgroundColor: "#9E7676" }}>
      <Container>
        <Navbar.Brand>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Image src={Biji} width="40px" />
            <div style={{ color: "white" }}>
              <strong>Cafe</strong> Notes
            </div>
          </div>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        {/* <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link>Log Transaksi</Nav.Link>
          </Nav>
        </Navbar.Collapse> */}
        <div>
          {buttonLogin === true && (
            <Button bg="dark" variant="light" onClick={() => logOut()}>
              Logout
            </Button>
          )}
          {buttonAdmin === true && (
            <Button
              bg="dark"
              variant="light"
              className="mx-3"
              onClick={() => moveToAdmin()}
            >
              Admin
            </Button>
          )}
        </div>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;
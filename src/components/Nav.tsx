import { Container, Nav, Navbar as NavbarBs } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export function Navbar() {
  const { auth } = useAuth();

  return (
    <NavbarBs className="navbar bg-danger mb-3">
      <Container>
        <Nav className="d-flex gap-7">
          <h3 className="life-quest text-dark">
            Life<span className="text-danger">Quest</span>
          </h3>
          <Nav.Link to="/" as={NavLink}>
            Home
          </Nav.Link>
          {!auth && (
            <Nav.Link to="/login" as={NavLink}>
              Log In
            </Nav.Link>
          )}
          <Nav.Link to="/team" as={NavLink}>
            Team Members
          </Nav.Link>
        </Nav>
      </Container>
    </NavbarBs>
  );
}

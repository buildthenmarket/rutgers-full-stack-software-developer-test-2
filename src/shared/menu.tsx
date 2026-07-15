import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function Menu() {
  return (
    <nav>
      <Navbar expand="lg" className="bg-body-tertiary" bg="light" data-bs-theme="light">
        <div className='container-xxl'>
          <Navbar.Brand href="/"><img
            src="/build-then-market-logo.jpeg"
            alt="logo"
            className="img-logo"
          /></Navbar.Brand>
          <Navbar.Toggle aria-controls="menu-navbar" />
          <Navbar.Collapse id="menu-navbar">
            <Nav className="ms-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <NavDropdown title="Games"  align="end">
                <NavDropdown.Item href="/anagram-hunt">Anagram Hunt</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/math-facts">
                  Math Facts Practice
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/login">Login</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
    </nav>
  );
}

export default Menu;

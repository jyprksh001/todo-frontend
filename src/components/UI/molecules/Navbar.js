import React from 'react';
import { Container,Button } from 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';


const NavbarComponent=({phone,signout})=>{
  // let style= {
  //   'margin-right':'20 !important' 
  // }
  
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand >My App</Navbar.Brand>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text  >Hi {phone} </Navbar.Text> 
          <Button variant="outline-primary" onClick={signout}>Logout</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default NavbarComponent;
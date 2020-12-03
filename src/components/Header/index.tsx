import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { CgProfile, CgLogOut } from 'react-icons/cg';
import { Logo } from './styles';
import './index.css'


const Header: React.FC = () => {
    const name = localStorage.getItem('name');
    
    function destroyLocalStorage() {
        console.log("asdfasdfasdfasdf")
        localStorage.removeItem('ControleMerendaToken');
        localStorage.removeItem('ControleMerendaUser');
        localStorage.removeItem('name');
    }

    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Logo />
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Item as={Link} className="nav-link" to="/snackcontrol/home">Home</Nav.Item>
                    <Nav.Item as={Link} className="nav-link" to="/snackcontrol/stock">Estoque</Nav.Item>
                    <Nav.Item as={Link} className="nav-link" to="/snackcontrol/order">Pedidos</Nav.Item>
                    <Nav.Item as={Link} className="nav-link" to="/snackcontrol/product">Produtos</Nav.Item>
                    <Nav.Item as={Link} className="nav-link" to="/snackcontrol/school">Escolas</Nav.Item>
                    <Nav.Item as={Link} className="nav-link" to="/snackcontrol/bidding">Licitação</Nav.Item>
                    <Nav.Item as={Link} className="nav-link" to="/snackcontrol/provider">Fornecedor</Nav.Item>
                </Nav>
                <Nav className="mr-right">
                    <Nav.Item as={Link} className="nav-link" to="/snackcontrol/profile"><CgProfile size={27} /><h6>{name}</h6></Nav.Item>
                    <Nav.Item as={Link} className="nav-link" to="/" onClick={destroyLocalStorage}><CgLogOut size={27} /><h6>Sair</h6></Nav.Item>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;
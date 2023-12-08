import React from 'react';

import NavBar from './NavBar';
import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/Row';

const conatinerStyle = {
    maxWidth: "1000px",
    margin: "0 auto",
    backgroundColor: "#fff",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
};


function Map() {
    return (
        <Container fluid>
            <NavBar />
        </Container>
    )
}

export default Map;
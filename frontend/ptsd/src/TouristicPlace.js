import React from 'react';

import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import NavBar from './NavBar';
import Image from 'react-bootstrap/esm/Image';


const conatinerStyle = {
    maxWidth: "1000px",
    margin: "0 auto",
    backgroundColor: "#fff",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
};


function TouristicPlace() {

    return (
        <Container fluid>
            <Row>
                <NavBar/>
            </Row>
            <Row className='align-items-center' style={{paddingTop: "25px", paddingBottom: "15px"}}>
                <Col>
                    <Image src="https://img.freepik.com/vetores-premium/texto-de-caligrafia-de-natal-feliz-em-portugues-feliz-natal_1095-944.jpg?w=360" style={{ marginLeft:"10%", width: "60%", height: "200px", objectFit: "cover" }} />
                </Col>
                <Col className="align-self-center" style={{paddingTop: "10px", marginRight:"10%"}}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eget vestibulum erat. Phasellus metus lectus, bibendum at turpis eu, congue luctus est. Proin varius 
                        enim eu turpis varius tristique. Sed consectetur enim lorem, ut luctus elit gravida eget. 
                        Fusce pulvinar at ipsum nec convallis. Praesent volutpat pharetra eros, ullamcorper condimentum.
                    </p>
                </Col>
            </Row>
        </Container>
    )
}

export default TouristicPlace;
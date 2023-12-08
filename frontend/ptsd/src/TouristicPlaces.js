import React, { useState } from 'react';

import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Image from 'react-bootstrap/Image';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';

function TouristicPlaces(props) {

    const [id, setId] = useState(-1)

    return (
        <Row className="justify-content-start ms-1" xs="1" md="2" lg="3">
            {props.places && (
                props.places.map((place, index) => (
                    <Col key={index} className='mb-3' >
                        <a className="text-decoration-none" href={`/touristic_place/${id}`}>
                            <Card className="border-0">
                                <Card.Img src={place} style={{ objectFit: "cover", width: "100%", height: "200px", borderRadius: "15px"}} />
                                <Card.Body style={{ paddingLeft: "0" }}>
                                    <Card.Title><h5 className="fw-bold">Touristic Place Name</h5></Card.Title>
                                    <Card.Text>
                                        <h6 className="fw-light">Some quick example text to build</h6>
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </a>
                    </Col>
                ))
            )}
        </Row>
    )
}

export default TouristicPlaces;



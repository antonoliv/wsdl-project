import React from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import placeholder from './placeholder.webp'

const ImageStyle = {
    objectFit: "cover", 
    width: "100%", 
    height: "200px", 
    borderRadius: "15px" 
}

function TouristicPlaces(sites) {

    return (
        <>
            {sites && (
                sites.places.map((site, index) => (
                    <Col key={index} className='mb-3' >
                        <a className="text-decoration-none" href={`/site/${site.id}`}>
                            <Card className="border-0">
                                { site.picture !== "" ? <Card.Img src={site.picture} style={ImageStyle} /> :
                                <Card.Img src={placeholder} style={{ objectFit: "cover", width: "100%", height: "200px", borderRadius: "15px" }} />}
                                <Card.Body style={{ paddingLeft: "0" }}>
                                    <Card.Title><h5 className="fw-bold">{site.name}</h5></Card.Title>
                                </Card.Body>
                            </Card>
                        </a>
                    </Col>
                ))
            )}
        </>
    )
}

export default TouristicPlaces;



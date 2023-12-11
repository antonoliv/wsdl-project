import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Container from 'react-bootstrap/esm/Container';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import NavBar from './NavBar';
import Image from 'react-bootstrap/esm/Image';
import Card from 'react-bootstrap/Card';


import placeholder from './placeholder.webp'

const ImageStyle = {
    objectFit: "cover", 
    width: "100%", 
    height: "400px", 
    borderRadius: "15px" 
}

function TouristicPlace() {

    const { id } = useParams()
    const [siteInfo, setSiteInfo] = useState([])
    const [city, setCity] = useState(null)

    useEffect(() => {
        fetchSite()
        fetchCity()
    }, [])

    const fetchSite = async () => {
        await fetch(`http://localhost:8000/site/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setSiteInfo(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const fetchCity = async () => {
        await fetch(`http://localhost:8000/city/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setCity(data)
            })
            .catch((err) => {
                console.log(err)
            })
    }

    return (
        <Container fluid>
            <Row>
                <NavBar />
            </Row>
            <Row className='align-items-center' gap={2} style={{ paddingTop: "25px", paddingBottom: "15px", marginLeft: "10%", marginRight: "10%" }}>
                <Col style={{ marginLeft: "10%", marginRight: "10%" }}>
                    <Card className="border-0">
                        {siteInfo.picture !== "" ? <Card.Img src={siteInfo.picture} style={ImageStyle} /> :
                            <Card.Img src={placeholder} style={{ objectFit: "cover", width: "100%", height: "400px", borderRadius: "15px" }} />}
                        <Card.Body style={{ paddingLeft: "0" }}>
                            <Card.Title>
                                {siteInfo.description === "" ? <Row>
                                    <Col><h5 className="fw-bold">{siteInfo.name}</h5></Col>
                                    <Col><p><strong>Rating:</strong> {siteInfo.rating}</p></Col>
                                </Row> : <h5 className="fw-bold">{siteInfo.name}</h5>}
                            </Card.Title>
                            <Card.Text>
                                <a href={`/city/${siteInfo.id}`}>
                                    <h6 className="fw-light">{siteInfo.city}</h6>
                                </a>
                            </Card.Text>
                            <Card.Text>
                                <h6 className="fw-light">{siteInfo.parish}</h6>
                            </Card.Text>
                        </Card.Body>
                    </Card>
                </Col>
                {siteInfo.description !== "" && <Col className="align-self-center" style={{ marginRight: "10%" }}>
                    <p>{siteInfo.description}</p>
                    <p><strong>Rating:</strong> {siteInfo.rating}</p>
                </Col>}
            </Row>
            {!siteInfo.reviews || Object.keys(siteInfo.reviews).length === 0 || (
                <Row style={{ margin: "5px 20% 30px 20%" }}>
                    {siteInfo.reviews.map((review) => (
                        <Row className="justify-content-between" style={{ padding: "20px", borderBottom: "2px solid lightgrey" }}>
                            <Row>{review.text}</Row>
                            <Row className="align-items-center" style={{ marginTop: "3%" }}>
                                <Col ><svg style={{ marginRight: "2%" }} xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-person" viewBox="0 0 16 16">
                                    <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664z" />
                                </svg>{review.author}</Col>
                                <Col><svg style={{ marginRight: "2%" }} xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-clock" viewBox="0 0 16 16">
                                    <path d="M8 3.5a.5.5 0 0 0-1 0V9a.5.5 0 0 0 .252.434l3.5 2a.5.5 0 0 0 .496-.868L8 8.71z" />
                                    <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m7-8A7 7 0 1 1 1 8a7 7 0 0 1 14 0" />
                                </svg>{review.publish_time}</Col>
                            </Row>
                        </Row>
                    ))}
                </Row>
            )}
        </Container>
    )
}

export default TouristicPlace;
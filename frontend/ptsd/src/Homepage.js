import React, { useEffect, useState } from 'react';

import TouristicPlaces from './TouristicPlaces';
import NavBar from './NavBar';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';



const touristicPlacesStyle = {
    margin: "20px 0 0 0"
}

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <a
        href=""
        ref={ref}
        onClick={e => {
            e.preventDefault();
            onClick(e);
        }}
    >
        {<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" className="bi bi-filter" viewBox="0 0 16 16">
            <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
        </svg>}
        {children}
    </a>
));

function Homepage() {

    const [touristicSites, setToursiticSites] = useState([])
    const [isOpen, setOpen] = useState(false)

    const [params, setParams] = useState({
        name: '',
        rating: 0,
        parish: '',
        city: ''
    })

    useEffect(() => {
        fetchSites()
    }, [params.name, params.rating, params.parish, params.city]);

    const fetchSites = async () => {
        params.name !== "" || params.rating !== 0 || params.parish !== "" || params.city !== "" ? await searchSites() : await fetchAllSites()
    }

    const fetchAllSites = async () => {
        console.log("FEWFEWDNIFN")
        await fetch("http://localhost:8000/sites", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => response.json())
        .then(data => {
            const shuffled = data.sort(() => 0.5 - Math.random());
            let selected = shuffled.slice(0, 16);
            setToursiticSites(selected)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const searchSites = async () => {

        const filteredParams = {};

        Object.keys(params).forEach((key) => {
            if (params[key] !== "") {
                filteredParams[key] = params[key];
            }
        });

        setParams(filteredParams)
    
        await fetch("http://localhost:8000/search-sites", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(params)
        })
        .then(response => response.json())
        .then(data => {
            setToursiticSites(data)
        })
        .catch((err) => {
            console.log(err)
        })
    }

    const openFilter = () => {
        setOpen(!isOpen)
    }
    
    const setName = (e) => {
        setParams({... params, name: e.target.value })
    }

    const setParish = (e) => {
        setParams({... params, parish: e.target.value })
    }

    const setCity = (e) => {
        setParams({... params, city: e.target.value })
    }

    const handleRangeChange = (e) => {
        setParams({... params, rating: Number(e.target.value) })
    }

    return (
        <>
            <NavBar />
            <Container>
                <Row>
                    <Row className='mt-5 justify-content-center'>
                        <Form className="mb-3">
                            <Row className='justify-content-center'>
                                <Col xs="9" md="9" lg="9" style={{ paddingRight: "0" }}>
                                    <Form.Control size="lg" placeholder="Porto Touristic Site" onChange={setName} style={{ border: "1px solid lightgrey", borderRadius: "1px" }} />
                                </Col>
                                <Col xs="3" md="3" lg="3" className="align-self-center">
                                    <Button as={CustomToggle} onClick={openFilter}></Button>
                                </Col>
                            </Row>
                        </Form>
                    </Row>
                </Row>
                {isOpen ?
                    <Row className="justify-content-start" style={touristicPlacesStyle}>
                        <Col lg="9" >
                            <Row className="justify-content-start" xs="1" md="1" lg="2" style={touristicPlacesStyle}>
                                <TouristicPlaces places={touristicSites} />
                            </Row>
                        </Col>
                        <Col lg="3">
                            <Form>
                                <Form.Label>Rating</Form.Label>
                                <Form.Range type="rating" min={0} max={5} value={params.rating} onChange={handleRangeChange} />
                                <Form.Label htmlFor="text">Parish</Form.Label>
                                <Form.Control
                                    type="text"
                                    id="parish"
                                    aria-describedby="text"
                                    onChange={setParish}
                                />
                                <Form.Label htmlFor="text">City</Form.Label>
                                <br/>
                                <Form.Control
                                    type="text"
                                    id="city"
                                    aria-describedby="text"
                                    onChange={setCity}
                                />
                            </Form>
                        </Col>
                    </Row> :
                    <Row className="justify-content-start" xs="1" md="2" lg="3" style={touristicPlacesStyle}>
                        <TouristicPlaces places={touristicSites} />
                    </Row>
                }

            </Container >
        </>
    )
}

export default Homepage;
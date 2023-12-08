import React, { useState } from 'react';

import TouristicPlaces from './TouristicPlaces';
import NavBar from './NavBar';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import Button from 'react-bootstrap/Button';

import portoBackground from './porto_.jpg';

const conatinerStyle = {
};


const touristicPlacesStyle = {
    padding: "20px 0 0 0",
    margin: "20px 5% 0 5%"
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
        {<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" class="bi bi-filter" viewBox="0 0 16 16">
            <path d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5m-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5" />
        </svg>}
        {children}
    </a>
));


function Homepage() {

    const [touristicPlaces, setToursiticPlaces] = useState([
        'https://img.freepik.com/vetores-premium/texto-de-caligrafia-de-natal-feliz-em-portugues-feliz-natal_1095-944.jpg?w=360',
        'https://cdn.wizard.com.br/wp-content/uploads/2020/12/17203834/as-tradicoes-de-natal-mais-diferentes-do-mundo.png', 'https://img.freepik.com/fotos-gratis/arvore-de-natal-decorada-com-uma-estrela_318354-1719.jpg?size=338&ext=jpg&ga=GA1.1.1222169770.1701734400&semt=sph',
        'https://greenpower.net.br/blog/wp-content/uploads/2021/12/o-verdadeiro-significado-da-arvore-de-natal.jpg', 'https://static.mundoeducacao.uol.com.br/mundoeducacao/2020/12/dia-de-natal.jpg',
        'https://img.freepik.com/vetores-premium/texto-de-caligrafia-de-natal-feliz-em-portugues-feliz-natal_1095-944.jpg?w=360',
        'https://cdn.wizard.com.br/wp-content/uploads/2020/12/17203834/as-tradicoes-de-natal-mais-diferentes-do-mundo.png', 'https://img.freepik.com/fotos-gratis/arvore-de-natal-decorada-com-uma-estrela_318354-1719.jpg?size=338&ext=jpg&ga=GA1.1.1222169770.1701734400&semt=sph',
        'https://greenpower.net.br/blog/wp-content/uploads/2021/12/o-verdadeiro-significado-da-arvore-de-natal.jpg', 'https://static.mundoeducacao.uol.com.br/mundoeducacao/2020/12/dia-de-natal.jpg',
    ])
    const [value, setTouristicPlaceName] = useState("")

    const fetchTouristicPlace = async () => {
        const response = await fetch(`http://localhost:8000/entities_name/${value}`)
        console.log(response)
        const data = await response.json()
        setToursiticPlaces(data.message.data)
    }

    const setName = (e) => {
        setTouristicPlaceName(e.target.value)
    }

    return (
        <Container fluid style={conatinerStyle}>
            <Row>
                <NavBar />
                <Row className='mt-5 justify-content-center'>
                    <Form className="mb-3">
                        <Row className='justify-content-center'>
                            <Col xs="7" md="8" lg="8" style={{ paddingRight: "0" }}>
                                <Form.Control size="lg" placeholder="Porto Touristic Site" onChange={setName} style={{ border: "1px solid lightgrey", borderRadius: "1px" }} />
                            </Col>
                            <Col xs="2" md="2" lg="2" style={{ paddingLeft: "0" }}>
                                <Button variant="secondary" size="lg" type="submit" style={{ borderRadius: "1px" }}>
                                    Search
                                </Button>
                            </Col>
                            <Col xs="1" md="1" lg="1" className="align-self-center">
                                <Dropdown>
                                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                                        <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                                        <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Col>
                        </Row>
                    </Form>
                </Row>
            </Row>
            <Row style={touristicPlacesStyle}>
                <TouristicPlaces places={touristicPlaces} />
            </Row>
        </Container>
    )
}

export default Homepage;
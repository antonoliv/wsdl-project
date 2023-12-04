import React, { useState } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function Test() {

    const [touristicPlaces, setToursiticPlaces] = useState(null)
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
        <div>
            <Form className="mb-3" onSubmit={fetchTouristicPlace}>
                <Form.Label>Search for Touristic Places</Form.Label>
                <Form.Control placeholder="name" onChange={setName} />
                <Button variant="primary" type="submit">
                    Submit
                </Button>
            </Form>
            {console.log(touristicPlaces) && touristicPlaces && (
                touristicPlaces.map((touristicPlace, index) => {
                    <p>{touristicPlace}</p>
                })
            )}
        </div>
    )

    /*
    return (
        <>
        
        </>
    );
    */
}

export default Test;
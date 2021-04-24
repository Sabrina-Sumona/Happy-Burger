import React from 'react';
import { Card, CardBody, CardFooter, CardHeader, Button } from 'reactstrap';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Egg', type: 'egg' },
    { label: 'Beef', type: 'beef' },
    { label: 'Chicken', type: 'chicken' },
    { label: 'Ketchup', type: 'ketchup' },
    { label: 'Mayonnaise', type: 'mayonnaise' },
]

const BuildControl = props => {
    return (
        <div className="d-flex">
            <div className="mr-auto ml-5" style={{ fontWeight: "bold", fontSize: "1.2rem" }}>{props.label}</div>
            <button className="btn btn-success btn-sm m-1" onClick={props.added}>Add</button>
            <button className="btn btn-danger btn-sm m-1" onClick={props.removed}>Remove</button>
        </div>
    )
}


const Controls = props => {
    return (
        <div className="container ml-md-5" style={{ textAlign: "center" }}>
            <Card style={{
                marginTop: "30px",
                marginBottom: "30px",
                textAlign: "center"
            }}>
                <CardHeader style={{
                    backgroundColor: "#00AFDB",
                    color: "white"
                }}><h4>Ingredients</h4></CardHeader>
                <CardBody>
                    {
                        controls.map(item => {
                            return <BuildControl
                                label={item.label}
                                type={item.type}
                                key={Math.random()}
                                added={() => props.ingredientAdded(item.type)}
                                removed={() => props.ingredientRemoved(item.type)}
                            />
                        })
                    }
                </CardBody>
                <CardFooter><h5>Price: <strong>{props.price}</strong> BDT</h5></CardFooter>
                <Button
                    style={{
                        backgroundColor: "#00AFDB",
                        color: "white"
                    }} disabled={!props.purchasable}
                    onClick={props.toggleModal}
                >
                    Order Now
                </Button>
            </Card>
        </div>
    )
}

export default Controls;
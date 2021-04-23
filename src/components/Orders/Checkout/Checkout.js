import React, { Component } from 'react';
import { Button } from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';

const mapStateTopProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable,
    }
}
class Checkout extends Component {
    state = {
        values: {
            deliveryAddress: "",
            phone: "",
            paymentType: "Cash On Delivery",
        }
    }

    goBack = () => {
        this.props.history.goBack("/");
    }

    inputChangerHandler = (e) => {
        this.setState({
            values: {
                ...this.state.values,
                [e.target.name]: e.target.value,
            }
        })
    }

    submitHandler = () => {
        const order = {
            ingredients: this.props.ingredients,
            customer: this.state.values,
            price: this.props.totalPrice,
            orderTime: new Date(),
        }
        // we must write .json after the key while using firebase
        axios.post("https://happy-burger-d182b-default-rtdb.firebaseio.com/orders.json", order)
            .then(response => console.log(response))
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <h4 style={{
                    backgroundColor: "#00AFDB",
                    color: "white",
                    border: "1px solid grey",
                    margin: "0px",
                    borderTopLeftRadius: "5px",
                    borderTopRightRadius: "5px",
                    padding: "20px",
                }}>Payment: {this.props.totalPrice} BDT</h4>
                <form style={{
                    border: "1px solid grey",
                    // boxShadow: "1px 1px #888888",
                    borderRadius: "5px",
                    padding: "20px",
                    paddingBottom: "50px",
                    borderTopLeftRadius: "0px",
                    borderTopRightRadius: "0px"
                }}>
                    <textarea
                        name="deliveryAddress"
                        value={this.state.values.deliveryAddress}
                        className="form-control" placeholder="Your Address"
                        onChange={(e) => this.inputChangerHandler(e)}
                    />
                    <br />
                    <input
                        name="phone"
                        className="form-control"
                        value={this.state.values.phone}
                        placeholder="Your Phone Number"
                        onChange={(e) => this.inputChangerHandler(e)}
                    />
                    <br />
                    <select
                        name="paymentType"
                        className="form-control"
                        value={this.state.values.paymentType}
                        onChange={(e) => this.inputChangerHandler(e)
                        }>
                        <option value="Cash On Delivery">Cash On Delivery</option>
                        <option value="Bkash">Bkash</option>
                    </select>
                    <br />
                    <Button color="danger" className="ml-3 float-right" onClick={this.goBack}>
                        Cancel
                    </Button>
                    <Button color="success" className="mr-auto float-right" onClick={this.submitHandler}>
                        Place Order
                    </Button>
                </form>
            </div >
        )
    }
}

export default connect(mapStateTopProps)(Checkout);
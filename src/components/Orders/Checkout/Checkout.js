import React, { Component } from 'react';
import { Button } from 'reactstrap';

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
        console.log(this.state.values);
    }

    render() {
        return (
            <div>
                <h4 style={{ backgroundColor: "#00AFDB", color: "white", padding: "15px", margin: "0px", borderTopLeftRadius: "5px", border: "1px solid grey", borderTopRightRadius: "5px" }}>Checkout</h4>
                <form style={{
                    border: "1px solid grey",
                    // boxShadow: "1px 1px #888888",
                    borderRadius: "5px",
                    padding: "20px",
                    paddingBottom: "50px",
                    borderTopLeftRadius: "0px",
                    borderTopRightRadius: "0px"
                }}>
                    <textarea name="deliveryAddress" value={this.state.values.deliveryAddress} className="form-control" placeholder="Your Address" onChange={(e) => this.inputChangerHandler(e)}></textarea>
                    <br />
                    <input name="phone" className="form-control" value={this.state.values.phone} placeholder="Your Phone Number" onChange={(e) => this.inputChangerHandler(e)} />
                    <br />
                    <select name="paymentType" className="form-control" value={this.state.values.paymentType} onChange={(e) => this.inputChangerHandler(e)}>
                        <option value="Cash On Delivery">Cash On Delivery</option>
                        <option value="Bkash">Bkash</option>
                    </select>
                    <br />
                    <Button color="danger" className="ml-3 float-right" onClick={this.goBack}>Cancel</Button>
                    <Button color="success" className="mr-auto float-right" onClick={this.submitHandler}>Place Order</Button>
                </form>
            </div >
        )
    }
}

export default Checkout;
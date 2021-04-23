import React, { Component } from 'react';
import { Button, Modal, ModalBody, ModalHeader } from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';
import Spinner from '../../Spinner/Spinner';
import { resetIngredients } from '../../../redux/actionCreators';

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        resetIngredients: () => dispatch(resetIngredients()),
    }
}

class Checkout extends Component {
    state = {
        values: {
            deliveryAddress: "",
            phone: "",
            paymentType: "Cash On Delivery",
        },
        isLoading: false,
        isModalOpen: false,
        modalMsg: "",
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
        this.setState({ isLoading: true });
        const order = {
            ingredients: this.props.ingredients,
            customer: this.state.values,
            price: this.props.totalPrice,
            orderTime: new Date(),
        }
        // we must write .json after the key while using firebase
        axios.post("https://happy-burger-d182b-default-rtdb.firebaseio.com/orders.jdson", order)
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        isLoading: false,
                        isModalOpen: true,
                        modalMsg: "Your Order Is Placed Successfully!",
                        modalSt: "Success"
                    })
                    this.props.resetIngredients();
                } else {
                    this.setState({
                        isLoading: false,
                        isModalOpen: true,
                        modalMsg: "Something Went Wrong! Please Order Again!",
                        modalSt: "Failure"
                    })
                }
            })
            .catch(err => {
                this.setState({
                    isLoading: false,
                    isModalOpen: true,
                    modalMsg: "Something Went Wrong! Please Order Again!",
                    modalSt: "Failure"
                })
            })
    }

    render() {
        let form =
            (
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
                        <Button color="success" className="mr-auto float-right" disabled={!this.props.purchasable} onClick={this.submitHandler}>
                            Place Order
                    </Button>
                    </form>
                </div >
            )
        return (
            <div>
                {this.state.isLoading ? <Spinner /> : form}
                <Modal isOpen={this.state.isModalOpen}>
                    <ModalHeader style={{ backgroundColor: "#00AFDB", color: 'white' }} >
                        <h4>
                            {this.state.modalSt}
                        </h4>
                    </ModalHeader>
                    <ModalBody>
                        <p>
                            {this.state.modalMsg}
                        </p>
                        <Button color="success" className="float-right" onClick={this.goBack}>
                            Ok
                        </Button>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Checkout);
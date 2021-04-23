import React, { Component } from 'react';
import Burger from './Burger/Burger';
import Controls from './Controls/Controls';
import { Modal, ModalBody, ModalHeader, ModalFooter, Button } from 'reactstrap';
import Summary from './Summary/Summary';
import { connect } from 'react-redux';
import { addIngredient, removeIngredient, updatePurchasable } from '../../redux/actionCreators';
// const INGREDIENT_PRICES = {
//     salad: 20,
//     cheese: 40,
//     meat: 90,
// }

const mapStateToProps = state => {
    return {
        ingredients: state.ingredients,
        totalPrice: state.totalPrice,
        purchasable: state.purchasable,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addIngredient: (igtype) => dispatch(addIngredient(igtype)),
        removeIngredient: (igtype) => dispatch(removeIngredient(igtype)),
        updatePurchasable: () => dispatch(updatePurchasable()),
    }
}

class BurgerBuilder extends Component {
    state = {
        // ingredients: [
        //     { type: 'salad', amount: 0 },
        //     { type: 'cheese', amount: 0 },
        //     { type: 'meat', amount: 0 },
        // ],
        // // base price upper bun & lower bun
        // totalPrice: 80,
        // purchasable: false,
        modalOpen: false,

    }

    // updatePurchasable = ingredients => {
    //     const sum = ingredients.reduce((sum, element) => {
    //         return sum + element.amount;
    //     }, 0);
    //     this.setState({ purchasable: sum > 0 })
    // }

    addIngredientHandle = type => {
        // const ingredients = [...this.state.ingredients];
        // const newPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
        // for (let item of ingredients) {
        //     if (item.type === type) item.amount++;
        // }
        // this.setState({ ingredients: ingredients, totalPrice: newPrice });
        this.props.addIngredient(type);
        this.props.updatePurchasable();
    }

    removeIngredientHandle = type => {
        // const ingredients = [...this.state.ingredients];
        // const newPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
        // for (let item of ingredients) {
        //     if (item.type === type) {
        //         if (item.amount <= 0) return;
        //         item.amount--;
        //     }
        // }
        // this.setState({ ingredients: ingredients, totalPrice: newPrice });
        this.props.removeIngredient(type);
        this.props.updatePurchasable();
    }

    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    handleCheckout = () => {
        this.props.history.push("/checkout");
    }

    // componentDidMount() {
    // console.log(this.props);
    // }

    render() {
        return (
            <div>
                <div className="d-flex flex-md-row flex-column">
                    <Burger ingredients={this.props.ingredients} />
                    <Controls
                        ingredientAdded={this.addIngredientHandle}
                        ingredientRemoved={this.removeIngredientHandle}
                        price={this.props.totalPrice}
                        toggleModal={this.toggleModal}
                        purchasable={this.props.purchasable}
                    />
                </div >
                <Modal isOpen={this.state.modalOpen}>
                    <ModalHeader style={{ backgroundColor: "#00AFDB", color: 'white' }} >
                        Your Order Summary
                    </ModalHeader>
                    <ModalBody>
                        <h5>Total Price: {this.props.totalPrice.toFixed(0)} BDT</h5>
                        <Summary ingredients={this.props.ingredients} />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.handleCheckout}>Continue to Checkout</Button>
                        <Button color="danger" onClick={this.toggleModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BurgerBuilder);